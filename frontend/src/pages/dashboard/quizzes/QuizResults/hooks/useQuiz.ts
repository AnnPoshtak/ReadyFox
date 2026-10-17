import type { QuizResults } from "@/api/types";
import { QUIZ_FEEDBACK_MESSAGES } from "@/constants/feedbackMessages";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useQuiz() {
    const location = useLocation();
    const state = location.state;
    const quizResults: QuizResults | undefined = state?.quizResults;
    const quizTitle: string = state?.quizTitle || "Результати тесту";

    const feedback = useMemo(() => {
        if (!quizResults) return null;
        const score = quizResults.score;

        let category: keyof typeof QUIZ_FEEDBACK_MESSAGES = "low";
        if (score === 100) category = "perfect";
        else if (score >= 80) category = "good";
        else if (score >= 50) category = "average";

        const list = QUIZ_FEEDBACK_MESSAGES[category];
        return list[Math.floor(Math.random() * list.length)];
    }, [quizResults]);

    return { quizResults, quizTitle, feedback }
}