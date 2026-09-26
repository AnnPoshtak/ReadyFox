import { lessonsApi } from "@/api/services/lessons";
import { BookOpen, Check, FileText, Loader2 } from "lucide-react";
import { MdPreview } from "md-editor-rt";
import 'md-editor-rt/lib/style.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizOfferModal } from "@/components/QuizOfferModal";

export default function Lesson() {
    const navigator = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");
    const [content, setContent] = useState("");
    const [quizId, setQuizId] = useState<number | null>(null);

    const [isAgreed, setIsAgreed] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [openQuizModal, setOpenQuizModal] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchLessonContent = async () => {
            try {
                const data = await lessonsApi.findOne(+id);
                setTitle(data.title || "");
                setGoal(data.goal || "");
                setContent(data.content || "");
                setQuizId(data.quiz.id || null);
            } catch (error) {
                console.error("Помилка завантаження уроку:", error);
            }
        };

        fetchLessonContent();
    }, [id]);

    const handleCompleteLesson = async () => {
        if (!id || !isAgreed || isSubmitting || isCompleted) return;

        setIsSubmitting(true);

        try {
            if (lessonsApi.complete) {
                await lessonsApi.complete(+id);
            }
            setIsCompleted(true);

            if (quizId) {
                setOpenQuizModal(true);
            } else {
                navigator('/dashboard/lessons');
            }
        } catch (error) {
            console.error("Помилка завершення уроку:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
            <section className="text-center max-w-3xl w-full">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {title || "Завантаження..."}
                </h1>
            </section>

            <div className="w-full max-w-4xl flex flex-col gap-6">
                {goal && (
                    <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-3">
                        <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-brand" />
                            Мета уроку
                        </label>
                        <div className="bg-cream py-3 px-4 rounded-xl text-sm font-medium text-foreground border border-outline/60 leading-relaxed">
                            {goal}
                        </div>
                    </div>
                )}

                <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-3">
                    <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-brand" />
                        Зміст уроку
                    </label>
                    <div className="rounded-xl overflow-hidden">
                        <MdPreview modelValue={content} />
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-5">
                    <label className="group flex items-center gap-3.5 cursor-pointer select-none self-start">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                disabled={isSubmitting || isCompleted}
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-outline bg-surface transition-all checked:border-brand checked:bg-brand hover:border-brand-hover focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Check className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                        </div>
                        <span className="text-sm font-bold text-foreground transition-colors group-hover:text-brand">
                            Я пройшов(ла) цей урок та засвоїв(ла) матеріал
                        </span>
                    </label>

                    <button
                        onClick={handleCompleteLesson}
                        disabled={!isAgreed || isSubmitting || isCompleted}
                        className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 self-start shadow-sm ${isCompleted
                                ? "bg-success text-white cursor-default"
                                : isAgreed && !isSubmitting
                                    ? "bg-brand text-white hover:bg-brand-hover active:bg-brand-active cursor-pointer active:scale-[0.98]"
                                    : "bg-outline/50 text-foreground-muted cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Збереження...
                            </>
                        ) : isCompleted ? (
                            <>
                                <Check className="w-4 h-4" />
                                Урок пройдено!
                            </>
                        ) : (
                            "Завершити урок"
                        )}
                    </button>
                </div>
            </div>
            <QuizOfferModal
                quizId={quizId}
                isOpen={openQuizModal}
                onClose={() => setOpenQuizModal(false)}
                onAccept={() => { setOpenQuizModal(false), navigator(`/dashboard/quizzes/${quizId}`) }}
                onDecline={() => { setOpenQuizModal(false), navigator(`/dashboard`) }}
            />
        </div>
    );
}