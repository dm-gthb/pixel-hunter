import AbstractView from '../../abstract-view.js';
import resultsChartTemplate from '../../results-chart-template.js';
import {debug} from '../../settings.js';

export default class QuestionThreeImagesView extends AbstractView {
  constructor(question, answers, questionsQuantity) {
    super();
    this.question = question;
    this.answers = answers;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.answers, this.questionsQuantity);
    return `<section class="game">
  <p class="game__task">${this.question.question}</p>
  <form class="game__content  game__content--triple">
    ${this.question.answers.map((answer, i) =>
    `<div class="game__option"><img src="${answer.image.url}" alt="Option ${i + 1}" width="${answer.image.width}" height="${answer.image.height}" ${debug.enable && answer.type === `painting` ? debug.styleRight : ``}></div>`).join(``)}
    </form>
    ${resultsChart}
</section>`;
  }

  onAnswer() {}

  bind() {
    const options = Array.from(this.element.querySelectorAll(`.game__option img`));
    options.forEach((option, i) => {
      option.addEventListener(`click`, () => {
        let isAnswerRight = this.question.answers[i].type === `painting`;
        this.onAnswer(isAnswerRight);
      });
    });
  }
}
