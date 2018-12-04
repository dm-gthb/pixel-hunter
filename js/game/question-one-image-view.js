import AbstractView from './abstract-view.js';

export default class QuestionOneImageView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="game">
      <p class="game__task">${this.question.questionText}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.question.answer.image}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </section>`;
  }

  handleAnswer() {}

  bind() {
    const formElement = this.element.querySelector(`.game__content`);
    const options = Array.from(formElement.querySelectorAll(`input`));
    options.forEach((option) => {
      option.addEventListener(`change`, () => {
        const selectedOption = option.value;
        const rightAnswer = this.question.answer.value;
        const isAnswerRight = selectedOption === rightAnswer;
        this.handleAnswer(isAnswerRight);
      });
    });
  }
}
