export default function getNamePage(): string {
  const { hash } = document.location;
  const namePageApp = hash.trim().split('#').splice(1).join('');

  return namePageApp.slice(0, 1).toUpperCase() + namePageApp.slice(1, namePageApp.length);
}
