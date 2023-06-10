import { getUserInfo, innerElement, redirect } from '../../utils/functions';
import ScoreInit from '../../utils/scoreInit';

const Score = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; min-height: 100vh;">
        <section class="container">
            <div class="d-flex justify-content-center py-5">
                <div class="card text-center">
                    <div class="card card-baner-score" >
                        <h1 style="margin: auto; color: #ffff; font-weight: bold;">YOUR SCORE HERE !</h1>
                    </div>
                    <div class="container text-center" id="this-score">
                        <div class="row align-items-center" style="padding-left: 30px; padding-right: 30px;padding-top: 20PX;">
                            <div class="col">
                                <img class="emoticon-score" src="./images/goodjob.gif" alt="">
                            </div>
                            <div class="col result-score text-center ">
                                <h1 id="score-user">0</h1>
                                <!-- <div style="border-bottom: 0.4rem solid #00B6A6;  width: 18rem; margin: auto;"></div> -->
                                <div class="container d-flex justify-content-center">
                                    <p>Boost your spirits <span id="namaUser">Nama</span> !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="py-4">
                        <a href="#/dashboard" class="btn btn-score " type="button">Home</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
         `;
  },

  async afterRender() {
    const userAccess = getUserInfo();
    if (!userAccess) {
      redirect('#/');
    } else {
      localStorage.removeItem('cat');
      innerElement('#namaUser', userAccess.nama_user);
      await ScoreInit.init();
    }
  },
};

export default Score;
