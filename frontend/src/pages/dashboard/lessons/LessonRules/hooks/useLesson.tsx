import { lessonsApi } from "@/api/services/lessons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useLesson() {
    const location = useLocation();
    const navigate = useNavigate();
    const lessonData = location.state?.lessonData;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleCreateLesson = async () => {
        if (!lessonData || !isChecked) return;

        setError(null);
        try {
            setIsSubmitting(true);
            await lessonsApi.create(lessonData as any);
            navigate("/dashboard");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Помилка при створенні уроку.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return{
        isSubmitting,
        isChecked,
        setIsChecked,
        error,
        handleCreateLesson,
        lessonData
    }
}