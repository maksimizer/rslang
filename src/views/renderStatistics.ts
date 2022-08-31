import { check } from '../utils/icons';

function pageStatisticsView() {
  const statistics = `<h1 class="header-statistics">Statistics for today</h1>
                      <div class="total-statistics-wrapper">
                        <div class="total-results-wrapper">
                          <div class="total-words">
                            <h2>0</h2>
                            <p>learned words</p>
                          </div>
                          <div class="total-percent">
                            <h2>0%</h2>
                            <p>correct answers</p>
                          </div>
                        </div>
                        <div class="statistic-game-wrapper">
                          <div class="statistic-game sprint">
                            <h3>Sprint</h3>
                            <div>${check} learned 0 word</div>
                            <div>${check} correct answers: 0</div>
                            <div> ${check} longest series of correct</div>
                            <div class="series"> answers: 0</div>
                          </div>
                          <div class="statistic-game audio">
                            <h3>Audio game</h3>
                            <div> ${check} learned 0 word</div>
                            <div> ${check} correct answers: 0</div>
                            <div> ${check} longest series of correct</div>
                            <div class="series"> answers: 0</div>
                          </div>
                      </div>`;

  return statistics;
}

export default function renderPageStatistics(): void {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = pageStatisticsView();
}
