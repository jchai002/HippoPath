function updateUserInfo ($display,$editField,$handle, paramName) {
  userId = $('#user-info').data('userid')
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
        var displayValue = $editField.val()
        if ($editField.val() == '') {
          displayValue = 'unknown'
        }
        $display.html(displayValue)
      },
      error: function(xhr, status, err) {
        console.error( status, err.toString());
      }
    });
  });
}

$(document).ready(function(){
  if ($('#user-info')[0]) {
    $('.info-edit').submit(function(e){
      e.preventDefault();
    })
    updateUserInfo($('#email-display'),$('#email-edit-field'),$('#email-edit-handle'), 'email');
    updateUserInfo($('#school-display'),$('#school-edit-field'),$('#school-edit-handle'), 'school');
    updateUserInfo($('#specialty-display'),$('#specialty-edit-field'),$('#specialty-edit-handle'), 'specialty');
    $('#gender-select').change(function(){
      userId = $('#user-info').data('userid')
      var jsonData = {'user': {}};
      jsonData['user']['gender'] = $(this).val();
      $.ajax({
        url: "/users/" + userId,
        dataType: 'json',
        type: 'PUT',
        data: jsonData,
        success: function(data) {
          console.log('gender change success')
        },
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }
      });
    })
  }
});
