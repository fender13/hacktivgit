$('.page-connect').on('click', function(event) {
  event.preventDefault()
  const name = this.dataset.page
  $('.page').hide()
  $('.main-menu').show()
  $('.' + name).show()
})