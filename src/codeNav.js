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

  $('.code-snip').each(function(index) {
    var newId = 'code-snip' + "_" + index
    $(this).attr('id', newId)
    if ($(this).height() > 300) {
      $(`#${newId}`).toggleClass('long-pane')
    } else if ($(this).height() > 200) {
      $(`#${newId}`).toggleClass('medium-pane')
    } else {
      $(`#${newId}`).toggleClass('short-pane')
    }
  })

  let inTransition = false

  const showCode = (e) => {
    const code = $(`div[data-screen='${e.currentTarget.dataset.screen}'] + .code-pane div[data-lang='${e.target.dataset.lang}']`);
    const codePane = $(`div[data-screen='${e.currentTarget.dataset.screen}'] + .code-pane`);
    const activePane = activePanes[e.currentTarget.dataset.screen]

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
    if (e.target.classList[0] === "code-button") {
      inTransition = true;
      setTimeout(() => inTransition = false, 1000)
      showCode(e);
    }
  })

})