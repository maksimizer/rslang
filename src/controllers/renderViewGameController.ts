import drawAudioGame from '../views/renderAudioGame';

document.addEventListener('click', (event: Event) => {
  if ((event.target as HTMLDivElement).classList.contains('sprint')) {
    console.log('Here will be open start game sprint');
  }

  if ((event.target as HTMLDivElement).classList.contains('audio')) {
    drawAudioGame();
  }
});
