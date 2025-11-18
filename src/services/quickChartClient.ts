"use server";
import type { ChartColumnData } from "@/components/layouts/modals/modalChartColumnOptions";
import QuickChart from "quickchart-js";

export const requestChartWithStackedLabel = async (
    config: ChartColumnData
): Promise<string | null> => {
    try {
        const chart = new QuickChart();

        const newData = config.data;

        newData.datasets = newData.datasets.map((data, index) => ({
            ...data,
            datalabels:
                index === newData.datasets.length - 1
                    ? {
                          formatter: (value: number, ctx: any) => {
                              const dataIndex = ctx.dataIndex;
                              const total = ctx.chart.data.datasets.reduce(
                                  (acc: number, acc_dataset: any) => {
                                      return acc + acc_dataset.data[dataIndex];
                                  },
                                  0
                              );
                              return total.toLocaleString("pt-BR");
                          },
                          display: true,
                          color: "#000000",
                          borderWidth: 1,
                          anchor: "end",
                          align: "top",
                      }
                    : {
                          display: false,
                      },
        }));

        chart.setConfig({
            type: config.type,
            data: config.data,
            options: config.options,
        });

        const url = chart.getUrl();

        return url ?? null;
    } catch (error) {
        console.error("Failed to fetch QuickChart preview", error);
        return null;
    }
};
