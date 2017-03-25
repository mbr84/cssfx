'use strict';

$(document).ready(function () {
  var wheels = Rx.Observable.fromEvent(document, 'wheel');
  var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
  var menuClicks = Rx.Observable.fromEvent($('[data-position]'), 'click');
  var mobileButtons = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');
  var transitions = Rx.Observable.fromEvent($('.left-scroll, .right-scroll'), 'transitionend');

  var navBtns = Array.from($('[data-position]'));
  var indexOf = function indexOf(e) {
    return Number(e.target.dataset.position);
  };
  var activeIdx = function activeIdx() {
    return navBtns.reduce(function (active, el, i) {
      return el.classList.contains('active') ? i : active;
    }, 0);
  };

  var leftScroll = document.querySelector('.left-scroll');
  var rightScroll = document.querySelector('.right-scroll');

  var updateMenu = function updateMenu(idx) {
    return $([navBtns[idx]]).addClass('active').siblings().removeClass('active');
  };
  var scroll = function scroll(nextScreenIdx) {
    leftScroll.classList.remove('screen' + activeIdx());
    rightScroll.classList.remove('screen' + activeIdx());
    leftScroll.classList.add('screen' + nextScreenIdx);
    rightScroll.classList.add('screen' + nextScreenIdx);
  };

  var onTransitionEnd = function onTransitionEnd() {
    leftScroll.classList.remove('ready--scroll', 'end-to-end');
    rightScroll.classList.remove('ready--scroll', 'end-to-end');
  };

  var bounceBack = function bounceBack() {
    $('.left-scroll, .right-scroll').toggleClass('end-to-end');
  };

  var readyScroll = function readyScroll() {
    leftScroll.classList.add('ready--scroll');
    rightScroll.classList.add('ready--scroll');
  };

  var nextScreen = function nextScreen(screen) {
    screen < 0 || screen > 6 ? bounceBack() : readyScroll();
    return (screen + 7) % 7; // -1 => 6, 7 => 0
  };

  // Map keydowns, mobile button clicks, mousewheels, and menu clicks to computation fn's,
  // merge them into a single stream, then scan them to get the stream of focused screens
  var screens = keyDowns.filter(function (key) {
    return key.which === 40 || key.which === 38;
  }).map(function (key) {
    return key.which === 40 ? 1 : -1;
  }) // keypress moves us -/+ 1 screen (see lines 30 & 33)
  .merge(mobileButtons.map(function (e) {
    return e.target.innerText === "Next" ? 1 : -1;
  }), wheels.filter(function (wheel) {
    return Math.abs(wheel.deltaY) > 75;
  }) // Ignore lingering mousewheel events
  .throttleTime(700).map(function (wheel) {
    return wheel.deltaY / Math.abs(wheel.deltaY);
  })).map(function (delta) {
    return function (currentScreen) {
      return nextScreen(currentScreen + delta);
    };
  }).merge(menuClicks.map(function (click) {
    return function (__) {
      return indexOf(click);
    };
  })).startWith(0).scan(function (acc, curr) {
    return curr(acc);
  }).distinctUntilChanged();

  transitions.forEach(onTransitionEnd);
  screens.forEach(function (screenIdx) {
    scroll(screenIdx);
    updateMenu(screenIdx);
  });

  // Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });
});