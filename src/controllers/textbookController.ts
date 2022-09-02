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

  wordAudio: HTMLAudioElement;

  wordExampleAudio: HTMLAudioElement;

  wordMeaningAudio: HTMLAudioElement;

  constructor() {
    this.wordCardView = wordCardView;
    this.textbookView = textbookView;
    this.serverRequests = serverRequests;
    this.wordAudio = new Audio();
    this.wordMeaningAudio = new Audio();
    this.wordExampleAudio = new Audio();
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

  checkForAuth = () => {
    if (localStorage.getItem('auth') === 'true') {
      document.querySelectorAll('.auth-needed').forEach((el) => el.classList.remove('hidden'));
    } else {
      document.querySelectorAll('.auth-needed').forEach((el) => el.classList.add('hidden'));
    }
  };

  addEventListeners = () => {
    (document.querySelector('.textbook-container') as HTMLElement).addEventListener('click', (event) => this.selectGroup(event));
    (document.querySelector('.textbook-container') as HTMLElement).addEventListener('click', (event) => this.selectPage(event));
    (document.querySelector('.textbook-container') as HTMLElement).addEventListener('click', (event) => this.playAudio(event));
    (document.querySelector('.textbook-container') as HTMLElement).addEventListener('click', (event) => this.addWordToDifficult(event));
  };

  getGroupAndPage = () => {
    const groupAndPageStr = localStorage.getItem('groupAndPage');
    if (groupAndPageStr) {
      return JSON.parse(groupAndPageStr);
    }
    return [{ key: 'group', value: 0 }, { key: 'page', value: 0 }];
  };

  getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user;
    }
    return undefined;
  };

  setGroupAndPage = (groupAndPage: QueryString[]) => {
    localStorage.setItem('groupAndPage', JSON.stringify(groupAndPage));
  };

  selectGroup = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('group-btn') && !target.classList.contains('difficult-group-btn')) {
      const groupAndPage = this.getGroupAndPage();
      (document.querySelector('.group-btn-active') as HTMLElement).classList.remove('group-btn-active');
      document.querySelectorAll('.pagination-container').forEach((el) => el.classList.remove('hidden'));
      groupAndPage[0].value = Number(target.getAttribute('data-group')) - 1;
      groupAndPage[1].value = 0;
      document.querySelectorAll('.current-page').forEach((el) => {
        el.textContent = `${groupAndPage[1].value + 1}/30`;
      });
      document.querySelectorAll('.pagination-btn-prev').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-first').forEach((el) => {
        el.classList.add('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-next').forEach((el) => {
        el.classList.remove('pagination-btn-disabled');
      });
      document.querySelectorAll('.pagination-btn-last').forEach((el) => {
        el.classList.remove('pagination-btn-disabled');
      });

      const groupBtns = document.querySelectorAll('.group-btn');
      groupBtns.forEach((btn) => {
        if (Number(btn.getAttribute('data-group')) - 1 === groupAndPage[0].value) {
          btn.classList.add('group-btn-active');
        }
      });

      this.setGroupAndPage(groupAndPage);
      this.renderWords();
    }

    if (target.classList.contains('difficult-group-btn')) {
      (document.querySelector('.group-btn-active') as HTMLElement).classList.remove('group-btn-active');
      target.classList.add('group-btn-active');
      document.querySelectorAll('.pagination-container').forEach((el) => el.classList.add('hidden'));
    }
  };

  selectPage = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('pagination-btn')) {
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
    }
  };

  renderWords = async () => {
    const queryParams = this.getGroupAndPage();
    console.log(queryParams);

    if (localStorage.getItem('auth') === 'true') {
      const user = this.getUser();
      const words = await this.serverRequests.getUsersAggregatedWords(
        user.userId,
        user.token,
        queryParams,
      );

      const cardsContainer = document.querySelector('.cards-container');
      if (cardsContainer) cardsContainer.innerHTML = '';

      words.forEach((word) => {
        const card = this.wordCardView.render(word);
        if (cardsContainer) cardsContainer.appendChild(card);
        if (word.userWord && word.userWord.difficulty === 'hard') {
          const difficultBtn = card.querySelector('.difficult-btn');
          if (difficultBtn) {
            difficultBtn.classList.add('difficult-btn-active');
          }
        }
      });
      this.checkForAuth();
    } else {
      const words = await this.serverRequests.getWords(queryParams);

      const cardsContainer = document.querySelector('.cards-container');
      if (cardsContainer) cardsContainer.innerHTML = '';

      words.forEach((word) => {
        const card = this.wordCardView.render(word);
        if (cardsContainer) cardsContainer.appendChild(card);
      });
      this.checkForAuth();
    }
  };

  playAudio = (event:Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('audio-btn')) {
      const cardAudios = target.children;
      this.wordAudio.src = (cardAudios[0] as HTMLAudioElement).src;
      this.wordMeaningAudio.src = (cardAudios[1] as HTMLAudioElement).src;
      this.wordExampleAudio.src = (cardAudios[2] as HTMLAudioElement).src;
      this.wordAudio.currentTime = 0;
      this.wordMeaningAudio.currentTime = 0;
      this.wordExampleAudio.currentTime = 0;
      this.wordAudio.play();
      this.wordAudio.onended = () => this.wordMeaningAudio.play();
      this.wordMeaningAudio.onended = () => this.wordExampleAudio.play();
    }
  };

  addWordToDifficult = async (event:Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('difficult-btn')) {
      const wordId = String(target.getAttribute('data-word-id'));
      await this.saveDifficultWord(wordId);
      this.renderWords();
    }
  };

  saveDifficultWord = async (wordId: string) => {
    const user = this.getUser();
    try {
      const userWord = await serverRequests.getUserWord(user.userId, wordId, user.token);
      if (userWord.difficulty === 'hard') {
        const body = {
          difficulty: 'normal',
          optional: {
            count: userWord.optional.count,
            wrong: userWord.optional.wrong,
            correct: userWord.optional.correct,
          },
        };
        await this.serverRequests.updateUserWord(user.userId, wordId, user.token, body);
      } else if (userWord.difficulty === 'normal') {
        const body = {
          difficulty: 'hard',
          optional: {
            count: userWord.optional.count,
            wrong: userWord.optional.wrong,
            correct: userWord.optional.correct,
          },
        };
        await this.serverRequests.updateUserWord(user.userId, wordId, user.token, body);
      }
    } catch (error) {
      await serverRequests.createUserWord(user.userId, user.token, wordId, {
        difficulty: 'hard',
        optional: {
          count: 0,
          wrong: 0,
          correct: 0,
        },
      });
    }
  };
}

const textbookController = new TextbookController();
export default textbookController;
