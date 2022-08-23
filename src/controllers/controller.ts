import changeHashPage from '../model/hashPage';
import getNamePage from '../model/pageModal';
import { renderMainContent } from '../views/renderMenu';
import renderPageGames from '../views/renderPageGames';

document.addEventListener('click', (event: Event): void => {
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
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-games')) {
    changeHashPage('games');
    namePage.innerHTML = getNamePage();
    renderPageGames();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-statistics')) {
    changeHashPage('statistics');
    namePage.innerHTML = getNamePage();
  }
});
