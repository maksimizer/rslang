import './styles/index.scss';
// import renderApp from './views/renderMenu';
import './controllers/controller';
import getListenerBurgerButton from './controllers/burgerController';
import './controllers/authController';
import './controllers/renderViewGameController';
import './controllers/authUserController';
import app from './controllers/appController';

app();
import drawAudioGame from './views/renderAudioGame';

getListenerBurgerButton();
// drawAudioGame();
