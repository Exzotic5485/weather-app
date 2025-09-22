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

export interface Geolocation {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

export interface ReverseGeocode {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
}

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
                longitude: ipLocation.lon,
                latitude: ipLocation.lat,
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

        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export async function getIPLocation(): Promise<Geolocation> {
    const response = await fetch("http://ip-api.com/json");

    if (response.status !== 200)
        throw new Error("failed to get location via ip");

    return response.json();
}

export async function reverseGeocode(
    coordinates: Coordinates,
): Promise<ReverseGeocode> {
    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    );

    if (response.status !== 200)
        throw new Error("failed to reverse geocode coordinates");

    const data = await response.json();

    return data[0];
}

function resolveCountryName(countryCode: string) {
    const displayNames = new Intl.DisplayNames("en", { type: "region" });
    return displayNames.of(countryCode) ?? "";
}
