hospitals = []
(1..10).each do |number|
  hospitals << Hospital.create({name:"Hospital #{number}"})
end

u1= User.create({name:"jerry", email:'jerry@gdd.com', password:'12345678'})
u2= User.create({name:"chai", email:'chai@gdd.com', password:'12345678'})
u3= User.create({name:"dog", email:'dog@gdd.com', password:'12345678'})
u4= User.create({name:"tea", email:'tea@gdd.com', password:'12345678'})
u5= User.create({name:"is", email:'is@gdd.com', password:'12345678'})
u6= User.create({name:"super", email:'super@gdd.com', password:'12345678'})
u7= User.create({name:"awesome", email:'awesome@gdd.com', password:'12345678'})
u8= User.create({name:"okay", email:'okay@gdd.com', password:'12345678'})
u9= User.create({name:"bai", email:'bai@gdd.com', password:'12345678'})
u10= User.create({name:"yah", email:'yah@gdd.com', password:'12345678'})
users = [u1,u2,u3,u4,u5,u6,u7,u8,u9,u10]

users.each do |user|
  5.times do
    user.interviews.create({date: "04/01/2016",time:"8:00AM", ride_status:"Need Ride", hospital:hospitals.first})
  end
end
