$(document).ready(function(){
  if ($('#password-change')[0]) {
    $password_container = $('#password_container')
    $password = $('#password');
    $password_error = $('#password_error');
    $confirm_container = $('#password_confirmation_container')
    $confirm =  $('#password_confirmation');
    $confirm_error = $('#password_confirmation_error');

    function validatePassword() {
      var validated = true
      if ($password.val().length < 8) {
        $password_container.addClass('has-error')
        $password_error.text('password must be longer than 8 characters')
        validated = false
      }
      if ($confirm.val() != $password.val()) {
        console.log('confrimation fail')
        $confirm_container.addClass('has-error')
        $confirm_error.text('password and confrimation did not match')
        validated = false
      }
      return validated
    }

    $('#password-change').submit(function(){
      var validationState = validatePassword();
      if (validationState === true) {
        return true
      } else {
        return false
      }
    });

    $password.keyup(function(){
      if ($password.val().length >= 8) {
        $password_container.removeClass('has-error')
        $password_error.text('')
      }
    })

    $confirm.keyup(function(){
      if ($confirm.val()===$password.val()) {
        $confirm_container.removeClass('has-error')
        $confirm_error.text('')
      }
    })
  }
})
