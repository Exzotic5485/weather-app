import { useWeatherForecast } from "@/lib/queries";
import { dateToDay } from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";

export function DailyForecastGrid() {
    const { data } = useWeatherForecast();

    return (
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {data
                ? data.daily.time.map((time, i) => (
                      <div
                          key={time}
                          className="bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4"
                      >
                          <span className="font-medium text-center">
                              {dateToDay(time, "short")}
                          </span>
                          <img
                              alt="" /* TODO: add labels for weather codes e.g. rain, sunny */
                              src={weatherCodeToIconSrc(
                                  data.daily.weather_code[i],
                              )}
                              className="size-15"
                          />
                          <div className="w-full flex items-center justify-between font-medium text-sm">
                              <span>{data.daily.temperature_2m_max[i]}°</span>
                              <span className="text-neutral-200">
                                  {data.daily.temperature_2m_min[i]}°
                              </span>
                          </div>
                      </div>
                  ))
                : Array.from({ length: 7 }, (_, i) => i).map((i) => (
                      <div
                          key={i}
                          className="bg-surface py-4 px-2.5 h-44 rounded-3xl border"
                      />
                  ))}
        </div>
    );
}
