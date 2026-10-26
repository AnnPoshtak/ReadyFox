import { Check, Loader2 } from "lucide-react";

interface LessonFooterProps {
    isAgreed: boolean;
    isSubmitting: boolean;
    isCompleted: boolean;
    setIsAgreed: (agreed: boolean) => void;
    onComplete: () => void;
}

export const LessonFooter = ({
    isAgreed,
    isSubmitting,
    isCompleted,
    setIsAgreed,
    onComplete,
}: LessonFooterProps) => {
    return (
        <div className="pt-4 flex flex-col gap-5">
            <label className="group flex items-center gap-3.5 cursor-pointer select-none self-start">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        disabled={isSubmitting || isCompleted}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-outline bg-surface transition-all checked:border-brand checked:bg-brand hover:border-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Check className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <span className="text-sm font-bold text-foreground transition-colors group-hover:text-brand">
                    Я пройшов(ла) цей урок та засвоїв(ла) матеріал
                </span>
            </label>

            <button
                onClick={onComplete}
                disabled={!isAgreed || isSubmitting || isCompleted}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 self-start shadow-sm ${
                    isCompleted
                        ? "bg-success text-white cursor-default"
                        : isAgreed && !isSubmitting
                        ? "bg-brand text-white hover:bg-brand-hover active:bg-brand-active cursor-pointer active:scale-[0.98]"
                        : "bg-outline/50 text-foreground-muted cursor-not-allowed"
                }`}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Збереження...
                    </>
                ) : isCompleted ? (
                    <>
                        <Check className="w-4 h-4" />
                        Урок пройдено!
                    </>
                ) : (
                    "Завершити урок"
                )}
            </button>
        </div>
    );
}