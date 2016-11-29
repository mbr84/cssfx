/* eslint-disable no-undef */

$(document).ready(() => {
  var codePanes = {
    one: [$("div[data-screen='one'] + .code-pane .out")],
    two: [$("div[data-screen='two'] + .code-pane .out")],
    three: [$("div[data-screen='three'] + .code-pane .out")],
    four: [$("div[data-screen='four'] + .code-pane .out")],
    five: [$("div[data-screen='five'] + .code-pane .out")],
    six: [$("div[data-screen='six'] + .code-pane .out")],
  }
  let zIndex = 2

  var showCode = (e) => {
    var code = $(`div[data-screen='${e.currentTarget.dataset.screen}'] + .code-pane div[data-lang='${e.target.dataset.lang}`);
    var codePane = codePanes[e.currentTarget.dataset.screen]
    if (code.hasClass('out')) {
      var topItem = codePane[codePane.length - 1];
      if (topItem.data('lang') !== (e.target.dataset.lang)) {
        topItem.toggleClass('out');
        codePane.pop()
        setTimeout(() => { showCode(e); }, 300)
      }
    } else {
      codePane.push(code)
      code.css('z-index', ++zIndex);
      code.toggleClass('out');
    }
  }

  $('.menu-bar').click((e) => {
    showCode(e);
  })
})
