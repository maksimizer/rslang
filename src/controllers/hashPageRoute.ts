import drawAudioGame from '../views/renderAudioGame';
import startAudioGame from './startAudioGame';
import renderPageGames from '../views/renderPageGames';
import fullScreen from './fullscreen';

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
  });
};

export default hashPageRoute;
