# hospitals = []
# (1..10).each do |number|
#   hospitals << Hospital.create({name:"Hospital #{number}"})
# end
#
# specialties = ['oncology','emergency','cardiology','radiology','internal medicine','gyno','OGBYN','pediatrics']
#
# school_names = ['Yale School of Medicine','Northwestern University Feinberg School of Medicine','University of Minnesota Medical School']
#
# schools = []
#
# school_names.each do |name|
#   schools << School.create({name:name})
# end
#
# u1= User.create({name:Faker::Name.name,gender:'Male', email:'test1@gmail.com', password:'12345678', school:schools.sample,specialty:'oncology'})
# u2= User.create({name:Faker::Name.name,gender:'Male', email:'test2@gmail.com', password:'12345678', school:schools.sample, specialty:'oncology'})
# u3= User.create({name:Faker::Name.name,gender:'Male', email:'test3@gmail.com', password:'12345678', school:schools.sample, specialty:'oncology'})
# u4= User.create({name:Faker::Name.name,gender:'Male', email:'test4@gmail.com', password:'12345678', school:schools.sample, specialty:'emergency'})
# u5= User.create({name:Faker::Name.name,gender:'Male', email:'test5@gmail.com', password:'12345678', school:schools.sample, specialty:'cardiology'})
# u6= User.create({name:Faker::Name.name,gender:'Female', email:'test6@gmail.com', password:'12345678', school:schools.sample, specialty:'cardiology'})
# u7= User.create({name:Faker::Name.name,gender:'Female', email:'test7@gmail.com', password:'12345678', school:schools.sample, specialty:'radiology'})
# u8= User.create({name:Faker::Name.name,gender:'Female', email:'test8@gmail.com', password:'12345678', school:schools.sample, specialty:'radiology'})
# u9= User.create({name:Faker::Name.name,gender:'Female', email:'test9@gmail.com', password:'12345678', school:schools.sample, specialty:'pediatrics'})
# u10= User.create({name:Faker::Name.name,gender:'Female', email:'test10@gmail.com', password:'12345678', school:schools.sample, specialty:'pediatrics'})
# users = [u1,u2,u3,u4,u5,u6,u7,u8,u9,u10]
#
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
#
# users.each do |user|
#   30.times do
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
  a = Address.create({street:street,city:city,state:state,zip:zip})
  School.create({name:name})
  sleep 0.2
end

CSV.readlines(hospital_file).each do |row|
  name = row[0].gsub(/\s+/, ' ')
  street = row[1].gsub(/\s+/, ' ')
  city = row[2]
  state = row[3]
  zip = row[4]
  a = Address.create({street:street,city:city,state:state,zip:zip})
  Hospital.create({name:name})
  sleep 0.2
end
