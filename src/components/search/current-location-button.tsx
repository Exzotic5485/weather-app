import { Button } from "@/components/ui/button";
import { useDayStore } from "@/lib/store";
import { getDay } from "@/utils/time";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MapPinIcon } from "lucide-react";

export function CurrentLocationButton() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [, setDay] = useDayStore();

    const handleCurrentLocation = () => {
        navigate({
            to: "/",
        });

        queryClient.invalidateQueries({
            queryKey: ["location"],
        });

        setDay(getDay());
    };

    return (
        <Button onClick={handleCurrentLocation} className="w-max">
            <MapPinIcon />
        </Button>
    );
}
