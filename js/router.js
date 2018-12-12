import IntroScreen from './welcome/intro-screen.js';
import GreetingScreen from './welcome/greeting-screen.js';
import RulesScreen from './welcome/rules-screen.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './stats/stats-screen.js';
import ErrorScreen from './error/error-screen.js';
import Loader from './loader.js';

const main = document.querySelector(`#main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let gameData;

export default class Router {
  static start() {
    Loader.loadData().
      then((data) => gameData = data).
      then(() => Router.showIntro()).
      catch(Router.showError)
  }

  static showIntro() {
    const intro = new IntroScreen();
    changeView(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(gameData, playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new StatsScreen(model);
    changeView(statistics.element);
    // EXAMPLE DATA
    // setTimeout(() => {
    //   statistics.showResultsHistory([
    //     {
    //       date: 1234567567898, // Дата создания статистики в ms
    //       stats: ['correct', 'wrong', 'fast', 'wrong', 'correct', 'wrong', 'wrong'], // Статистика ответа пользователя
    //       lives: 0 // Кол-во оставшихся жизней
    //     },
    //     {
    //       date: 1234567567898, // Дата создания статистики в ms
    //       stats: ['correct', 'correct', 'correct', 'slow', 'correct', 'wrong', 'fast', 'slow', 'correct', 'wrong'], // Статистика ответа пользователя
    //       lives: 3 // Кол-во оставшихся жизней
    //     },
    //     {
    //       date: 1234567567898, // Дата создания статистики в ms
    //       stats: ['correct', 'wrong', 'fast', 'slow', 'correct', 'wrong', 'fast', 'slow', 'correct', 'wrong'], // Статистика ответа пользователя
    //       lives: 2 // Кол-во оставшихся жизней
    //     },
    //     {
    //       date: 1234567567898, // Дата создания статистики в ms
    //       stats: ['correct', 'wrong', 'fast', 'wrong', 'correct', 'wrong', 'wrong'], // Статистика ответа пользователя
    //       lives: 0 // Кол-во оставшихся жизней
    //     }
    //   ]);
    // }, 500);

    Loader.loadResults().
      then((data) => statistics.showResultsHistory(data)).
      catch(Router.showError);

    Loader.saveResults(model);
  }

  static showError(errorMessage) {
    const error = new ErrorScreen(errorMessage);
    changeView(error.element);
  }
}
