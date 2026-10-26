import { quizzesApi } from "@/api/services/quizzes";
import type { Quiz } from "@/api/types";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";
import { useEffect, useState } from "react";

export default function useQuizzes() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState<Option | null>(
        SUBJECT_OPTIONS[0]?.items[0] || null
    );

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await quizzesApi.findAll();
                setQuizzes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSearch = quiz.title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ?? false;

        const matchesSubject =
            !selectedSubject ||
            selectedSubject.id === "all" ||
            quiz.category === selectedSubject.label;

        return matchesSearch && matchesSubject;
    });

    return {
        loading,
        setSearchQuery,
        setSelectedSubject,
        selectedSubject,
        quizzes,
        filteredQuizzes,
        searchQuery,
    }
}