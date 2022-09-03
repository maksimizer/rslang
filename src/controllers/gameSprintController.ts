import { gameParameters, rightAnswers, wrongAnswers } from '../constants/constants';
import serverRequests, { auth } from '../model/appModel';
import {
  timer, arrForSelectedWords, changeColorStylesByLevels, findPage,
  gameSprintKeyboard, gameSprintMouse, getGroupAndPAge,
  resetCount,
  getRandomWrongWordTranslate,
  getRandomNumber,
} from '../model/gameSprintModel';
import changeHashPage from '../model/hashPage';
import { IAuth, IStatistic } from '../types/interface';
import { volumeOff, volumeOn } from '../utils/icons';
import drawSprintGame, { renderGame } from '../views/renderSprintGame';
import fullScreen, { closeGameWindow } from './fullscreen';

document.addEventListener('change', (event: Event): void => {
  if ((event.target as HTMLSelectElement).classList.contains('sprint-game-select')) {
    const groupAndPage = [{ key: 'group', value: (+(event.target as HTMLSelectElement).value - 1) }, { key: 'page', value: 'null' }];
    localStorage.setItem('sprintGroupAndPage', JSON.stringify(groupAndPage));
  }
});

document.addEventListener('click', async (event: MouseEvent): Promise<void> => {
  if ((event.target as HTMLButtonElement).classList.contains('sprint-game-start-button')) {
    renderGame();
    changeColorStylesByLevels();
    const btnGameOut = document.querySelector('.game-out') as HTMLButtonElement;
    const { group, page } = getGroupAndPAge('sprintGroupAndPage');
    const pages = findPage(page);
    const prevWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }]);
    const nextWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }]);
    const words = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${page}` }]);
    const wrongArr = [...words, ...nextWords, ...prevWords];
    const wordsForGame: [string, string, string, string, string][] = [];
    const allWords = [...words, ...nextWords];

    resetCount(57);
    fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
    words.forEach((el) => {
      wordsForGame.push(
        [el.word, el.wordTranslate,
          getRandomWrongWordTranslate(wrongArr, el.wordTranslate), el.audio, el.id],
      );
    });

    nextWords.forEach((el) => {
      wordsForGame.push(
        [el.word, el.wordTranslate,
          getRandomWrongWordTranslate(wrongArr, el.wordTranslate), el.audio, el.id],
      );
    });

    localStorage.setItem('allWords', JSON.stringify(allWords));
    localStorage.setItem('wordsForGame', JSON.stringify(wordsForGame));

    const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
    const translateWord = document.querySelector('.word-translate') as HTMLDivElement;

    wordContainer.innerHTML = wordsForGame[gameParameters.count][0] as string;
    translateWord.innerHTML = wordsForGame[gameParameters.count][getRandomNumber(2, 1)];
    localStorage.setItem('answer', JSON.stringify({ right: `${words[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
    btnGameOut.style.visibility = 'visible';
    btnGameOut.style.opacity = '1';

    timer();
  }

  const buttonGameOut = (event.target as HTMLElement).closest('.game-out');

  if (buttonGameOut) {
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);

    localStorage.setItem('sprintGroupAndPage', JSON.stringify([{ key: 'group', value: '0' }, { key: 'page', value: 'null' }]));
    gameParameters.count = 0;
    gameParameters.sum = 0;
    gameParameters.trueAnswers = 0;
    rightAnswers.length = 0;
    wrongAnswers.length = 0;
    arrForSelectedWords.length = 0;
    resetCount(57);
    fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);

    const statistic: IStatistic = JSON.parse(localStorage.getItem('statistic') as string);
    const user: IAuth = JSON.parse(localStorage.getItem('user') as string);

    serverRequests.updateUserStatistic(user.userId, user.token, statistic);
  }

  if ((event.target as HTMLButtonElement).classList.contains('music-img')
  || (event.target as HTMLButtonElement).closest('.music-img')) {
    const musicBtn = document.querySelector('.music-img') as HTMLButtonElement;

    if ((event.target as HTMLButtonElement).closest('.music-on')) {
      musicBtn.innerHTML = `${volumeOff}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-on', 'music-off');
      gameParameters.volume = 0;
    }

    if ((event.target as HTMLButtonElement).closest('.music-off')) {
      musicBtn.innerHTML = `${volumeOn}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-off', 'music-on');
      gameParameters.volume = 1;
    }
  }

  const modalResultWindow = document.querySelector('.game-sprint-modal-window') as HTMLDivElement;

  if ((event.target as HTMLButtonElement).classList.contains('modal-close')) {
    const html = document.querySelector('html') as HTMLHtmlElement;
    const statistic: IStatistic = JSON.parse(localStorage.getItem('statistic') as string);
    const date = new Date();
    const day = date.getDate();

    if (statistic.optional[day].sprintGame.winLength < gameParameters.bestResult) {
      statistic.optional[day].sprintGame.winLength = gameParameters.bestResult;
    }

    localStorage.setItem('statistic', JSON.stringify(statistic));
    html.style.overflowY = '';
    modalResultWindow.classList.toggle('hidden');
    changeHashPage('game-sprint');
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
    localStorage.setItem('sprintGroupAndPage', JSON.stringify([{ key: 'group', value: '0' }, { key: 'page', value: 'null' }]));
    gameParameters.count = 0;
    gameParameters.sum = 0;
    gameParameters.trueAnswers = 0;
    rightAnswers.length = 0;
    wrongAnswers.length = 0;
    arrForSelectedWords.length = 0;
    gameParameters.bestResult = 0;
    resetCount(57);

    const user: IAuth = JSON.parse(localStorage.getItem('user') as string);
    serverRequests.updateUserStatistic(
      user.userId,
      user.token,
      statistic,
    );
  }

  if ((event.target as HTMLButtonElement).closest('[data-sound]')) {
    const soundElement = (event.target as HTMLButtonElement).closest('[data-sound]') as HTMLElement;
    const serverPath = serverRequests.baseUrl;
    const url = soundElement.dataset.sound;
    new Audio(`${serverPath}/${url}`).play();
  }
});

document.addEventListener('click', gameSprintMouse);
document.addEventListener('keydown', gameSprintKeyboard);

document.addEventListener('click', async (event: MouseEvent) => {
  if ((event.target as HTMLButtonElement).closest('#textbook-game-sprint')) {
    const authUser = localStorage.getItem('auth');
    const userString = localStorage.getItem('user');

    drawSprintGame();
    renderGame();
    changeColorStylesByLevels();
    const groupAndPage = JSON.parse(localStorage.getItem('groupAndPage') as string);
    const { group, page } = await getGroupAndPAge('groupAndPage');

    if (authUser && userString) {
      const pages = await findPage(page.toString());
      const nextPageInGroup = [{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }];
      const prevPageInGroup = [{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }];
      const user = JSON.parse(userString);
      const newWords = await serverRequests.getUsersAggregatedWords(
        user.userId,
        user.token,
        groupAndPage,
      );
      const nextWords = await serverRequests.getUsersAggregatedWords(
        user.userId,
        user.token,
        nextPageInGroup,
      );
      const prevWords = await serverRequests.getUsersAggregatedWords(
        user.userId,
        user.token,
        prevPageInGroup,
      );
      const wordsForGame = [...newWords, ...nextWords].filter((word) => word.userWord?.difficulty !== 'easy');
      const wrongAnswersArr = [...newWords, ...nextWords, ...prevWords];
      const btnGameOut = document.querySelector('.game-out') as HTMLButtonElement;
      resetCount(wordsForGame.length - 1);
      fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
      const words: [string, string, string, string, string][] = [];

      wordsForGame.forEach((el) => {
        words.push(
          [el.word, el.wordTranslate,
            getRandomWrongWordTranslate(wrongAnswersArr, el.wordTranslate), el.audio,
            el.id as string],
        );
      });

      localStorage.setItem('wordsForGame', JSON.stringify(words));
      localStorage.setItem('allWords', JSON.stringify(wordsForGame));
      console.log(wordsForGame);
      const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
      const translateWord = document.querySelector('.word-translate') as HTMLDivElement;

      wordContainer.innerHTML = words[gameParameters.count][0] as string;
      translateWord.innerHTML = words[gameParameters.count][getRandomNumber(2, 1)];
      localStorage.setItem('answer', JSON.stringify({ right: `${wordsForGame[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
      btnGameOut.style.visibility = 'visible';
      btnGameOut.style.opacity = '1';

      timer();
    }
  }
});
