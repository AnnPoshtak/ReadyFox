interface QuizFooterProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    isCurrentAnswered: boolean;
    submitting: boolean;
}

export function QuizFooter({
    onPrev,
    onNext,
    onSubmit,
    isFirstQuestion,
    isLastQuestion,
    isCurrentAnswered,
    submitting,
}: QuizFooterProps) {
    return (
        <div className="flex items-center gap-3 pt-2 shrink-0 border-t border-outline">
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstQuestion}
                className="px-4 py-3 rounded-2xl font-bold border border-outline hover:bg-brand-subtle disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                Назад
            </button>

            {isLastQuestion ? (
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!isCurrentAnswered || submitting}
                    className="flex-1 py-3 px-4 rounded-2xl font-bold bg-brand text-foreground-inverse hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                >
                    {submitting ? "Надсилання..." : "Завершити тест"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!isCurrentAnswered}
                    className="flex-1 py-3 px-4 rounded-2xl font-bold bg-brand text-foreground-inverse hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                >
                    Далі
                </button>
            )}
        </div>
    );
}