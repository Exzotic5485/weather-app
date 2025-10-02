import bgTodayLargeSvg from "@/assets/bg-today-large.svg";
import { useLocation, useWeatherForecast } from "@/lib/queries";
import { formatLocationName } from "@/utils/location";
import { formatTemperature } from "@/utils/temperature";
import { DATE_FORMATS, formatDate } from "@/utils/time";
import { weatherCodeToIconSrc } from "@/utils/weather-code";

export function WeatherForecastCard() {
    const { data: weather, isLoading } = useWeatherForecast();
    const { data: location } = useLocation();

    if (isLoading || !weather || !location) {
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
                backgroundSize: "cover",
            }}
        >
            <div className="flex items-center px-6 my-auto">
                <div className="flex-1 flex flex-col">
                    <span className="font-bold text-3xl">
                        {formatLocationName(location)}
                    </span>
                    <span className="font-medium text-white/80">
                        {formatDate(
                            new Date(),
                            DATE_FORMATS.LONG,
                            weather.timezone,
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <img
                        src={weatherCodeToIconSrc(weather.current.weather_code)}
                        alt=""
                        className="size-36"
                    />
                    <span className="font-semibold italic text-8xl">
                        {formatTemperature(weather.current.temperature_2m)}
                    </span>
                </div>
            </div>
        </div>
    );
}
