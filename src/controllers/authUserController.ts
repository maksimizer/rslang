import serverRequests, { auth } from '../model/appModel';
import { IAuth } from '../types/interface';

document.addEventListener('click', async (event: Event) => {
  const html = document.querySelector('html') as HTMLHtmlElement;
  const authBody = document.querySelector('.auth-popup-body') as HTMLDivElement;
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;
  const userName = nameInput.value;
  const messageError = document.querySelector('.message') as HTMLDivElement;
  const userAuthName = document.querySelector('.name-user') as HTMLSpanElement;

  const date = new Date();
  const day = date.getDate();

  if ((event.target as HTMLButtonElement).classList.contains('authorization')) {
    if (localStorage.getItem('auth') === 'true') {
      localStorage.removeItem('auth');
      auth.changeStylesAuthWindow('0', 'hidden');
      html.style.overflowY = '';
      userAuthName.innerHTML = '';
      auth.changeImageAuth();
      messageError.style.display = 'none';
      messageError.innerHTML = '';
      localStorage.removeItem('user');
      emailInput.value = '';
      passwordInput.value = '';
      nameInput.value = '';
      window.location.reload();
    }
  }

  if ((event.target as HTMLButtonElement).classList.contains('button-in')) {
    if (authBody.classList.contains('header-in')) {
      const { code, authUser }:
      { code: number, authUser: IAuth } = await serverRequests.userSingIn(
        { email: userEmail, password: userPassword },
      );

      if (code !== 200) {
        messageError.style.display = 'block';
        messageError.innerHTML = 'Wrong email or password';
      } else {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify(authUser));
        await auth.changeImageAuth();
        userAuthName.innerHTML = auth.getAuthNameUser();
        auth.changeStylesAuthWindow('0', 'hidden');
        html.style.overflowY = '';

        const id = authUser.userId;
        const { token } = authUser;
        let userStatistics = await serverRequests.getUsersStatistic(id, token);

        if (!Object.keys(userStatistics.optional).includes(day.toString())) {
          await serverRequests.updateUserStatistic(
            authUser.userId,
            authUser.token,
            {
              learnedWords: userStatistics.learnedWords,
              optional: {
                [day]: {
                  audioGame: {
                    newWord: 0,
                    wrong: 0,
                    correct: 0,
                    winLength: 0,
                  },
                  sprintGame: {
                    newWord: 0,
                    wrong: 0,
                    correct: 0,
                    winLength: 0,
                  },
                  learnedWordsDay: {
                    learned: 0,
                  },
                },
              },
            },
          );
          userStatistics = await serverRequests.getUsersStatistic(authUser.userId, authUser.token);
        }

        delete userStatistics.id;
        localStorage.setItem('statistic', JSON.stringify(userStatistics));
      }
    }

    if (authBody.classList.contains('header-register')) {
      const newUser = await serverRequests.createUser({
        name: userName,
        email: userEmail,
        password: userPassword,
      });

      if (newUser === 422) {
        messageError.style.display = 'block';
        messageError.innerHTML = 'Wrong email or password';
      } else if (newUser === 417) {
        messageError.style.display = 'block';
        messageError.innerHTML = 'User is already registered';
      } else if (newUser === 200) {
        const dataUser = await serverRequests.userSingIn(
          {
            email: userEmail,
            password: userPassword,
          },
        );
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify(dataUser.authUser));
        await auth.changeImageAuth();
        auth.changeStylesAuthWindow('0', 'hidden');
        html.style.overflowY = '';

        const id = dataUser.authUser.userId;
        const { token } = dataUser.authUser;
        await serverRequests.updateUserStatistic(
          dataUser.authUser.userId,
          dataUser.authUser.token,
          {
            learnedWords: 0,
            optional: {
              [day]: {
                audioGame: {
                  newWord: 0,
                  wrong: 0,
                  correct: 0,
                  winLength: 0,
                },
                sprintGame: {
                  newWord: 0,
                  wrong: 0,
                  correct: 0,
                  winLength: 0,
                },
                learnedWordsDay: {
                  learned: 0,
                },
              },
            },
          },
        );
        const userStatistics = await serverRequests.getUsersStatistic(id, token);
        await localStorage.setItem('statistic', JSON.stringify(userStatistics));
      }
    }
    window.location.reload();
  }
});
