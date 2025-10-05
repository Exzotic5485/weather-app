import * as v from "valibot";

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    country: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface IPGeolocation {
    success: boolean;
    data: IPGeolocationData;
}

export interface IPGeolocationData {
    ip: string;
    continent: string;
    continentCode: string;
    country: string;
    countryCode: string;
    capital: string;
    region: string;
    regionCode: string;
    city: string;
    postal_Code: string;
    dial_code: string;
    is_in_eu: boolean;
    latitude: number;
    longitude: number;
    accuracy_radius: number;
    timezone: IPGeolocationTimezone;
}

export interface IPGeolocationTimezone {
    time_zone: string;
    abbr: string;
    offset: number;
    is_dst: boolean;
    utc: string;
    current_time: Date;
}

export interface ReverseGeocode {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
}

export const locationSchema = v.object({
    latitude: v.number(),
    longitude: v.number(),
    name: v.string(),
    country: v.string(),
});

export async function getLocation(): Promise<Location> {
    try {
        const gpsPosition = await getGPSLocation();

        const geolocation = await reverseGeocode(gpsPosition.coords);

        return {
            country: resolveCountryName(geolocation.country),
            name: geolocation.name,
            latitude: gpsPosition.coords.latitude,
            longitude: gpsPosition.coords.longitude,
        };
    } catch {
        try {
            const ipLocation = await getIPLocation();

            return {
                country: resolveCountryName(ipLocation.countryCode),
                name: ipLocation.city,
                longitude: ipLocation.longitude,
                latitude: ipLocation.latitude,
            };
        } catch {
            return {
                country: "?",
                name: "?",
                longitude: 0,
                latitude: 0,
            };
        }
    }
}

export function getGPSLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation)
            reject("browser does not support geolocation api");

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 1000 * 15,
        });
    });
}

export async function getIPLocation(): Promise<IPGeolocationData> {
    const response = await fetch("https://api.ipwho.org/me");

    if (response.status !== 200)
        throw new Error("failed to get location via ip");

    const { data, success }: IPGeolocation = await response.json();

    if (!success) throw new Error("Failed to get location");

    return data;
}

export async function reverseGeocode(
    coordinates: Coordinates,
): Promise<ReverseGeocode> {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    );

    if (response.status !== 200)
        throw new Error("failed to reverse geocode coordinates");

    const data = await response.json();

    return data[0];
}

export async function geocodeSearch(
    query: string,
    max = 5,
): Promise<Location[]> {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=${max}&language=en&format=json`,
    );

    if (response.status !== 200) return [];

    const data = await response.json();

    return data.results;
}

export function formatLocationName(location: Location) {
    return location.name === location.country
        ? location.name
        : `${location.name}, ${location.country}`;
}

function resolveCountryName(countryCode: string) {
    const displayNames = new Intl.DisplayNames("en", { type: "region" });
    return displayNames.of(countryCode) ?? "";
}
