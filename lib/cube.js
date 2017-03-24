'use strict';

/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttons').addEventListener('click', function (e) {
    document.getElementsByClassName('box')[0].className = 'box ' + e.target.dataset.face;
  });
  $(document).on('keyup', function (e) {
    var box = document.getElementsByClassName('box')[0];
    switch (e.which) {
      case 49:
        box.className = 'box show-front';
        break;
      case 50:
        box.className = 'box show-back';
        break;
      case 51:
        box.className = 'box show-right';
        break;
      case 52:
        box.className = 'box show-left';
        break;
      case 53:
        box.className = 'box show-top';
        break;
      case 54:
        box.className = 'box show-bottom';
        break;
    }
  });
});