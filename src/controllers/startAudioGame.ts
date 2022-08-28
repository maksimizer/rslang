import serverRequests from '../model/appModel';
import htmlGamePageAudioCall from '../views/template/gamePageAudioGame';
import playSound from './playSound';
import saveWordLocal from './saveWordsLocal';
import logicAudioGame from './logicAudioGame';
import changeHashPage from '../model/hashPage';

export const eventStartGame = (event: KeyboardEvent) => {
  const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
  const keyCode = event.key;
  switch (keyCode) {
    case 'Enter':
      window.removeEventListener('keydown', eventStartGame);
      saveWordLocal();
      gameWrapper.innerHTML = htmlGamePageAudioCall;
      logicAudioGame();
      changeHashPage('game-audio/start');
      break;
    default:
      break;
  }
};

const startAudioGame = (): void => {
  const serverPath = serverRequests.baseUrl;
  const startButton = document.querySelector('.audio-game-start-button') as HTMLElement;
  const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
  if (startButton) {
    startButton.addEventListener('click', () => {
      saveWordLocal();
      gameWrapper.innerHTML = htmlGamePageAudioCall;
      logicAudioGame();
      changeHashPage('game-audio/start');
    });
  }
  window.addEventListener('keydown', eventStartGame);
  playSound(gameWrapper, serverPath);
};

export default startAudioGame;
