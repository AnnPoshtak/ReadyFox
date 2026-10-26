import { formatIsoTimestamp } from "@/utilities/FormatIsoTimestamp"
import useUserDashboardData from "../hooks/useUserDashboardData"
import { useNavigate } from "react-router-dom";

export const QuizCard = () => {
    const navigate = useNavigate();
    const { usersQuizzes } = useUserDashboardData();
    
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Ваші квізи</h2>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-2">
                {usersQuizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="w-72 sm:w-80 shrink-0 p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
                    >
                        <div className="space-y-2">
                            <span className="text-xs px-3 py-1 bg-brand-soft text-brand rounded-full font-mono font-bold inline-block border border-outline tracking-tight">
                                Кількість питань: {quiz.questions?.length || 0}
                            </span>

                            <h3 className="font-bold text-lg text-foreground line-clamp-2">
                                {quiz.title}
                            </h3>

                            {quiz.category && (
                                <span className="inline-block text-xs font-semibold text-foreground-muted bg-outline/20 px-2.5 py-0.5 rounded-md border border-outline/50">
                                    {quiz.category}
                                </span>
                            )}
                        </div>

                        <div className="mt-6">
                            <span className="text-xs text-foreground-muted font-sans block mb-3">
                                {formatIsoTimestamp(quiz.createdAt)}
                            </span>

                            <div className="pt-3 border-t border-outline">
                                <button className="w-[50%] flex items-center justify-center px-4 py-2.5 bg-brand-subtle text-brand border border-outline font-bold rounded-xl hover:bg-brand-soft transition-colors text-center" onClick={() => navigate(`quizzes/${quiz.id}`)}>
                                    Детальніше
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}