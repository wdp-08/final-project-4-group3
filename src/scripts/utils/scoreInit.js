import {
  getFirestore, setDoc, doc, query, collection, where, getDocs, orderBy, limit,
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid';
import {
  innerElement,
  flashMessage, redirect,
} from './functions';
import app from '../global/config';

const db = getFirestore(app);
const ScoreInit = {
  async init() {
    await this._getscore();
  },

  async _getscore() {
    const hasilScore = JSON.parse(localStorage.getItem('hasil_score'));
    if (hasilScore) {
      innerElement('#score-user', hasilScore.score);
      await this._uploadScoreDB(hasilScore);
    } else {
      redirect('#/dashboard');
    }
  },

  async _uploadScoreDB(data) {
    try {
      const nanoid = customAlphabet('1234567890abcdefghijklZ', 19);
      const idUser = `score_${nanoid()}`;
      await setDoc(doc(db, 'scores', idUser), data);
      flashMessage('success', 'Silahkan Simpan Score!', 'Berhasil');
    } catch (error) {
      flashMessage('error', error, 'Upss!');
    }
  },

  async getScoreByEmail(email = null) {
    let q = null;
    if (email) {
      q = query(collection(db, 'scores'), where('email', '==', email));
    } else {
      q = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10));
    }
    const docSnap = await getDocs(q);
    if (docSnap.size > 0) {
      return docSnap;
    }
    return null;
  },
};

export default ScoreInit;
