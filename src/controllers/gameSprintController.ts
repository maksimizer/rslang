import serverRequests, { auth } from '../model/appModel';
import {
  timer, arrForSelectedWords, changeColorStylesByLevels, findPage,
  gameParameters, gameSprintKeyboard, gameSprintMouse, getGroupAndPAge,
  getRandomWrongWordTranslate, resetCount, rightAnswers, wrongAnswers,
} from '../model/gameSprintModel';
import { volumeOff, volumeOn } from '../utils/icons';
import drawSprintGame, { renderGame } from '../views/renderSprintGame';
import { closeGameWindow } from './fullscreen';

document.addEventListener('change', (event: Event): void => {
  if ((event.target as HTMLSelectElement).classList.contains('sprint-game-select')) {
    const groupAndPage = [{ group: (+(event.target as HTMLSelectElement).value - 1) }, { page: 'null' }];
    localStorage.setItem('groupAndPage', JSON.stringify(groupAndPage));
  }
});

document.addEventListener('click', async (event: MouseEvent): Promise<void> => {
  if ((event.target as HTMLButtonElement).classList.contains('sprint-game-start-button')) {
    renderGame();
    changeColorStylesByLevels();
    const { group, page } = getGroupAndPAge();
    const pages = findPage(page);
    const prevWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }]);
    const nextWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }]);
    const words = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${page}` }]);
    const wrongArr = [...words, ...nextWords, ...prevWords];
    const wordsForGame: string[][] = [];

    words.forEach((el) => {
      wordsForGame.push(
        [el.word, el.wordTranslate, getRandomWrongWordTranslate(wrongArr, el.wordTranslate)],
      );
    });

    nextWords.forEach((el) => {
      wordsForGame.push(
        [el.word, el.wordTranslate, getRandomWrongWordTranslate(wrongArr, el.wordTranslate)],
      );
    });

    localStorage.setItem('wordsForGame', JSON.stringify(wordsForGame));
    const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
    const translateWord = document.querySelector('.word-translate') as HTMLDivElement;
    wordContainer.innerHTML = words[gameParameters.count].word;
    translateWord.innerHTML = words[gameParameters.count].wordTranslate;
    localStorage.setItem('answer', JSON.stringify({ right: `${words[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
    timer();
  }

  const buttonGameOut = (event.target as HTMLElement).closest('.game-out');

  if (buttonGameOut) {
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
    localStorage.setItem('groupAndPage', JSON.stringify([{ group: '0' }, { page: 'null' }]));
    gameParameters.count = 0;
    gameParameters.sum = 0;
    gameParameters.trueAnswers = 0;
    rightAnswers.length = 0;
    wrongAnswers.length = 0;
    arrForSelectedWords.length = 0;
    resetCount();
  }

  if ((event.target as HTMLButtonElement).classList.contains('music-img')
  || (event.target as HTMLButtonElement).closest('.music-img')) {
    const musicBtn = document.querySelector('.music-img') as HTMLButtonElement;

    if ((event.target as HTMLButtonElement).closest('.music-on')) {
      musicBtn.innerHTML = `${volumeOff}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-on', 'music-off');
      gameParameters.volume = 0;
    }

    if ((event.target as HTMLButtonElement).closest('.music-off')) {
      musicBtn.innerHTML = `${volumeOn}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-off', 'music-on');
      gameParameters.volume = 1;
    }
  }
});

document.addEventListener('click', gameSprintMouse);
document.addEventListener('keydown', gameSprintKeyboard);
