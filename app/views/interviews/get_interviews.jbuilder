json.array!(@interviews) do |interview|
  json.extract! interview, :id, :date, :time,:preinterview_dinner, :ride_status
end
