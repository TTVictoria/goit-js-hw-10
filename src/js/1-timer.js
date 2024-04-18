import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonStart = document.querySelector('button');
const input = document.querySelector('#datetime-picker');

let userSelectedDate;
let intervalId;

buttonStart.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate > currentDate) {
      buttonStart.disabled = false;
    } else {
      buttonStart.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
    }
  },
});

buttonStart.addEventListener('click', () => {
  if (buttonStart.disabled === false) {
    intervalId = setInterval(updateDisplay, 1000);
    buttonStart.disabled = true;
    input.disabled = true;
  }
});

function updateDisplay() {
  const currentDate = new Date();
  const remainingTime = userSelectedDate - currentDate;

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  const addTimerValue = value => String(value).padStart(2, '0');

  document.querySelector('[data-days]').textContent = addTimerValue(days);
  document.querySelector('[data-hours]').textContent = addTimerValue(hours);
  document.querySelector('[data-minutes]').textContent = addTimerValue(minutes);
  document.querySelector('[data-seconds]').textContent = addTimerValue(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}