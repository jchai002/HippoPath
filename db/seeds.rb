h1 = Hospital.create({name:"hospital 1"})
h2 = Hospital.create({name:"hospital 2"})
u1= User.create({name:"jerry", email:'jerry@gdd.com', password:'12345678'})
u2= User.create({name:"chai", email:'chai@gdd.com', password:'12345678'})
u3= User.create({name:"dog", email:'dog@gdd.com', password:'12345678'})

5.times do
  Interview.create({date: "today",time:"8:00AM", ride_status:"Need Ride", hospital:h1})
end
