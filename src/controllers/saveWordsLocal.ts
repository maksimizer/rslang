import serverRequests from '../model/appModel';
import randomPage from '../utils/randomPage';

const saveWordLocal = async (): Promise<void> => {
  const getGroup = document.querySelector('.audio-game-select') as HTMLSelectElement;
  const page = randomPage();
  const words = await serverRequests.getWords([
    { key: 'page', value: `${page}` },
    { key: 'group', value: `${getGroup.value}` }]);
  localStorage.setItem('audio-game-words', JSON.stringify(words));
};

export default saveWordLocal;
