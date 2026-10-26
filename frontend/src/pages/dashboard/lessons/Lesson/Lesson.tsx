import 'md-editor-rt/lib/style.css';
import { QuizOfferModal } from "@/components/QuizOfferModal";
import useLesson from "./hooks/useLesson";

import { LessonGoal } from "./components/LessonGoal";
import { LessonContent } from "./components/LessonContent";
import { LessonResources } from "./components/LessonResources";
import { LessonFooter } from "./components/LessonFooter";

export default function Lesson() {
    const {
        title,
        goal,
        content,
        quizId,
        additionalResources,
        author,
        setIsAgreed,
        openQuizModal,
        setOpenQuizModal,
        handleCompleteLesson,
        isAgreed,
        isCompleted,
        isSubmitting,
        handleAcceptQuiz,
        handleDeclineQuiz,
    } = useLesson();

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
            <section className="text-center max-w-3xl w-full">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {title || "Завантаження..."}
                </h1>
                {author?.nameAndSurname && (
                    <p className="text-xs text-foreground-muted mt-2">
                        Автор: {author.nameAndSurname}
                    </p>
                )}
            </section>

            <div className="w-full max-w-4xl flex flex-col gap-6">
                <LessonGoal goal={goal} />
                <LessonContent content={content} />
                <LessonResources resources={additionalResources} />

                <LessonFooter
                    isAgreed={isAgreed}
                    isSubmitting={isSubmitting}
                    isCompleted={isCompleted}
                    setIsAgreed={setIsAgreed}
                    onComplete={handleCompleteLesson}
                />
            </div>

            <QuizOfferModal
                quizId={quizId}
                isOpen={openQuizModal}
                onClose={() => setOpenQuizModal(false)}
                onAccept={handleAcceptQuiz}
                onDecline={handleDeclineQuiz}
            />
        </div>
    );
}