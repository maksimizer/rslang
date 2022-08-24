import { expand, compress } from '../utils/icons';
import renderPageGames from '../views/renderPageGames';

const fullScreen = (gameWrapper: HTMLElement): void => {
  const btnFullscreen = document.querySelector('.fullscreen') as HTMLElement;

  btnFullscreen.addEventListener('click', () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
      gameWrapper.classList.add('open-fullscreen');
      btnFullscreen.innerHTML = `${compress}`;
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
        btnFullscreen.innerHTML = `${expand}`;
        gameWrapper.classList.remove('open-fullscreen');
      }
    }
  }, true);
};

export default fullScreen;

export function closeGameWindow(btn: HTMLButtonElement): void {
  btn.addEventListener('click', () => {
    renderPageGames();
    document.exitFullscreen();
  });
}
