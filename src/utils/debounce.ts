import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, ms = 250) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setDebouncedValue(value);
        }, ms);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [value, ms]);

    return debouncedValue;
}
