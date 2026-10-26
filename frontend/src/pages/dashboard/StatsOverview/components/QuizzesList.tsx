import { HelpCircle, Calendar, ExternalLink } from "lucide-react";
import { type QuizStat } from "../hooks/useStatsOverview";

interface QuizzesListProps {
    quizzes: QuizStat[];
    formatDate: (dateStr?: string) => string;
    onQuizClick: (quizId?: number) => void;
}

export const QuizzesList = ({
    quizzes,
    formatDate,
    onQuizClick,
}: QuizzesListProps) => {
    return (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Результати квізів</h2>
                        <p className="text-xs text-foreground-secondary">Результати проходження тестів</p>
                    </div>
                </div>
                <span className="text-xs font-bold text-foreground-secondary bg-background-secondary px-3 py-1.5 rounded-full border border-outline">
                    Всього: {quizzes.length}
                </span>
            </div>

            {quizzes.length === 0 ? (
                <div className="text-center py-10 bg-background-secondary rounded-2xl border border-dashed border-outline">
                    <HelpCircle className="w-10 h-10 text-foreground-muted mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground-secondary">Квізів не знайдено</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id || quiz.quizId}
                            onClick={() => onQuizClick(quiz.quizId)}
                            className="p-4 rounded-2xl border border-outline bg-background-secondary hover:bg-surface-hover hover:border-outline-hover transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <span className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                                        {quiz.title}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-soft text-brand">
                                        {quiz.subject || quiz.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-foreground-secondary font-medium">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-foreground-muted" />
                                        {formatDate(quiz.completedAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 self-end md:self-center">
                                <div className="text-right">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted">Точність</div>
                                    <div className="text-base font-extrabold text-foreground">{quiz.score ?? 0}%</div>
                                </div>

                                <div className="px-4 py-2 rounded-2xl text-center border bg-surface border-outline text-foreground">
                                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Оцінка</div>
                                    <div className="text-lg font-black leading-none mt-0.5">
                                        {quiz.grade12 ?? 0} <span className="text-xs font-normal opacity-70">/ 12</span>
                                    </div>
                                </div>

                                <ExternalLink className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};