let soalResult = null;
const soalQuiz = {
  async init() {
    return this._logicQuiz();
  },
  async initsoal(soal) {
    const daftarsoal = soal.results;
    soalResult = daftarsoal;
  },

  async _logicQuiz() {
    return soalResult;
  },
};

export default soalQuiz;
