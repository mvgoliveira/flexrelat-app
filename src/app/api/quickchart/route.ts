import type { ChartColumnData } from "@/components/layouts/modals/modalChartColumnOptions";
import { NextRequest, NextResponse } from "next/server";
import QuickChart from "quickchart-js";

export async function POST(request: NextRequest) {
    try {
        const { config } = (await request.json()) as { config?: ChartColumnData };

        if (!config) {
            return NextResponse.json({ error: "Missing chart configuration" }, { status: 400 });
        }

        const chart = new QuickChart();

        chart.setConfig({
            type: config.type,
            data: config.data,
            options: config.options,
        });

        const url = chart.getUrl();

        return NextResponse.json({ url });
    } catch (error) {
        console.error("QuickChart API route error", error);
        return NextResponse.json({ error: "Unable to generate QuickChart URL" }, { status: 500 });
    }
}
