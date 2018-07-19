# frozen_string_literal: true

namespace :timetable do
  task main: :environment do
    abort if Time.zone.now >= Time.zone.local(2018, 8, 6)

    dates = {
      'day1' => Date.new(2018, 8, 3),
      'day2' => Date.new(2018, 8, 4),
      'day3' => Date.new(2018, 8, 5)
    }
    colors = {
      'HOTSTAGE'      => '#FA3D56',
      'SMILEGARDEN'   => '#B1DD00',
      'DREAMSTAGE'    => '#00C858',
      'DOLLFACTORY'   => '#FF88B4',
      'SKYSTAGE'      => '#39CDFE',
      'FESTIVALSTAGE' => '#FFDF33',
      'FUJIYOKOSTAGE' => '#06708F',
      'INFOCENTRE'    => '#FB3CA6'
    }
    results = []
    open('http://www.idolfes.com/2018/json/timetable/time.json') do |f|
      JSON.parse(f.read).each do |day, stages|
        date = dates[day]
        stages.each do |stage, items|
          stage_code = stage.delete(' ')
          color = colors[stage_code]
          items.each do |item|
            id = [day, stage_code, item['start']].join('-')
            start_time = Time.zone.strptime("#{date} #{item['start']}", '%Y-%m-%d %H%M')
            end_time =   Time.zone.strptime("#{date} #{item['end']}",   '%Y-%m-%d %H%M')
            detail = item['detail'].split(/<br>/).delete_if(&:empty?) if item['detail'] != 'null'
            results << {
              id: id,
              artist: item['artist'],
              detail: detail,
              start: start_time,
              end: end_time,
              stage: stage_code,
              color: color
            }
          end
        end
      end
    end
    results.sort_by!.with_index { |v, i| [v[:start], i] }
    Rails.cache.write('main', results)
  end
end
