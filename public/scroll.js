/* eslint-disable no-undef */

$(document).ready(() => {
  let timestamp = 0;
  let lastFire = 0;

  $('.contents').click((e) => {
    const clickScroll = (pos) => {
      $('.left-scroll').css({ top: `calc(${pos} * -100%)` });
      $('.right-scroll').css({ bottom: `calc(${pos} * -100%)` });
    };
    document.getElementsByClassName('active')[0].className = '';
    e.target.className = 'active';
    clickScroll(e.target.dataset.position);
  });

  $(document).on('wheel', (e) => {
    const now = (new Date).getTime();
    if (now - timestamp > 700 && now - lastFire > 200) {
      const top = $('.left-scroll').css('top');
      const bottom = $('.right-scroll').css('bottom');
      if (e.originalEvent.deltaY > 0) {
        $('.left-scroll').css({ top: `calc(${top} - 100%)` });
        $('.right-scroll').css({ bottom: `calc(${bottom} - 100%)` });
      } else {
        $('.left-scroll').css({ top: `calc(${top} + 100%)` });
        $('.right-scroll').css({ bottom: `calc(${bottom} + 100%)` });
      }
      timestamp = Date.parse(new Date);
    }
    lastFire = now;
  });
});
