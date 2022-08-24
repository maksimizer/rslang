// import { wordCardView, WordCardView } from "./wordCardView";

export class TextbookView {
  render() {
    const main = document.querySelector('.main');
    if (main) main.innerHTML = '';

    const textBook = document.createElement('div');
    textBook.classList.add('textbook-container');
    textBook.innerHTML = `
      <div class="textbook-games">
        <div class="textbook-game-container">
            <img src="../assets/img/sprint.jpeg" alt="sprint-game-icon">
            <p>Sprint</p>
        </div>
        <div class="textbook-game-container">
            <img src="../assets/img/audio.jpeg" alt="audio-game-icon">
            <p>Audio game</p>
        </div>
      </div>
      <div class="pagination-container">
            <div class="pagination-btn pagination-btn-disabled"><</div>
            <div class="pagination-btn pagination-btn-active">1</div>
            <div class="pagination-btn">2</div>
            <div class="pagination-btn">3</div>
            <div class="pagination-btn">4</div>
            <div class="pagination-btn">5</div>
            <div class="pagination-btn">6</div>
            <div class="pagination-btn">...</div>
            <div class="pagination-btn">30</div>
            <div class="pagination-btn">></div>
      </div>
    `;

    if (main) main.appendChild(textBook);
  }
}

export const textBookView = new TextbookView();
