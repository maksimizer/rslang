import {
  circleLeft, expand, trophy, volumeOn,
} from '../utils/icons';
import htmlSprintGameMainPage from './template/mainSprintGame';

const drawSprintGame = (): void => {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = htmlSprintGameMainPage;
};

export default drawSprintGame;

export function renderGame() {
  const gameHeader = document.querySelector('.sprint-game-header') as HTMLDivElement;
  const gameContent = document.querySelector('.sprint-game-content') as HTMLDivElement;

  const header = `<button class="game-out">${circleLeft}</button>
                  <button class="music-img music-on">${volumeOn}</button>
                  <button class="fullscreen-game">${expand}</button>`;

  const content = `<h2 class="score-game">Score: <span class="score">0</span></h2>
                  <div class="wrapper-game">
                    <div class="game-content">
                      <div class="progress-game">
                        <div class="wrapper-dotted">
                          <div class="dotted"></div>
                          <div class="dotted"></div>
                          <div class="dotted"></div>
                        </div>
                        <p class="progress-game-text">+10 points for right answer</p>
                      </div>
                      <div class="wrapper-img-win">
                        <div class="win">${trophy}</div>
                        <div class="win">${trophy}</div>
                        <div class="win">${trophy}</div>
                        <div class="win">${trophy}</div>
                      </div>
                      <div class ="game-word-wrapper">
                        <div class="word-game">Word</div>
                        <div class="word-transcription">Answer</div>
                      </div>
                      <div "class="wrapper-answer-btn">
                        <button class="answer wrong-answer">Wrong</button>
                        <button class="answer right-answer">Right</button>
                      </div>
                    </div>
                    <div class="timer-game"></div>
                  </div>`;

  gameHeader.innerHTML = `${header}`;
  gameContent.innerHTML = `${content}`;
}
