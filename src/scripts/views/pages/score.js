const Score = {
    async render() {
      return `
        <section class="container-md mt-5">
            <div class="d-flex justify-content-center">
                <div class="card text-center" style="width: 803px; height: 584px;">
                    <div class="card card-baner-score" >
                        <h1 style="margin: auto; color: #ffff; font-weight: bold;">YOUR SCORE HERE !</h1>
                    </div>
                    <div class="container text-center" id="this-score">
                        <div class="row align-items-center" style="padding-left: 30px; padding-right: 30px;padding-top: 20PX;">
                            <div class="col">
                                <img class="emoticon-score" src="../images/emoticon 2.png" alt="">
                            </div>
                            <div class="col result-score text-center ">
                                <h1>100</h1>
                                <div class="container d-flex justify-content-center">
                                    <p>Tingkatkan semangat ya <span>Nama</span> !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gap-2 ">
                        <button class="btn btn-score " type="button">Beranda</button>
                    </div>
                </div>
            </div>
        </section>
         `;
    },
  
    async afterRender() {
      // Fungsi ini akan dipanggil setelah render()
    },
  };
  
  export default Score;
  