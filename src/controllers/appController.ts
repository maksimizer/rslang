import { auth } from '../model/appModel';
import getNamePage from '../model/pageModal';
import renderApp from '../views/renderMenu';

export default function app() {
  renderApp(getNamePage(), auth.getImageAuth(), auth.getAuthNameUser());
}
