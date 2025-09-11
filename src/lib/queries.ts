import { getLocation } from "@/utils/location";
import { getWeatherForecast } from "@/utils/weather";
import { useQuery } from "@tanstack/react-query";

export const useLocation = () =>
    useQuery({
        queryKey: ["location"],
        queryFn: getLocation,
    });

export const useWeatherForecast = () => {
    const { data: coordinates } = useLocation();

    return useQuery({
        queryKey: ["weather", coordinates],
        queryFn: () => {
            if (!coordinates) {
                throw new Error("coordinates are undefined");
            }

            return getWeatherForecast(
                coordinates.latitude,
                coordinates.longitude,
            );
        },
        enabled: !!coordinates,
    });
};
