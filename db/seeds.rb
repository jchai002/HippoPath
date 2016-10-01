require 'csv'

schools_file = File.expand_path('../med-school.csv', __FILE__)

hospital_file = File.expand_path('../hospital.csv', __FILE__)

CSV.readlines(schools_file)[1..100].each do |row|
  name = row[0]
  street = row[1]
  city = row[2]
  state = row[3]
  zip = row[4]
  a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  s = School.find_or_create_by({name:name})
  s.address = a
  s.save!
  sleep 0.5
end

CSV.readlines(hospital_file)[1..100].each do |row|
  name = row[0].gsub(/\s+/, ' ')
  street = row[1].gsub(/\s+/, ' ')
  city = row[2]
  state = row[3]
  zip = row[4]
  a = Address.find_or_create_by({street:street,city:city,state:state,zip:zip})
  h = Hospital.find_or_create_by({name:name})
  h.address = a
  h.save!
  sleep 0.5
end

specialties = ['internal medicine', 'surgery', 'pediatrics', 'obgyn', 'emergency medicine', 'family medicine']

School.all.each do |school|
  6.times do |i|
    User.create({name:"#{Faker::Name.first_name} #{Faker::Name.last_name}",gender:'Male', email:"student#{i}@#{school.name.gsub(/\s+/, "").downcase}.edu", password:'12345678', school:school,specialty:specialties.sample,address:school.address,confirmed_at:Time.now})
  end
end

User.all.each do |user|
  Hospital.all.each do |hospital|
    Interview.create({date: "11/0#{rand(1..5)}/2016",time:"#{(8..11).to_a.sample}:00 A.M", ride_status:['Need Ride','Offering Ride','Either'].sample, hospital:hospital,poster:user})
  end
end
