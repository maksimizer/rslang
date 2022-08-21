const drawAudioGame = () => {
  const content = document.querySelector('.main') as HTMLElement;
  const namePage = document.querySelector('.name-page') as HTMLElement;
  namePage.textContent = 'Audio Game';
  content.innerHTML = `<section class="audio-game-wrapper">
  <div class="audio-game-header">
   <a href="#" class="audio-game-close"><span class="audio-game-close_span">X</span></a>
   <div class="audio-game-header-right">
   <select name="audio-game-select" class="audio-game-select">
    <option value="value1" selected>Level 1</option>
    <option value="value2">Level 2</option>
    <option value="value3">Level 3</option>
    <option value="value4">Level 4</option>
    <option value="value5">Level 5</option>
    <option value="value6">Level 6</option>
   </select>
   <button class="fullscreen open-fullscreen"></button>
   </div>
  </div>
  <div class="audio-game-content">
    <div class="audio-game-start-window">
     <h2>Game Audio Call</h2>
     <p>
     Choose from the suggested answers the correct translation of the word you hear
     </p>
     <button class="audio-game-start-button">Start</button>
    </div>
  </div>
  </section>`;
};

export default drawAudioGame;
