h1 = Hospital.create({name:"hospital 1"})
s1= User.create({name:"Xiao"})

5.times do
  Interview.create({date: "today",time:"8:00AM", ride_status:"Need Ride", hospital:h1})
end
