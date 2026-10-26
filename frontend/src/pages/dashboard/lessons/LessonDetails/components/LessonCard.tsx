import { FileText, Play } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useLesson from "../hooks/useLesson"

export const LessonCard = () => {
    const navigate = useNavigate()
    const { lesson } = useLesson()

    if (!lesson) {
        return null;
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="bg-surface border border-outline rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Мета уроку</h2>
                </div>
                <p className="text-foreground-secondary leading-relaxed whitespace-pre-line">{lesson.goal}</p>
            </div>

            <div className="bg-surface border border-outline rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand flex items-center justify-center">
                            <Play className="w-5 h-5 fill-current" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Навчання</h2>
                    </div>
                    <p className="text-sm text-foreground-secondary mb-6">
                        Почніть урок з нуля та ознайомтеся з матеріалом у структурованому форматі.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate(`lesson/`)}
                    className="w-full py-3.5 px-6 bg-brand text-white font-bold rounded-2xl hover:bg-brand-hover active:bg-brand-active transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                    <Play className="w-5 h-5 fill-current" /> Почати урок
                </button>
            </div>
        </section>
    )
}