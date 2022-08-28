import { auth } from '../model/appModel';
import getNamePage from '../model/pageModal';
import drawAudioGame from '../views/renderAudioGame';
import renderApp from '../views/renderMenu';
import hashPageRoute from './hashPageRoute';

export default function app() {
  renderApp(getNamePage(), auth.getImageAuth(), auth.getAuthNameUser());
  hashPageRoute();
}

export const hashPageRoute = () => {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash === 'game-audio') {
      drawAudioGame();
      // startAudioGame();
    }
  });
};
