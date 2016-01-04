json.array!(@interviews) do |interview|
  if interview.hospital_id
    json.hospital interview.hospital.name
  else
    json.hospital "N/A"
  end
  json.extract! interview, :id, :date, :time, :preinterview_dinner, :ride_status

end
