import drawAudioGame from '../views/renderAudioGame';
import startAudioGame from './startAudioGame';
import renderPageGames from '../views/renderPageGames';
import fullScreen, { closeGameWindow } from './fullscreen';
import drawSprintGame from '../views/renderSprintGame';
import { renderMainContent } from '../views/renderMenu';
import getNamePage from '../model/pageModal';
import textbookController from './textbookController';
import {
  renderPageStatistics, getStatisticsForRender, renderUserPageStatistics, userPageStatisticsView,
} from '../views/renderStatistics';

const hashPageRoute = () => {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    const namePage = document.querySelector('.name-page') as HTMLDivElement;

    if (hash === 'game-audio') {
      drawAudioGame();
      startAudioGame();
      fullScreen(document.querySelector('.audio-game-wrapper') as HTMLElement);
    }

    if (hash === 'games') {
      namePage.innerHTML = getNamePage();
      renderPageGames();
    }

    if (hash === 'game-sprint') {
      drawSprintGame();
      const groupAndPage = [{ key: 'group', value: '0' }, { key: 'page', value: 'null' }];
      localStorage.setItem('groupAndPage', JSON.stringify(groupAndPage));
      fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
      closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
    }

    if (hash === 'main') {
      namePage.innerHTML = getNamePage();
      const mainContainer = document.querySelector('.main') as HTMLElement;
      mainContainer.innerHTML = renderMainContent();
    }

    if (hash === 'book') {
      namePage.innerHTML = getNamePage();
      textbookController.renderTextbookPage();
      textbookController.renderWords();
      textbookController.addEventListeners();
    }

    if (hash === 'statistics') {
      namePage.innerHTML = getNamePage();

      if (localStorage.getItem('auth') === 'true') {
        const data = getStatisticsForRender();
        renderUserPageStatistics(userPageStatisticsView(data));
      } else {
        renderPageStatistics();
      }
    }
  });
};

export default hashPageRoute;
