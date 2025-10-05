import { DaySelect } from "@/components/weather/day-select";
import { useWeatherForecast } from "@/lib/queries";
import { useDayStore } from "@/lib/store";
import { formatTemperature } from "@/utils/temperature";
import {
    DATE_FORMATS,
    DAYS,
    formatDate,
    formatDateTime,
    getDay,
    isAfterNowInclusive,
    isHourZero,
    isToday,
    timeToDate,
} from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";
import { useEffect, useRef } from "react";

const hourlyFilter = (time: string, timezone: string, day: number) => {
    const date = timeToDate(time);

    return (
        (date.getUTCDay() === day ||
            (day === getDay() &&
                date.getUTCDay() === (day + 1) % DAYS.length &&
                date.getUTCHours() <= 12)) &&
        isAfterNowInclusive(time, timezone)
    );
};

export function HourlyForecastCard() {
    const { data } = useWeatherForecast();
    const [day, setDay] = useDayStore();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: updating scroll container scroll position when "day" changes
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        scrollContainerRef.current.scrollTop = 0;
    }, [day]);

    return (
        <div className="w-full lg:w-96 bg-surface rounded-3xl shrink-0 flex flex-col max-h-176 overflow-hidden pb-6">
            <div
                ref={scrollContainerRef}
                className="h-full overflow-y-auto styled-scroll"
            >
                <div className="bg-surface p-6 pb-5 flex items-center justify-between sticky top-0">
                    <span className="text-xl font-semibold">
                        Hourly forecast
                    </span>
                    <DaySelect value={day} onValueChange={setDay} />
                </div>
                <div className="flex flex-col gap-4 px-6">
                    {data?.hourly
                        .filter((hourly) =>
                            hourlyFilter(hourly.time, data.timezone, day),
                        )
                        .map((hourly, i) => (
                            <HourForecastCard
                                key={hourly.time}
                                time={hourly.time}
                                temperature={hourly.temperature_2m}
                                weatherCode={hourly.weather_code}
                                showLabel={
                                    (isHourZero(hourly.time) || i === 0) &&
                                    day === getDay() &&
                                    !isToday(hourly.time)
                                }
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

type HourForecastCardProps = {
    time: string;
    temperature: number;
    weatherCode: number;
    showLabel?: boolean;
};

export function HourForecastCard({
    time,
    temperature,
    weatherCode,
    showLabel,
}: HourForecastCardProps) {
    return (
        <div id={time} className="grid gap-1 scroll-mt-20">
            {showLabel && (
                <span className="text-sm font-medium tracking-tight text-muted-foreground">
                    {formatDate(time, DATE_FORMATS.ALTERNATIVE)}
                </span>
            )}
            <div className="bg-surface-hover py-2.5 pl-3 pr-4 rounded-lg flex items-center gap-2">
                <img
                    className="size-10"
                    src={weatherCodeToIconSrc(weatherCode)}
                    alt=""
                />
                <span className="flex-1 font-medium text-xl">
                    {formatDateTime(time)}
                </span>
                <span className="text-sm font-medium">
                    {formatTemperature(temperature)}
                </span>
            </div>
        </div>
    );
}
