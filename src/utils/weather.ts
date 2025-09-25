const WEATHER_API_URL = "https://api.open-meteo.com/v1";

type TemperatureUnit = "celsius" | "fahrenheit";
type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";
type PrecipitationUnit = "mm" | "inch";

interface ForecastResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnitsResponse;
    current: CurrentResponse;
    hourly_units: HourlyUnitsResponse;
    hourly: HourlyResponse;
    daily_units: DailyUnitsResponse;
    daily: DailyResponse;
}

interface CurrentResponse {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
}

interface CurrentUnitsResponse {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation: string;
    wind_speed_10m: string;
    weather_code: string;
    apparent_temperature: string;
}

interface DailyResponse {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
}

interface DailyUnitsResponse {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
}

interface HourlyResponse {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
}

interface HourlyUnitsResponse {
    time: string;
    temperature_2m: string;
    weather_code: string;
}

export interface Forecast {
    current: Current;
    hourly: Hourly[];
    daily: Daily[];
    units: CurrentUnitsResponse & HourlyUnitsResponse & DailyUnitsResponse;
    timezone: string;
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

export interface Hourly {
    time: string;
    temperature_2m: number;
    weather_code: number;
}

export interface Daily {
    time: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    weather_code: number;
}

interface ForecastConfiguration {
    temperatureUnit?: TemperatureUnit;
    windSpeedUnit?: WindSpeedUnit;
    precipitationUnit?: PrecipitationUnit;
}

export async function getWeatherForecast(
    latitude: number,
    longitude: number,
    config?: ForecastConfiguration,
) {
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

    const data = await response.json();

    return transformForecastResponse(data);
}

function transformForecastResponse(data: ForecastResponse): Forecast {
    return {
        current: data.current,
        daily: transformValues(data.daily),
        hourly: transformValues(data.hourly),
        units: {
            ...data.current_units,
            ...data.daily_units,
            ...data.hourly_units,
        },
        timezone: data.timezone,
    };
}

type UnwrapArray<T> = T extends (infer U)[] ? U : T;

type WithoutArrays<T> = {
    [K in keyof T]: UnwrapArray<T[K]>;
};

function transformValues<T extends { [K in keyof T]: unknown[] }>(
    data: T,
): WithoutArrays<T>[] {
    const keys = Object.keys(data) as (keyof T)[];

    return Array.from({ length: data[keys[0]].length }, (_, i) =>
        keys.reduce(
            (obj, key) => {
                obj[key] = data[key][i] as UnwrapArray<T[typeof key]>;
                return obj;
            },
            {} as WithoutArrays<T>,
        ),
    );
}
