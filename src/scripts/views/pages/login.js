import { getUserInfo, redirect } from '../../utils/functions';
import loginAkun from '../../utils/loginAkun';

const Login = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; height: 100vh;">
        <section class="container">
            <div class="d-flex justify-content-center flex-wrap" style="height: 100%;  width: 100%; align-items: center;">
                <div class="col-md-6 col-12 " style="padding-top: 8rem;">
                    <div class="card text-center py-5">
                        <h2 class="mb-3 fw-bold text-primary-me">Login</h2>
                        <div style="border-bottom: 0.1rem solid #00A496;  width: 3.5rem; margin: auto; "></div>
                        <button type="submit" class="btn btn-light border-1 my-5" id="btn-login">
                            <span class="google-icon"><img src="./images/logo-google.png" alt="Google"></span>
                            Login with Google</button>
                        <p class="mb-2">Don't have an account? 
                            <a href="#/register">Register</a>
                        </p>

                        <div style="border-bottom: 2px solid #000000;  width: 80%; margin: 10px auto; "></div>
                        <h2 class="fw-bold text-primary-me">QuizzMee</h2>
                    </div>
                </div>
            </div>
        </section>
    </div>
        `;
  },

  async afterRender() {
    const userAccess = getUserInfo();
    const btnLogin = document.getElementById('btn-login');
    if (!userAccess) {
      btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        await loginAkun.init();
      });
    } else {
      btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        redirect('#/dashboard');
      });
    }
  },
};

export default Login;
