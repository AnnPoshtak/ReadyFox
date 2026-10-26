import { BookOpen, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { type LessonStat } from "../hooks/useStatsOverview";

interface LessonsListProps {
    lessons: LessonStat[];
    formatDate: (dateStr?: string) => string;
    onLessonClick: (lessonId?: number) => void;
}

export const LessonsList = ({
    lessons,
    formatDate,
    onLessonClick,
}: LessonsListProps) => {
    return (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Пройдені уроки</h2>
                        <p className="text-xs text-foreground-secondary">Список завершених конспектів</p>
                    </div>
                </div>
                <span className="text-xs font-bold text-foreground-secondary bg-background-secondary px-3 py-1.5 rounded-full border border-outline">
                    Всього: {lessons.length}
                </span>
            </div>

            {lessons.length === 0 ? (
                <div className="text-center py-10 bg-background-secondary rounded-2xl border border-dashed border-outline">
                    <BookOpen className="w-10 h-10 text-foreground-muted mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground-secondary">Уроків не знайдено</p>
                </div>
            ) : (
                <div className="divide-y divide-outline">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id || lesson.lessonId}
                            onClick={() => onLessonClick(lesson.lessonId)}
                            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-hover px-3 rounded-2xl transition-colors cursor-pointer group"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <span className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                                        {lesson.title}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-soft text-brand">
                                        {lesson.subject || lesson.category}
                                    </span>
                                </div>
                                <p className="text-xs text-foreground-muted flex items-center gap-1 font-medium">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Пройдено: {formatDate(lesson.completedAt)}</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-center">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-success-soft text-success">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Завершено
                                </span>
                                <ExternalLink className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};