json.array! @data do |item|
  json.id         item[:id]
  json.start      item[:start].to_i
  json.end        item[:end].to_i
  json.stage      item[:stage]
  json.stage_code item[:stage_code]
  json.color      item[:color]
  json.artist     item[:artist]
  json.detail     item[:detail]
end
