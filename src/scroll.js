$(document).ready(()  => {
  const keyDowns = Rx.Observable.fromEvent(document, 'keydown');
  const menuClicks = Rx.Observable.fromEvent($('[data-position]'), 'click');
  const mobileButtons = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');
  const wheels = Rx.Observable.fromEvent(document, 'wheel');
  $('pre').on('wheel', e => e.stopPropagation())

  const panes = $('.left-scroll, .right-scroll')
  const navBtns = Array.from($('[data-position]'));
  const scroll = (idx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * idx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * idx}vh)` });
  }
  const updateMenu = idx => $([navBtns[idx]]).addClass('active').siblings().removeClass('active')
  const updateScrollClasses = (screen) => {
    screen < 0 || screen > 6 ? panes.addClass('end-to-end') : panes.removeClass('end-to-end')
    return screen
  }
  const nextScreen = screen => (screen + 7) % 7  // -1 => 6, 7 => 0
  const indexOfClick = e => Number(e.target.dataset.position)

  // Map keydowns, mobile button clicks, mousewheels, and menu clicks to computation fn's,
  // merge them into a single stream, then scan them to get the stream of focused screens
  const screens = keyDowns.filter(key => key.which === 40 || key.which === 38)
    .map(key => key.which === 40 ? 1 : -1)  // keypress moves us -/+ 1 screen (see line 30)
    .merge(
      mobileButtons.map(e => e.target.innerText === "Next" ? 1 : -1),
      wheels.filter(wheel => Math.abs(wheel.deltaY) > 75) // Ignore lingering mousewheel events
        .throttleTime(700)
        .map(wheel => wheel.deltaY / Math.abs(wheel.deltaY))
    )
    .map(delta => fn => currentScreen => nextScreen(fn(currentScreen + delta)))
    .merge(menuClicks.map(click => fn => (__) => indexOfClick(fn(click))))
    .scan((acc, curr) => curr(updateScrollClasses)(acc), 0)

  screens.forEach(screenIdx => {
    scroll(screenIdx);
    updateMenu(screenIdx);
  })
})
