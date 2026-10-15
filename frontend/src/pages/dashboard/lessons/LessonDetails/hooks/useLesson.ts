import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "@/api/services/auth";
import { lessonsApi } from "@/api/services/lessons";
import type { Lesson, UserProfile } from "@/api/types";

export default function useLesson() {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const isAuthor = Boolean(lesson?.author?.email && user?.email && lesson.author.email === user.email);
    const authorName = lesson?.author?.nameAndSurname || lesson?.author?.email || "Анонімний автор";

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [lessonData, userData] = await Promise.all([
                    lessonsApi.findOne(+id),
                    authApi.getProfile().catch(() => null),
                ]);

                setLesson(lessonData);
                if (userData) setUser(userData);
            } catch (error) {
                console.error("Помилка завантаження даних уроку:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        try {
            await lessonsApi.remove(+id);
            navigate("/dashboard/lessons");
        } catch (error) {
            console.error("Помилка при видаленні уроку:", error);
        }
    };

    const handleEdit = () => {
        if (id) navigate(`/dashboard/lessons/edit/${id}`);
    };

    const handleStartLesson = () => {
        if (id) navigate(`/dashboard/lessons/${id}/lesson`);
    };

    return {
        lesson,
        user,
        isLoading,
        isAuthor,
        authorName,
        handleDelete,
        handleEdit,
        handleStartLesson,
    };
}