import { useUnitsStore } from "@/lib/store";
import { geocodeSearch, getLocation } from "@/utils/location";
import { getWeatherForecast } from "@/utils/weather";
import { useQuery } from "@tanstack/react-query";

export const useLocation = () =>
    useQuery({
        queryKey: ["location"],
        queryFn: getLocation,
        staleTime: Number.POSITIVE_INFINITY,
    });

export const useWeatherForecast = () => {
    const { data: coordinates } = useLocation();
    const [units] = useUnitsStore();

    return useQuery({
        queryKey: ["weather", coordinates, units],
        queryFn: () => {
            if (!coordinates) {
                throw new Error("coordinates are undefined");
            }

            return getWeatherForecast(
                coordinates.latitude,
                coordinates.longitude,
                units,
            );
        },
        enabled: !!coordinates,
    });
};

export const useGeocodeSearch = (query: string, max?: number) =>
    useQuery({
        queryKey: ["search", query],
        queryFn: () => geocodeSearch(query, max),
        initialData: [],
        enabled: !!query,
    });
