interface QuizHeaderProps {
    title: string;
    currentIndex: number;
    totalQuestions: number;
    questionText: string;
}

export const QuizHeader = ({ title, currentIndex, totalQuestions, questionText }: QuizHeaderProps) => {
    const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

    return (
        <div className="flex flex-col gap-2 shrink-0">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-brand">
                <span>{title}</span>
                <span>
                    Питання {currentIndex + 1} / {totalQuestions}
                </span>
            </div>

            <div className="w-full bg-brand-soft h-1.5 rounded-full overflow-hidden">
                <div
                    className="bg-brand h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <h1 className="text-lg sm:text-xl font-bold font-heading text-foreground mt-2">
                {questionText}
            </h1>
        </div>
    );
}