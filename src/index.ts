import './styles/index.scss';
import renderApp from './views/renderMenu';
import './controllers/controller';
import getListenerBurgerButton from './controllers/burgerController';
import './controllers/authController';

renderApp();
getListenerBurgerButton();
