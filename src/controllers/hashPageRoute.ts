import drawAudioGame from '../views/renderAudioGame';
import startAudioGame from './startAudioGame';

const hashPageRoute = () => {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash === 'game-audio') {
      drawAudioGame();
      startAudioGame();
    }
  });
};

export default hashPageRoute;
