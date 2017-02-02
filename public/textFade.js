/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
var $intro;
var currentStep = -1;

var spanWrap = (string) => {
  $(string).each(function () {
    var str = $(this).html();

    var strArr = str.split('');

    var htmEl = '';
    for (var i = 0, len = strArr.length; i < len; i++) {
      if (strArr[i] === '<') {
        var j = i;
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

var shuffle = (array) => {
  for (var i = 0; i < array.length; i++) {
    var temp = array[i];
    var j = Math.floor(Math.random() * i);
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var fadeIn = (idx) => {
  var letters = shuffle($('[class*="char"]', $intro[idx]));
  $($intro[idx]).show();
  $.each(letters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 1 }, 100)),
      (500 / letters.length * i) + (500)
    );
  });
};

var fadeOut = (idx) => {
  var letters = shuffle($('[class*="char"]', $intro[idx]));
  $.each(letters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 0 }, 100)), (500 / letters.length * i));
  });
};

var next = (skip) => {
  var lastStep = currentStep;
  currentStep = ++currentStep % $intro.length;
  fadeOut(lastStep);
  fadeIn(currentStep);
};

$(document).ready(() => {
  setTimeout(next, 200)
  $intro = $('.intro .step');
  $intro.each((i, step) => {
    spanWrap($(step));
    $("[class*='char']", $intro[i]).css('opacity', "0");
  });
  setInterval(next, 4000);
});
