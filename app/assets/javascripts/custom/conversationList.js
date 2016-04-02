var ready = function () {
  $.get("/conversations", function (data) {
    $('.conversation-list').html(data);
  }, "html");

  $('#conversation-list-toggle').click(function(){
    var openState = $(this).data('open-state');
    if (openState) {
      $('.conversation-list')
        .slideUp(500);
      $(this).data('open-state', false);
    } else {
      $('.conversation-list')
        .slideDown(500);
      $(this).data('open-state', true);
    }
  })
}

$(document).ready(ready);
$(document).on("page:load", ready);
