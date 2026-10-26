import { quizzesApi } from "@/api/services/quizzes";
import type { CompletedQuizDto, Quiz } from "@/api/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useQuiz (){
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

    return{
        loading, quiz, questions, currentQuestionIndex, currentQuestion,selectedAnswers, handleSelectOption, handleNext, handlePrev, handleSubmitQuiz, isLastQuestion, submitting, isCurrentAnswered
    }
}