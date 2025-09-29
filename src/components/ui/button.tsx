import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "flex items-center gap-2.5 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 transition-all",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground font-medium hover:bg-primary-hover",
                secondary: "bg-surface font-medium hover:bg-surface-hover",
            },
            size: {
                default: "h-14 rounded-lg px-6 py-4 text-xl",
                sm: "h-11 rounded-md px-4 py-3 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
        <button
            className={buttonVariants({ className, variant, size })}
            {...props}
        />
    );
}
