import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/services/auth";

export interface LessonStat {
    id?: number;
    lessonId?: number;
    title: string;
    subject?: string;
    category?: string;
    isCompleted?: boolean;
    completedAt?: string;
}

export interface QuizStat {
    id?: number;
    quizId?: number;
    title: string;
    subject?: string;
    category?: string;
    score?: number;
    grade12?: number;
    completedAt?: string;
}

export interface StatsData {
    lessons: LessonStat[];
    quizzes: QuizStat[];
}

export const CHART_COLORS = [
  "#FF6B00", // Головний помаранчевий (Brand)
  "#FF9B42", // Світло-помаранчевий
  "#E65100", // Глибокий терракотовий / темно-помаранчевий
  "#FFC83D", // Теплий бурштиновий / жовтий
  "#D84315", // Палений оранжево-червоний
  "#FF8A65", // Персиковий
  "#00B4D8", // Яскравий бірюзовий (для контрасту)
  "#10B981", // Смарагдово-зелений
  "#8B5CF6", // Насичений фіолетовий
  "#EC4899", // Рожевий акцент
  "#3B82F6", // Волошково-синій
  "#6366F1", // Індиго
];

export function useStatsOverview() {
    const navigate = useNavigate();
    const [stats, setStats] = useState<StatsData>({ lessons: [], quizzes: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<"all" | "lessons" | "quizzes">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        let isMounted = true;
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await authApi.getStats();
                if (isMounted) {
                    setStats({
                        lessons: data?.lessons || [],
                        quizzes: data?.quizzes || [],
                    });
                }
            } catch (err) {
                console.error("Помилка завантаження статистики:", err);
                if (isMounted) {
                    setError("Не вдалося завантажити статистику. Спробуйте пізніше.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchStats();
        return () => {
            isMounted = false;
        };
    }, []);

    const metrics = useMemo(() => {
        const lessonsList = stats.lessons || [];
        const quizzesList = stats.quizzes || [];

        const totalLessons = lessonsList.filter((l) => l.isCompleted !== false).length;
        const totalQuizzes = quizzesList.length;

        const avgScore =
            totalQuizzes > 0
                ? Math.round(
                    quizzesList.reduce((sum, q) => sum + (Number(q.score) || 0), 0) /
                    totalQuizzes
                )
                : 0;

        const avgGrade =
            totalQuizzes > 0
                ? (
                    quizzesList.reduce(
                        (sum, q) => sum + (Number(q.grade12) || 0),
                        0
                    ) / totalQuizzes
                ).toFixed(1)
                : "0.0";

        const categoryMap: Record<string, number> = {};
        [...lessonsList, ...quizzesList].forEach((item) => {
            const cat = item.subject || item.category || "Інше";
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });

        const totalItems = lessonsList.length + quizzesList.length;
        const categoryStats = Object.keys(categoryMap)
            .map((cat) => ({
                name: cat,
                count: categoryMap[cat],
                percentage:
                    totalItems > 0
                        ? Math.round((categoryMap[cat] / totalItems) * 100)
                        : 0,
            }))
            .sort((a, b) => b.count - a.count);

        return {
            totalLessons,
            totalQuizzes,
            avgScore,
            avgGrade,
            categoryStats,
            totalItems,
        };
    }, [stats]);

    const categoriesList = useMemo(() => {
        const set = new Set<string>();
        (stats.lessons || []).forEach(
            (l) => (l.subject || l.category) && set.add(l.subject || l.category || "")
        );
        (stats.quizzes || []).forEach(
            (q) => (q.subject || q.category) && set.add(q.subject || q.category || "")
        );
        return Array.from(set);
    }, [stats]);

    const filteredLessons = useMemo(() => {
        return (stats.lessons || []).filter((lesson) => {
            const subject = lesson.subject || lesson.category || "";
            const matchesSearch = (lesson.title || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" || subject === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [stats.lessons, searchQuery, selectedCategory]);

    const filteredQuizzes = useMemo(() => {
        return (stats.quizzes || []).filter((quiz) => {
            const subject = quiz.subject || quiz.category || "";
            const matchesSearch = (quiz.title || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" || subject === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [stats.quizzes, searchQuery, selectedCategory]);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "—";
        try {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat("uk-UA", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }).format(date);
        } catch (e) {
            return dateStr;
        }
    };

    const handleLessonClick = (lessonId?: number) => {
        if (lessonId) {
            navigate(`/dashboard/lessons/${lessonId}`);
        }
    };

    const handleQuizClick = (quizId?: number) => {
        if (quizId) {
            navigate(`/dashboard/quizzes/${quizId}`);
        }
    };

    return {
        loading,
        error,
        activeTab,
        searchQuery,
        selectedCategory,
        metrics,
        categoriesList,
        filteredLessons,
        filteredQuizzes,
        chartColors: CHART_COLORS,
        setActiveTab,
        setSearchQuery,
        setSelectedCategory,
        formatDate,
        handleLessonClick,
        handleQuizClick,
    };
}