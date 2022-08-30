import changeHashPage from '../model/hashPage';
import getNamePage from '../model/pageModal';
import { renderMainContent } from '../views/renderMenu';
import renderPageGames from '../views/renderPageGames';
import textbookController from './textbookController';

document.addEventListener('click', async (event: Event): Promise<void> => {
  const namePage = document.querySelector('.name-page') as HTMLDivElement;

  if ((event.target as HTMLBodyElement).classList.contains('menu-home')) {
    changeHashPage('main');
    namePage.innerHTML = getNamePage();
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = renderMainContent();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-book')) {
    changeHashPage('book');
    namePage.innerHTML = getNamePage();
    textbookController.renderTextbookPage();
    textbookController.renderWords();
    textbookController.addEventListeners();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-games')) {
    changeHashPage('games');
    namePage.innerHTML = getNamePage();
    renderPageGames();
    // const userData = JSON.parse(localStorage.getItem('user') as string);
    // const status = await serverRequests.getUserResponse(userData.userId, userData.token);
    // console.log(userData, status);
    // if (status !== 200) {
    //   const newUser = await serverRequests.getUserTokens(userData.id, userData.refreshToken);
    //   localStorage.setItem('user', JSON.stringify(newUser));
    // }
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-statistics')) {
    changeHashPage('statistics');
    namePage.innerHTML = getNamePage();
  }
});
