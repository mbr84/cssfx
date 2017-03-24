/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
let $intro;
let currentStep = -1;

const spanWrap = (string) => {
  $(string).each(function () {
    const str = $(this).html();

    const strArr = str.split('');

    var htmEl = '';
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
      (500 / letters.length * i) + (500)
    );
  });
};

const fadeOut = (idx) => {
  const letters = shuffle($('[class*="char"]', $intro[idx]));
  $.each(letters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 0 }, 100)), (500 / letters.length * i));
  });
};

const next = (skip) => {
  const lastStep = currentStep;
  currentStep = ++currentStep % $intro.length;
  fadeOut(lastStep);
  fadeIn(currentStep);
};

$(document).ready(() => {
  setTimeout(next, 100)
  $intro = $('.intro .step');
  $intro.each((i, step) => {
    spanWrap($(step));
    $("[class*='char']", $intro[i]).css('opacity', "0");
  });
  setInterval(next, 4000);
});
