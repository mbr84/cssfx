$(document).ready(() => {
  $('.open-menu-button').click(() => {
    $('.plus').toggleClass('plus-hide')
  })

  const fabDisplay = () => {
    if (window.innerWidth < 800) {
      $('#desktop').attr('id','mobile')
      $('.left-scroll .section6').append($('#mobile'))
    } else {
      $('#mobile').attr('id','desktop')
      $('.right-scroll .section6').append($('#desktop'))
    }
  }

  fabDisplay()
  $(window).resize(fabDisplay)

})
