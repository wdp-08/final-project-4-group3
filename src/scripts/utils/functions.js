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
  return dateTemp.toLocaleDateString('id-ID', options);
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
};
