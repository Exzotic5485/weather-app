import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MapPinIcon } from "lucide-react";

export function CurrentLocationButton() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleCurrentLocation = () => {
        navigate({
            to: "/",
        });

        queryClient.invalidateQueries({
            queryKey: ["location"],
        });
    };

    return (
        <Button onClick={handleCurrentLocation} className="w-full md:w-max">
            <MapPinIcon />
        </Button>
    );
}
