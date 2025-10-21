export const getFormattedDate = (timestamp: string): string => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo", // Ajusta para o fuso horário brasileiro
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
            // Usa toLocaleString para formatar a data no fuso horário brasileiro
            const options: Intl.DateTimeFormatOptions = {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "America/Sao_Paulo",
            };
            return selectedDate.toLocaleString("pt-BR", options).replace(",", " -");
        }

        return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
    }

    return `${minutesDiff} minuto${minutesDiff !== 1 ? "s" : ""} atrás`;
};
