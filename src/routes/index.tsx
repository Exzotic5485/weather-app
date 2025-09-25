import { CurrentLocationButton } from "@/components/search/current-location-button";
import { LocationSearchInput } from "@/components/search/location-search-input";
import { DailyForecastGrid } from "@/components/weather/daily-forecast-grid";
import { HourlyForecastCard } from "@/components/weather/hourly-forecast-card";
import { WeatherForecastCard } from "@/components/weather/weather-forecast-card";
import { WeatherForecastDetails } from "@/components/weather/weather-forecast-details";
import { locationSchema } from "@/utils/location";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

const indexSearchSchema = v.object({
    location: v.optional(locationSchema),
});

export const Route = createFileRoute("/")({
    component: App,
    validateSearch: indexSearchSchema,
    beforeLoad: ({ search, context }) => {
        if (!search.location) {
            context.queryClient.invalidateQueries({ queryKey: ["location"] });
            return;
        }

        context.queryClient.setQueryDefaults(["location"], {
            initialData: search.location,
        });

        context.queryClient.setQueryData(["location"], search.location);
    },
});

function App() {
    return (
        <main className="wrapper pb-12 md:pb-20">
            <div className="py-16">
                <h1 className="text-center font-bold font-bricolage text-[52px] leading-[120%] mx-auto">
                    How&apos;s the sky looking today?
                </h1>
            </div>
            <div className="space-y-8 lg:space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-auto max-w-xl w-full">
                    <LocationSearchInput />
                    <CurrentLocationButton />
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col w-full gap-5 lg:gap-8">
                        <div className="flex flex-col w-full gap-5 lg:gap-8">
                            <WeatherForecastCard />
                            <WeatherForecastDetails />
                        </div>
                        <div className="flex flex-col gap-5">
                            <span className="text-xl font-semibold">
                                Daily Forecast
                            </span>
                            <DailyForecastGrid />
                        </div>
                    </div>
                    <HourlyForecastCard />
                </div>
            </div>
        </main>
    );
}
