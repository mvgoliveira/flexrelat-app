export const getFormattedDate = (timestamp: string): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    return date.toLocaleString("pt-BR", options);
};

export const getElapsedTime = (selectedTimestamp: string): string => {
    const now = new Date();
    const selectedDate = new Date(selectedTimestamp);

    const diffMs = now.getTime() - selectedDate.getTime();
    const minutesDiff = Math.floor(diffMs / (1000 * 60));

    if (minutesDiff >= 60) {
        const hours = Math.floor(minutesDiff / 60);

        if (hours >= 24) {
            const day = String(selectedDate.getDate()).padStart(2, "0");
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const month = monthNames[selectedDate.getMonth()];
            const year = selectedDate.getFullYear();
            const hour = String(selectedDate.getHours()).padStart(2, "0");
            const minute = String(selectedDate.getMinutes()).padStart(2, "0");
            return `${day} ${month} ${year} - ${hour}:${minute}`;
        }

        return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
    }

    return `${minutesDiff} minuto${minutesDiff !== 1 ? "s" : ""} atrás`;
};
