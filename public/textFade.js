/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
let $intro;
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

const next = () => {
  const lastStep = currentStep;
  currentStep = ++currentStep % $intro.length;
  fadeOut(lastStep);
  fadeIn(currentStep);
};

$(document).ready(() => {
  let timestamp = 0;
  let lastFire = 0;

  $(document).on('wheel', (e) => {
    const now = (new Date).getTime();
    if (now - timestamp > 700 && now - lastFire > 300) {
      const top = $('.left-scroll').css('top');
      const bottom = $('.right-scroll').css('bottom')
      if (e.originalEvent.deltaY > 0) {
        $('.left-scroll').css({ top: `calc(${top} - 100%)` });
        $('.right-scroll').css({ bottom: `calc(${bottom} - 100%)` });
      } else {
        $('.left-scroll').css({ top: `calc(${top} + 100%)` });
        $('.right-scroll').css({ bottom: `calc(${bottom} + 100%)` });
      }
      timestamp = Date.parse(new Date);
    }
    lastFire = now;
  });
  $intro = $('.intro .step');
  $intro.each((i, step) => {
    lineWrap(spanWrap($(step)));
    const opacity = (i === 0 ? '1' : '0');
    $("[class*='char']", $intro[i]).css('opacity', opacity);
  });
  setInterval(next, 5000);
});
