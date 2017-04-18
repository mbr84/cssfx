$(document).ready(() => {
  const codeButtonClicks = Rx.Observable.fromEvent($('.code-button'), 'click');
  const animationEnds = Rx.Observable.fromEvent($('.code-snip'), 'animationend');
  const isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) {
    Rx.Observable.fromEvent($('.code-snip'), 'transitionend')
      .map(e => $(`#code-snip-${getIdNum(e)}`))
      .forEach(codeSnip => {
        codeSnip.css('display', 'none')
        codeSnip.outerHeight();
        codeSnip.css('display', '')
      })
  }

  const getIdNum = e => e.target.id.split('-')[2]
  const updateTransitionClasses = el  => {
    const shown =  el.parent().children()
      .filter(() => $(this).hasClass('show'))
      .addClass('fall')
    if (shown.length > 0) el.css('transition-delay', '.4s')
  }

  codeButtonClicks.map(e => $(`#code-snip-${getIdNum(e)}`))
    .do(el => updateTransitionClasses(el))
    .forEach(codeSnip => codeSnip.addClass('show'))

  animationEnds.forEach(e => {
    e.target.style.transitionDelay = '0s'
    e.target.classList.remove('fall', 'show');
  })
})
