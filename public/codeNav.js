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
  let zIndex = 2

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
      if (!code.hasClass('out')) {
        setTimeout(() => {
          codePane.toggleClass('hide-transition swing');
          setTimeout(() => {
            activePane.toggleClass('out');
            code.toggleClass('out');
            activePanes[e.currentTarget.dataset.screen] = code;

            codePane.toggleClass('down up');
            codePane.toggleClass('hide-transition swing');
            setTimeout(() => { codePane.toggleClass('up'); }, 25)
          }, 25)
        }, 500);
      } else {
        setTimeout(() => {
          code.toggleClass('out');
          activePanes[e.currentTarget.dataset.screen] = false;
          setTimeout(() => {
            codePane.toggleClass('hide-transition');
            codePane.toggleClass('down');
            setTimeout(() => codePane.toggleClass('hide-transition up'), 10)
          }, 25)
        }, 750)
      }
    }
  }

  $('.menu-bar').click((e) => {
    showCode(e);
  })

})
