import { expand, compress } from '../utils/icons';

const fullScreen = (): void => {
  const btnFullscreen = document.querySelector('.fullscreen') as HTMLElement;
  const audioGameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
  btnFullscreen.addEventListener('click', () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
      audioGameWrapper.classList.add('open-fullscreen');
      btnFullscreen.innerHTML = `${compress}`;
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
        btnFullscreen.innerHTML = `${expand}`;
        audioGameWrapper.classList.remove('open-fullscreen');
      }
    }
  }, true);
};

export default fullScreen;
