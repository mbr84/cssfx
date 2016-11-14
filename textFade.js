/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */

const spanWrap = (string) => {
  $(string).each(function () {
    const str = $(this).html();

    const strArr = str.split('');

    let htmEl = '';
    for (let i = 0, len = strArr.length; i < len; i++) {
      htmEl += `<span class="char-${i}">${strArr[i]}</span>`;
    }

    $(this).html(htmEl);
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
  for (let j, temp, i = array.length; i; j = Math.floor(Math.random() *
      i), temp = array[--i], array[i] = array[j], array[j] = temp);
  return array;
};
