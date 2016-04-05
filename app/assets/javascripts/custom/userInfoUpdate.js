$(document).ready(function(){
  if ($('#user-info')[0]) {
    userId = $('#user-info').data('userid')
    $('.info-edit').submit(function(e){
      e.preventDefault();
    })
    updateUserInfo($('#email-display'),$('#email-edit-field'),$('#email-edit-handle'), 'email');
    updateUserInfo($('#school-display'),$('#school-edit-field'),$('#school-edit-handle'), 'school');
    updateUserInfo($('#specialty-display'),$('#specialty-edit-field'),$('#specialty-edit-handle'), 'specialty');
    $('#gender-select').change(function(){
      var jsonData = {'user': {}};
      jsonData['user']['gender'] = $(this).val();
      $.ajax({
        url: "/users/" + userId,
        dataType: 'json',
        type: 'PUT',
        data: jsonData,
        success: function(data) {
          displaySuccessMessage('Gender');
        },
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }
      });
    });
    $('#password-edit-handle').click(function(){
      $form = $('#password-change')
      if ($form.css('display')=='none') {
        $form.fadeIn();
      } else {
        $form.fadeOut();
      }
    });
    $('#password-change').fadeOut(function(){
      $(this).slideUp();
    });

    $('#avatar-edit-handle').click(function(){
      $('#user_image').trigger('click');
    })
    function uploadFile(event){
      file = event.target.files[0]
      var formData = new FormData();
      formData.append('image',file, file['name'])
      $.ajax({
        url: "/users/" + userId,
        type: 'PUT',
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }
      });
    }
    $('#user_image').change(uploadFile);
  }
});

function displaySuccessMessage(paramName){
  $('#'+paramName+'-status')
  .html(paramName+' Updated')
  .fadeIn(150)
  .delay(1000)
  .fadeOut(150)
}

function updateUserInfo ($display,$editField,$handle, paramName) {
  var userId = $('#user-info').data('userid');
  var initialValue = $editField.val();
  $handle.click(function(){
    $display.hide();
    $handle.hide();
    $editField.show();
    $editField.focus();
  });

  $editField.keypress(function(e) {
    if(e.which == 13) {
      $(this).blur();
    }
  });

  $editField.blur(function(){
    $display.show();
    $handle.show();
    $editField.hide();

    if ($editField.val() === '' || $editField.val() === initialValue) {
      return false
    }
    var jsonData = {'user': {}};
    jsonData['user'][paramName] = $editField.val();
    $.ajax({
      url: "/users/" + userId,
      dataType: 'json',
      type: 'PUT',
      data: jsonData,
      success: function(data) {
        var displayValue = $editField.val()
        if ($editField.val() == '') {
          displayValue = $display.text()
        }
        $display.html(displayValue);
        displaySuccessMessage(paramName);
      },
      error: function(xhr, status, err) {
        console.error( status, err.toString());
      }
    });
  });
}
