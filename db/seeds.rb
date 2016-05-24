hospitals = []
(1..10).each do |number|
  hospitals << Hospital.create({name:"Hospital #{number}"})
end

specialties = ['Anesthesiology',
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
'Vascular Surgery-Integrated']

school_names = ['Yale School of Medicine','Northwestern University Feinberg School of Medicine','University of Minnesota Medical School']

schools = []

school_names.each do |name|
  schools << School.create({name:name})
end

u1= User.create({name:Faker::Name.name,gender:'Male', email:'test1@med.edu', password:'12345678', school:schools.sample,specialty:specialties.sample,confirmed_at:Time.now})
u2= User.create({name:Faker::Name.name,gender:'Male', email:'test2@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u3= User.create({name:Faker::Name.name,gender:'Male', email:'test3@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u4= User.create({name:Faker::Name.name,gender:'Male', email:'test4@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u5= User.create({name:Faker::Name.name,gender:'Male', email:'test5@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u6= User.create({name:Faker::Name.name,gender:'Female', email:'test6@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u7= User.create({name:Faker::Name.name,gender:'Female', email:'test7@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u8= User.create({name:Faker::Name.name,gender:'Female', email:'test8@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u9= User.create({name:Faker::Name.name,gender:'Female', email:'test9@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
u10= User.create({name:Faker::Name.name,gender:'Female', email:'test10@med.edu', password:'12345678', school:schools.sample, specialty:specialties.sample,confirmed_at:Time.now})
users = [u1,u2,u3,u4,u5,u6,u7,u8,u9,u10]

a1 = Address.create({street:'212 Union Ave Se', city:'Olympia', state:'WA', zip:'98501'})
a2 = Address.create({street:'1101 Peterlynn Dr', city:'San Diego', state:'CA', zip:'92154'})
a3 = Address.create({street:'927 Greenlawn St', city:'Mission', state:'TX', zip:'92154'})
a4 = Address.create({street:'1804 W 17th Ave', city:'Pine Bluff', state:'AR', zip:'92154'})
a5 = Address.create({street:'1401 E Spruce Ave', city:'Wasilla', state:'AK', zip:'71603'})
a6 = Address.create({street:'1735 N Paulina St', city:'Chicago', state:'IL', zip:'92154'})
a7 = Address.create({street:'206 Engineering Sciences', city:'Memphis', state:'TN', zip:'92154'})
a8 = Address.create({street:'5210 College Rd', city:'Key West', state:'FL', zip:'92154'})

u1.address=a1
u2.address=a2
u3.address=a3
u4.address=a4
u5.address=a5
u6.address=a6
u7.address=a7
u8.address=a8

# users.each do |user|
#   5.times do
#     user.posted_interviews.create({date: "04/01/2016",time:"8:00AM", ride_status:"Need Ride", hospital:hospitals.first})
#   end
#   user.save!
# end

require 'csv'
schools_file = File.expand_path('../med-school.csv', __FILE__)
hospital_file = File.expand_path('../hospital.csv', __FILE__)
CSV.readlines(schools_file)[1 .. -1].each do |row|
  name = row[0]
  street = row[1]
  city = row[2]
  state = row[3]
  zip = row[4]
  a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  School.find_or_create_by({name:name})
  sleep 0.5
end

CSV.readlines(hospital_file).each do |row|
  name = row[0].gsub(/\s+/, ' ')
  street = row[1].gsub(/\s+/, ' ')
  city = row[2]
  state = row[3]
  zip = row[4]
  a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  Hospital.find_or_create_by({name:name})
  sleep 0.5
end
