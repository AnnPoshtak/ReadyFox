import { lessonsApi } from "@/api/services/lessons";
import type { Lesson } from "@/api/types";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";
import { useEffect, useState } from "react";

export default function useLessons() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState<Option | null>(
        SUBJECT_OPTIONS[0]?.items[0] || null,
    );

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await lessonsApi.findAll();
                setLessons(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    const filteredLessons = lessons.filter((lesson) => {
        const matchesSearch = lesson.title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ?? false;

        const matchesSubject =
            !selectedSubject ||
            selectedSubject.id === "all" ||
            lesson.category === selectedSubject.label;

        return matchesSearch && matchesSubject;
    });

    return {
        loading,
        setSearchQuery,
        setSelectedSubject,
        selectedSubject,
        lessons,
        filteredLessons,
        searchQuery,
    }
}