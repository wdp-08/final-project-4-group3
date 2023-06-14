/* eslint-disable no-bitwise */
import FetchDataSoalQuiz from '../data/soal-quiz';
import {
  cardSoal, cardTemplateAnswers, circleTrueFalse, loadPage,
} from '../views/templates/template';
import { flashMessage, getUserInfo, redirect } from './functions';

let timeLeft = 11;
let timeInterval = null;
let allSoal = null;
let runningQuestion = 0;
let lastQuestion = 0;
let scoreUser = 0;
let isPaused = false;
let correctAnswer = null;

const elem = document.documentElement;
let circletrue = null;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function resetGamePrevious() {
  timeLeft = 11;
  timeInterval = null;
  allSoal = null;
  runningQuestion = 0;
  lastQuestion = 0;
  scoreUser = 0;
  isPaused = false;
  correctAnswer = null;
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function audioplay() {
  const notifikasi = document.querySelector('#myAudio');
  notifikasi.play();
}
function audiostop() {
  const notifikasi = document.querySelector('#myAudio');
  notifikasi.pause();
}

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
    } else {
      circletrue.innerHTML += circleTrueFalse('bg-danger');
    }

    if (runningQuestion < lastQuestion) {
      runningQuestion += 1;
      _renderSoal(runningQuestion);
      isPaused = false;
    } else {
      clearInterval(timeInterval);
      flashMessage('success', 'Selesai', `Your score ${scoreUser}`);
      audiostop();
      const userInfo = getUserInfo();
      const date = new Date();
      const hasilQuis = {
        score: scoreUser,
        nama_user: userInfo.nama_user,
        id_user: userInfo.id,
        tanggal: date.toISOString(),
      };
      localStorage.setItem('hasil_score', JSON.stringify(hasilQuis));
      closeFullscreen();
      redirect('#/score');
    }
  }
}

function _checkAnswerUser(answerUser) {
  if (correctAnswer === answerUser) {
    scoreUser += 10;
    circletrue.innerHTML += circleTrueFalse('bg-green-me');
  } else {
    circletrue.innerHTML += circleTrueFalse('bg-danger');
  }
}

function _renderSoal(antrianQuestion) {
  const cardquestion = document.getElementById('card_soal');
  const cardanswers = document.getElementById('answers');
  cardanswers.innerHTML = '';
  cardquestion.innerHTML = '';
  const showsoal = allSoal[antrianQuestion];
  const answers = showsoal.incorrect_answers;
  correctAnswer = showsoal.correct_answer;
  answers.splice((answers.length + 1) * Math.random() | 0, 0, showsoal.correct_answer);
  cardquestion.innerHTML = cardSoal(showsoal, antrianQuestion, lastQuestion);
  answers.forEach((val, key) => {
    cardanswers.innerHTML += cardTemplateAnswers(val);
  });
}

const soalQuiz = {
  async init(cat) {
    circletrue = document.getElementById('circle-true');
    await this.startQuiz(cat);
  },

  async startQuiz(cat) {
    // notifikasi.play();
    resetGamePrevious();
    openFullscreen();
    allSoal = await this._logicQuiz(cat);
    lastQuestion = allSoal.length - 1;
    _renderTime();
    _renderSoal(runningQuestion);
    timeInterval = setInterval(_renderTime, 1000);
    window.timeInterval = timeInterval;
  },

  async _logicQuiz(cat) {
    const cardanswers = document.getElementById('answers');
    cardanswers.innerHTML = loadPage();
    audioplay();
    const soal = await FetchDataSoalQuiz.fetchSoal(cat);
    return soal.results;
  },

};

export default soalQuiz;
