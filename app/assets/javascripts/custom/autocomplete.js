function activateHospitalAutocomplete() {
  var hospitalNames = [];
  $('.hospital_names').data('hospitalNames').forEach(function(hospital){
    hospitalNames.push({'value': hospital['name']})
  });
  $('#hospital-autocomplete').autocomplete({
    source: hospitalNames
  });
}

function activateSchoolAutocomplete() {
  var schoolNames = ['Albert Einstein College of Medicine','Baylor College of Medicine','Boston University School of Medicine','California Northstate University College of Medicine','Case Western Reserve University School of Medicine','Central Michigan University College of Medicine','Charles E. Schmidt College of Medicine at Florida Atlantic University','Chicago Medical School at Rosalind Franklin University of Medicine & Science','Columbia University College of Physicians and Surgeons','Cooper Medical School of Rowan University','Creighton University School of Medicine','CUNY School of Medicine','Drexel University College of Medicine','Duke University School of Medicine','East Tennessee State University James H. Quillen College of Medicine','Eastern Virginia Medical School','Emory University School of Medicine','Florida State University College of Medicine','Frank H. Netter MD School of Medicine at Quinnipiac University','Geisel School of Medicine at Dartmouth','George Washington University School of Medicine and Health Sciences','Georgetown University School of Medicine','Harvard Medical School','Hofstra Northwell School of Medicine at Hofstra University','Howard University College of Medicine','Icahn School of Medicine at Mount Sinai','Indiana University School of Medicine','Jacobs School of Medicine and Biomedical Sciences at the University at Buffalo','Johns Hopkins University School of Medicine','Keck School of Medicine of the University of Southern California','Lewis Katz School of Medicine at Temple University','Loma Linda University School of Medicine','Louisiana State University School of Medicine in New Orleans','Louisiana State University School of Medicine in Shreveport','Loyola University Chicago Stritch School of Medicine','Marshall University Joan C. Edwards School of Medicine','Mayo Medical School','McGovern Medical School at the University of Texas Health Science Center at Houston','Medical College of Georgia at Augusta University','Medical College of Wisconsin','Medical University of South Carolina College of Medicine','Meharry Medical College','Mercer University School of Medicine','Michigan State University College of Human Medicine','Morehouse School of Medicine','New York Medical College','New York University School of Medicine','Northeast Ohio Medical University','Northwestern University Feinberg School of Medicine','Oakland University William Beaumont School of Medicine','Ohio State University College of Medicine','Oregon Health & Science University School of Medicine','Pennsylvania State University College of Medicine','Perelman School of Medicine at the University of Pennsylvania','Rush Medical College of Rush University Medical Center','Rutgers New Jersey Medical School','Rutgers, Robert Wood Johnson Medical School','Saint Louis University School of Medicine','Sidney Kimmel Medical College at Thomas Jefferson University','Southern Illinois University School of Medicine','Stanford University School of Medicine','State University of New York Downstate Medical Center College of Medicine','State University of New York Upstate Medical University','Stony Brook University School of Medicine','Temple University School of Medicine','Texas A&M Health Science Center College of Medicine','Texas Tech University Health Sciences Center Paul L. Foster School of Medicine','Texas Tech University Health Sciences Center School of Medicine','The Brody School of Medicine at East Carolina University','The Commonwealth Medical College','The University of Toledo College of Medicine','The Warren Alpert Medical School of Brown University','Tufts University School of Medicine','Tulane University School of Medicine','Uniformed Services University of the Health Sciences F. Edward Hebert School of Medicine','University of Alabama School of Medicine','University of Arizona College of Medicine','University of Arizona College of Medicine-Phoenix','University of Arkansas for Medical Sciences College of Medicine','University of California, Davis, School of Medicine','University of California, Irvine, School of Medicine','University of California, Los Angeles David Geffen School of Medicine','University of California, Riverside School of Medicine','University of California, San Diego School of Medicine','University of California, San Francisco, School of Medicine','University of Central Florida College of Medicine','University of Chicago Division of the Biological Sciences The Pritzker School of Medicine','University of Cincinnati College of Medicine','University of Colorado School of Medicine','University of Connecticut School of Medicine','University of Florida College of Medicine','University of Hawaii, John A. Burns School of Medicine','University of Illinois College of Medicine','University of Iowa Roy J. and Lucille A. Carver College of Medicine','University of Kansas School of Medicine','University of Kentucky College of Medicine','University of Louisville School of Medicine','University of Maryland School of Medicine','University of Massachusetts Medical School','University of Miami Leonard M. Miller School of Medicine','University of Michigan Medical School','University of Minnesota Medical School','University of Mississippi School of Medicine','University of Missouri-Columbia School of Medicine','University of Missouri-Kansas City School of Medicine','University of Nebraska College of Medicine','University of Nevada School of Medicine','University of New Mexico School of Medicine','University of North Carolina at Chapel Hill School of Medicine','University of North Dakota School of Medicine and Health Sciences','University of Oklahoma College of Medicine','University of Pittsburgh School of Medicine','University of Rochester School of Medicine and Dentistry','University of South Alabama College of Medicine','University of South Carolina School of Medicine','University of South Carolina School of Medicine Greenville','University of South Dakota, Sanford School of Medicine','University of Tennessee Health Science Center College of Medicine','University of Texas at Austin Dell Medical School','University of Texas Medical Branch School of Medicine','University of Texas Rio Grande Valley School of Medicine','University of Texas School of Medicine at San Antonio','University of Texas Southwestern Medical Center Southwestern Medical School','University of Utah School of Medicine','University of Vermont College of Medicine','University of Virginia School of Medicine','University of Washington School of Medicine','University of Wisconsin School of Medicine and Public Health','USF Health Morsani College of Medicine','Vanderbilt University School of Medicine','Virginia Commonwealth University School of Medicine','Virginia Tech Carilion School of Medicine','Wake Forest School of Medicine of Wake Forest Baptist Medical Center','Washington University in St. Louis School of Medicine','Wayne State University School of Medicine','Weill Cornell Medicine','West Virginia University School of Medicine','Western Michigan University Homer Stryker M.D. School of Medicine','Wright State University Boonshoft School of Medicine','Yale School of Medicine'
  ];
  $('.school-autocomplete').autocomplete({
    source: schoolNames
  });
}

function activateSpecialtyAutocomplete() {
  var specialtyNames = ['Anesthesiology',
  'Child Neurology (Neurology)',
  'Dermatology',
  'Diagnostic Radiology/Nuclear Medicine',
  'Emergency Medicine',
  'Emergency Medicine/Family Medicine',
  'Family Medicine',
  'Family Medicine/Preventive Medicine',
  'Internal Medicine',
  'Internal Medicine/Anesthesiology',
  'Internal Medicine/Dermatology',
  'Internal Medicine/Emergency Medicine',
  'Internal Medicine/Family Practice',
  'Internal Medicine/Medical Genetics',
  'Internal Medicine/Neurology',
  'Internal Medicine/Pediatrics',
  'Internal Medicine/Preventive Medicine',
  'Internal Medicine/Psychiatry',
  'Interventional Radiology',
  'Neurodevelopmental Disabilities (Neurology)',
  'Neurological Surgery',
  'Neurology',
  'Nuclear Medicine',
  'Obstetrics and Gynecology',
  'Orthopaedic Surgery',
  'Otolaryngology',
  'Pathology-Anatomic and Clinical',
  'Pediatrics',
  'Pediatrics/Anesthesiology',
  'Pediatrics/Dermatology',
  'Pediatrics/Emergency Medicine',
  'Pediatrics/Medical Genetics',
  'Pediatrics/Physical Medicine and Rehabilitation',
  'Pediatrics/Psychiatry/Child and Adolescent Psychiatry',
  'Physical Medicine and Rehabilitation',
  'Plastic Surgery',
  'Plastic Surgery-Integrated',
  'Preventive Medicine',
  'Psychiatry',
  'Psychiatry/Family Practice',
  'Psychiatry/Neurology',
  'Radiation Oncology',
  'Radiology-Diagnostic',
  'Surgery-General',
  'Thoracic Surgery-Integrated',
  'Urology',
  'Vascular Surgery-Integrated'];
  $('.specialty-autocomplete').autocomplete({
    source: specialtyNames
  });
}

$(document).on('keydown','.autocomplete-wrapper',function(){
  $autocomplete = $('.ui-autocomplete');
  maxWidth = $(this).width();
  if ($autocomplete.width()>maxWidth) {
    $autocomplete.css('max-width',maxWidth)
  }
})

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
  if ($('.school-autocomplete')[0]) {
    activateSchoolAutocomplete();
  }
  if ($('.specialty-autocomplete')[0]) {
    activateSpecialtyAutocomplete();
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
