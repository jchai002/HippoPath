function activateAutocomplete() {
  var hospitalNames = [];
  $('.hospital_names').data('hospitalNames').forEach(function(hospital){
    hospitalNames.push({'value': hospital['name']})
  });
  $('#autocomplete').autocomplete({
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

function activateStateAutocomplete() {
  var $input = $('#state-autocomplete');
  var states = ["AL",
                "AK (Alaska)",
                "AS (American Samoa)",
                "AZ (Arizona)",
                "AR (Arkansas)",
                "CA (California)",
                "CO (Colorado)",
                "CT (Connecticut)",
                "DE (Delaware)",
                "DC (District Of Columbia)",
                "FM (Federated States Of Micronesia)",
                "FL (Florida)",
                "GA (Georgia)",
                "GU (Guam)",
                "HI (Hawaii)",
                "ID (Idaho)",
                "IL (Illinois)",
                "IN (Indiana)",
                "IA (Iowa)",
                "KS (Kansas)",
                "KY (Kentucky)",
                "LA (Louisiana)",
                "ME (Maine)",
                "MH (Marshall Islands)",
                "MD (Maryland)",
                "MA (Massachusetts)",
                "MI (Michigan)",
                "MN (Minnesota)",
                "MS (Mississippi)",
                "MO (Missouri)",
                "MT (Montana)",
                "NE (Nebraska)",
                "NV (Nevada)",
                "NH (New Hampshire)",
                "NJ (New Jersey)",
                "NM (New Mexico)",
                "NY (New York)",
                "NC (North Carolina)",
                "ND (North Dakota)",
                "MP (Northern Mariana Islands)",
                "OH (Ohio)",
                "OK (Oklahoma)",
                "OR (Oregon)",
                "PW (Palau)",
                "PA (Pennsylvania)",
                "PR (Puerto Rico)",
                "RI (Rhode Island)",
                "SC (South Carolina)",
                "SD (South Dakota)",
                "TN (Tennessee)",
                "TX (Texas)",
                "UT (Utah)",
                "VT (Vermont)",
                "VI (Virgin Islands)",
                "VA (Virginia)",
                "WA (Washington)",
                "WV (West Virginia)",
                "WI (Wisconsin)",
                "WY (Wyoming)"];
  $input.autocomplete({
    source: states
  });
  $input.blur(function(){
    var oldValue = $input.val();
    var newValue = oldValue.substring(0,2);
    $input.val(newValue);
  })
}


$(window).load(function(){
  if ($('#autocomplete')[0]) {
    activateAutocomplete();
  }

  if ($('#state-autocomplete')[0]) {
    activateStateAutocomplete()
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
