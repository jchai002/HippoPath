hospitals = []
(1..10).each do |number|
  Hospital.create({name:"Hospital #{number}"})
end

u1= User.create({name:"jerry", email:'jerry@gdd.com', password:'12345678'})
u2= User.create({name:"chai", email:'chai@gdd.com', password:'12345678'})
u3= User.create({name:"dog", email:'dog@gdd.com', password:'12345678'})
users = [u1,u2,u3]

users.each do |user|
  5.times do
    user.interviews.create({date: "today",time:"8:00AM", ride_status:"Need Ride", hospital:hospitals.first})
  end
end
