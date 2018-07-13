# frozen_string_literal: true

namespace :timetable do
  task main: :environment do
    abort if Time.zone.now >= Time.zone.local(2018, 8, 6)

    dates = {
      'day1' => Date.new(2018, 8, 3),
      'day2' => Date.new(2018, 8, 4),
      'day3' => Date.new(2018, 8, 5)
    }
    results = []
    open('http://www.idolfes.com/2018/json/timetable/time.json') do |f|
      JSON.parse(f.read).each do |day, stages|
        date = dates[day]
        stages.each do |stage, items|
          stage_code = stage.delete(' ')
          items.each do |item|
            id = [day, stage_code, item['start']].join('-')
            start_time = Time.zone.strptime("#{date} #{item['start']}", '%Y-%m-%d %H%M')
            end_time =   Time.zone.strptime("#{date} #{item['end']}",   '%Y-%m-%d %H%M')
            results << {
              id: id,
              artist: item['artist'],
              detail: item['detail'] != 'null' ? item['detail'] : nil,
              start: start_time,
              end: end_time,
              stage: stage_code
            }
          end
        end
      end
    end
    results.sort_by!.with_index { |v, i| [v[:start], i] }
    Rails.cache.write('main', results)
  end
end
