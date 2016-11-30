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
console.log(activePane)


    if (!activePane) {
      code.toggleClass('out');
      activePanes[e.currentTarget.dataset.screen] = code;;
      codePane.toggleClass('up');
    } else {
      codePane.toggleClass('down');
      codePane.toggleClass('fall')
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
              codePane.toggleClass('fall');
            }, 25)
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
              codePane.toggleClass('fall');
            }, 10)
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
