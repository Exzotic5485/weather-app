import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnitsStore } from "@/lib/store";
import {
    IMPERIAL_UNITS,
    METRIC_UNITS,
    type Units,
    isMetricUnits,
} from "@/utils/units";
import { ChevronDownIcon, SettingsIcon } from "lucide-react";

type HandleUnitChangeFn = <T extends keyof Units>(
    key: T,
    value: Units[T],
) => void;

const preventDefault = (e: Event) => e.preventDefault();

export function UnitsDropdown() {
    const [units, setUnits] = useUnitsStore();

    const isMetric = isMetricUnits(units);

    const handleUnitChange: HandleUnitChangeFn = (key, value) => {
        setUnits((units) => ({
            ...units,
            [key]: value,
        }));
    };

    const handleUnitSystemChange = (e: Event) => {
        e.preventDefault();

        setUnits(isMetric ? IMPERIAL_UNITS : METRIC_UNITS);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                    <SettingsIcon className="size-4" />
                    Units
                    <ChevronDownIcon className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-54 grid gap-1"
                side="bottom"
                align="end"
            >
                <DropdownMenuItem
                    className="hover:bg-surface-hover"
                    onSelect={handleUnitSystemChange}
                >
                    Switch to {isMetric ? "Imperial" : "Metric"}
                </DropdownMenuItem>
                <div className="grid gap-2">
                    <DropdownMenuLabel>Temperature</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={units.temperature}
                        onValueChange={(v) =>
                            handleUnitChange("temperature", v)
                        }
                    >
                        <DropdownMenuRadioItem
                            value="celsius"
                            onSelect={preventDefault}
                        >
                            Celcius (°C)
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="fahrenheit"
                            onSelect={preventDefault}
                        >
                            Fahrenheit (°F)
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </div>
                <DropdownMenuSeparator />
                <div className="grid gap-2">
                    <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={units.windSpeed}
                        onValueChange={(v) => handleUnitChange("windSpeed", v)}
                    >
                        <DropdownMenuRadioItem
                            value="kmh"
                            onSelect={preventDefault}
                        >
                            km/h
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="mph"
                            onSelect={preventDefault}
                        >
                            mph
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </div>
                <DropdownMenuSeparator />
                <div className="grid gap-2">
                    <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={units.precipitation}
                        onValueChange={(v) =>
                            handleUnitChange("precipitation", v)
                        }
                    >
                        <DropdownMenuRadioItem
                            value="mm"
                            onSelect={preventDefault}
                        >
                            Millimeters (mm)
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="inch"
                            onSelect={preventDefault}
                        >
                            Inches (in)
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
