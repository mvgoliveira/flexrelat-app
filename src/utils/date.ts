import dayjs from "dayjs";
import dayJsLocale from "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getFormattedDate = (timestamp: string): string => {
    const selectedDate = dayjs(timestamp).tz(dayjs.tz.guess());
    const formatted = selectedDate.locale(dayJsLocale).format("DD MMMM YYYY - HH:mm");
    return formatted.replace(
        /(\d{2} )(\w)/,
        (_, day, firstLetter) => day + firstLetter.toUpperCase()
    );
};

export const getElapsedTime = (timestamp: string): string => {
    const now = dayjs().tz(dayjs.tz.guess());
    const selectedDate = dayjs(timestamp).tz(dayjs.tz.guess());
    const minutesDiff = -selectedDate.diff(now, "minutes");

    if (minutesDiff >= 60) {
        const hours = Math.floor(minutesDiff / 60);

        if (hours >= 24) {
            return selectedDate.locale(dayJsLocale).format("DD MMM YYYY - HH:mm");
        }

        return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
    }

    if (minutesDiff < 1) {
        return "Agora mesmo";
    }

    return `${minutesDiff} minuto${minutesDiff !== 1 ? "s" : ""} atrás`;
};

export const getShortElapsedTime = (timestamp: string): string => {
    const now = dayjs().tz(dayjs.tz.guess());
    const selectedDate = dayjs(timestamp).tz(dayjs.tz.guess());
    const minutesDiff = -selectedDate.diff(now, "minutes");

    if (minutesDiff >= 60) {
        const hours = Math.floor(minutesDiff / 60);

        if (hours >= 24) {
            return selectedDate.locale(dayJsLocale).format("DD MMM YYYY");
        }

        return `Há ${hours} hora${hours > 1 ? "s" : ""}`;
    }

    if (minutesDiff < 1) {
        return "Agora mesmo";
    }

    return `Há ${minutesDiff} minuto${minutesDiff !== 1 ? "s" : ""}`;
};
