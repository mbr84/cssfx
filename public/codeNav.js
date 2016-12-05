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
      code.toggleClass('out');
      activePanes[e.currentTarget.dataset.screen] = code;
      codePane.toggleClass('up');
      if (!codePane.hasClass('fall')) setTimeout(() => codePane.toggleClass('fall'), 10)
    } else {
      codePane.toggleClass('down');
      setTimeout(() => codePane.toggleClass('fall'), 50)
      if (!code.hasClass('out')) {
        setTimeout(() => {
          codePane.toggleClass('hide-transition swing');
          setTimeout(() => {
            activePane.toggleClass('out');
            code.toggleClass('out');
            activePanes[e.currentTarget.dataset.screen] = code;

            codePane.toggleClass('down up');
            codePane.toggleClass('hide-transition swing');
            setTimeout(() => {
              codePane.toggleClass('up')
              setTimeout(() => codePane.toggleClass('fall'), 10)
            }, 35)
          }, 25)
        }, 300);
      } else {
        setTimeout(() => {
          code.toggleClass('out');
          activePanes[e.currentTarget.dataset.screen] = false;
          setTimeout(() => {
            codePane.toggleClass('hide-transition');
            codePane.toggleClass('down');
            setTimeout(() => {
              codePane.toggleClass('hide-transition up');
              // setTimeout(() => codePane.toggleClass('fall'), 10)
            }, 35)
          }, 25)
        }, 300)
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
