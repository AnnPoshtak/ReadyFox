import { useNavigate } from "react-router-dom";
import type { Lesson } from "@/api/types";

interface LessonSectionProps {
    filteredLessons: Lesson[];
    loading: boolean;
}

export const LessonSection = ({ filteredLessons, loading }: LessonSectionProps) => {
    const navigate = useNavigate();
    return (
        <section className="w-full">
            {loading ? (
                <div className="text-center py-12 text-foreground-muted text-base font-medium">
                    Завантаження уроків...
                </div>
            ) : filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    {lesson.title}
                                </h2>
                                <p className="text-sm text-foreground-secondary font-medium">
                                    Автор: {lesson.author?.nameAndSurname || lesson.author?.email || "Невідомий"}
                                </p>
                                <p className="text-xs text-foreground-muted mt-1">
                                    Предмет: {lesson.category}
                                </p>
                            </div>
                            <button
                                className="mt-6 w-full bg-brand text-white font-bold hover:bg-brand-hover py-2.5 px-4 rounded-xl transition-colors cursor-pointer text-xs"
                                onClick={() => navigate(`/dashboard/lessons/${lesson.id}`)}
                            >
                                Детальніше
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-foreground-muted text-base font-medium">
                    Нічого не знайдено за вашим запитом
                </div>
            )}
        </section>
    );
};