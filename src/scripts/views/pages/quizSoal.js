import {
  flashMessage,
  formatTimeLeft, innerElement, redirect, removeClassElement,
} from '../../utils/functions';
import soalQuiz from '../../utils/soalQuiz';
import { cardSoal, cardTemplateAnswers } from '../templates/template';

const QuizSoal = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; height: 100vh;">
        <div class="container pt-5" >
            <div class="card">
                <div class="row">
                    <div class="col-md-3" id="gambar">
                        <div class="card mt-5 border-0">
                            <img class="ms-5" src="../images/people.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card mt-5 border-0">
                            <div class="card-body" id="card_soal">
                            </div>
                            
                            <div class="card-body">
                                <div class="row" id="answers"></div>
                            </div>

                            <div class="card-body d-flex justify-content-between mt-3">
                                <div>
                                    <div class="card rounded-5 bg-warning text-center justify-content-center ms-3"
                                    style="width: 3rem; height: 3rem;" id="time">0</div>
                                </div>
                                <button class="btn me-4" id="next-btn">selanjutnya</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
         `;
  },

  async getSoal(array) {

  },

  async afterRender() {
    // const notifikasi = new Audio('./music/quiz.mp3');
    const cardquestion = document.getElementById('card_soal');
    const cardanswers = document.getElementById('answers');
    const TIME_LIMIT = 10;
    const timePassed = 0;
    const timeLeft = TIME_LIMIT;
    let runningQuestion = 0;

    const soalLocal = JSON.parse(localStorage.getItem('soal')).results;
    runningQuestion = Math.floor(Math.random() * soalLocal.length);

    const showsoal = soalLocal[runningQuestion];
    const answers = showsoal.incorrect_answers;
    answers.splice((answers.length + 1) * Math.random() | 0, 0, showsoal.correct_answer);
    console.log(showsoal);
    console.log(answers);
    cardquestion.innerHTML = cardSoal(showsoal);

    answers.forEach((val, key) => {
      cardanswers.innerHTML += cardTemplateAnswers(val);
    });
  },
};

export default QuizSoal;
