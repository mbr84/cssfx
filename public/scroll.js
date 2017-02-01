/* eslint-disable no-undef, one-var, one-var-declaration-per-line, no-param-reassign*/

$(document).ready(() => {
  var isMoving = false;
  var menuItems = Array.from(document.querySelectorAll('[data-position]'));
  var screensToTraverse;

  var timer = (delay) => {
    var lastActive = $('.active').data('position');
    setTimeout(() => {
      isMoving = false;
      $(`#${lastActive}`).css('display', 'none')
    }, delay);
  }

  var matrixAndY = (currentMatrix) => {
    var newMatrix = currentMatrix.split(" ");
    var newMatrixY = newMatrix[newMatrix.length - 1];
    newMatrixY = newMatrixY.slice(0, newMatrixY.length - 1);
    return [parseInt(newMatrixY), newMatrix]
  }

  var newTransformMatrix = (values, direction) => {
    newY = values[0];
    matrix = values[1];
    newY += window.innerHeight * screensToTraverse * direction;
    newY += ")"
    matrix[matrix.length - 1] = newY
    return matrix
  }

  var scroll = (e) => {
    if (!isMoving) {
      isMoving = true;
      then = (new Date).getTime();
      var atTop = $('.active').data('position') === 0;

      leftMatrixAndY = matrixAndY($('.left-scroll').css('transform'));
      rightMatrixAndY = matrixAndY($('.right-scroll').css('transform'));

      var atBottom = $('.active').data('position') === 6;
      var currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      var deltaY = e.originalEvent.deltaY || 0;
      var activeNow, rightTransform, leftTransform;

      if (e.which === 40 || deltaY > 0) {
        if (atBottom) {
          isMoving = false;
          return;
        }

        activeNow = currentIndex + screensToTraverse;
        rightTransform = newTransformMatrix(rightMatrixAndY, 1)
        leftTransform = newTransformMatrix(leftMatrixAndY, -1)
      } else if (e.which === 38 || deltaY < 0) {
        if (atTop) {
          isMoving = false;
          return;
        }
        console.log(deltaY)

        activeNow = currentIndex - screensToTraverse;
        rightTransform = newTransformMatrix(rightMatrixAndY, -1)
        leftTransform = newTransformMatrix(leftMatrixAndY, 1)
      }

      timer(850);

      $([menuItems[activeNow]]).addClass('active').siblings()
        .removeClass('active');
      $(`#${$('.active').data('position')}`).css('display', 'block');
      handleGooey();

      $('.left-scroll').css({ transform: `${leftTransform.join(" ")}` });
      $('.right-scroll').css({ transform: `${rightTransform.join(" ")}` });
    }
  };

  var clickScroll = (pos) => {
    handleGooey();
    $('.left-scroll').css({ top: `calc(${pos} * -100%)` });
    $('.right-scroll').css({ bottom: `calc(${pos} * -100%)` });
  };

  $('.contents').click((e) => {
    if (e.target.tagName === 'LI') {
      var currentIndex = menuItems.indexOf(document.getElementsByClassName('active')[0]);
      var direction = e.target.dataset.position - currentIndex;
      screensToTraverse = Math.abs(direction)
      console.log(screensToTraverse)
      $(`#${$('.active').data('position')}`).css('display', 'block');
      scroll({ which: e.target.dataset.position, originalEvent: { deltaY: direction } });
    }
  });

  $(document).on('keydown', (e) => {
    screensToTraverse === 1;
    if (e.which === 40 || e.which === 38) scroll(e)
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
    $('.layered-spinner').css({ 'background': `url('${space}')` })
    $('.section4').css({ 'background': `url('${space}')` })
    clickScroll($('.active').data().position);
    paneToggle()
  });


  var handleGooey = () => {
    if ($('.active').data('position') == 5) {
      setTimeout(() => $('#5').css('filter', "url('#goo')"), 600)
    }
  }
});
