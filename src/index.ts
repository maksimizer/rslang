import './styles/index.scss';
import renderApp from './views/renderMenu';
import './controllers/controller';
import getListenerBurgerButton from './controllers/burgerController';
import './controllers/authController';
import drawAudioGame from './views/renderAudioGame';

renderApp();
getListenerBurgerButton();
drawAudioGame();
