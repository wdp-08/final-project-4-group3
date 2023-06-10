import {
  addClassElement,
  getUserInfo, innerElement, questionSwal, redirect, removeClassElement,
} from '../../utils/functions';
import ScoreInit from '../../utils/scoreInit';
import {
  cardHistoryScore, cardHistoryScoreAll, cardNotYetHistoryScore, loadPage,
} from '../templates/template';

const Dashboard = {
  async render() {
    return `
    <section class="pb-5" style="background-color: #00B6A6; min-height:100vh;">
        <div class="container">
            <div class="d-flex justify-content-end">
                <button class="btn btn-light mt-4 text-primary-me fw-bold" id="btn-logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</button>
            </div>
            <div class="card mt-5 mb-5">
                <div class="card-body p-md-5 p-4">
                    <div class="row">


                        <div class="col-lg-5 mb-3">
                            <div class="card shadow-me border border-0 mb-4">
                                <div class="card-body text-center">
                                    <img src="" class="card-img-top rounded rounded-circle" alt="profile" style="max-width: 50%; height: auto" id="url_foto" />
                                    <h5 class="card-title text-capitalize my-3 fw-bold" id="nama_user">Admin</h5>
                                    <p class="card-text" id="email">admin@gmail.com</p>
                                </div>
                            </div>
                            <div class="card mt-2 border border-0">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-slate-green fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Start QuizzMee</button>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-7">

                          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Your Score</button>
                            </li>
                            <li class="nav-item" role="presentation">
                              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">10 Top Score</button>
                            </li>
                          </ul>
                          <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                              <div class="card text-center shadow-me bg-green-me border border-0 p-2">
                                  <h1 class="text-white fw-bold">Your History Score</h1>
                              </div>
                              <div id="list-history-score">
                                  
                              </div>
                            </div>

                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                              <div class="card text-center shadow-me bg-green-me border border-0 p-2">
                                <h1 class="text-white fw-bold">Users 10 Top Score</h1>
                              </div>
                              <div id="list-history-score-allUser">
                                  
                              </div>
                             <!-- <div class="d-flex justify-content-center">
                                <button id="load-allscore" class="btn text-primary-me">load more</button>
                              </div> -->
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Category</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            <label for="kategori-quiz" class="form-label">Choose the category quiz</label>
            <select class="form-select" id="kategori-quiz" name="kategori-quiz" aria-label="Default select example">
                <option selected disabled>Choose Category</option>
                <option value="9" data-name="General Knowledge">General Knowledge</option>
                <option value="18" data-name="Science: Computers">Science: Computers</option>
                <option value="27" data-name="Animals">Animals</option>
            </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-slate-green disabled" id="btn-start-quiz">Mulai Quiz</button>
      </div>
    </div>
  </div>
</div>
    `;
  },

  async _logout() {
    const result = await questionSwal('Log Out from QuizzMee ?');
    if (result !== false) {
      localStorage.removeItem('token_access');
      localStorage.removeItem('user_quizmee');
      window.location.reload();
    }
  },

  async _startQuiz() {
    const result = await questionSwal('Ready to start QuizMee?');
    if (result) {
      window.location.href = '#/quiz';
    }
  },

  async _chooseCategory(e) {
    e.preventDefault();
    addClassElement('#btn-start-quiz', 'disabled');
    localStorage.setItem('cat', JSON.stringify({ cat_quiz: e.target.value }));
    removeClassElement('#btn-start-quiz', 'disabled');
  },

  async afterRender() {
    const userAccess = getUserInfo();
    if (!userAccess) {
      redirect('#/');
    } else {
      localStorage.removeItem('hasil_score');
      const urlFoto = document.querySelector('#url_foto');
      urlFoto.setAttribute('src', userAccess.url_foto);
      innerElement('#nama_user', userAccess.nama_user);
      innerElement('#email', userAccess.email);

      const btnLogout = document.querySelector('#btn-logout');
      const btnStartQuiz = document.querySelector('#btn-start-quiz');
      const kategoriQuiz = document.getElementById('kategori-quiz');
      btnLogout.addEventListener('click', this._logout);
      btnStartQuiz.addEventListener('click', this._startQuiz);
      kategoriQuiz.addEventListener('change', this._chooseCategory);

      const listhistoryscore = document.getElementById('list-history-score');
      const listhistoryscoreall = document.getElementById('list-history-score-allUser');
      listhistoryscore.innerHTML = loadPage();
      listhistoryscoreall.innerHTML = loadPage();
      const riwayatScore = await ScoreInit.getScoreByEmail(userAccess.email);
      const riwayatScoreAll = await ScoreInit.getScoreByEmail();
      if (riwayatScore !== null) {
        listhistoryscore.innerHTML = '';
        riwayatScore.forEach((doc) => {
          const resultData = doc.data();
          resultData.id = doc.id;
          listhistoryscore.innerHTML += cardHistoryScore(resultData);
        });
        listhistoryscoreall.innerHTML = '';
        riwayatScoreAll.forEach((doc) => {
          const resultData = doc.data();
          resultData.id = doc.id;
          console.log(resultData);
          listhistoryscoreall.innerHTML += cardHistoryScoreAll(resultData);
        });
      } else {
        listhistoryscore.innerHTML += cardNotYetHistoryScore();
      }
    }
  },
};

export default Dashboard;
