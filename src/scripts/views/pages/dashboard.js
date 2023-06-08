import {
  getUserInfo, innerElement, questionSwal, redirect,
} from '../../utils/functions';

const Dashboard = {
  async render() {
    return `
    <section class="pb-5" style="background-color: #00B6A6; min-height:100vh;">
        <div class="container">
            <div class="d-flex justify-content-end">
                <button class="btn btn-light mt-4 text-primary-me fw-bold" id="btn-logout"><i class="bi bi-box-arrow-right me-2"></i> logout</button>
            </div>
            <div class="card mt-5 mb-5">
                <div class="card-body p-5">
                    <div class="row">


                        <div class="col-lg-5">
                            <div class="card shadow-me border border-0 mb-4">
                                <div class="card-body text-center">
                                    <img src="./images/profile.png" class="card-img-top rounded rounded-circle" alt="profile" style="max-width: 50%; height: auto" id="url_foto" />
                                    <h5 class="card-title text-capitalize my-3 fw-bold" id="nama_user">Admin</h5>
                                    <p class="card-text" id="email">admin@gmail.com</p>
                                </div>
                            </div>
                            <div class="card mt-2 border border-0">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-slate-green fw-bold" id="btn-start-quiz" type="button">Start QuizzMee</button>
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
    `;
  },

  async _logout() {
    const result = await questionSwal('Di you wil Logout?');
    if (result !== false) {
      localStorage.removeItem('token_access');
      localStorage.removeItem('user_quizmee');
      window.location.reload();
    }
  },

  async _startQuiz() {
    const result = await questionSwal('Ready to start QuizMee?');
    if (result) {
      redirect('#/quiz');
    }
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
      btnLogout.addEventListener('click', this._logout);
      btnStartQuiz.addEventListener('click', this._startQuiz);
    }
  },
};

export default Dashboard;
