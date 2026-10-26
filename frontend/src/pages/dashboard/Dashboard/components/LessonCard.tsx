import { formatIsoTimestamp } from "@/utilities/FormatIsoTimestamp"
import useUserDashboardData from "../hooks/useUserDashboardData"
import { useNavigate } from "react-router-dom";

export const LessonCard = () => {
    const navigate = useNavigate();
    const { userLessons } = useUserDashboardData();
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Ваші уроки</h2>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-2">
                {userLessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className="w-72 sm:w-80 shrink-0 p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
                    >
                        <div className="space-y-2">
                            <span className="text-xs px-3 py-1 bg-cream text-brown-light rounded-full font-bold inline-block border border-outline">
                                Урок
                            </span>
                            <h3 className="font-bold text-lg text-foreground line-clamp-2">{lesson.title}</h3>
                            {lesson.category && (
                                <span className="inline-block text-xs font-semibold text-foreground-muted bg-outline/20 px-2.5 py-0.5 rounded-md border border-outline/50">
                                    {lesson.category}
                                </span>
                            )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-outline flex items-center justify-between text-sm">
                            <span className="text-xs text-foreground-muted">{formatIsoTimestamp(lesson.createdAt)}</span>
                            <button
                                type="button"
                                onClick={() => navigate(`/dashboard/lessons/${lesson.id}`)}
                                className="px-3.5 py-1.5 bg-brand-subtle text-brand font-bold rounded-xl hover:bg-brand-soft transition-colors border border-outline text-xs cursor-pointer"
                            >
                                Детальніше
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}