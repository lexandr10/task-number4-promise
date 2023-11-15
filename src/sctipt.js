// ****************************Практика************************* \\
// Наше завдання написати програмне забезпечення для ігрового автомата
// Для вирішення завдання використай готову розмітку HTML та базову стилізацію
// Після натиснення на кнопку "Start game" в кожному віконці по черзі має з'являтись смайлик з затримкою в 1 секунду ('🤑' або '👿')
// Під час обробки кожного віконця створи масив з Promis-ами в якому кожен з них буде відповідати за своє віконце, після чого оброби даний масив за допомогою методу Promise.allSettled
// Після того як всі віконця були заповнені потрібно щоб скріпт автоматично визначав чи гравець переміг, чи ні. Якщо в кожному віконці однаковий смайлик це означає що користувач переміг
// Виводить модальне вікно з повідомленням про статус гри ('Winner' або 'Loser')
// Для модального вікна використовуй бібліотеку basicLightbox
// Після повторного натискання на кнопку "Start game" поле має очищатись, а гра починатись з початку.
import * as basicLightbox from 'basiclightbox';
const elements = {
  btnStart: document.querySelector('.js-start'),
  enterItem: document.querySelector('.js-container'),
};

elements.btnStart.addEventListener('click', handlerResultGame);

function handlerResultGame() {
  const promise = [...elements.enterItem.children].map(createPromise);
  Promise.allSettled(promise).then(items => {
    items.forEach((item, idx) => {
      elements.enterItem.children[idx].textContent = '';
      setTimeout(() => {
        elements.enterItem.children[idx].textContent =
          item.value || item.reason;
        if (items.length - 1 === idx) {
          const instance = basicLightbox.create(`
	<h1>${isWinner ? 'Winner' : 'Loser'}</h1>
`);
          instance.show();
        }
      }, (idx + 1) * 1000);
    });
    const isWinner =
      items.every(({ status }) => status === 'fulfilled') ||
      items.every(({ status }) => status === 'rejected');
  });
}

function createPromise() {
  return new Promise((res, rej) => {
    const random = Math.random();
    if (random > 0.5) {
      res('🤑');
    } else {
      rej('👿');
    }
  });
}
