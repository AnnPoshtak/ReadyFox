import { quizzesApi } from "@/api/services/quizzes";
import { type Quiz, type CompletedQuizDto } from "@/api/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Quiz() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await quizzesApi.findOneWithoutAnswers(+id);
                setQuiz(response);
            } catch (error) {
                console.error("Помилка завантаження тесту:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleSelectOption = (questionId: number, optionId: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const questions = quiz?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isCurrentAnswered = currentQuestion ? selectedAnswers[currentQuestion.id] !== undefined : false;

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!quiz) return;

        const payload: CompletedQuizDto = {
            quizId: quiz.id,
            answers: Object.entries(selectedAnswers).map(([questionId, selectedOptionId]) => ({
                questionId: Number(questionId),
                selectedOptionId,
            })),
        };

        try {
            setSubmitting(true);
            const results = await quizzesApi.submitQuiz(payload);
            navigate(`/dashboard/quizzes/${quiz.id}/results`, {state: {quizResults: results, quizTitle: quiz.title}});
        } catch (error) {
            console.error("Помилка відправки тесту:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-background flex items-center justify-center p-4 font-sans text-foreground">
            <div className="fixed inset-0 bg-brand-subtle flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none select-none z-0">
                <div className="flex flex-col justify-between w-full h-full opacity-[0.05] font-heading font-black text-[15vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-xl bg-surface p-5 sm:p-7 rounded-3xl border border-outline shadow-xl shadow-shadow backdrop-blur-sm flex flex-col gap-5 max-h-[90vh]">
                {loading ? (
                    <div className="text-center py-10 text-foreground-muted animate-pulse font-medium">
                        Завантаження питання...
                    </div>
                ) : !quiz || questions.length === 0 ? (
                    <div className="text-center py-10 text-foreground-muted font-medium">
                        Питань не знайдено або тест недоступний.
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-2 shrink-0">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-brand">
                                <span>{quiz.title}</span>
                                <span>
                                    Питання {currentQuestionIndex + 1} / {questions.length}
                                </span>
                            </div>

                            <div className="w-full bg-brand-soft h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-brand h-full transition-all duration-300"
                                    style={{
                                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                                    }}
                                />
                            </div>

                            <h1 className="text-lg sm:text-xl font-bold font-heading text-foreground mt-2">
                                {currentQuestion.questionText}
                            </h1>
                        </div>

                        <div className="w-full flex flex-col gap-2.5 overflow-y-auto pr-1 custom-scrollbar">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedAnswers[currentQuestion.id] === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                                        className={`group w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.99] ${
                                            isSelected
                                                ? "bg-brand text-foreground-inverse border-brand shadow-md"
                                                : "bg-surface hover:bg-brand-subtle border-outline hover:border-outline-hover text-foreground"
                                        }`}
                                    >

                                        <span className="text-sm font-medium leading-snug break-words flex-1">
                                            {option.text}
                                        </span>

                                        <span
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                                isSelected
                                                    ? "border-foreground-inverse bg-foreground-inverse/20"
                                                    : "border-outline group-hover:border-foreground-muted"
                                            }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground-inverse" />
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3 pt-2 shrink-0 border-t border-outline">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-3 rounded-2xl font-bold border border-outline hover:bg-brand-subtle disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Назад
                            </button>

                            {isLastQuestion ? (
                                <button
                                    type="button"
                                    onClick={handleSubmitQuiz}
                                    disabled={!isCurrentAnswered || submitting}
                                    className="flex-1 py-3 px-4 rounded-2xl font-bold bg-brand text-foreground-inverse hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                                >
                                    {submitting ? "Надсилання..." : "Завершити тест"}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!isCurrentAnswered}
                                    className="flex-1 py-3 px-4 rounded-2xl font-bold bg-brand text-foreground-inverse hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.99]"
                                >
                                    Далі
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}