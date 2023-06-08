import FetchDataSoalQuiz from '../../data/soal-quiz';
import {
  addClassElement,
  getUserInfo, innerElement, questionSwal, redirect, removeClassElement,
} from '../../utils/functions';
import soalQuiz from '../../utils/soalQuiz';

let category = null;
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
                                    <img src="./images/profile.png" class="card-img-top rounded rounded-circle" alt="profile" style="max-width: 50%; height: auto" id="url_foto" />
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
                            <div class="card text-center shadow-me bg-green-me border border-0 p-2">
                                <h1 class="text-white fw-bold">History Score QuizzMee</h1>
                            </div>
                            <div id="list-history-score">
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2 shadow-me border border-0">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center px-4">
                                            <span class="fs-5">22 Mei 2023</span>
                                            <span class="fw-bold fs-3 text-center">90</span>
                                        </div>
                                    </div>
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
                <option value="9">General Knowledge</option>
                <option value="18">Science: Computers</option>
                <option value="27">Animals</option>
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
      const soal = await FetchDataSoalQuiz.fetchSoal(category);
      await soalQuiz.initsoal(soal);
      window.location.href = '#/quiz';
    }
  },

  async _chooseCategory(e) {
    e.preventDefault();
    addClassElement('#btn-start-quiz', 'disabled');
    category = e.target.value;
    removeClassElement('#btn-start-quiz', 'disabled');
  },

  async afterRender() {
    const userAccess = getUserInfo();
    if (!userAccess) {
      redirect('#/');
    } else {
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
    }
  },
};

export default Dashboard;
