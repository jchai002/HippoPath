function updateUserInfo ($display,$editField,$handle, paramName) {
  userId = $('#user-info').data('userid')
  $handle.click(function(){
    $display.hide();
    $handle.hide();
    $editField.show();
    $editField.focus();
  });

  $editField.change(function(){
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

  if ($('#user-address')[0]) {
    userId = $('#user-info').data('userid')
    $('#user-address').submit(function(e){
      e.preventDefault();
      var jsonData = {address: {
        street:$('#address_street').val(),
        apt: $('#address_apt').val(),
        city: $('#address_city').val(),
        state: $('#address_state').val(),
        zip: $('#address_zip').val()
      }};

      console.log(jsonData)
      $.ajax({
        url: "/assign_address_to_user/"+userId,
        dataType: 'json',
        type: 'PATCH',
        data: jsonData,
        success: function(data) {
          console.log('address saved')
        }
      });
    })
  }
});
