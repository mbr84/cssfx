/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
var $intro;
var currentStep = 0;

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

var lineWrap = (line) => {
  $(line).each(function () {
    var str = $(this).html();

    var lines = str.split('<br>');

    var htmEl = '';
    for (var i = 0, len = lines.length; i < len; i++) {
      htmEl += `<span class="line-${i}">${lines[i]}</span>`;
      if (i !== lines.length - 1) { htmEl += '<br>'; }
    }

    $(this).html(htmEl);
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
  var varters = shuffle($('[class*="char"]', $intro[idx]));
  $($intro[idx]).show();
  $.each(varters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 1 }, 100)),
      (500 / varters.length * i) + (500)
    );
  });
};

var fadeOut = (idx) => {
  var varters = shuffle($('[class*="char"]', $intro[idx]));
  $.each(varters, (i, el) => {
    setTimeout(() => ($(el).animate({ opacity: 0 }, 100)), (500 / varters.length * i));
  });
};

var next = () => {
  var lastStep = currentStep;
  currentStep = ++currentStep % $intro.length;
  fadeOut(lastStep);
  fadeIn(currentStep);
};

$(document).ready(() => {
  $intro = $('.intro .step');
  $intro.each((i, step) => {
    lineWrap(spanWrap($(step)));
    var opacity = (i === 0 ? '1' : '0');
    $("[class*='char']", $intro[i]).css('opacity', opacity);
  });
  setInterval(next, 4000);
});
