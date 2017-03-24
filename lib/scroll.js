'use strict';

$(document).ready(function () {
  var wheel$ = Rx.Observable.fromEvent(document, 'wheel');
  var keyDown$ = Rx.Observable.fromEvent(document, 'keydown');
  var menuClick$ = Rx.Observable.fromEvent($('.contents'), 'click');
  var mobileButton$ = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');

  var navBtns = Array.from($('[data-position]'));
  var indexOf = function indexOf(e) {
    return Number(e.target.dataset.position);
  };
  var activeIdx = function activeIdx() {
    return navBtns.reduce(function (active, el, i) {
      return el.classList.contains('active') ? i : active;
    }, 0);
  };
  var updateMenu = function updateMenu(idx) {
    return $([navBtns[idx]]).addClass('active').siblings().removeClass('active');
  };

  var scroll = function scroll(screenIdx) {
    $('.left-scroll').css({ transform: 'translateY(' + -100 * screenIdx + 'vh)' });
    $('.right-scroll').css({ transform: 'translateY(' + 100 * screenIdx + 'vh)' });
  };

  var bounceBack = function bounceBack() {
    $('.left-scroll, .right-scroll').toggleClass('end-to-end');
    setTimeout(function () {
      return $('.left-scroll, .right-scroll').toggleClass('end-to-end');
    }, 100);
  };

  var nextScreen = function nextScreen(screen) {
    if (screen < 0 || screen > 6) bounceBack();
    return (screen + 7) % 7; // -1 => 6, 7 => 0
  };

  // Map menuClicks, keyscrolls, and wheels to computation fn's, merge them
  //  into a single stream, then scan them to get the stream of active screens

  var arrowDelta$ = keyDown$.filter(function (key) {
    return key.which === 40 || key.which === 38;
  }).map(function (key) {
    return key.which === 40 ? 1 : -1;
  });

  var mobileButtonDelta$ = mobileButton$.map(function (e) {
    return e.target.innerText === "Next" ? 1 : -1;
  });

  var wheelDelta$ = wheel$.filter(function (wheel) {
    return Math.abs(wheel.deltaY) > 75;
  }) // Ignore tiny, lingering mousewheel events
  .throttleTime(700).map(function (wheel) {
    return wheel.deltaY / Math.abs(wheel.deltaY);
  });

  var scrollActions = Rx.Observable.merge(arrowDelta$, wheelDelta$, mobileButtonDelta$).map(function (delta) {
    return function (currentScreen) {
      return nextScreen(currentScreen + delta);
    };
  });

  var clickActions = menuClick$.filter(function (click) {
    return click.target.tagName === 'LI';
  }).map(function (click) {
    return function (__) {
      return indexOf(click);
    };
  });

  var screens = Rx.Observable.merge(clickActions, scrollActions).startWith(0).scan(function (acc, curr) {
    return curr(acc);
  }).distinctUntilChanged();

  screens.forEach(function (screenIdx) {
    updateMenu(screenIdx);
    scroll(screenIdx);
  });

  // Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });
});