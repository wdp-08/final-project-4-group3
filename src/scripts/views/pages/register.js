import RegisterAkun from '../../utils/registerAkun';

const Register = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; height: 100vh;">
        <section class="container">
            <div class="d-flex justify-content-center flex-wrap" style="height: 100%;  width: 100%; align-items: center;">
                <div class="col-md-6 col-12 " style="padding-top: 8rem;">
                    <div class="card text-center py-5">
                        <div class="card-body d-grid justify-content-center">
                            <h2 class="mb-3 fw-bold text-primary-me">Register</h2>
                            <div style="border-bottom: 2px solid #00A496;  width: 100px; margin: auto; "></div>
                            <button type="submit" class="btn btn-light border-me my-5 d-flex align-items-center" id="btn-register">
                                <i class="google-icon me-3">
                                <img src="./images/logo-google.png" alt="Google" width="50px">
                                </i>
                                <span>Register with Google</span>
                            </button>
                            <p class="mb-2">Do you have an account? 
                                <a href="#/">Login</a>
                            </p>

                            <div style="border-bottom: 2px solid #000000;  width: 80%; margin: 10px auto; "></div>
                            <h2 class="fw-bold text-primary-me">QuizzMee</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
        `;
  },

  async afterRender() {
    const btnregister = document.getElementById('btn-register');
    btnregister.addEventListener('click', async (e) => {
      e.preventDefault();
      await RegisterAkun.init();
    });
  },
};

export default Register;
