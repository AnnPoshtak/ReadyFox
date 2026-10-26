import { useNavigate } from "react-router-dom";
import type { Quiz } from "@/api/types";

interface QuizSectionProps {
    filteredQuizzes: Quiz[];
    loading: boolean;
}

export const QuizSection = ({ filteredQuizzes, loading }: QuizSectionProps) => {
    const navigate = useNavigate();
    return (
        <section className="w-full">
            {loading ? (
                <div className="text-center py-12 text-foreground-muted text-base font-medium">
                    Завантаження квізів...
                </div>
            ) : filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    {quiz.title}
                                </h2>
                                <p className="text-sm text-foreground-secondary font-medium">
                                    Автор: {quiz.author?.nameAndSurname || quiz.author?.email || "Невідомий"}
                                </p>
                                <p className="text-xs text-foreground-muted mt-1">
                                    Предмет: {quiz.category}
                                </p>
                            </div>
                            <button className="mt-6 w-full bg-brand text-white font-bold hover:bg-brand-hover py-2.5 px-4 rounded-xl transition-colors cursor-pointer text-xs" onClick={() => navigate(`${quiz.id}`)}>
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