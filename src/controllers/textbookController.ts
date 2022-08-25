import { wordCardView, WordCardView } from '../views/wordCardView';
import { textbookView, TextbookView } from '../views/textbookView';
import { QueryString } from '../types/type';
import serverRequests from '../model/appModel';
import ServerRequests from '../model/requestServer';

class TextbookController {
  wordCardView: WordCardView;

  textbookView: TextbookView;

  serverRequests: ServerRequests;

  constructor() {
    this.wordCardView = wordCardView;
    this.textbookView = textbookView;
    this.serverRequests = serverRequests;
  }

  addEventListeners = () => {
    (document.querySelector('main') as HTMLElement).addEventListener('click', (event) => this.selectGroup(event));
  };

  renderTextbookPage = () => {
    this.textbookView.render();
  };

  getGroupAndPage = () => {
    const groupAndPageStr = localStorage.getItem('groupAndPage');
    if (groupAndPageStr) {
      return JSON.parse(groupAndPageStr);
    }
    return [{ key: 'group', value: 0 }, { key: 'page', value: 0 }];
  };

  setGroupAndPage = (groupAndPage: QueryString[]) => {
    localStorage.setItem('groupAndPage', JSON.stringify(groupAndPage));
  };

  renderWords = async () => {
    const queryParams = this.getGroupAndPage();

    const words = await this.serverRequests.getWords(queryParams);
    words.sort((a, b) => {
      if (a.word > b.word) {
        return 1;
      }
      if (a.word < b.word) {
        return -1;
      }
      return 0;
    });

    const groupBtns = document.querySelectorAll('.group-btn');
    groupBtns.forEach((btn) => {
      if (Number(btn.getAttribute('data-group')) - 1 === queryParams[0].value) {
        btn.classList.add('group-btn-active');
      }
    });

    const cardsContainer = document.querySelector('.cards-container');
    if (cardsContainer) cardsContainer.innerHTML = '';

    words.forEach((word) => {
      const card = this.wordCardView.render(word);
      if (cardsContainer) cardsContainer.appendChild(card);
    });
  };

  selectGroup = (event: Event) => {
    (document.querySelector('.group-btn-active') as HTMLElement).classList.remove('group-btn-active');
    const target = event.target as HTMLElement;
    if (target.classList.contains('group-btn')) {
      const groupAndPage = this.getGroupAndPage();
      groupAndPage[0].value = Number(target.getAttribute('data-group')) - 1;
      this.setGroupAndPage(groupAndPage);
    }
    this.renderWords();
  };
}

const textbookController = new TextbookController();
export default textbookController;
