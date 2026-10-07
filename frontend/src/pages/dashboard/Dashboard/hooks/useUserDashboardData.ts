import { lessonsApi } from "@/api/services/lessons";
import { quizzesApi } from "@/api/services/quizzes";
import type { Lesson, Quiz } from "@/api/types";
import { useEffect, useState } from "react";

export default function useUserDashboardData() {
    const [usersQuizzes, setUsersQuizzes] = useState<Quiz[]>([]);
    const [userLessons, setUserLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        const fetchUsersQuizzes = async () => {
            try {
                const data = await quizzesApi.findMyQuizzes();
                setUsersQuizzes(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUsersLessons = async () => {
            try {
                const data = await lessonsApi.findMyLessons();
                setUserLessons(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsersQuizzes();
        fetchUsersLessons();
    }, []);

    return{
        usersQuizzes,
        userLessons
    }
}