function activateHospitalAutocomplete() {
  var hospitalNames = ["University of Alabama Medical Center (Montgomery)","Maricopa Medical Center","St Joseph's Hospital and Medical Center","University of Arizona College of Medicine at South Campus","University of Arizona College of Medicine-Phoenix","Mayo Clinic College of Medicine (Arizona)","University of Arkansas College of Medicine","University of Arkansas for Medical Sciences","Eisenhower Medical Center","Kaiser Permanente Southern California","University of California Riverside School of Medicine","Arrowhead Regional Medical Center","Cedars-Sinai Medical Center","White Memorial Medical Center","Huntington Memorial Hospital","Los Angeles County-Harbor- UCLA Medical Center","Kaiser Permanente Southern California (Los Angeles)","Kaiser Permanente Medical Group (Northern California/Oakland","Kaiser Permanente Medical Group (Northern California)/San Francisco","California Pacific Medical Center","San Joaquin General Hospital","University of California (Davis) Health System","University of California (Irvine)","Loma Linda University Health Education Consortium","Olive View/UCLA Medical Center","University of California (San Diego)","University of California (San Francisco)","Kaiser Permanente Medical Group (Northern California)/Santa","Stanford University","Scripps Clinic/Scripps Green Hospital","St Mary's Hospital and Medical Center","Santa Barbara Cottage Hospital","Kern Medical Center","St Mary Medical Center","Santa Clara Valley Medical Center","Parkview Medical Center","Saint Joseph Hospital","Connecticut Institute For Communities/Greater Danbury","Yale-New Haven Medical Center (Waterbury)","Bridgeport Hospital/Yale University","St Vincent's Medical Center","Danbury Hospital","Stamford Hospital/Columbia University College of Physicians","St Mary's Hospital (Waterbury)","Greenwich Hospital Association","Yale-New Haven Medical Center","University of Connecticut","Griffin Hospital","Norwalk Hospital/Yale University","Georgetown University Hospital","George Washington University","Providence Hospital","Howard University","Florida State University College of Medicine","University of Central Florida College of Medicine","Florida Atlantic University Charles E. Schmidt College of Medicine","Aventura Hospital and Medical Center","Kendall Regional Medical Center","Oak Hill Hospital","Orange Park Medical Center","Brandon Regional Hospital","Broward Health Medical Center","Largo Medical Center","Florida State University College of Medicine","University of Florida","University of Florida College of Medicine Jacksonville","Jackson Memorial Hospital/Jackson Health System","University of South Florida","Mayo Clinic College of Medicine (Jacksonville)","Cleveland Clinic (Florida)","University of Miami/JFK Medical Center Palm Beach Regional","Gwinnett Medical Center","Augusta University/University of Georgia Medical Partnership","Athens Regional Medical Center","WellStar Kennestone Regional Medical Center","WellStar Atlanta Medical Center","Memorial Health-University Medical Center/Mercer University","Emory University","Medical College of Georgia","Medical Center of Central Georgia/Mercer University School","Dwight David Eisenhower Army Medical Center","Kaiser Permanente Hawaii","Tripler Army Medical Center","University of Hawaii","University of Washington [Boise]","Advocate Illinois Masonic Medical Center/North Side Health","Louis A Weiss Memorial Hospital","Rush University Medical Center","Presence Saint Joseph Hospital (Chicago)","University of Chicago","MacNeal Hospital","Chicago Medical School at Rosalind Franklin University of Medicine","McGaw Medical Center of Northwestern University","University of Illinois College of Medicine at Chicago","Advocate Lutheran General Hospital","Southern Illinois University","University of Illinois College of Medicine at Urbana Program","West Suburban Medical Center","University of Chicago (NorthShore)","University of Illinois College of Medicine at Peoria Program","St Vincent Hospital and Health Care Center","Indiana University Health Ball Memorial Hospital","Indiana University School of Medicine","Iowa Medical Education Collaborative","University of Iowa Hospitals and Clinics","University of Iowa (Des Moines)","University of Kansas (Wichita)","University of Kentucky College of Medicine","University of Louisville","Louisiana State University","Tulane University","Louisiana State University (Shreveport)","Louisiana State University (Baton Rouge)","Leonard J Chabert Medical Center","Ochsner Clinic Foundation","Baton Rouge General","Johns Hopkins University/Bayview Medical Center","Johns Hopkins University","University of Maryland Medical Center Midtown Campus Program","MedStar Franklin Square Medical Center","St Agnes HealthCare","Sinai Hospital of Baltimore","Union Memorial Hospital","University of Maryland","Prince George's Hospital Center","Greater Baltimore Medical Center","Harbor Hospital Center","Steward Carney Hospital","Massachusetts General Hospital","Cambridge Health Alliance","Berkshire Medical Center","Baystate Medical Center/Tufts University School of Medicine","Beth Israel Deaconess Medical Center","Tufts Medical Center","Brigham and Women's Hospital","St Elizabeth's Medical Center","MetroWest Medical Center","University of Massachusetts","Lahey Clinic","Boston University Medical Center","Wayne State University School of Medicine","Genesys Regional Medical Center","McLaren Oakland","Detroit Medical Center Corporation","St. John Macomb-Oakland Hospital","Henry Ford Macomb Hospital","Henry Ford Hospital/Wayne State University","St Joseph Mercy-Oakland","Providence Hospital and Medical Centers","St Joseph Mercy Ann Arbor","William Beaumont Hospital","St Mary Mercy Hospital","University of Michigan","Detroit Medical Center/Wayne State University","Michigan State University","Western Michigan University Homer Stryker MD School of Medicine","McLaren-Flint/Michigan State University","Detroit Medical Center/Wayne State University (Sinai Grace)","Oakwood Hospital","Hurley Medical Center/Michigan State University","Grand Rapids Medical Education Partners/Michigan State University","Central Michigan University College of Medicine","University of Minnesota","Abbott-Northwestern Hospital","Hennepin County Medical Center","Magnolia Regional Health Center","Keesler Medical Center","University of Mississippi Medical Center","SSM St Mary's Hospital-St Louis","University of Missouri- Columbia","Washington University/B- JH/SLCH Consortium","St Louis University School of Medicine","St Luke's Hospital","University of Missouri at Kansas City","Mercy Hospital (St Louis)","Billings Clinic","Creighton University","University of Nevada School of Medicine","University of Nevada School of Medicine (Las Vegas)","Monmouth Medical Center","HackensackUMC Mountainside","Atlantic Health (Morristown)","Jersey Shore University Medical Center","St Barnabas Medical Center","Seton Hall University School of Health and Medical Sciences","Cooper Medical School of Rowan University/Cooper University","Newark Beth Israel Medical Center (Jersey City)","Rutgers New Jersey Medical School","Rutgers Robert Wood Johnson Medical School","Capital Health Regional Medical Center","Raritan Bay Medical Center","Seton Hall University School of Health and Medical Sciences","Newark Beth Israel Medical Center","Saint Peter's University Hospital/Rutgers Robert Wood Johns","AtlantiCare Regional Medical Center","University of New Mexico Hospital","Lutheran Family Health Center","Stony Brook Medicine/Mather Hospital","Bassett Medical Center","Winthrop-University Hospital","Icahn School of Medicine at Mount Sinai (Beth Israel)","New York- Presbyterian/Queens","Bronx-Lebanon Hospital Center","Brookdale University Hospital and Medical Center","Icahn School of Medicine at Mount Sinai (Elmhurst)","Flushing Hospital Medical Center","Harlem Hospital Center","Kingsbrook Jewish Medical Center","Hofstra Northwell School of Medicine at Lenox Hill Hospital","New York University School of Medicine/Brooklyn Campus","Maimonides Medical Center","Richmond University Medical Center","Hofstra Northwell School of Medicine at Staten Island Unive","University of Rochester","Brooklyn Hospital Center","Jamaica Hospital Medical Center","University at Buffalo (Catholic Health System)","Hofstra Northwell School of Medicine","Icahn School of Medicine at Mount Sinai","SUNY Health Science Center at Brooklyn","Stony Brook Medicine/University Hospital","SUNY Upstate Medical University","Hofstra Northwell School of Medicine at Forest Hills Hospital","Montefiore - Mount Vernon Hospital","St Barnabas Hospital","St John's Episcopal Hospital- South Shore","Icahn School of Medicine at Mount Sinai (Queens Hospital Center)","Wyckoff Heights Medical Center","Albany Medical Center","University at Buffalo","United Health Services Hospitals","Icahn School of Medicine at Mount Sinai","Rochester General Hospital","Icahn School of Medicine at Mount Sinai (Bronx)","Jacobi Medical Center/Albert Einstein College of Medicine","Carolinas HealthCare System Blue Ridge","Carolinas Medical Center","Cone Health","Vidant Medical Center/East Carolina University","University of North Carolina Hospitals","Duke University Hospital","Wake Forest University School of Medicine","University of North Dakota","Akron General Medical Center/NEOMED","Christ Hospital","Jewish Hospital of Cincinnati","Case Western Reserve University (MetroHealth)","St Vincent Charity Medical Center/Case Western Reserve University","Ohio State University Hospital","St Elizabeth Health Center/NEOMED","Cleveland Clinic Foundation","Riverside Methodist Hospitals (OhioHealth)","Mercy St Vincent Medical Center/Mercy Health Partners Program","Canton Medical Education Foundation/NEOMED","University of Cincinnati Medical Center/College of Medicine","Case Western Reserve University/University Hospitals","Fairview Hospital","Wright State University","TriHealth (Good Samaritan Hospital)","Western Reserve Health Education/NEOMED","Oklahoma State University Center for Health Sciences Program","University of Oklahoma Health Sciences Center","Legacy Emanuel Hospital and Health Center","Providence Health & Services - Oregon/Providence Medical Center","Providence Health & Services - Oregon/St Vincent Hospital","Oregon Health & Science University","Heart of Lancaster Regional Medical Center","Geisinger Health System","Easton Hospital","PinnacleHealth Hospitals","Penn State Milton S Hershey Medical Center","Albert Einstein Healthcare Network","Main Line Health System/Lankenau Medical Center","Mercy Catholic Medical Center","Pennsylvania Hospital of the University of Pennsylvania","Allegheny Health Network Medical Education Consortium (AGH)","UPMC Medical Education (Mercy)","Abington Memorial Hospital","Robert Packer Hospital/Guthrie","Lehigh Valley Health Network/University of South Florida","Drexel University College of Medicine/Hahnemann University","Temple University Hospital","Sidney Kimmel Medical College at Thomas Jefferson University","University of Pennsylvania","Reading Hospital","Wright Center for Graduate Medical Education","UPMC Medical Education","Conemaugh Memorial Medical Center","Crozer-Chester Medical Center","Kent Hospital","Brown University","Memorial Hospital of Rhode Island/Brown University","Roger Williams Medical Center","Grand Strand Regional Medical Center","Greenville Health System/University of South Carolina","Palmetto Health/University of South Carolina School of Medine","University of South Dakota","University of Tennessee College of Medicine at Chattanooga","University of Tennessee Medical Center at Knoxville","Meharry Medical College","University of Tennessee","University of Tennessee (Nashville)","Vanderbilt University Medical Center","University of Texas RGV (DHR)","Plaza Medical Center of Fort Worth","Texas Health Presbyterian Dallas","Texas Tech University Health Sciences Center Paul L Foster","William Beaumont Army Medical Center","San Antonio Uniformed Services Health Education Consortium","University of Texas at Austin Dell Medical School","Methodist Health System Dallas","Methodist Hospital (Houston)","University of Texas Southwestern Medical School","University of Texas Medical Branch Hospitals","University of Texas Health Science Center School of Medicine","Texas A&M College of Medicine-Scott and White","Texas Tech University (Amarillo)","Texas Tech University (Permian Basin)","University of Texas RGV (VBMC)","Baylor University Medical Center","University of Texas Health Science Center at Houston","University of Utah","University of Vermont Medical Center","Inova Fairfax Medical Campus","University of Virginia","Eastern Virginia Medical School","Virginia Commonwealth University Health System","Madigan Healthcare System","University of Washington","Marshall University School of Medicine","University of Wisconsin","Aurora Health Care","Marshfield Clinic-St Joseph's Hospital","Medical College of Wisconsin Affiliated Hospitals","Saint Michael's Medical Center","New York Methodist Hospital","New York Presbyterian Hospital (Columbia)","New York University School of Medicine","New York-Presbyterian Hospital (Cornell)","St Joseph's Regional Medical Center","Westchester Medical Center","University of Alabama Hospital","University of South Alabama","University of Alabama Medical Center"
  ];
 // $('.hospital_names').data('hospitalNames').forEach(function(hospital){
  //   hospitalNames.push({'value': hospital['name']})
  // });
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
  $autocomplete.css('max-width',maxWidth)
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
