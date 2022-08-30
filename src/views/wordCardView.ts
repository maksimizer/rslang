import { IWord } from '../types/interface';
import serverRequests from '../model/appModel';
import ServerRequests from '../model/requestServer';

export class WordCardView {
  serverRequests: ServerRequests;

  constructor() {
    this.serverRequests = serverRequests;
  }

  render = (word:IWord) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-word-id', `${word.id}`);
    card.innerHTML = `
      <img class="card-word-image" src="${this.serverRequests.baseUrl}/${word.image}" alt="${word.word.toLowerCase()}">
      <div class="card-content">
          <div class="card-word-wrapper">
              <div class="card-word">
                  <div class="word-wrapper">
                    <div class="card-word-heading">
                        <span class="word">${word.word}</span>
                        <span class="word-transcription">${word.transcription}</span>
                    </div>
                    <div class="card-word-translate-wrapper">
                        <span class="word-translate">${word.wordTranslate}</span>
                    </div>
                  </div>
                  <div class="audio-btn">
                    <audio class="word-audio" src="${this.serverRequests.baseUrl}/${word.audio}">
                    </audio>
                    <audio class="word-meaning-audio" src="${this.serverRequests.baseUrl}/${word.audioMeaning}">
                    </audio>
                    <audio class="word-example-audio" src="${this.serverRequests.baseUrl}/${word.audioExample}">
                    </audio>
                  </div>
              </div>
          </div>
          <div class="card-meaning-wrapper">
              <div class="word-meaning-text">
                  <div class="word-meaning">${word.textMeaning}</div>
                  <div class="word-meaning-translate">${word.textMeaningTranslate}</div>
              </div>
          </div>
          <div class="card-example-wrapper">
              <div class="word-example-text">
                  <div class="word-example">${word.textExample}</div>
                  <div class="word-example-translate">${word.textExampleTranslate}</div>
              </div>
          </div>
          <div class="auth-users-btns auth-needed">
            <button class="difficult-btn">difficult</button>
            <button class="learned-btn">learned</button>
          </div>
      </div>
    `;

    const currentGroupBtn = document.querySelector(`.group-btn-${word.group + 1}`) as HTMLElement;
    const color = window.getComputedStyle(currentGroupBtn).backgroundColor;

    card.style.borderRight = '5px solid';
    card.style.borderBottom = '5px solid';
    card.style.borderColor = color;

    return card;
  };
}

export const wordCardView = new WordCardView();
