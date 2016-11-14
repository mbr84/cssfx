/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
const $intro = $('.intro .step');
let currentStep = 0;

const spanWrap = (string) => {
  $(string).each(function () {
    const str = $(this).html();

    const strArr = str.split('');

    let htmEl = '';
    for (let i = 0, len = strArr.length; i < len; i++) {
      if (strArr[i] === '<') {
        const j = i;
        while (strArr[i++] !== '>');
        htmEl += str.slice(j, i + 1);
      } else {
        htmEl += `<span class="char-${i}">${strArr[i]}</span>`;
      }
    }

    $(this).html(htmEl);
    return $(this);
  });
};

const lineWrap = (line) => {
  $(line).each(function () {
    const str = $(this).html();

    const lines = str.split('<br>');

    let htmEl = '';
    for (let i = 0, len = lines.length; i < len; i++) {
      htmEl += `<span class="line-${i}">${lines[i]}</span>`;
      if (i !== lines.length - 1) { htmEl += '<br>'; }
    }

    $(this).html(htmEl);
  });
};

const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const temp = array[i];
    const j = Math.floor(Math.random() * i);
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const fadeIn = (idx) => {
  const letters = shuffle($('[class*="char"]', $intro[idx]));
  $($intro[idx]).show();
  $.each(letters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 1 }, 100)),
      (1000 / letters.length * i) + (1000 / 2)
    );
  });
};

const fadeOut = (idx) => {
  const letters = shuffle($('[class*="char"]', $intro[idx]));
  $($intro[idx]).hide();
  $.each(letters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 0 }, 100)), (1000 / letters.length * i));
  });
};

const next = () => {
  fadeOut(currentStep);
  fadeIn(currentStep + 1);
  currentStep = ++currentStep % $intro.length;
};

$intro.each((i, step) => {
  lineWrap(spanWrap($(step)));
});

setInterval(next, 5000);
