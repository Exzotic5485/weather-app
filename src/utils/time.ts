export function getLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale;
}

export function formatDate(date: Date) {
    return date.toLocaleDateString(getLocale(), {
        day: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
    });
}
