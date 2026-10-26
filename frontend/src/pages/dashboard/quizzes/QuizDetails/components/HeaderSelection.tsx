import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import useQuiz from "../hooks/useQuiz"

export const HeaderSelection = () => {
    const {isAuthor, handleDelete, handleEdit} = useQuiz()
    return (
        <div className="flex items-center justify-between">
            <Link
                to="/dashboard/quizzes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground-secondary)] hover:text-[var(--color-brand)] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Назад до квізів
            </Link>

            {isAuthor && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-foreground)] bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-xl hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
                    >
                        <Pencil className="w-4 h-4" /> Редагувати
                    </button>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" /> Видалити
                    </button>
                </div>
            )}
        </div>
    )
}