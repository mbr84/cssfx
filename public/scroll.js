document.addEventListener("DOMContentLoaded", () => {
  var wheels      = Rx.Observable.fromEvent(document, 'wheel');
  var keyScrolls  = Rx.Observable.fromEvent(document, 'keydown');
  var menuClicks  = Rx.Observable.fromEvent(document.querySelectorAll('.contents'), 'click');

  // Each nav button has an HTML attribute 'data-position.' Anything
  // with a 'data position' attribute is a button on the nav bar

  var navBtns     = Array.from(document.querySelectorAll('[data-position]'));

  // Each button's 'data-position' attribute gives the 'index' of the screen it links to

  var indexOf     = (e) => e.target.dataset.position
  var activeNow   = () => parseInt(document.querySelector('.active').getAttribute('data-position'))
  var updateMenu  = (idx) => $([navBtns[idx]]).addClass('active').siblings().removeClass('active')

  var scroll      = (idx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * idx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * idx}vh)` });
  }

  // Merge menuClicks, keyscrolls, and wheels into a single stream

  var screens     = Rx.Observable.merge(
    menuClicks.filter(click => click.target.tagName === 'LI')

      // Get the number of screens between the screen we're navigating to
      // and the screen we're currently on

      .map(clickedButton => indexOf(clickedButton) - activeNow()),
    keyScrolls.filter(key => key.which === 40 || key.which === 38)

      // Up and down arrows move us up or down by one screen.
      // Wheel events do the same (line 44).

      .map(key => key.which === 40 ? 1 : -1),
    wheels.map(wheel => wheel.deltaY)

      // Ignore lingering mousewheel events with low deltaY properties, so we
      // can set throttleTime as low as possible and keep the page responsive

      .filter(dY => Math.abs(dY) > 75)
      .throttleTime(700)
      .map(dY => dY / Math.abs(dY))
    )
    .scan((currentScreen, screensToTraverse) => currentScreen + screensToTraverse, 0) // start on 0th screen
    .distinctUntilChanged() // Ignore click if screen is already active
    .filter(screenIdx => screenIdx >= 0 && screenIdx <= 6)

  screens.forEach(screenIdx => {
    updateMenu(screenIdx);
    scroll(screenIdx);
  })

  // Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });
})
