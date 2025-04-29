'use strict';

const body = document.querySelector('body');

const promiseOne = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      clearTimeout(rejectionTimer);
      resolve(`First promise was resolved`);
    },
    { once: true },
  );

  const rejectionTimer = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const promiseTwo = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const promiseThree = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve(`Third promise was resolved`);
    }
  });
});

function notificationHandler(type, message) {
  const div = document.createElement('div');

  div.classList.add('notification', type);
  div.dataset.qa = 'notification';
  div.textContent = message;

  body.appendChild(div);
}

promiseOne
  .then((message) => notificationHandler('success', message))
  .catch((message) => notificationHandler('error', message));

promiseTwo.then((message) => notificationHandler('success', message));

promiseThree.then((message) => notificationHandler('success', message));
