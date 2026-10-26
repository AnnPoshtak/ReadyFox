import { authApi } from "@/api/services/auth";
import { quizzesApi } from "@/api/services/quizzes";
import type { Quiz, UserProfile } from "@/api/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useQuiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const authorName = quiz?.author?.nameAndSurname || quiz?.author?.email || "Анонімний автор";
  const questionsCount = quiz?.questions?.length || 0;

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      try {
        const data = await quizzesApi.findOneWithoutAnswers(+id);
        setQuiz(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authApi.getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const isAuthor = quiz?.author?.email === user?.email;

  const handleDelete = async () => {
    if (!id) return;
    try {
      await quizzesApi.remove(+id);
      navigate("/dashboard/quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/quizzes/edit/${id}`);
  };

  return {
    quiz, setQuiz, authorName, questionsCount, isAuthor, handleDelete, handleEdit
  }
}