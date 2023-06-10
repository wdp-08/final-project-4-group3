import Swal from 'sweetalert2';
import {
  getStorage, ref, getDownloadURL, uploadBytes,
} from 'firebase/storage';
import {
  collection, getDocs, limit, query, where,
} from 'firebase/firestore';

function flashMessage(icon, text, title) {
  Swal.fire({
    icon,
    text,
    title,
  });
}

function isLogin() {
  if (localStorage.getItem('user_quizmee')) {
    return true;
  }
  return false;
}

function getUserInfo() {
  if (isLogin()) {
    return JSON.parse(localStorage.getItem('user_quizmee'));
  }
  return false;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function redirect(page) {
  setTimeout(() => {
    window.location.href = `./${page}`;
  }, 100);
}
function getFilename(file, name) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
  return `${name}.${extension}`;
}
async function uploadFile(file, name) {
  const storage = getStorage();
  const filename = getFilename(file, name);
  const storageRef = ref(storage, filename);
  const uploadImage = await uploadBytes(storageRef, file);
  return getDownloadURL(uploadImage.ref).then((url) => Promise.resolve(url));
}

function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateTemp = new Date(date);
  return dateTemp.toLocaleDateString('en-US', options);
}

function addClassElement(element, className) {
  document.querySelector(element).classList.add(className);
}
function removeClassElement(element, className) {
  document.querySelector(element).classList.remove(className);
}
function innerElement(idOrClass, element) {
  document.querySelector(idOrClass).innerHTML = element;
}

async function isExistUser(db, email) {
  const q = query(collection(db, 'users'), where('email', '==', email), limit(1));
  const docSnap = await getDocs(q);
  if (docSnap.size > 0) {
    const docindex = docSnap.docs[0];
    const user = docindex.data();
    user.id = docindex.id;
    return user;
  }
  return null;
}

async function questionSwal(title) {
  const swal = await Swal.fire({
    title,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonColor: '#00B6A6',
  });
  const result = swal.isConfirmed;
  return result;
}
function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

export {
  isLogin,
  getUserInfo,
  escapeHtml,
  redirect,
  uploadFile,
  formatDate,
  flashMessage,
  addClassElement,
  removeClassElement,
  innerElement,
  isExistUser,
  questionSwal,
  formatTimeLeft,
};
