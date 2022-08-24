// import { wordCardView, WordCardView } from "./wordCardView";

export class TextbookView {
  render() {
    const main = document.querySelector('.main');
    if (main) main.innerHTML = '';

    const textBook = document.createElement('div');
    textBook.classList.add('textbook-container');
    textBook.innerHTML = `
      <div class="textbook-games">
        <div>
            <img src="../assets/img/sprint.jpeg" alt="sprint-game-icon">
            Sprint
        </div>
        <div>
            <img src="../assets/img/sound.svg" alt="audio-game-icon">
            Audio game
        </div>
      </div>
    `;

    if (main) main.appendChild(textBook);
  }
}

export const textBookView = new TextbookView();
