import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BanIcon, RotateCcwIcon } from "lucide-react";

type SomethingWentWrongProps = {
    message?: string;
    className?: string;
};

const DEFAULT_MESSAGE =
    "We couldn't connect to the server (API error). Please try again in a few moments.";

export function SomethingWentWrong({
    message,
    className,
}: SomethingWentWrongProps) {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center gap-6 text-center",
                className,
            )}
        >
            <BanIcon className="size-12 text-muted-foreground" />
            <h1 className="font-bricolage font-bold text-5xl">
                Something went wrong
            </h1>
            <p className="font-medium text-xl text-muted-foreground max-w-140">
                {message ?? DEFAULT_MESSAGE}
            </p>
            <Button onClick={handleRetry} variant="secondary" size="sm">
                <RotateCcwIcon className="size-5" />
                Retry
            </Button>
        </div>
    );
}
