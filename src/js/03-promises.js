import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const step = form.elements.step;
const delay = form.elements.delay;
const amount = form.elements.amount;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const stepNum = Number(step.value);
  let newDelay = delay.value - stepNum;

  for (let i = 1; i <= amount.value; i += 1) {
    newDelay += stepNum;
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  };
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, regect) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      // Reject
      setTimeout(() => {
        regect({ position, delay });
      }, delay);
    };
  });
  return promise;
};
