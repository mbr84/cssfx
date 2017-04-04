'use strict';

/* eslint-disable no-undef */
$(document).ready(function () {
  var codeButtonClicks = Rx.Observable.fromEvent($('.code-button'), 'click');
  var animationEnds = Rx.Observable.fromEvent($('.code-snip'), 'animationend');

  var assignIds = function assignIds(klass) {
    return $('.' + klass).each(function (index) {
      return $(this).attr('id', klass + '-' + index);
    });
  };
  var getIdNum = function getIdNum(e) {
    return e.target.id.split('-')[2];
  };
  assignIds('code-button');
  assignIds('code-snip');

  var updateTransitionClasses = function updateTransitionClasses(el) {
    var shown = el.parent().children().filter(function () {
      return $(this).hasClass('show');
    }).addClass('fall');
    if (shown.length > 0) el.css('transition-delay', '.4s');
  };

  codeButtonClicks.map(function (e) {
    return $('#code-snip-' + getIdNum(e));
  }).do(function (el) {
    return updateTransitionClasses(el);
  }).forEach(function (codeSnip) {
    return codeSnip.addClass('show');
  });

  animationEnds.forEach(function (e) {
    e.target.style.transitionDelay = '0s';
    e.target.classList.remove('fall', 'show');
  });
});
