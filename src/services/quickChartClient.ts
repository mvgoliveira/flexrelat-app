"use client";

import type { ChartColumnData } from "@/components/layouts/modals/modalChartColumnOptions";

const QUICK_CHART_ENDPOINT = "/api/quickchart";

export const requestQuickChartUrl = async (config: ChartColumnData): Promise<string | null> => {
    try {
        const response = await fetch(QUICK_CHART_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ config }),
        });

        if (!response.ok) {
            throw new Error(`QuickChart responded with status ${response.status}`);
        }

        const { url } = (await response.json()) as { url?: string };

        return url ?? null;
    } catch (error) {
        console.error("Failed to fetch QuickChart preview", error);
        return null;
    }
};
