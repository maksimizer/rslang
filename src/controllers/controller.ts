import changeHashPage from '../model/hashPage';

document.addEventListener('click', (event: Event) => {
  if ((event.target as HTMLBodyElement).classList.contains('menu-home')) {
    changeHashPage('home');
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-book')) {
    changeHashPage('book');
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-games')) {
    changeHashPage('games');
  }
  if ((event.target as HTMLBodyElement).classList.contains('menu-statistics')) {
    changeHashPage('statistics');
  }
});
