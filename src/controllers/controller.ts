import changeHashPage from '../model/hashPage';
import { renderMainContent } from '../views/renderMenu';
import renderPageGames from '../views/renderPageGames';

document.addEventListener('click', (event: Event) => {
  if ((event.target as HTMLBodyElement).classList.contains('menu-home')) {
    changeHashPage('home');
    const mainContainer = document.querySelector('.main') as HTMLElement;
    mainContainer.innerHTML = renderMainContent();
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-book')) {
    changeHashPage('book');
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-games')) {
    changeHashPage('games');
    renderPageGames();
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-statistics')) {
    changeHashPage('statistics');
  }
});
