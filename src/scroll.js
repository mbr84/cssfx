$(document).ready(()  => {
  const wheels = Rx.Observable.fromEvent(document, 'wheel');
  const keyDowns = Rx.Observable.fromEvent(document, 'keydown');
  const menuClicks = Rx.Observable.fromEvent($('[data-position]'), 'click');
  const mobileButtons = Rx.Observable.fromEvent($('.mobile-buttons'), 'click touch');
  const transitions = Rx.Observable.fromEvent($('.left-scroll, .right-scroll'), 'transitionend')

  const navBtns = Array.from($('[data-position]'));
  const indexOf = (e) => Number(e.target.dataset.position)
  const activeIdx = () => navBtns.reduce((active, el, i) => el.classList.contains('active') ? i : active, 0)

  const leftScroll = document.querySelector('.left-scroll')
  const rightScroll = document.querySelector('.right-scroll')

  const updateMenu = (idx) => $([navBtns[idx]]).addClass('active').siblings().removeClass('active')
  const scroll = (nextScreenIdx) => {
    leftScroll.classList.remove(`screen${activeIdx()}`)
    rightScroll.classList.remove(`screen${activeIdx()}`)
    leftScroll.classList.add(`screen${nextScreenIdx}`)
    rightScroll.classList.add(`screen${nextScreenIdx}`)
  }

  const onTransitionEnd = () => {
    leftScroll.classList.remove('ready--scroll', 'end-to-end' )
    rightScroll.classList.remove('ready--scroll', 'end-to-end' )
  }

  const bounceBack = () => {
    $('.left-scroll, .right-scroll').toggleClass('end-to-end')
  }

  const readyScroll = () => {
    leftScroll.classList.add('ready--scroll')
    rightScroll.classList.add('ready--scroll')
  }

  const nextScreen = (screen) => {
    screen < 0 || screen > 6 ? bounceBack() : readyScroll()
    return (screen + 7) % 7  // -1 => 6, 7 => 0
  }

  // Map keydowns, mobile button clicks, mousewheels, and menu clicks to computation fn's,
  // merge them into a single stream, then scan them to get the stream of focused screens
  const screens = keyDowns.filter(key => key.which === 40 || key.which === 38)
    .map(key => key.which === 40 ? 1 : -1)  // keypress moves us -/+ 1 screen (see lines 30 & 33)
    .merge(
      mobileButtons.map(e => e.target.innerText === "Next" ? 1 : -1),
      wheels.filter(wheel => Math.abs(wheel.deltaY) > 75) // Ignore lingering mousewheel events
        .throttleTime(700)
        .map(wheel => wheel.deltaY / Math.abs(wheel.deltaY))
    )
    .map(delta => currentScreen => nextScreen(currentScreen + delta))
    .merge(menuClicks.map(click => (__) => indexOf(click)))
    .startWith(0)
    .scan((acc, curr) => curr(acc))
    .distinctUntilChanged()

  transitions.forEach(onTransitionEnd)
  screens.forEach(screenIdx => {
    scroll(screenIdx);
    updateMenu(screenIdx);
  })

// Stop scroll propagation on scrollable child elements. (In our case they're all <pre>'s)

  $('pre').on('wheel', (e) => {
    e.stopPropagation();
  });
})
