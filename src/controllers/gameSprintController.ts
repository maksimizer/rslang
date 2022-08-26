import timer, { changeColorStylesByLevels } from '../model/gameSprintModel';
import drawSprintGame, { renderGame } from '../views/renderSprintGame';
import { closeGameWindow } from './fullscreen';

document.addEventListener('change', (event: Event): void => {
  if ((event.target as HTMLSelectElement).classList.contains('sprint-game-select')) {
    localStorage.setItem('level', (event.target as HTMLSelectElement).value);
  }
});

document.addEventListener('click', (event: Event): void => {
  if ((event.target as HTMLButtonElement).classList.contains('sprint-game-start-button')) {
    renderGame();
    changeColorStylesByLevels();
    timer();
  }

  const buttonGameOut = (event.target as HTMLElement).closest('.game-out');

  if (buttonGameOut) {
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
  }
});
