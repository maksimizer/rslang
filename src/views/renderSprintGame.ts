import htmlSprintGameMainPage from './template/mainSprintGame';

const drawSprintGame = (): void => {
  const content = document.querySelector('.main') as HTMLElement;
  const namePage = document.querySelector('.name-page') as HTMLElement;
  namePage.textContent = 'Sprint Game';
  content.innerHTML = htmlSprintGameMainPage;
};

export default drawSprintGame;
