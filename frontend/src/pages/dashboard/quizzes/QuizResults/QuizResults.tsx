import { type QuizResults } from "@/api/types";
import { QUIZ_FEEDBACK_MESSAGES } from "@/constants/feedbackMessages";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizResults() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state;
    const quizResults: QuizResults | undefined = state?.quizResults;
    const quizTitle: string = state?.quizTitle || "Результати тесту";

    const feedback = useMemo(() => {
        if (!quizResults) return null;
        const score = quizResults.score;

        let category: keyof typeof QUIZ_FEEDBACK_MESSAGES = "low";
        if (score === 100) category = "perfect";
        else if (score >= 80) category = "good";
        else if (score >= 50) category = "average";

        const list = QUIZ_FEEDBACK_MESSAGES[category];
        return list[Math.floor(Math.random() * list.length)];
    }, [quizResults]);

    if (!quizResults) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-center">
                <p className="text-foreground-muted mb-4">Результати відсутні або сторінку було оновлено.</p>
                <button
                    onClick={() => navigate("/dashboard/quizzes")}
                    className="py-3 px-6 rounded-2xl font-bold bg-brand text-foreground-inverse shadow-md"
                >
                    Повернутися до тестів
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-background flex items-center justify-center p-4 font-sans text-foreground">
            <div className="fixed inset-0 bg-brand-subtle flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none select-none z-0">
                <div className="flex flex-col justify-between w-full h-full opacity-[0.05] font-heading font-black text-[15vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-lg bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-xl backdrop-blur-sm flex flex-col gap-6">
                <div className="flex flex-col gap-1 text-center">
                    <span className="text-xs font-black uppercase tracking-widest text-brand">
                        {quizTitle}
                    </span>
                    <h1 className="text-2xl font-extrabold font-heading text-foreground">
                        {feedback?.title}
                    </h1>
                    <p className="text-sm text-foreground-muted font-medium mt-1">
                        {feedback?.subtitle}
                    </p>
                </div>

                <div className="bg-brand-soft p-6 rounded-2xl border border-outline flex flex-col items-center justify-center gap-3 text-center shadow-inner">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Точність</span>
                    <div className="text-5xl sm:text-6xl font-black font-heading text-brand tracking-tight">
                        {quizResults.score}%
                    </div>

                    <div className="w-full bg-surface-hover h-3 rounded-full overflow-hidden border border-outline/50 mt-1">
                        <div
                            className="bg-brand h-full transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${Math.min(Math.max(quizResults.score, 5), 100)}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface hover:bg-brand-subtle/40 transition-colors p-4 rounded-2xl border border-outline flex flex-col items-center justify-center text-center gap-1">
                        <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Правильні відповіді</span>
                        <span className="text-2xl font-black font-heading text-foreground">
                            {quizResults.correctAnswers} <span className="text-sm text-foreground-muted font-normal">/ {quizResults.totalQuestions}</span>
                        </span>
                    </div>

                    <div className="bg-surface hover:bg-brand-subtle/40 transition-colors p-4 rounded-2xl border border-outline flex flex-col items-center justify-center text-center gap-1">
                        <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Оцінка (12-бальна)</span>
                        <span className="text-2xl font-black font-heading text-brand">
                            {quizResults.grade12} <span className="text-sm font-medium">балів</span>
                        </span>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/quizzes")}
                        className="w-full py-3.5 px-4 rounded-2xl font-bold bg-brand text-foreground-inverse hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                    >
                        <span>До списку тестів</span>
                    </button>
                </div>

            </div>
        </div>
    );
}