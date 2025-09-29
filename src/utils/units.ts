type TemperatureUnit = "celsius" | "fahrenheit";
type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";
type PrecipitationUnit = "mm" | "inch";

export interface Units {
    temperature: TemperatureUnit | (string & {});
    windSpeed: WindSpeedUnit | (string & {});
    precipitation: PrecipitationUnit | (string & {});
}

export const METRIC_UNITS: Units = {
    temperature: "celsius",
    precipitation: "mm",
    windSpeed: "kmh",
};

export const IMPERIAL_UNITS: Units = {
    temperature: "fahrenheit",
    windSpeed: "mph",
    precipitation: "inch",
};

export const isMetricUnits = (units: Units) => {
    let points = 0;

    points += units.temperature === "celsius" ? 1 : -1;
    points += units.precipitation === "mm" ? 1 : -1;
    points += units.windSpeed === "kmh" ? 1 : -1;

    return points >= 0;
};
