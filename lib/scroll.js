'use strict';

$(document).ready(function () {
  var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
  var menuClicks = Rx.Observable.fromEvent($('[data-position]'), 'click');
  var mobileButtons = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');
  var wheels = Rx.Observable.fromEvent(document, 'wheel');
  Rx.Observable.fromEvent($('pre'), 'wheel').forEach(function (e) {
    return e.stopPropagation();
  });

  var panes = $('.left-scroll, .right-scroll');
  var navBtns = Array.from($('[data-position]'));
  var scroll = function scroll(idx) {
    $('.left-scroll').css({ transform: 'translateY(' + -100 * idx + 'vh)' });
    $('.right-scroll').css({ transform: 'translateY(' + 100 * idx + 'vh)' });
  };
  var updateMenu = function updateMenu(idx) {
    return $([navBtns[idx]]).addClass('active').siblings().removeClass('active');
  };
  var updateScrollClasses = function updateScrollClasses(screen) {
    screen < 0 || screen > 6 ? panes.addClass('end-to-end') : panes.removeClass('end-to-end');
    return screen;
  };
  var nextScreen = function nextScreen(screen) {
    return (screen + 7) % 7;
  }; // -1 => 6, 7 => 0
  var indexOfClick = function indexOfClick(e) {
    return Number(e.target.dataset.position);
  };

  // Map keydowns, mobile button clicks, mousewheels, and menu clicks to computation fn's,
  // merge them into a single stream, then scan them to get the stream of focused screens
  var screens = keyDowns.filter(function (key) {
    return key.which === 40 || key.which === 38;
  }).map(function (key) {
    return key.which === 40 ? 1 : -1;
  }) // keypress moves us -/+ 1 screen (see line 30)
  .merge(mobileButtons.map(function (e) {
    return e.target.innerText === "Next" ? 1 : -1;
  }), wheels.filter(function (wheel) {
    return Math.abs(wheel.deltaY) > 75;
  }) // Ignore lingering mousewheel events
  .throttleTime(700).map(function (wheel) {
    return wheel.deltaY / Math.abs(wheel.deltaY);
  })).map(function (delta) {
    return function (fn) {
      return function (currentScreen) {
        return nextScreen(fn(currentScreen + delta));
      };
    };
  }).merge(menuClicks.map(function (click) {
    return function (fn) {
      return function (__) {
        return indexOfClick(fn(click));
      };
    };
  })).scan(function (acc, curr) {
    return curr(updateScrollClasses)(acc);
  }, 0);

  screens.forEach(function (screenIdx) {
    scroll(screenIdx);
    updateMenu(screenIdx);
  });
});