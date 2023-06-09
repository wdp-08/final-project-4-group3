/* eslint-disable no-bitwise */
import FetchDataSoalQuiz from '../data/soal-quiz';
import { cardSoal, cardTemplateAnswers } from '../views/templates/template';
import { flashMessage, removeClassElement } from './functions';

let timeLeft = 11;
let timeInterval = null;
let allSoal = null;
let runningQuestion = 0;
let lastQuestion = 0;
let scoreUser = 0;
let isPaused = false;
let correctAnswer = null;

function _renderTime() {
  if (!isPaused) {
    timeLeft -= 1;
    const time = document.querySelector('#time');
    time.innerHTML = timeLeft;
  }
  if (timeLeft <= 0) {
    isPaused = true;
    timeLeft = 11;
    const answerUser = document.querySelector('input[name="choices"]:checked');
    if (answerUser !== null) {
      _checkAnswerUser(answerUser.value);
      _renderSoal(runningQuestion);
      isPaused = false;
    }

    if (runningQuestion < lastQuestion) {
      runningQuestion += 1;
      _renderSoal(runningQuestion);
      isPaused = false;
    } else {
      clearInterval(timeInterval);
      flashMessage('success', 'Selesai', `Your score ${scoreUser}`);
      console.log('akhir', scoreUser);
    }
  }
}

function _checkAnswerUser(answerUser) {
  if (correctAnswer === answerUser) {
    scoreUser += 10;
  }
}

function _renderSoal(antrianQuestion) {
  const cardquestion = document.getElementById('card_soal');
  const cardanswers = document.getElementById('answers');
  cardanswers.innerHTML = '';
  const showsoal = allSoal[antrianQuestion];
  const answers = showsoal.incorrect_answers;
  correctAnswer = showsoal.correct_answer;
  answers.splice((answers.length + 1) * Math.random() | 0, 0, showsoal.correct_answer);
  cardquestion.innerHTML = cardSoal(showsoal, antrianQuestion, lastQuestion);
  console.log(answers, showsoal);
  answers.forEach((val, key) => {
    cardanswers.innerHTML += cardTemplateAnswers(val);
  });
}

const soalQuiz = {
  async init(cat) {
    await this.startQuiz(cat);
  },

  async startQuiz(cat) {
    allSoal = await this._logicQuiz(cat);
    lastQuestion = allSoal.length - 1;
    _renderTime();
    _renderSoal(runningQuestion);
    timeInterval = setInterval(_renderTime, 1000);
  },

  async _logicQuiz(cat) {
    const soal = await FetchDataSoalQuiz.fetchSoal(cat);
    return soal.results;
  },

};

export default soalQuiz;
