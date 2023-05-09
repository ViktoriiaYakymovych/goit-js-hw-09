import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    dateTimePicker: document.getElementById('datetime-picker'),
    startBtnEl: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};

function onClose(selectedDates) {
    refs.startBtnEl.disabled = true;

    if (selectedDates[0].getTime() - options.defaultDate.getTime() < 1000) {
        return Notiflix.Notify.failure(`Please choose a date in the future`);
    } else {
        refs.startBtnEl.disabled = false;
        return (selectedDate = selectedDates[0].getTime());
    };
};

flatpickr(refs.dateTimePicker, options);

const madeTimer = () => {
    timerId = setInterval(() => {
        const interval = selectedDate - Date.now();

        if (interval >= 0) {
            const timeLeft = convertMs(interval);

            refs.startBtnEl.disabled = true;
            refs.dateTimePicker.disabled = true;
            refs.days.textContent = addLeadingZero(String(timeLeft.days));
            refs.hours.textContent = addLeadingZero(String(timeLeft.hours));
            refs.minutes.textContent = addLeadingZero(String(timeLeft.minutes));
            refs.seconds.textContent = addLeadingZero(String(timeLeft.seconds));
        } else {
            clearInterval(timerId);
            refs.dateTimePicker.disabled = false;
            return;
        }
    }, 1000);
};

function addLeadingZero(value) {
    return value.padStart(2, '0');
}

refs.startBtnEl.addEventListener(`click`, onStartClick);

function onStartClick() {
    if (selectedDate - Date.now() <= 0) {
        refs.startBtnEl.disabled = true;
        return Notiflix.Notify.failure(`Please choose a date in the future`);
    }
    madeTimer();
    refs.startBtnEl.disabled = true;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


