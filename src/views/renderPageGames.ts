function gamesView() {
  const viewGamesPage = `<section class="game-wrapper">
                          <div class="wrapper-games">
                            <div class="game-card sprint">
                              <img class="game-img sprint" src="./assets/img/sprint.jpeg" alt="Image sprint game">
                              <h2 class="sprint">Sprint</h2>
                              <div class="wrapper-img sprint">
                                <img class="icon-timer sprint" src="./assets/img/timer.svg"></img>
                              </div>
                            </div>
                            <div class="game-card audio" id="game-audio">
                              <img class="game-img audio" src="./assets/img/audio.jpeg" alt="Image audio game">
                              <h2 class="audio">Audio game</h2>
                              <div class="wrapper-img audio">
                                <img class="icon-audio audio" src="./assets/img/sound.svg"></img>
                              </div>
                            </div>
                          </div>
                        </section>`;

  return viewGamesPage;
}

export default function renderPageGames() {
  const mainContainer = document.querySelector('.main') as HTMLDivElement;
  mainContainer.innerHTML = gamesView();
}
