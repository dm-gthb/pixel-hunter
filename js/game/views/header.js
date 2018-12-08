import AbstractView from './abstract.js';

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  <div class="game__timer">${this.state.time}</div>
  <div class="game__lives">
    ${new Array(3 - this.state.lifes)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
    ${new Array(this.state.lifes)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
  </div>
</header>`;
  }

  updateTimeDisplay(seconds) {
    const timeDisplay = this.element.querySelector(`.game__timer`);
    timeDisplay.textContent = seconds;
  }

  onBackButtonClick() {}

  bind() {
    const backButtonElement = this.element.querySelector(`.back`);
    backButtonElement.addEventListener('click', () => this.onBackButtonClick());
  }
}
