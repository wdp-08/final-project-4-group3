import {
  flashMessage,
  formatTimeLeft, innerElement, redirect, removeClassElement,
} from '../../utils/functions';
import soalQuiz from '../../utils/soalQuiz';

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
                            <div class="card-body">
                                <div id="nomer_soal"> kuis no 1</div>
                                <div class="card-body" style="background:  #00B6A6;">Ini soal</div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card m-2" id="answer">
                                            <div class="card-body">
                                                This is some text within a card body.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card m-2" id="answer">
                                            <div class="card-body">
                                                This is some text within a card body.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card m-2" id="answer">
                                            <div class="card-body">
                                                This is some text within a card body.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card m-2" id="answer">
                                            <div class="card-body">
                                                This is some text within a card body.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
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
    </div>
         `;
  },

  async afterRender() {
    const TIME_LIMIT = 10;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;

    removeClassElement('.modal-backdrop ', 'show');
    removeClassElement('.fade', 'modal-backdrop');
    removeClassElement('.fade', 'fade');
    const notifikasi = new Audio('./music/quiz.mp3');
    const dataSoal = await soalQuiz.init();
    notifikasi.play();
    if (dataSoal !== null) {
      console.log(dataSoal);

      const timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;

        innerElement('#time', formatTimeLeft(timeLeft));
        if (timeLeft === 0) {
          flashMessage('error', 'Waktu habis', 'Perhatian');
          notifikasi.pause();
          clearInterval(timerInterval);
        }
      }, 1000);
    } else {
      redirect('#/dashboard');
    }
  },
};

export default QuizSoal;
