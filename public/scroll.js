/* eslint-disable no-undef, one-var, one-var-declaration-per-line, no-param-reassign*/

$(document).ready(() => {
  var isMoving = false;

  var timer = (delay) => {
    var lastActive = $('.active').data('position');
    setTimeout(() => {
      isMoving = false;
      $(`#${lastActive}`).css('display', 'none')
    }, delay);
  }

  var scroll = (e) => {
    if (!isMoving) {
      isMoving = true;
      then = (new Date).getTime();
      var top = $('.left-scroll').css('top');
      var atTop = $('.active').data('position') === 0;
      var bottom = $('.right-scroll').css('bottom');
      var atBottom = $('.active').data('position') === 6;
      var menuItems = Array.from(document.querySelectorAll('[data-position]'));
      var currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      var deltaY = e.originalEvent.deltaY || 0;
      var operand, activeNow;
      if (e.which === 40 || deltaY > 0) {
        if (atBottom) {
          isMoving = false;
          return;
        }

        activeNow = currentIndex + 1;
        operand = '-';
      } else if (e.which === 38 || deltaY < 0) {
        if (atTop) {
          isMoving = false;
          return;
        }

        activeNow = currentIndex - 1;
        operand = '+';
      }

      timer(850);

      $([menuItems[activeNow]]).addClass('active').siblings()
        .removeClass('active');
      $(`#${$('.active').data('position')}`).css('display', 'block');
      handleGooey();

      $('.left-scroll').css({ top: `calc(${top} ${operand} 100%)` });
      $('.right-scroll').css({ bottom: `calc(${bottom} ${operand} 100%)` });
    }
  };

  var clickScroll = (pos) => {
    handleGooey();
    $('.left-scroll').css({ top: `calc(${pos} * -100%)` });
    $('.right-scroll').css({ bottom: `calc(${pos} * -100%)` });
  };

  $('.contents').click((e) => {
    if (e.target.tagName === 'LI') {
      isMoving = true;
      timer(800)
      $([e.target]).addClass('active').siblings()
        .removeClass('active');
      $(`#${$('.active').data('position')}`).css('display', 'block');
      clickScroll(e.target.dataset.position);
    }
  });

  $(document).on('keydown', (e) => {
    if (e.which === 40 || e.which === 38) scroll(e);
  });

  $(document).on('wheel', (e) => {
    if (Math.abs(e.originalEvent.deltaY) > 35) scroll(e);
  });

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });

  var paneToggle = () => {
    if (window.innerWidth < 800) {
      $('.right-container').css('width', '0');
      $('.left-container').css('width', '100vw');
      $('.goo-container').css('left', '10%')
    } else {
      $('.right-container').css('width', '50vw');
      $('.left-container').css('width', '50vw');
      $('.goo-container').css('left', '65%')
    }
  }

  var mobileSection = 0;

  $('.mobile-buttons').on('click touch', (e) => {
    var top = $('.left-scroll').css('top');
    var sign = (e.target.innerText === "Next" ? -1 : 1)
    if ((sign === -1 && top === (window.innerHeight * -6) + "px") || (sign === 1 && top === "0px")) {
      return;
    }
    setTimeout(() => $(`#${mobileSection}`).css('display', 'none'), 300)
    mobileSection -= sign;
    setTimeout(() => $(`#${mobileSection}`).css('display', 'block'), 300)

    $('.left-scroll').css({ top: `calc(${top} + (${sign} * 100vh))` });
  })

  $(window).resize(() => {
    var space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth}/v1480305081/stars2_qiu9qm.jpg`
    $('.layered-spinner').css({ 'background-image': `url('${space}')` })
    $('.section4').css({ 'background-image': `url('${space}')` })
    clickScroll($('.active').data().position);
    paneToggle()
  });


  var handleGooey = () => {
    if ($('.active').data('position') == 5) {
      setTimeout(() => $('#5').css('filter', "url('#goo')"), 600)
    }
  }
});
