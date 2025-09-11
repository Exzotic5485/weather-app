const WEATHER_API_URL = "https://api.open-meteo.com/v1";

type TemperatureUnit = "celsius" | "fahrenheit";
type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";
type PrecipitationUnit = "mm" | "inch";

export interface Forecast {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: Current;
    hourly_units: HourlyUnits;
    hourly: Hourly;
    daily_units: DailyUnits;
    daily: Daily;
}

export interface Current {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
}

export interface CurrentUnits {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation: string;
    wind_speed_10m: string;
    weather_code: string;
    apparent_temperature: string;
}

export interface Daily {
    time: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
}

export interface DailyUnits {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
}

export interface Hourly {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

export interface HourlyUnits {
    time: string;
    temperature_2m: string;
    weather_code: string;
}

export interface ForecastConfiguration {
    temperatureUnit?: TemperatureUnit;
    windSpeedUnit?: WindSpeedUnit;
    precipitationUnit?: PrecipitationUnit;
}

export async function getWeatherForecast(
    latitude: number,
    longitude: number,
    config?: ForecastConfiguration,
): Promise<Forecast> {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone: "auto",
        daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "weather_code",
        ].join(","),
        hourly: ["temperature_2m", "weather_code"].join(","),
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation",
            "wind_speed_10m",
            "apparent_temperature",
            "weather_code",
        ].join(","),
    });

    const response = await fetch(`${WEATHER_API_URL}/forecast?${params}`);

    if (response.status !== 200) {
        throw new Error("failed to fetch weather forecast");
    }

    return response.json();
}
