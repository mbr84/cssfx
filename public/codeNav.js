/* eslint-disable no-undef */

$(document).ready(() => {
  var activePanes = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  }

  var inTransition = false

  var showCode = (e) => {
    var code = $(`div[data-screen='${e.currentTarget.dataset.screen}'] + .code-pane div[data-lang='${e.target.dataset.lang}`);
    var codePane = $(`div[data-screen='${e.currentTarget.dataset.screen}'] + .code-pane`);
    var activePane = activePanes[e.currentTarget.dataset.screen]

    if (!activePane) {
      code.toggleClass('show');
      activePanes[e.currentTarget.dataset.screen] = code;
    } else {
      if (code.hasClass('show')) {
        code.toggleClass('fall');
        setTimeout(() => {
          code.toggleClass('show');
          activePanes[e.currentTarget.dataset.screen] = false;
          code.toggleClass('fall');
        }, 450);
      } else {
        activePane.toggleClass('fall');
        setTimeout(() => {
          code.toggleClass('show');
          activePane.toggleClass('show');
          activePanes[e.currentTarget.dataset.screen] = code;
          activePane.toggleClass('fall');
        }, 450)
      }
    }
  }

  $('.menu-bar').click((e) => {
    if (inTransition) return;
    inTransition = true;
    setTimeout(() => inTransition = false, 1000)
    showCode(e);
  })

})
