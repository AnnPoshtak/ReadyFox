import { BookOpen, User } from "lucide-react"
import useLesson from "../hooks/useLesson";

export const HeroSection = () => {
    const { lesson, authorName } = useLesson();

    if (!lesson) {
        return null;
    }

    return (
        <section className="bg-surface border border-outline rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-soft rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-soft text-brand font-bold text-xs tracking-wider uppercase rounded-full">
                    {lesson.category || "Загальне"}
                </span>
                <span className="px-3 py-1 bg-background-secondary text-foreground-secondary text-xs font-semibold rounded-full flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Урок
                </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                {lesson.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-secondary pt-2 border-t border-outline/60">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-peach flex items-center justify-center text-brown font-bold">
                        <User className="w-4 h-4" />
                    </div>
                    <span>
                        Автор: <strong className="text-foreground">{authorName}</strong>
                    </span>
                </div>
            </div>
        </section>
    )
}