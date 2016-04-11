function activateHospitalAutocomplete() {
  var hospitalNames = [];
  $('.hospital_names').data('hospitalNames').forEach(function(hospital){
    hospitalNames.push({'value': hospital['name']})
  });
  $('#hospital-autocomplete').autocomplete({
    source: hospitalNames
  });
}

function activateHospitalEditAutocomplete(modalID) {
  var hospitalNames = [];
  $('.hospital_names').data('hospitalNames').forEach(function(hospital){
    hospitalNames.push({'value': hospital['name']})
  });
  $input = $('#autocomplete-hospital-edit-'+modalID)
  $input.autocomplete({
    source: hospitalNames
  });
}

$(window).load(function(){
  if ($('#hospital-autocomplete')[0]) {
    activateHospitalAutocomplete();
  }
});

$(window).on('shown.bs.modal', function() {
  $('.modal').each(function(){
    var $modal = $(this)
    if ($modal.data('bs.modal') && $modal.data('bs.modal').isShown) {
      var id = $(this).attr('id').slice(7,9)
      activateHospitalEditAutocomplete(id);
    }
  })
});
