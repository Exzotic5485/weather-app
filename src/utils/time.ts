import { fromZonedTime } from "date-fns-tz";

type Time = Date | string;

export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;

export function formatDate(time: Time, timeZone?: string, short = false) {
    if (short) {
        return timeToDate(time).toLocaleDateString(LOCALE, {
            day: "2-digit",
            month: "long",
            weekday: "long",
            timeZone,
        });
    }

    return timeToDate(time).toLocaleDateString(LOCALE, {
        day: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
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

    return `${hours % 12 === 0 ? 12 : hours % 12} ${hours > 12 || hours === 0 ? "PM" : "AM"}`;
}

export const isToday = (time: Time) =>
    timeToDate(time).getDate() === new Date().getDate();

export const isAfterNowInclusive = (time: string, timeZone: string) =>
    fromZonedTime(time.replace(/(?<=T\d{2}:)\d\d/, "59"), timeZone) >=
    new Date();

const timeToDate = (time: Time) =>
    typeof time === "string" ? new Date(time) : time;

export const isHourZero = (time: Time) => timeToDate(time).getUTCHours() === 0;
