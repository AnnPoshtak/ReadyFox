import { quizzesApi } from "@/api/services/quizzes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useQuiz() {
    const location = useLocation();
    const navigate = useNavigate();

    const quizData = location.state?.quizData;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateQuiz = async () => {
        if (!quizData || !isChecked) return;

        setError(null);
        try {
            setIsSubmitting(true);
            await quizzesApi.create(quizData as any);
            navigate("/dashboard");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Помилка при створенні квізу.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, setIsChecked, isChecked, error, setError, handleCreateQuiz, quizData }
}