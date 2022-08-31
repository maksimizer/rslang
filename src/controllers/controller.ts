import changeHashPage from '../model/hashPage';
import renderPageStatistics from '../views/renderStatistics';
import hashPageRoute from './hashPageRoute';

document.addEventListener('click', async (event: Event): Promise<void> => {
  if ((event.target as HTMLBodyElement).classList.contains('menu-home')) {
    changeHashPage('main');
    hashPageRoute();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-book')) {
    changeHashPage('book');
    hashPageRoute();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-games')) {
    changeHashPage('games');
    hashPageRoute();
  }

  if ((event.target as HTMLBodyElement).classList.contains('menu-statistics')) {
    changeHashPage('statistics');
    renderPageStatistics();
    hashPageRoute();
  }
});
