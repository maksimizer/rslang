import drawAudioGame from '../views/renderAudioGame';
import startAudioGame from './startAudioGame';
import renderPageGames from '../views/renderPageGames';
import fullScreen, { closeGameWindow } from './fullscreen';
import drawSprintGame from '../views/renderSprintGame';

const hashPageRoute = () => {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash === 'game-audio') {
      drawAudioGame();
      startAudioGame();
      fullScreen(document.querySelector('.audio-game-wrapper') as HTMLElement);
    } else if (hash === 'games') {
      renderPageGames();
    }
    if (hash === 'game-sprint') {
      drawSprintGame();
      const groupAndPage = [{ key: 'group', value: '0' }, { key: 'page', value: 'null' }];
      localStorage.setItem('groupAndPage', JSON.stringify(groupAndPage));
      fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
      closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
    }
  });
};

export default hashPageRoute;
