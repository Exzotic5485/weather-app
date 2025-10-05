import { useWeatherForecast } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { formatTemperature } from "@/utils/temperature";
import { dateToDay } from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";

export function DailyForecastGrid() {
    const { data } = useWeatherForecast();

    return (
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {data
                ? data.daily.map((daily) => (
                      <DailyForecastCard
                          key={daily.time}
                          time={daily.time}
                          weatherCode={daily.weather_code}
                          minTemperature={daily.temperature_2m_min}
                          maxTemperature={daily.temperature_2m_max}
                          selected={false}
                      />
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

type DailyForecastCardProps = {
    time: Date | string;
    weatherCode: number;
    minTemperature: number;
    maxTemperature: number;
    selected?: boolean;
};

export function DailyForecastCard({
    time,
    weatherCode,
    minTemperature,
    maxTemperature,
    selected,
}: DailyForecastCardProps) {
    return (
        <div
            className={cn(
                "bg-surface py-4 px-2.5 rounded-3xl border flex flex-col items-center gap-4",
                selected &&
                    "ring-2 ring-primary outline-2 outline-primary/50 outline-offset-2",
            )}
        >
            <span className="font-medium text-center">
                {dateToDay(time, "short")}
            </span>
            <img
                alt="" /* TODO: add labels for weather codes e.g. rain, sunny */
                src={weatherCodeToIconSrc(weatherCode)}
                className="size-15"
            />
            <div className="w-full flex items-center justify-between font-medium text-sm">
                <span>{formatTemperature(maxTemperature)}</span>
                <span className="text-neutral-200">
                    {formatTemperature(minTemperature)}
                </span>
            </div>
        </div>
    );
}
