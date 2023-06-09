import { getUserInfo, redirect, removeClassElement } from '../../utils/functions';
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
    const userAccess = getUserInfo();
    const getCat = JSON.parse(localStorage.getItem('cat')).cat_quiz;
    if (!userAccess || !getCat) {
      redirect('#/');
    } else {
      await soalQuiz.init(getCat);
      removeClassElement('.fade', 'show');
      removeClassElement('.fade', 'modal-backdrop');
      removeClassElement('.fade', 'fade');
    }
    // console.log(allSoal);
    // const notifikasi = new Audio('./music/quiz.mp3');

    // if (timeLeft <= 0) {
    //   const result = await questionSwal('Waktu habis. Lanjut?');
    //   clearInterval(timeInterval);
    //   if (result) await this._renderTime();
    // }
  },
};

export default QuizSoal;
