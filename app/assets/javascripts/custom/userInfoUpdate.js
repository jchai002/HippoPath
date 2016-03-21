function updateUserInfo ($display,$editField,$handle, paramName) {
  $handle.click(function(){
    $display.hide();
    $editField.show();
    $editField.focus();
  });

  $editField.blur(function(){
    $display.show();
    $editField.hide();
    var jsonData = {'user': {}};
    jsonData['user'][paramName] = $editField.val();
    $.ajax({
    url: "/users/1",
    dataType: 'json',
    type: 'PUT',
    data: jsonData,
    success: function(data) {
      console.log(data)
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
