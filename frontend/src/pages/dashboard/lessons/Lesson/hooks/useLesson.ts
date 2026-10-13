import { lessonsApi } from "@/api/services/lessons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useLesson() {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");
    const [content, setContent] = useState("");
    const [quizId, setQuizId] = useState<number | null>(null);

    const [isAgreed, setIsAgreed] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openQuizModal, setOpenQuizModal] = useState(false);

    const navigate = useNavigate();

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
                navigate('/dashboard/lessons');
            }
        } catch (error) {
            console.error("Помилка завершення уроку:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAcceptQuiz = () => {
        setOpenQuizModal(false);
        navigate(`/dashboard/quizzes/${quizId}`);
    };

    const handleDeclineQuiz = () => {
        setOpenQuizModal(false);
        navigate(`/dashboard`);
    };

    return{
        title,
        goal,
        content,
        quizId,
        setIsAgreed,
        openQuizModal,
        setOpenQuizModal,
        handleCompleteLesson,
        isAgreed,
        isCompleted,
        isSubmitting,
        handleAcceptQuiz,
        handleDeclineQuiz
    }
}