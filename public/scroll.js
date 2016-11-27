/* eslint-disable no-undef, one-var, one-var-declaration-per-line, no-param-reassign*/

$(document).ready(() => {
  let isMoving = false;
  const delay = 850;
  const scroll = (e) => {
    if (!isMoving) {
      isMoving = true;
      then = (new Date).getTime();
      const top = $('.left-scroll').css('top');
      const bottom = $('.right-scroll').css('bottom');
      const atBottom = $('.left-scroll').height() + (6 / 5) * $('.section1').offset().top === 0;
      const atTop = $('.section1').offset().top === 0;
      const menuItems = Array.from(document.querySelectorAll('[data-position]'));
      const currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      const deltaY = e.originalEvent.deltaY || 0;
      let op, activeNow;

      if (e.which === 40 || deltaY > 0) {
        if (atBottom) {
          isMoving = false;
          return;
        }

        activeNow = currentIndex + 1;
        op = '-';
      } else if (e.which === 38 || deltaY < 0) {
        if (atTop) {
          isMoving = false;
          return;
        }

        activeNow = currentIndex - 1;
        op = '+';
      }


      const lastActive = $('.active').data('position');
      setTimeout(() => {
        isMoving = false;
        $(`#${lastActive}`).css('display', 'none')
      }, delay);

      $([menuItems[activeNow]]).addClass('active').siblings()
        .removeClass('active');
      $(`#${$('.active').data('position')}`).css('display', 'block');

      $('.left-scroll').css({ top: `calc(${top} ${op} 100%)` });
      $('.right-scroll').css({ bottom: `calc(${bottom} ${op} 100%)` });
    }
  };

  const clickScroll = (pos) => {
    isMoving = true;
    setTimeout(() => { isMoving = false; }, 800);
    $('.left-scroll').css({ top: `calc(${pos} * -100%)` });
    $('.right-scroll').css({ bottom: `calc(${pos} * -100%)` });
  };

  $('.contents').click((e) => {
    if (e.target.tagName === 'LI') {
      $([e.target]).addClass('active').siblings()
      .removeClass('active');
      clickScroll(e.target.dataset.position);
    }
  });

  $(document).on('keydown', (e) => {
    if (e.which === 40 || e.which === 38) scroll(e);
  });

  $(document).on('wheel', (e) => {
    if (Math.abs(e.originalEvent.deltaY) > 35) scroll(e);
  });

  $(window).resize(() => { clickScroll($('.active').data().position); });
});
