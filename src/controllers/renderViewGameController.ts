import changeHashPage from '../model/hashPage';
import drawAudioGame from '../views/renderAudioGame';
import drawSprintGame from '../views/renderSprintGame';
import fullScreen, { closeGameWindow } from './fullscreen';
import startAudioGame from './startAudioGame';

document.addEventListener('click', (event: Event): void => {
  if ((event.target as HTMLDivElement).classList.contains('sprint')) {
    drawSprintGame();
    changeHashPage('game-sprint');
    fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
  }

  if ((event.target as HTMLDivElement).classList.contains('audio')) {
    drawAudioGame();
    startAudioGame();
    changeHashPage('game-audio');
    fullScreen(document.querySelector('.audio-game-wrapper') as HTMLElement);
    closeGameWindow(document.querySelector('.audio-game-close_span') as HTMLButtonElement);
  }
});
