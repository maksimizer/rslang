import serverRequests from '../model/appModel';

const logicAudioGame = () => {
  const wordsString = localStorage.getItem('audio-game-words');
  const audio = document.querySelector('.audio-game-sound__image') as HTMLElement;
  const audioLineTop = document.querySelector('.audio-game-card-line-top-image') as HTMLElement;
  const audioLineMid = document.querySelector('.audio-game-card-line-mid-image') as HTMLElement;
  const gameCard = document.querySelector('.audio-game-card') as HTMLElement;
  const btnNext = document.querySelector('.audio-game-button-next') as HTMLElement;
  const btnKnow = document.querySelector('.audio-game-button-know') as HTMLElement;
  const image = document.querySelector('.audio-game-card__image') as HTMLElement;
  const audioLineTopText = document.querySelector('.audio-game-card-line-top-text') as HTMLElement;
  const audioLineMidText = document.querySelector('.audio-game-card-line-mid-text') as HTMLElement;
  const audioTranslate = document.querySelector('.audio-game-card-translate') as HTMLElement;
  if (wordsString) {
    let count = 0;
    const words = JSON.parse(wordsString);
    const startWord = words[count];
    new Audio(`${serverRequests.baseUrl}/${startWord.audio}`).play();
    audio.dataset.sound = `${startWord.audio}`;
    audioLineTop.dataset.sound = `${startWord.audio}`;
    audioLineMid.dataset.sound = `${startWord.audioMeaning}`;
    audioLineTopText.innerText = `${startWord.word} ${startWord.transcription}`;
    audioLineMidText.innerHTML = `${startWord.textMeaning}`;
    audioTranslate.innerText = `${startWord.textMeaningTranslate}`;
    image.setAttribute(
      'style',
      `background-image: url(${serverRequests.baseUrl}/${startWord.image});background-repeat: no-repeat;background-size: cover`,
    );
    btnNext?.addEventListener('click', () => {
      count += 1;
      const word = words[count];
      new Audio(`${serverRequests.baseUrl}/${word.audio}`).play();
      audio.dataset.sound = `${word.audio}`;
      audioLineTop.dataset.sound = `${word.audio}`;
      audioLineMid.dataset.sound = `${word.audioMeaning}`;
      audioLineTopText.innerText = `${word.word} ${word.transcription}`;
      audioLineMidText.innerHTML = `${word.textMeaning}`;
      audioTranslate.innerText = `${word.textMeaningTranslate}`;
      image.setAttribute(
        'style',
        `background-image: url(${serverRequests.baseUrl}/${word.image});background-repeat: no-repeat;background-size: cover`,
      );
      btnKnow.classList.toggle('hidden');
      gameCard.classList.toggle('hidden');
      audio.classList.toggle('hidden');
    }, true);

    btnKnow.addEventListener('click', () => {
      document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: yellow');
      btnKnow.classList.toggle('hidden');
      gameCard.classList.toggle('hidden');
      audio.classList.toggle('hidden');
    }, true);
  }
};

export default logicAudioGame;
