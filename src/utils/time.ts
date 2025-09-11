export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;

export function formatDate(date: Date | string) {
    return dateOrString(date).toLocaleDateString(LOCALE, {
        day: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
    });
}

export function dateToDay(
    date: Date | string,
    style: "long" | "short" | "narrow" = "long",
) {
    return dateOrString(date).toLocaleDateString(LOCALE, {
        weekday: style,
    });
}

const dateOrString = (date: Date | string) =>
    typeof date === "string" ? new Date(date) : date;
