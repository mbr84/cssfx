$(document).ready(()  => {
  const wheel$ = Rx.Observable.fromEvent(document, 'wheel');
  const keyDown$ = Rx.Observable.fromEvent(document, 'keydown');
  const menuClick$ = Rx.Observable.fromEvent($('.contents'), 'click');
  const mobileButton$ = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');

  const navBtns = Array.from($('[data-position]'));
  const indexOf = (e) => Number(e.target.dataset.position)
  const activeIdx = () => navBtns.reduce((active, el, i) => el.classList.contains('active') ? i : active, 0)
  const updateMenu = (idx) => {
    navBtns[activeIdx()].classList.remove('active')
    navBtns[idx].classList.add('active')
  }

  const scroll = (screenIdx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * screenIdx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * screenIdx}vh)` });
  }

  const bounceBack = () => {
    $('.left-scroll, .right-scroll').toggleClass('end-to-end')
    setTimeout(() => $('.left-scroll, .right-scroll').toggleClass('end-to-end'), 100)
  }

  const nextScreen = (screen) => {
    if (screen < 0 || screen > 6) bounceBack()
    return (screen + 7) % 7  // -1 => 6, 7 => 0
  }

  // Map menuClicks, keyscrolls, and wheels to computation fn's, merge them
  //  into a single stream, then scan them to get the stream of active screens

  const arrowDelta$ = keyDown$
    .filter(key => key.which === 40 || key.which === 38)
    .map(key => key.which === 40 ? 1 : -1)

  const mobileButtonDelta$ = mobileButton$
    .map(e => e.target.innerText === "Next" ? 1 : -1)

  const wheelDelta$ = wheel$
    .filter(wheel => Math.abs(wheel.deltaY) > 75) // Ignore tiny, lingering mousewheel events
    .throttleTime(700)
    .map(wheel => wheel.deltaY / Math.abs(wheel.deltaY))

  const scrollActions = Rx.Observable.merge(arrowDelta$, wheelDelta$, mobileButtonDelta$)
    .map(delta => currentScreen => nextScreen(currentScreen + delta))

  const clickActions = menuClick$
    .filter(click => click.target.tagName === 'LI')
    .map(click => (__) => indexOf(click))

  const screens = Rx.Observable.merge(clickActions, scrollActions)
    .startWith(0)
    .scan((acc, curr) => curr(acc))
    .distinctUntilChanged()

  screens.forEach(screenIdx => {
    updateMenu(screenIdx);
    scroll(screenIdx);
  })

// Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', (e) => {
    e.stopPropagation();
  });
})
