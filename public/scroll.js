/* eslint-disable no-undef, one-var, one-var-declaration-per-line, no-param-reassign*/

$(document).ready(() => {
  var isMoving = false;
  var menuItems = Array.from(document.querySelectorAll('[data-position]'));
  var screensToTraverse, activeNow;

  var timer = (delay) => {
    var lastActive = $('.active').data('position');
    if (screensToTraverse === 0) {
      isMoving = false;
      return ;
    }
    setTimeout(() => {
      isMoving = false;
      $(`#${lastActive}`).css('display', 'none')
    }, delay);
  }

  var scroll = (e) => {
    if (!isMoving) {
      isMoving = true;
      then = (new Date).getTime();
      var atTop = $('.active').data('position') === 0;
      var atBottom = $('.active').data('position') === 6;
      var currentIndex = activeNow = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      var deltaY = e.originalEvent.deltaY || 0;

      if (e.which === 40 || deltaY > 0) {
        if (atBottom) {
          isMoving = false;
          return;
        }
        activeNow = currentIndex + screensToTraverse;

      } else if (e.which === 38 || deltaY < 0) {
        if (atTop) {
          isMoving = false;
          return;
        }
        activeNow = currentIndex - screensToTraverse;
      }

      var rightTransform = `translateY(${100 * activeNow}vh)`
      var leftTransform = `translateY(${-100 * activeNow}vh)`

      timer(850);

      $([menuItems[activeNow]]).addClass('active').siblings()
        .removeClass('active');
      $(`#${$('.active').data('position')}`).css('display', 'block');
      handleGooey();

      $('.left-scroll').css({ transform: leftTransform });
      $('.right-scroll').css({ transform: rightTransform });
    }
  };

  $('.contents').click((e) => {
    if (e.target.tagName === 'LI') {
      var currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      var direction = e.target.dataset.position - currentIndex;
      screensToTraverse = Math.abs(direction)
      $(`#${$('.active').data('position')}`).css('display', 'block');
      scroll({ which: {}, originalEvent: { deltaY: direction } });
    }
  });

  $(document).on('keydown', (e) => {
    screensToTraverse = 1;
    if (e.which === 40 || e.which === 38) { scroll(e) }
  });

  $(document).on('wheel', (e) => {
    screensToTraverse = 1;
    if (Math.abs(e.originalEvent.deltaY) > 35) scroll(e);
  });

  $('pre').on('wheel', function (e) {
    e.stopPropagation();
  });

  var paneToggle = () => {
    if (window.innerWidth < 800) {
      $('.right-container').css('width', '0');
      $('.left-container').css('width', '100vw');
      $('.goo-container').css('right', '10%')
    } else {
      $('.right-container').css('width', '50vw');
      $('.left-container').css('width', '50vw');
      $('.goo-container').css({right: '38%', width: '100%'})
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
    var space = `https://res.cloudinary.com/dxbwq1eyw/image/upload/c_fill,h_${window.innerHeight},w_${window.innerWidth},q_auto:low/v1480305081/stars2_qiu9qm.jpg`
    $('.layered-spinner').css({ 'background': `url('${space}')`, 'background-position': '100%'  })
    $('.section4').css({ 'background': `url('${space}')`})
    screensToTraverse = 0;
    scroll({ which: {}, originalEvent: { deltaY: 1 } });
    paneToggle();
  });


  var handleGooey = () => {
    if ($('.active').data('position') == 5) {
      setTimeout(() => $('#5').css('filter', "url('#goo')"), 600)
    }
  }
});
