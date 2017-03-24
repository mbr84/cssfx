'use strict';

/* eslint-disable no-undef, func-names, one-var, one-var-declaration-per-line, no-param-reassign */
var $intro = void 0;
var currentStep = -1;

var spanWrap = function spanWrap(string) {
  $(string).each(function () {
    var str = $(this).html();

    var strArr = str.split('');

    var htmEl = '';
    for (var i = 0, len = strArr.length; i < len; i++) {
      if (strArr[i] === '<') {
        var j = i;
        while (strArr[i++] !== '>') {}
        htmEl += str.slice(j, i + 1);
      } else {
        htmEl += '<span class="char-' + i + '">' + strArr[i] + '</span>';
      }
    }

    $(this).html(htmEl);
    return $(this);
  });
};

var shuffle = function shuffle(array) {
  for (var i = 0; i < array.length; i++) {
    var temp = array[i];
    var j = Math.floor(Math.random() * i);
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var fadeIn = function fadeIn(idx) {
  var letters = shuffle($('[class*="char"]', $intro[idx]));
  $($intro[idx]).show();
  $.each(letters, function (i, el) {
    setTimeout(function () {
      return $(el).animate({ opacity: 1 }, 100);
    }, 500 / letters.length * i + 500);
  });
};

var fadeOut = function fadeOut(idx) {
  var letters = shuffle($('[class*="char"]', $intro[idx]));
  $.each(letters, function (i, el) {
    setTimeout(function () {
      return $(el).animate({ opacity: 0 }, 100);
    }, 500 / letters.length * i);
  });
};

var next = function next(skip) {
  var lastStep = currentStep;
  currentStep = ++currentStep % $intro.length;
  fadeOut(lastStep);
  fadeIn(currentStep);
};

$(document).ready(function () {
  setTimeout(next, 100);
  $intro = $('.intro .step');
  $intro.each(function (i, step) {
    spanWrap($(step));
    $("[class*='char']", $intro[i]).css('opacity', "0");
  });
  setInterval(next, 4000);
});