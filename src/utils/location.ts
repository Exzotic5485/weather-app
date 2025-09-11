export interface Coordinates {
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

export async function getLocation(): Promise<Coordinates> {
    try {
        const gpsPosition = await getGPSLocation();

        return {
            longitude: gpsPosition.coords.longitude,
            latitude: gpsPosition.coords.latitude,
        };
    } catch {
        try {
            const ipLocation = await getIPLocation();

            return {
                longitude: ipLocation.lon,
                latitude: ipLocation.lat,
            };
        } catch {
            return {
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
