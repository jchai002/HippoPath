json.array!(@interviews) do |interview|
  if interview.hospital_id
    json.hospital interview.hospital.name
  else
    json.hospital "Hospital Not Found"
  end
  json.extract! interview, :id, :date, :time, :ride_status, :created_at, :disabled

end
