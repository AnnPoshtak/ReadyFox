import { Link } from "react-router-dom"
import useLesson from "../hooks/useLesson"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"

export const HeaderSelection = () => {
    const { isAuthor, handleDelete, handleEdit } = useLesson()
    return (
        <div className="flex items-center justify-between">
            <Link
                to="/dashboard/lessons"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-secondary hover:text-brand transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Назад до уроків
            </Link>

            {isAuthor && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground bg-surface border border-outline rounded-xl hover:bg-brand-soft hover:text-brand transition-colors cursor-pointer"
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