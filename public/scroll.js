$(document).ready(()  => {
  var wheel$ = Rx.Observable.fromEvent(document, 'wheel');
  var keyDown$ = Rx.Observable.fromEvent(document, 'keydown');
  var menuClick$ = Rx.Observable.fromEvent($('.contents'), 'click');

  var navBtns = Array.from($('[data-position]'));
  var indexOf = (e) => Number(e.target.dataset.position)
  var updateMenu = (idx) => $([navBtns[idx]]).addClass('active').siblings().removeClass('active')

  var scroll = (screenIdx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * screenIdx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * screenIdx}vh)` });
  }

  var bounceBack = () => {
    $('.left-scroll, .right-scroll').toggleClass('end-to-end')
    setTimeout(() => $('.left-scroll, .right-scroll').toggleClass('end-to-end'), 100)
  }

  var nextScreen = (screen) => {
    if (screen < 0 || screen > 6) bounceBack()
    return (screen + 7) % 7  // -1 => 6, 7 => 0
  }

  var clickOps = menuClick$
    .filter(click => click.target.tagName === 'LI')
    .map(click => (__) => indexOf(click))

  var arrowDeltas = keyDown$
    .filter(key => key.which === 40 || key.which === 38)
    .map(key => key.which === 40 ? 1 : -1)

  var wheelDeltas = wheel$
    .filter(wheel => Math.abs(wheel.deltaY) > 75) // Ignore tiny, lingering mousewheel events
    .throttleTime(700)
    .map(wheel => wheel.deltaY / Math.abs(wheel.deltaY))

  var arrowAndWheelActions = Rx.Observable.merge(arrowDeltas, wheelDeltas)
    .map(delta => currentScreen => nextScreen(currentScreen + delta))

// Merge menuClicks, keyscrolls, and wheels into a single stream, map them to computation fn's,
// then scan them to get the stream of active screens
  var screens = Rx.Observable.merge(clickOps, arrowAndWheelOps)
    .startWith(0)
    .scan((acc, curr) => curr(acc))
    .distinctUntilChanged()

  screens.forEach(screenIdx => {
    updateMenu(screenIdx);
    scroll(screenIdx);
  })

// Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });
})
