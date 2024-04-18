import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromise = document.querySelector('form');
formPromise.addEventListener('submit', handlerPromiseForm);

function handlerPromiseForm(event) {
  event.preventDefault();

  const delayInput = document.querySelector("input[name='delay']");
  const delay = parseInt(delayInput.value);

  const stateRadiosBtn = document.getElementsByName('state');
  let selectedState;

  for (const radio of stateRadiosBtn) {
    if (radio.checked) {
      selectedState = radio.value;
      break;
    }
  }

  const generatorPromises = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  generatorPromises
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#59A10D',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#EF4040',
      });
    });

  event.currentTarget.reset();
}