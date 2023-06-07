const Login = {
  async render() {
    return `
    <div style="background-image: url('./images/cover.jpg'); width: 100%; height: 100vh;">
        <section class="container">
            <div class="d-flex justify-content-center flex-wrap" style="height: 100%;  width: 100%; align-items: center;">
                <div class="col-md-6 col-12 " style="padding-top: 9rem;">
                    <div class="card text-center py-5">
                        <h2 class="mb-1">Login</h2>
                        <div style="border-bottom: 0.1rem solid #00A496;  width: 3.5rem; margin: auto; "></div>
                        <button type="submit" class="btn btn-light border-1 my-5">
                            <span class="google-icon"><img src="./images/logo-google.png" alt="Google"></span>
                            Login with Google</button>
                        <p class="mb-2">Don't have an account? 
                            <a href="#/register">Register</a>
                        </p>

                        <div style="border-bottom: 0.1rem solid #000000;  width: 15rem; margin: auto; "></div>
                        <h2>MetMata Quizz v.1</h2>
                    </div>
                </div>
            </div>
        </section>
    </div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Login;
