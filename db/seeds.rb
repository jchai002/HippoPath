hospitals = []
(1..10).each do |number|
  hospitals << Hospital.create({name:"Hospital #{number}"})
end

specialties = ['oncology','emergency','cardiology','radiology','internal medicine','gyno','OGBYN','pediatrics']

school_names = ['University of South Alabama College of Medicine', 'Midwestern University Arizona College of Osteopathic Medicine', 'Stanford University School of Medicine', 'David Geffen School of Medicine at UCLA', 'Howard University College of Medicine', 'Yale School of Medicine','University of South Florida College of Medicine','Northwestern University Feinberg School of Medicine','University of Minnesota Medical School','University of Nevada School of Medicine']

schools = []

school_names.each do |name|
  schools << School.create({name:name})
end

u1= User.create({name:Faker::Name.name,gender:'Male', email:'test1@gmail.com', password:'12345678', school:schools.sample,specialty:specialties.sample})
u2= User.create({name:Faker::Name.name,gender:'Male', email:'test2@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u3= User.create({name:Faker::Name.name,gender:'Male', email:'test3@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u4= User.create({name:Faker::Name.name,gender:'Male', email:'test4@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u5= User.create({name:Faker::Name.name,gender:'Male', email:'test5@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u6= User.create({name:Faker::Name.name,gender:'Female', email:'test6@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u7= User.create({name:Faker::Name.name,gender:'Female', email:'test7@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u8= User.create({name:Faker::Name.name,gender:'Female', email:'test8@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u9= User.create({name:Faker::Name.name,gender:'Female', email:'test9@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
u10= User.create({name:Faker::Name.name,gender:'Female', email:'test10@gmail.com', password:'12345678', school:schools.sample, specialty:specialties.sample})
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

users.each do |user|
  5.times do
    user.interviews.create({date: "04/01/2016",time:"8:00AM", ride_status:"Need Ride", hospital:hospitals.first})
  end
  user.save!
end
