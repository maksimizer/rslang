import { wordCardView, WordCardView } from '../views/wordCardView';
import { textbookView, TextbookView } from '../views/textbookView';
import * as constants from '../constants/constants';
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

  renderTextbookPage = () => {
    this.textbookView.render();
    const groupAndPage = this.getGroupAndPage();

    const groupBtns = document.querySelectorAll('.group-btn');
    groupBtns.forEach((btn) => {
      if (Number(btn.getAttribute('data-group')) - 1 === groupAndPage[0].value) {
        btn.classList.add('group-btn-active');
      }
    });

    document.querySelectorAll('.current-page').forEach((el) => {
      el.textContent = `${groupAndPage[1].value + 1}/30`;
    });
    document.querySelectorAll('.pagination-btn').forEach((el) => {
      el.classList.remove('pagination-btn-disabled');
    });
    if (groupAndPage[1].value === constants.firstPage) {
      document.querySelectorAll('.pagination-btn-prev').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-first').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
    }
    if (groupAndPage[1].value === constants.lastPage) {
      document.querySelectorAll('.pagination-btn-next').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-last').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
    }
  };

  addEventListeners = () => {
    (document.querySelector('main') as HTMLElement).addEventListener('click', (event) => this.selectGroup(event));
    (document.querySelector('main') as HTMLElement).addEventListener('click', (event) => this.selectPage(event));
    (document.querySelector('main') as HTMLElement).addEventListener('click', (event) => this.playAudio(event));
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

  selectGroup = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('group-btn')) {
      const groupAndPage = this.getGroupAndPage();
      (document.querySelector('.group-btn-active') as HTMLElement).classList.remove('group-btn-active');
      groupAndPage[0].value = Number(target.getAttribute('data-group')) - 1;
      groupAndPage[1].value = 0;

      const groupBtns = document.querySelectorAll('.group-btn');
      groupBtns.forEach((btn) => {
        if (Number(btn.getAttribute('data-group')) - 1 === groupAndPage[0].value) {
          btn.classList.add('group-btn-active');
        }
      });

      this.setGroupAndPage(groupAndPage);
      this.renderWords();
    }
  };

  selectPage = (event: Event) => {
    const target = event.target as HTMLElement;
    const groupAndPage = this.getGroupAndPage();
    if (target.classList.contains('pagination-btn-first') && !target.classList.contains('pagination-btn-disabled')) {
      groupAndPage[1].value = constants.firstPage;
    }
    if (target.classList.contains('pagination-btn-prev') && !target.classList.contains('pagination-btn-disabled')) {
      groupAndPage[1].value -= 1;
    }
    if (target.classList.contains('pagination-btn-next') && !target.classList.contains('pagination-btn-disabled')) {
      groupAndPage[1].value += 1;
    }
    if (target.classList.contains('pagination-btn-last') && !target.classList.contains('pagination-btn-disabled')) {
      groupAndPage[1].value = constants.lastPage;
    }

    document.querySelectorAll('.current-page').forEach((el) => {
      el.textContent = `${groupAndPage[1].value + 1}/30`;
    });
    document.querySelectorAll('.pagination-btn').forEach((el) => {
      el.classList.remove('pagination-btn-disabled');
    });
    if (groupAndPage[1].value === 0) {
      document.querySelectorAll('.pagination-btn-prev').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-first').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
    }
    if (groupAndPage[1].value === 29) {
      document.querySelectorAll('.pagination-btn-next').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-last').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
    }

    this.setGroupAndPage(groupAndPage);
    this.renderWords();
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

    const cardsContainer = document.querySelector('.cards-container');
    if (cardsContainer) cardsContainer.innerHTML = '';

    words.forEach((word) => {
      const card = this.wordCardView.render(word);
      if (cardsContainer) cardsContainer.appendChild(card);
    });
  };

  playAudio = (event:Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('audio-btn')) {
      const cardAudios = target.children;
      const wordAudio = new Audio();
      const wordMeaningAudio = new Audio();
      const wordExampleAudio = new Audio();
      wordAudio.src = (cardAudios[0] as HTMLAudioElement).src;
      wordMeaningAudio.src = (cardAudios[1] as HTMLAudioElement).src;
      wordExampleAudio.src = (cardAudios[2] as HTMLAudioElement).src;
      wordAudio.play();
      wordAudio.onended = () => wordMeaningAudio.play();
      wordMeaningAudio.onended = () => wordExampleAudio.play();
    }
  };
}

const textbookController = new TextbookController();
export default textbookController;
