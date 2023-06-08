import {
  getFirestore, setDoc, doc,
} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { customAlphabet } from 'nanoid';
import app from '../global/config';
import {
  flashMessage, isExistUser, redirect, removeClassElement,
} from './functions';

const provider = new GoogleAuthProvider();
const db = getFirestore(app);
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const RegisterAkun = {
  async init() {
    await this._registerMethod();
  },

  async _registerMethod() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        const payload = {
          email: user.email,
          nama_user: user.displayName,
          url_foto: user.photoURL,
          no_telp: user.phoneNumber,
        };
        this._registerAkun(payload);
      }).catch((error) => {
        removeClassElement('#btn-register', 'disabled');
        flashMessage('error', error.message, 'Error!');
      });
  },

  async _registerAkun(data) {
    try {
      const checkEmail = await isExistUser(db, data.email);
      if (checkEmail) {
        flashMessage('warning', 'Email telah terdaftar, \nSilahkan Login!', 'Perhatian!');
        redirect('#/');
      } else {
        const nanoid = customAlphabet('1234567890abcdefghijklZ', 19);
        const idUser = `user_${nanoid()}`;
        await setDoc(doc(db, 'users', idUser), data);
        flashMessage('success', 'Silahkan Login!', 'Berhasil');
      }
    } catch (error) {
      flashMessage('error', error, 'Upss!');
    }
  },
};

export default RegisterAkun;
