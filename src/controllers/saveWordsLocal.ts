import serverRequests from '../model/appModel';
import randomPage from '../utils/randomPage';

const saveWordLocal = async (): Promise<void> => {
  const getGroup = document.querySelector('.audio-game-select') as HTMLSelectElement;
  if (getGroup) {
    const page = randomPage();
    const words = await serverRequests.getWords([
      { key: 'page', value: `${page}` },
      { key: 'group', value: `${getGroup.value}` }]);
    localStorage.setItem('audio-game-words', JSON.stringify(words));
  } else {
    const bookPageGroup = await localStorage.getItem('groupAndPage');
    const getPage = await Number(document.querySelector('.current-page')?.textContent?.split('/')[0]);
    const auth = localStorage.getItem('auth');
    const userString = localStorage.getItem('user');
    if (bookPageGroup) {
      const groupAndPage = await JSON.parse(bookPageGroup);
      if (auth && userString) {
        const user = JSON.parse(userString);
        const words = await serverRequests.getUsersAggregatedWords(
          user.userId,
          user.token,
          groupAndPage,
        );
        localStorage.setItem('audio-game-words', JSON.stringify(words));
      } else {
        const words = await serverRequests.getWords([
          { key: 'page', value: `${getPage - 1}` },
          { key: 'group', value: `${groupAndPage[0].value}` }]);
        localStorage.setItem('audio-game-words', JSON.stringify(words));
      }
    }
  }
};

export default saveWordLocal;
