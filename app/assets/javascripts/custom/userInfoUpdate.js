function updateUserInfo ($display,$editField,$handle, paramName) {
  userId = $('#user-info').data('userId')
  $handle.click(function(){
    $display.hide();
    $handle.hide();
    $editField.show();
    $editField.focus();
  });

  $editField.blur(function(){
    $display.show();
    $handle.show();
    $editField.hide();
    var jsonData = {'user': {}};
    jsonData['user'][paramName] = $editField.val();
    $.ajax({
    url: "/users/" + userId,
    dataType: 'json',
    type: 'PUT',
    data: jsonData,
    success: function(data) {
      console.log($editField.val())
      $display.html($editField.val())
    },
    error: function(xhr, status, err) {
      console.error( status, err.toString());
    }
  });

  });
}


$(document).ready(function(){
  updateUserInfo($('#email-display'),$('#email-edit-field'),$('#email-edit-handle'), 'email');
});
