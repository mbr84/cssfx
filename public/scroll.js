/* eslint-disable no-undef */

$(document).ready(() => {
  const scroll = (e) => {
    let top = $('.left-scroll').css('top');
    let bottom = $('.right-scroll').css('bottom');
    const inRange = $('.left-scroll').height() + (3 / 2) * $('.section1').offset().top !== 0;
    const menuItems = Array.from(document.querySelectorAll('[data-position]'));
    const currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
    if (currentIndex !== 0 && !currentIndex) { return; }
    let op, activeNow;
    const deltaY = (e.originalEvent ? e.originalEvent.deltaY || 0 : 0);
    if (typeof e === 'string') {
      top = bottom = e;
      op = '* -1 *';
      activeNow = currentIndex;
      menuItems[currentIndex] = {};
    } else if (e.which === 40 || deltaY > 0) {
      if (!inRange) { return; }
      activeNow = currentIndex + 1;
      op = '-';
    } else if (e.which === 38 || deltaY < 0) {
      if ($('.section1').offset().top === 0) { return; }
      op = '+';
      activeNow = currentIndex - 1;
    }
    menuItems[currentIndex].className = '';
    menuItems[activeNow].className = 'active';
    $('.left-scroll').css({ top: `calc(${top} ${op} 100%)` });
    $('.right-scroll').css({ bottom: `calc(${bottom} ${op} 100%)` });
  };

  // const clickScroll = (pos) => {
  //   $('.left-scroll').css({ top: `calc(${pos} * -100%)` });
  //   $('.right-scroll').css({ bottom: `calc(${pos} * -100%)` });
  // };

  $('.contents').click((e) => {
    document.getElementsByClassName('active')[0].className = '';
    e.target.className = 'active';
    scroll(e.target.dataset.position);
  });

  $(document).on('keydown', (e) => {
    if (e.which === 40 || e.which === 38) scroll(e);
  });

  let timestamp = 0;
  let lastFire = 0;
  let first = middle = 5;
  $(document).on('wheel', (e) => {
    const now = (new Date).getTime();
    const last = e.originalEvent.deltaY;
    if (Math.abs(middle) < 5) {
      first = middle = 5;
    } else if (now - timestamp > 200 && (middle > last && middle > first) || (middle < last && middle < first)) {
      scroll(e);
      timestamp = Date.parse(new Date);
    }
    first = middle;
    middle = last;
  });
});
