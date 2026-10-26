import React from "react";
import { PieChart } from "lucide-react";

interface CategoryStat {
    name: string;
    count: number;
    percentage: number;
}

interface CategoryChartProps {
    categoryStats: CategoryStat[];
    totalItems: number;
    chartColors: string[];
}

export const CategoryChart = ({
    categoryStats,
    totalItems,
    chartColors,
}: CategoryChartProps) => {
    if (categoryStats.length === 0) return null;

    return (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
                    <PieChart className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Розподіл за предметами</h2>
                    <p className="text-xs text-foreground-secondary">Які предмети ви вивчаєте найчастіше</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center py-2">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            {categoryStats.map((item, i) => {
                                const color = chartColors[i % chartColors.length];
                                const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                                const prevPercentageSum = categoryStats
                                    .slice(0, i)
                                    .reduce((sum, curr) => sum + curr.percentage, 0);
                                const strokeDashoffset = 100 - prevPercentageSum;

                                return (
                                    <circle
                                        key={item.name}
                                        cx="18"
                                        cy="18"
                                        r="15.91549430918954"
                                        fill="transparent"
                                        stroke={color}
                                        strokeWidth="3.8"
                                        strokeDasharray={strokeDasharray}
                                        strokeDashoffset={strokeDashoffset}
                                        className="transition-all duration-500"
                                    />
                                );
                            })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                            <span className="text-2xl font-black text-foreground">{totalItems}</span>
                            <span className="text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">Занять</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 lg:col-span-8 space-y-3">
                    {categoryStats.map((cat, index) => {
                        const color = chartColors[index % chartColors.length];
                        return (
                            <div
                                key={cat.name}
                                className="p-3.5 rounded-2xl bg-background-secondary border border-outline space-y-1.5 transition-all hover:border-brand/30"
                            >
                                <div className="flex justify-between items-center text-sm font-bold text-foreground">
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                                            style={{ backgroundColor: color }}
                                        ></span>
                                        <span>{cat.name}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-foreground-secondary">
                                        {cat.count} {cat.count === 1 ? "заняття" : "занять"} ({cat.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-outline/50 p-0.5">
                                    <div
                                        className="h-full rounded-full transition-all duration-500 shadow-sm"
                                        style={{ width: `${cat.percentage}%`, backgroundColor: color }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};