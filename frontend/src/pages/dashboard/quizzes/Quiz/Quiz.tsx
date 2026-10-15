import useQuiz from "./hooks/useQuiz";
import { QuizBackground } from "./components/QuizBackground";
import { QuizHeader } from "./components/QuizHeader";
import { QuizOptionsList } from "./components/QuizOptionBlock";
import { QuizFooter } from "./components/QuizNavigation";

export default function Quiz() {
    const {
        loading,
        quiz,
        questions,
        currentQuestionIndex,
        currentQuestion,
        selectedAnswers,
        handleSelectOption,
        handleNext,
        handlePrev,
        handleSubmitQuiz,
        isLastQuestion,
        submitting,
        isCurrentAnswered,
    } = useQuiz();

    return (
        <div className="relative min-h-screen w-full bg-background flex items-center justify-center p-4 font-sans text-foreground">
            <QuizBackground />

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
                        <QuizHeader
                            title={quiz.title}
                            currentIndex={currentQuestionIndex}
                            totalQuestions={questions.length}
                            questionText={currentQuestion.questionText}
                        />

                        <QuizOptionsList
                            options={currentQuestion.options}
                            selectedAnswerId={selectedAnswers[currentQuestion.id]}
                            onSelectOption={(optionId) => handleSelectOption(currentQuestion.id, optionId)}
                        />

                        <QuizFooter
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onSubmit={handleSubmitQuiz}
                            isFirstQuestion={currentQuestionIndex === 0}
                            isLastQuestion={isLastQuestion}
                            isCurrentAnswered={isCurrentAnswered}
                            submitting={submitting}
                        />
                    </>
                )}
            </div>
        </div>
    );
}