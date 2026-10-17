import { BookOpen } from "lucide-react"
import useQuiz from "../hooks/useQuiz"

export const QuestionList = () => {
    const { quiz, questionsCount, } = useQuiz()
    if (!quiz) return;

    return (

        <section className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-outline)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-foreground)] flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[var(--color-brand)]" />
                    Питання у квізі
                </h2>
                <span className="text-sm font-semibold text-[var(--color-foreground-muted)]">
                    Всього: {questionsCount}
                </span>
            </div>

            {questionsCount === 0 ? (
                <p className="text-center py-8 text-[var(--color-foreground-muted)]">
                    У цьому квізі поки немає доданих питань.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {quiz.questions?.map((question, index) => (
                        <div
                            key={question.id || index}
                            className="bg-[var(--color-brand-subtle)] border border-[var(--color-outline)]/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[var(--color-outline-hover)] transition-colors"
                        >
                            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] font-bold flex items-center justify-center text-sm">
                                {index + 1}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="font-semibold text-[var(--color-foreground)] text-base sm:text-lg leading-snug">
                                    {question.questionText}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}