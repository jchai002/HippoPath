h1 = Hospital.create({name:"hospital 1"})
s1= Student.create({first_name:"Xiao"})

5.times do
  s1.interviews.create({date: "today",time:"8:00AM", ride_status:"Need Ride", hospital:h1, preinterview_dinner:true})
end
