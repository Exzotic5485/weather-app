import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type InputProps = {
    icon?: LucideIcon;
} & React.ComponentProps<"input">;

export function Input({
    className,
    children,
    icon: Icon,
    ...props
}: InputProps) {
    return (
        <div className="relative w-full group">
            {Icon && (
                <Icon className="absolute top-1/2 -translate-y-1/2 left-6 size-6 text-surface-foreground" />
            )}
            <input
                className={cn(
                    "peer bg-surface text-surface-foreground h-14 px-6 py-2 rounded-xl text-xl font-medium hover:bg-surface-hover placeholder:text-muted-foreground focus-visible:bg-surface-hover focus-visible:outline-2 focus-visible:outline-primary outline-offset-2 outline-transparent transition-colors",
                    Icon && "px-16",
                    className,
                )}
                {...props}
            />
        </div>
    );
}
