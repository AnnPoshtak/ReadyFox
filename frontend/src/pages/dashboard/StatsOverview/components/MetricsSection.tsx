import React from "react";
import { BookOpen, HelpCircle, Award, Percent } from "lucide-react";

interface MetricsSectionProps {
    totalLessons: number;
    totalQuizzes: number;
    avgGrade: string;
    avgScore: number;
}

export const MetricsSection = ({
    totalLessons,
    totalQuizzes,
    avgGrade,
    avgScore,
}: MetricsSectionProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Завершено уроків</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        {totalLessons}
                    </div>
                    <p className="text-xs text-foreground-secondary mt-1 font-medium">Опрацьовані уроки</p>
                </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Завершено квізів</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        {totalQuizzes}
                    </div>
                    <p className="text-xs text-foreground-secondary mt-1 font-medium">Пройдені тестування</p>
                </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Середній бал</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-foreground flex items-baseline gap-1">
                        {avgGrade}
                        <span className="text-xs font-bold text-foreground-muted">/ 12</span>
                    </div>
                    <p className="text-xs text-foreground-secondary mt-1 font-medium">12-бальна система</p>
                </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                        <Percent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Середній %</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        {avgScore}%
                    </div>
                    <p className="text-xs text-foreground-secondary mt-1 font-medium">Точність відповідей</p>
                </div>
            </div>
        </section>
    );
};