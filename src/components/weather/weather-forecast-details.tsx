import { useWeatherForecast } from "@/lib/queries";
import { formatTemperature } from "@/utils/temperature";

export function WeatherForecastDetails() {
    const { data } = useWeatherForecast();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <WeatherForecastDetailCard
                label="Feels Like"
                value={
                    data && formatTemperature(data.current.apparent_temperature)
                }
            />
            <WeatherForecastDetailCard
                label="Humidity"
                value={data && `${data.current.relative_humidity_2m}%`}
            />
            <WeatherForecastDetailCard
                label="Wind"
                value={
                    data &&
                    `${data.current.wind_speed_10m.toFixed(0)} ${data.units.wind_speed_10m}`
                }
            />
            <WeatherForecastDetailCard
                label="Precipitation"
                value={
                    data &&
                    `${data.current.precipitation} ${data.units.precipitation}`
                }
            />
        </div>
    );
}

type WeatherForecastDetailCardProps = {
    label: string;
    value?: string;
};

function WeatherForecastDetailCard({
    label,
    value,
}: WeatherForecastDetailCardProps) {
    return (
        <div className="bg-surface p-5 rounded-3xl border flex flex-col gap-6">
            <span className="font-medium text-neutral-200">{label}</span>
            <span className="font-light text-4xl">{value ?? "_"}</span>
        </div>
    );
}
