import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
} from "@/components/ui/popover";
import { useGeocodeSearch } from "@/lib/queries";
import { useDayStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/utils/debounce";
import { type Location, formatLocationName } from "@/utils/location";
import { getDay } from "@/utils/time";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export function LocationSearchInput() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const { data } = useGeocodeSearch(debouncedSearch);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [, setDay] = useDayStore();

    const handleLocationSelect = (location: Location, closePopover = true) => {
        navigate({
            to: "/",
            search: {
                location,
            },
        });

        queryClient.setQueryData(["location"], location);

        setSearch("");
        setDay(getDay());
        if (closePopover) setOpen(false);
    };

    return (
        <Popover open={open && !!data.length} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <Input
                    icon={SearchIcon}
                    placeholder="Search for a place..."
                    className="w-full md:max-w-130"
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    onFocus={() => setOpen(true)}
                    onBlur={(e) =>
                        !(e.relatedTarget instanceof HTMLButtonElement) &&
                        setOpen(false)
                    }
                    onKeyDown={(e) =>
                        e.key.toLowerCase() === "enter" &&
                        data.length &&
                        handleLocationSelect(data[0], false)
                    }
                />
            </PopoverAnchor>
            <PopoverContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                onFocusOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
                sideOffset={12}
                className="w-[var(--radix-popover-trigger-width)]"
            >
                <div className="flex flex-col gap-2">
                    {data.map((location) => (
                        <button
                            type="button"
                            key={`${location.longitude}+${location.latitude}`}
                            onClick={() => handleLocationSelect(location)}
                            onKeyDown={(e) =>
                                e.key.toLowerCase() === "enter" &&
                                handleLocationSelect(location)
                            }
                            className={cn(
                                "text-left text-white font-medium py-2.5 px-2 rounded-lg border border-transparent hover:bg-surface-hover hover:border-neutral-600 hover:cursor-pointer",
                            )}
                            data-location
                        >
                            {formatLocationName(location)}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
