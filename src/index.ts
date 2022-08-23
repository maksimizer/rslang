import './styles/index.scss';
import renderApp from './views/renderMenu';
import './controllers/controller';
import getListenerBurgerButton from './controllers/burgerController';
import './controllers/authController';
import './controllers/renderViewGameController';
// import drawAudioGame from './views/renderAudioGame';

renderApp();
getListenerBurgerButton();
// drawAudioGame();
