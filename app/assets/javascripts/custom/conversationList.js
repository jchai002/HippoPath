var ready = function () {
  $.get("/conversations", function (data) {
    $('.conversation-container').html(data);
  }, "html");

  $('#conversation-container-toggle').click(function(){
    var openState = $(this).data('open-state');
    if (openState) {
      $('.conversation-container')
        .slideUp(500);
      $(this).data('open-state', false);
    } else {
      $('.conversation-container')
        .slideDown(500);
      $(this).data('open-state', true);
    }
  })
}

$(document).ready(ready);
$(document).on("page:load", ready);
