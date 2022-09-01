import { IStatistic } from '../types/interface';
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
interface IGameStat {
  newWord: number,
  wrong: number,
  correct: number,
  winLength: number
}

function getPercent(sumWrongAnswers: number, sumCorrectAnswers: number) {
  if (sumWrongAnswers === 0 && sumCorrectAnswers === 0) {
    return 0;
  }
  if (sumWrongAnswers === 0 && sumCorrectAnswers > 0) {
    return 100;
  }

  return 1;
}

export function getStatisticsForRender(): [number, number, IGameStat, IGameStat] {
  const date = new Date();
  const day = date.getDate();
  const statistics: IStatistic = JSON.parse(localStorage.getItem('statistic') as string);

  const sumWrongAnswers = (statistics.optional?.[day].sprintGame.wrong as number)
  + (statistics.optional?.[day].audioGame.wrong as number);

  const sumCorrectAnswers = (statistics.optional?.[day].sprintGame.correct as number)
  + (statistics.optional?.[day].audioGame.correct as number);

  const commonPercent = getPercent(sumWrongAnswers, sumCorrectAnswers) === 0
  || getPercent(sumWrongAnswers, sumCorrectAnswers) === 100
    ? getPercent(sumWrongAnswers, sumCorrectAnswers)
    : Math.round(100 - ((sumWrongAnswers / sumCorrectAnswers) * 100));

  const dataStatistics: [number, number, IGameStat, IGameStat] = [
    statistics.learnedWords, commonPercent,
    statistics.optional?.[day].sprintGame as IGameStat,
    statistics.optional?.[day].audioGame as IGameStat,
  ];
  // dataStatistics.push(
  //   statistics.learnedWords as number,
  //   commonPercent as number,
  //   statistics.optional?.[day].sprintGame as IGameStat,
  //   statistics.optional?.[day].audioGame as IGameStat,
  // );
  console.log(getPercent(sumWrongAnswers, sumCorrectAnswers) !== 0);
  console.log(getPercent(sumWrongAnswers, sumCorrectAnswers) !== 100);
  return dataStatistics;
}

// interface IGameStat {
//   newWord: number,
//   wrong: number,
//   correct: number,
//   winLength: number
// }

export function userPageStatisticsView(
  arr: [number, number, IGameStat, IGameStat],
): string {
  const dayStatisticsView = `<h1 class="header-statistics">Statistics for today</h1>
                            <div class="total-statistics-wrapper">
                              <div class="total-results-wrapper">
                                <div class="total-words">
                                  <h2>${arr[0]}</h2>
                                  <p>learned words</p>
                                </div>
                                <div class="total-percent">
                                  <h2>${arr[1]}%</h2>
                                  <p>correct answers</p>
                                </div>
                              </div>
                              <div class="statistic-game-wrapper">
                                <div class="statistic-game sprint">
                                  <h3>Sprint</h3>
                                  <div>${check} learned ${arr[2].newWord} word</div>
                                  <div>${check} correct answers: ${arr[2].correct}</div>
                                  <div> ${check} longest series of correct</div>
                                  <div class="series"> answers: ${arr[2].winLength}</div>
                                </div>
                                <div class="statistic-game audio">
                                  <h3>Audio game</h3>
                                  <div> ${check} learned ${arr[3].newWord} word</div>
                                  <div> ${check} correct answers: ${arr[3].correct}</div>
                                  <div> ${check} longest series of correct</div>
                                  <div class="series"> answers: ${arr[3].winLength}</div>
                                </div>
                            </div>`;

  return dayStatisticsView;
}

export function renderUserPageStatistics(contentPage: string): void {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = contentPage;
}
