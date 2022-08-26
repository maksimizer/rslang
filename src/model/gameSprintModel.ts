export default function timer(): void {
  const countDownElement = document.querySelector('.timer-game') as HTMLDivElement;
  let seconds = 60;
  const second = 0;

  const interval = setInterval(() => {
    if (second >= seconds) {
      clearInterval(interval);
    }
    countDownElement.innerHTML = seconds.toString();

    seconds -= 1;
  }, 1000);
}

function addColorStyle(color: string): void {
  const score = document.querySelector('.score-game') as HTMLElement;
  const timerBox = document.querySelector('.timer-game') as HTMLElement;
  score.style.color = color;
  timerBox.style.color = color;
  timerBox.style.border = ` 2px solid ${color}`;
}

export function changeColorStylesByLevels(): void {
  const level = localStorage.getItem('level');

  switch (level) {
    case '1':
      addColorStyle('rgb(43, 255, 107)');
      break;

    case '2':
      addColorStyle(' rgb(128, 255, 43)');
      break;

    case '3':
      addColorStyle('rgb(223, 255, 43)');
      break;

    case '4':
      addColorStyle('rgb(255, 234, 43)');
      break;

    case '5':
      addColorStyle('rgb(255, 163, 43)');
      break;

    case '6':
      addColorStyle('rgb(255, 128, 43)');
      break;

    default:
  }
}
