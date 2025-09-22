type Time = Date | string;

export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;

export function formatDate(time: Time) {
    return timeToDate(time).toLocaleDateString(LOCALE, {
        day: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
    });
}

export function dateToDay(
    time: Time,
    style: "long" | "short" | "narrow" = "long",
) {
    return timeToDate(time).toLocaleDateString(LOCALE, {
        weekday: style,
    });
}

export function dateToTime(time: Time) {
    const hours = timeToDate(time).getHours();

    return `${hours === 12 ? 12 : hours % 12} ${hours > 12 ? "PM" : "AM"}`;
}

export const isToday = (time: Time) =>
    timeToDate(time).getDate() === new Date().getDate();

export const isAfterNowInclusive = (time: Time) =>
    timeToDate(time).getHours() >= new Date().getHours();

const timeToDate = (time: Time) =>
    typeof time === "string" ? new Date(time) : time;
