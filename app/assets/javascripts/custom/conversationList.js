var ready = function () {
  $('#conversation-list-toggle').click(function(){
    var openState = $(this).data('open-state')
    if (!openState) {
      hasData = false
      function onSuccess() {
        hasData = true
      }

      if (!hasData) {
        $('#menu-bar').append('<div class="conversation-list"></div>')
        $.get("/conversations", function (data) {
          $('.conversation-list').html(data);
        }, onSuccess(), "html");
      } else {
        $('.conversation-list').show();
      }
      $(this).data('open-state', true)
    } else {
      $('.conversation-list').slideUp();
      $(this).data('open-state', null);
    }
  })
}

$(document).ready(ready);
$(document).on("page:load", ready);
