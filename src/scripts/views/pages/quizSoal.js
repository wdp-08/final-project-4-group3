import {
  getUserInfo, redirect, removeClassElement,
} from '../../utils/functions';
import soalQuiz from '../../utils/soalQuiz';

const QuizSoal = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; min-height: 100vh;">
        <div class="container py-5" >
            <div class="card">
                <div class="row">
                    <div class="col-md-3" id="gambar">
                        <div class="card mt-5 border-0 d-flex align-items-center">
                            <img class="ms-5" src="../images/chikentime.gif" alt="chiken time" width="100%">
                        </div>
                    </div>
                    <div class="col-md-8 py-0 py-lg-3">
                        <div class="card border-0">
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
                                <div id="circle-true" class="d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <audio id="myAudio" autoplay=true loop=false>
        <source src="./music/quiz.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
         `;
  },

  async afterRender() {
    const userAccess = getUserInfo();
    const getCat = (localStorage.getItem('cat')) ? JSON.parse(localStorage.getItem('cat')).cat_quiz : null;
    if (!getCat) {
      redirect('#/dashboard');
    }
    if (!userAccess) {
      redirect('#/');
    } else {
      const modalbackdrop = document.querySelector('.modal-backdrop');
      if (modalbackdrop) {
        removeClassElement('.fade', 'show');
        removeClassElement('.fade', 'modal-backdrop');
        removeClassElement('.fade', 'fade');
        const bodyModal = document.querySelector('body');
        bodyModal.removeAttribute('style');
        bodyModal.removeAttribute('class');
      }
      await soalQuiz.init(getCat);
    }
  },
};

export default QuizSoal;
