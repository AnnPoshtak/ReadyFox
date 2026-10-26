import { HelpCircle, User } from "lucide-react"
import useQuiz from "../hooks/useQuiz"

export const HeroSection = () => {
    const { quiz, questionsCount, authorName } = useQuiz()

    if (!quiz) {
        return;
    }
    return (
        <section className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-brand-soft)] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[var(--color-brand-soft)] text-[var(--color-brand)] font-bold text-xs tracking-wider uppercase rounded-full">
                    {quiz.category || "Загальне"}
                </span>
                <span className="px-3 py-1 bg-[var(--color-background-secondary)] text-[var(--color-foreground-secondary)] text-xs font-semibold rounded-full flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> {questionsCount} питань
                </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
                {quiz.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-foreground-secondary)] pt-2 border-t border-[var(--color-outline)]/60">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-peach)] flex items-center justify-center text-[var(--color-brown)] font-bold">
                        <User className="w-4 h-4" />
                    </div>
                    <span>Автор: <strong className="text-[var(--color-foreground)]">{authorName}</strong></span>
                </div>
            </div>
        </section>
    )
}