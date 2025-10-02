import { fromZonedTime } from "date-fns-tz";

type Time = Date | string;

type DateFormats = Readonly<Record<string, Intl.DateTimeFormatOptions>>;

export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;

export const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

export const DATE_FORMATS = {
    LONG: {
        day: "2-digit",
        month: "short",
        weekday: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    },
    SHORT: {
        day: "2-digit",
        month: "short",
    },
    ALTERNATIVE: {
        day: "2-digit",
        month: "long",
        weekday: "long",
    },
} satisfies DateFormats;

export function formatDate(
    time: Time,
    options: Intl.DateTimeFormatOptions,
    timeZone?: string,
) {
    return timeToDate(time).toLocaleDateString(LOCALE, {
        ...options,
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

export function formatDateTime(time: Time) {
    const hours = timeToDate(time).getHours();

    return `${hours % 12 === 0 ? 12 : hours % 12} ${hours > 12 || hours === 0 ? "PM" : "AM"}`;
}

export function getNextTimeByDay(day: number) {
    const date = new Date();
    date.setUTCHours(0);
    date.setUTCMinutes(0, 0, 0);
    date.setUTCSeconds(0, 0);

    const days = getDaysToNextWeekDay(day, date);

    date.setUTCDate(date.getUTCDate() + days);

    return dateToTime(date);
}

export const dateToTime = (date: Date) =>
    date.toISOString().replace(/:\d\d.\d+Z$/g, "");

export const getDaysToNextWeekDay = (day: number, date = new Date()) =>
    (day - date.getUTCDay() + DAYS.length) % DAYS.length;

export const isToday = (time: Time) =>
    timeToDate(time).getDate() === new Date().getDate();

export const isAfterNowInclusive = (time: string, timeZone: string) =>
    fromZonedTime(time.replace(/(?<=T\d{2}:)\d\d/, "59"), timeZone) >=
    new Date();

const timeToDate = (time: Time) =>
    typeof time === "string" ? new Date(time) : time;

export const isHourZero = (time: Time) => timeToDate(time).getUTCHours() === 0;
