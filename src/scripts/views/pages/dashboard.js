import { getUserInfo, innerElement, redirect } from '../../utils/functions';

const Dashboard = {
  async render() {
    return `
    <main class="pb-5" style="background-color: #00B6A6;">
        <div class="container">
        <div class="d-flex justify-content-end">
            <button class="btn btn-light mt-4">logout</button>
        </div>
        <div class="card mt-5 mb-5">
            <div class="card-body">
                <div class="row">
                <!-- col 1 start -->
                <div class="col-lg-5 text-center">
                    <div class="card mt-2 ms-3" style="box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);">
                        <div class="card-body">
                            <img src="./images/profile.png" class="card-img-top" alt="profile" style="max-width: 50%; height: auto" id="url_foto" />
                            <h5 class="card-title" id="nama_user">Admin</h5>
                            <p class="card-text" id="email">admin@gmail.com</p>
                        </div>
                    </div>
                    <div class="card mt-2 ms-3">
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" style="background-color: #00B6A6; color: #ffff;" type="button">Button</button>
                        </div>
                </div>

                </div>
                <!-- col 1 end -->
                <!-- col 2 start -->
                <div class="col-lg-7">
                    <div class="card mt-2 text-center" style="background-color: #00B6A6; box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);" >
                    <h1 style="color: #ffff;">Riwayat Quizz</h1>
                </div>
                <div class="card mt-2" style="box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);" >
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">
                            <p class="mt-2">22 Mei 2023</p>
                            </div>
                            <div class="col">
                            <h3 style="font-weight: bold;" class="mt-2 text-center">90</h3>
                            </div>
                        </div>
                        </div>
                </div>
                <div class="card mt-2" style="box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);" >
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">
                            <p class="mt-2">22 Mei 2023</p>
                            </div>
                            <div class="col">
                            <h3 style="font-weight: bold;" class="mt-2 text-center">90</h3>
                            </div>
                        </div>
                        </div>
                </div>
                <div class="card mt-2" style="box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);" >
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">
                            <p class="mt-2">22 Mei 2023</p>
                            </div>
                            <div class="col">
                            <h3 style="font-weight: bold;" class="mt-2 text-center">90</h3>
                            </div>
                        </div>
                        </div>
                </div>
                <div class="card mt-2" style="box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);" >
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">
                            <p class="mt-2">22 Mei 2023</p>
                            </div>
                            <div class="col">
                            <h3 style="font-weight: bold;" class="mt-2 text-center">90</h3>
                            </div>
                        </div>
                        </div>
                </div>
                </div>
                
                <!-- col 2 end -->
                </div>
            </div>
            </div>

        </div>
        </div>
    </main>
    `;
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
    }
  },
};

export default Dashboard;
