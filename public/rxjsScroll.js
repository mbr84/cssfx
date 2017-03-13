document.addEventListener("DOMContentLoaded", () => {
  var wheels      = Rx.Observable.fromEvent(document, 'wheel');
  var keyScrolls  = Rx.Observable.fromEvent(document, 'keydown');
  var menuClicks  = Rx.Observable.fromEvent(document.querySelectorAll('.contents'), 'click');

  var menuItems   = Array.from(document.querySelectorAll('[data-position]'));

  var activeNow   = () => parseInt(document.querySelector('.active').getAttribute('data-position'))
  var updateMenu  = (idx) => $([menuItems[idx]]).addClass('active').siblings().removeClass('active')
  var displayDemo = () => $(`#${$('.active').data('position')}`).css('display', 'block')

  var scroll      = (idx) => {
    $('.left-scroll').css({ transform: `translateY(${-100 * idx}vh)` });
    $('.right-scroll').css({ transform: `translateY(${100 * idx}vh)` });
  }

  var activeScreens = Rx.Observable.merge(
    menuClicks.filter(click => click.target.tagName === 'LI')
      .map(click => click.target.dataset.position - activeNow()),
    Rx.Observable.merge(
      keyScrolls.filter(key => key.which === 40 || key.which === 38)
        .map(key => key.which === 40 ? 1 : -1),
      wheels.map(wheel => wheel.deltaY)
        .filter(dY => Math.abs(dY) > 75)
        .throttleTime(700)
        .map(dY => dY / Math.abs(dY))
      )
    )
    .startWith(0)
    .scan((lastActive, screensToTraverse) => lastActive + screensToTraverse)
    .filter(screen => 0 <= screen && screen <= 6)
    .distinctUntilChanged()

  activeScreens.forEach(screenNumber => {
    updateMenu(screenNumber);
    displayDemo();
    scroll(screenNumber);
  })
})
