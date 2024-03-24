import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '../img/bi_x-octagon.png';
import iconOk from '../img/bi_check2-circle.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#FFF',
        backgroundColor: '#59A10D',
        position: 'topRight',
        iconUrl: iconOk,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#FFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: iconClose,
      });
    });

  form.reset(); // Очистити форму після відправлення
});