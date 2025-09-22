import { useWeatherForecast } from "@/lib/queries";
import { formatTemperature } from "@/utils/temperature";
import { dateToTime, isAfterNowInclusive, isToday } from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";

export function HourlyForecastCard() {
    const { data } = useWeatherForecast();

    return (
        <div className="w-96 bg-surface rounded-3xl shrink-0 flex flex-col max-h-176 overflow-hidden pb-6">
            <div className="h-full overflow-y-auto styled-scroll">
                <div className="bg-surface p-6 flex items-center justify-between sticky top-0">
                    <span className="text-xl font-semibold">
                        Hourly forecast
                    </span>
                </div>
                <div className="flex flex-col gap-4 px-6">
                    {data?.hourly
                        .filter((hourly) => isToday(hourly.time))
                        .filter((hourly) => isAfterNowInclusive(hourly.time))
                        .map((hourly) => (
                            <HourForecastCard
                                key={hourly.time}
                                time={hourly.time}
                                temperature={hourly.temperature_2m}
                                weatherCode={hourly.weather_code}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

type HourForecastCardProps = {
    time: Date | string;
    temperature: number;
    weatherCode: number;
};

export function HourForecastCard({
    time,
    temperature,
    weatherCode,
}: HourForecastCardProps) {
    return (
        <div className="bg-surface-hover py-2.5 pl-3 pr-4 rounded-lg flex items-center gap-2">
            <img
                className="size-10"
                src={weatherCodeToIconSrc(weatherCode)}
                alt=""
            />
            <span className="flex-1 font-medium text-xl">
                {dateToTime(time)}
            </span>
            <span className="text-sm font-medium">
                {formatTemperature(temperature)}
            </span>
        </div>
    );
}
