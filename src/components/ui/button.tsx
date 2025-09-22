import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button">;

export function Button({ className, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "h-14 bg-primary text-primary-foreground rounded-lg px-6 py-4 text-xl font-medium focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                className,
            )}
            {...props}
        />
    );
}
