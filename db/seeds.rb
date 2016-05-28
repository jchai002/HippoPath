hospital_names = ["University of Alabama Medical Center (Montgomery)","Maricopa Medical Center","St Joseph's Hospital and Medical Center","University of Arizona College of Medicine at South Campus","University of Arizona College of Medicine-Phoenix","Mayo Clinic College of Medicine (Arizona)","University of Arkansas College of Medicine","University of Arkansas for Medical Sciences","Eisenhower Medical Center","Kaiser Permanente Southern California","University of California Riverside School of Medicine","Arrowhead Regional Medical Center","Cedars-Sinai Medical Center","White Memorial Medical Center","Huntington Memorial Hospital","Los Angeles County-Harbor- UCLA Medical Center","Kaiser Permanente Southern California (Los Angeles)","Kaiser Permanente Medical Group (Northern California/Oakland","Kaiser Permanente Medical Group (Northern California)/San Francisco","California Pacific Medical Center","San Joaquin General Hospital","University of California (Davis) Health System","University of California (Irvine)","Loma Linda University Health Education Consortium"]

hospitals = []

hospital_names.each do |h|
  Hospital.create({name:h})
end

specialties = ['Anesthesiology',
  'Dermatology',
  'Diagnostic Radiology/Nuclear Medicine',
  'Emergency Medicine',
  'Family Medicine']

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


  users.each do |user|
    5.times do
      Interview.create({date: "#{['04','05','10','12'].sample}/01/2016",time:"#{(1..12).to_a.sample}:00 #{['A.M','P.M'].sample}", ride_status:"#{['Need Ride','Offering Ride','Either'].sample}", hospital:Hospital.all.sample,poster:user})
    end
  end

  ## need to be connected to the internet to run the code below this point

  # a1 = Address.create({street:'212 Union Ave Se', city:'Olympia', state:'WA', zip:'98501'})
  # a2 = Address.create({street:'1101 Peterlynn Dr', city:'San Diego', state:'CA', zip:'92154'})
  # a3 = Address.create({street:'927 Greenlawn St', city:'Mission', state:'TX', zip:'92154'})
  # a4 = Address.create({street:'1804 W 17th Ave', city:'Pine Bluff', state:'AR', zip:'92154'})
  # a5 = Address.create({street:'1401 E Spruce Ave', city:'Wasilla', state:'AK', zip:'71603'})
  # a6 = Address.create({street:'1735 N Paulina St', city:'Chicago', state:'IL', zip:'92154'})
  # a7 = Address.create({street:'206 Engineering Sciences', city:'Memphis', state:'TN', zip:'92154'})
  # a8 = Address.create({street:'5210 College Rd', city:'Key West', state:'FL', zip:'92154'})
  #
  # u1.address=a1
  # u2.address=a2
  # u3.address=a3
  # u4.address=a4
  # u5.address=a5
  # u6.address=a6
  # u7.address=a7
  # u8.address=a8

  # require 'csv'
  # schools_file = File.expand_path('../med-school.csv', __FILE__)
  # hospital_file = File.expand_path('../hospital.csv', __FILE__)
  # CSV.readlines(schools_file)[1 .. -1].each do |row|
  #   name = row[0]
  #   street = row[1]
  #   city = row[2]
  #   state = row[3]
  #   zip = row[4]
  #   a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  #   s = School.find_or_create_by({name:name})
  #   s.address = a
  #   s.save!
  #   sleep 0.5
  # end
  #
  # CSV.readlines(hospital_file).each do |row|
  #   name = row[0].gsub(/\s+/, ' ')
  #   street = row[1].gsub(/\s+/, ' ')
  #   city = row[2]
  #   state = row[3]
  #   zip = row[4]
  #   a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  #   h = Hospital.find_or_create_by({name:name})
  #   h.address = a
  #   h.save!
  #   sleep 0.5
  # end
