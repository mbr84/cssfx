document.addEventListener("DOMContentLoaded", () => {
  var wheels      = Rx.Observable.fromEvent(document, 'wheel');
  var keyScrolls  = Rx.Observable.fromEvent(document, 'keydown');
  var menuClicks  = Rx.Observable.fromEvent(document.querySelectorAll('.contents'), 'click');

  // Each nav button has an HTML attribute, 'data-position.' Anything
  // with a 'data position' attribute is a button on the nav bar

  var navBtns     = Array.from(document.querySelectorAll('[data-position]'));

  // 'data-position' gives the index of the corresponding screen in the order of screens

  var activeNow   = () => parseInt(document.querySelector('.active').getAttribute('data-position'))
  var updateMenu  = (idx) => $([navBtns[idx]]).addClass('active').siblings().removeClass('active')

  var scroll      = (idx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * idx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * idx}vh)` });
  }

  var screens     = Rx.Observable.merge(
    menuClicks.filter(click => click.target.tagName === 'LI')

      // get the number of screens between the clicked screen we're navigating to
      // and the screen we're currently on

      .map(click => click.target.dataset.position - activeNow()),
    keyScrolls.filter(key => key.which === 40 || key.which === 38)

      // Up and down arrows move us up or down one one screen
      // Mousewheels do the same (line 41).

      .map(key => key.which === 40 ? 1 : -1),
    wheels.map(wheel => wheel.deltaY)

      // ignore lingering mousewheel events with very low deltaY properties,
      // so we can set throttleTime as low as possible and keep the page responsive

      .filter(dY => Math.abs(dY) > 75)
      .throttleTime(700)
      .map(dY => dY / Math.abs(dY))
    )
    //could provide 0 as start value for scan, but parameter are in opposite order of
    //reduce, so I'm using this startWith(0) to make it a little more readable
    .startWith(0)
    .scan((currentScreen, screensToTraverse) => currentScreen + screensToTraverse)
    .filter(screen => screen >= 0 && screen <= 6)
    .distinctUntilChanged()

  screens.forEach(screen => {
    updateMenu(screen);
    scroll(screen);
  })

  // stop scroll propagation on scrollable child elements

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });

})
