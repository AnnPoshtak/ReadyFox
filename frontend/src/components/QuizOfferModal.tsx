import { Book, HelpCircle, Sparkles, X } from "lucide-react";
import { useEffect } from "react";

interface IQuizOfferModalProps {
    quizId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    onDecline: () => void;
}

export const QuizOfferModal = ({ 
    quizId, 
    isOpen, 
    onClose, 
    onAccept, 
    onDecline 
}: IQuizOfferModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
                onClick={onClose} 
            />
            
            <div className="relative w-full max-w-md bg-surface border border-outline rounded-2xl p-6 sm:p-7 shadow-2xl z-10 flex flex-col gap-5 animate-in zoom-in-95 fade-in duration-200">

                <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
                        <Book className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-foreground leading-snug">
                            Перевірка знань
                        </h2>
                    </div>
                </div>

                <p className="text-sm font-medium text-foreground-secondary leading-relaxed">
                    Вітаємо з завершенням уроку! Бажаєте пройти короткий квіз, щоб закріпити отримані знання?
                </p>
                
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        onClick={onDecline}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold text-foreground-secondary hover:text-foreground hover:bg-outline/40 transition-all duration-150"
                    >
                        Пропустити
                    </button>
                    <button
                        onClick={onAccept}
                        disabled={!quizId}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold bg-brand text-white hover:bg-brand-hover active:bg-brand-active transition-all duration-150 shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Пройти квіз
                    </button>
                </div>
            </div>
        </div>
    );
};