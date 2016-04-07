json.array!(@interviews) do |interview|
  json.extract! interview, :id, :date, :time, :ride_status, :name, :school, :hospital, :specialty, :gender, :poster_id, :avatar, :location
end
