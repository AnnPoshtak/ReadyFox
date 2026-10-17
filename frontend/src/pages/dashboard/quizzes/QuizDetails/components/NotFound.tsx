import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Квіз не знайдено 🦊</h2>
            <Link
                to="/dashboard/quizzes"
                className="inline-flex items-center gap-2 mt-4 text-[var(--color-brand)] font-semibold hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> На головну
            </Link>
        </div>
    );
}