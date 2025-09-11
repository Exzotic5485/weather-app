import bgTodayLargeSvg from "@/assets/bg-today-large.svg";
import { useWeatherForecast } from "@/lib/queries";
import { formatDate } from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";

export function WeatherForecastCard() {
    const { data, isLoading } = useWeatherForecast();

    if (isLoading || !data) {
        return (
            <div className="h-71.5 rounded-3xl flex flex-col justify-center items-center bg-primary">
                <span className="font-medium">Loading...</span>
            </div>
        );
    }

    return (
        <div
            className="h-71.5 rounded-3xl flex flex-col justify-center"
            style={{
                background: `var(--primary) url('${bgTodayLargeSvg}') center no-repeat`,
            }}
        >
            <div className="flex items-center px-6 my-auto">
                <div className="flex-1 flex flex-col">
                    <span className="font-bold text-3xl">Berlin, Germany</span>
                    <span className="font-medium text-white/80">
                        {formatDate(new Date())}
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <img
                        src={weatherCodeToIconSrc(data.current.weather_code)}
                        alt=""
                        className="size-36"
                    />
                    <span className="font-semibold italic text-8xl">
                        {data.current.temperature_2m}°
                    </span>
                </div>
            </div>
        </div>
    );
}
