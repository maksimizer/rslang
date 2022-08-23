import { wordCardView, WordCardView } from "./wordCardView";

class TextbookView {
  render() {
    const main = document.querySelector('.main');
    if (main) main.innerHTML = '';

    const textBook = document.createElement('div');
    textBook.classList.add('textbook-container');
    textBook.innerHTML = `
      
    `;

  }
}

const textBookView = new TextbookView;
