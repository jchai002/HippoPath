json.array!(@interviews) do |interview|
  json.extract! interview, :id, :date, :time, :ride_status, :school, :hospital, :specialty, :gender
end
