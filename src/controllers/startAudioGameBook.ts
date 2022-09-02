import changeHashPage from '../model/hashPage';
import drawAudioGame from '../views/renderAudioGame';
import htmlGamePageAudioCall from '../views/template/gamePageAudioGame';
import logicAudioGame from './logicAudioGame';
import saveWordLocal from './saveWordsLocal';

const startAudioGameBook = () => {
  const startButton = document.querySelector('#textbook-game-audio') as HTMLElement;
  startButton.addEventListener('click', async () => {
    await saveWordLocal();
    console.log('start audio game book');
    changeHashPage('game-audio/start');
    drawAudioGame();
    const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
    gameWrapper.innerHTML = htmlGamePageAudioCall;
    logicAudioGame();
  }, true);
};

export default startAudioGameBook;
