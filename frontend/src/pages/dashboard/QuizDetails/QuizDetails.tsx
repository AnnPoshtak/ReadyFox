import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Play,
  Users,
  HelpCircle,
  User,
  ArrowLeft,
  BookOpen,
  Pencil,
  Trash2
} from "lucide-react";
import type { Quiz, UserProfile } from "@/api/types";
import { quizzesApi } from "@/api/services/quizzes";
import { authApi } from "@/api/services/auth";

export default function QuizDetails() {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      try {
        const data = await quizzesApi.findOne(+id);
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
      navigation("/dashboard/quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigation(`/dashboard/quizzes/edit/${id}`);
  };

  if (!quiz) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Квіз не знайдено 🦊</h2>
        <Link
          to="/dashboard/quizzes"
          className="inline-flex items-center gap-2 mt-4 text-[var(--color-brand)] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> На головну
        </Link>
      </div>
    );
  }

  const authorName = quiz.author?.nameAndSurname || quiz.author?.email || "Анонімний автор";
  const questionsCount = quiz.questions?.length || 0;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/quizzes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground-secondary)] hover:text-[var(--color-brand)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад до квізів
        </Link>

        {isAuthor && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-foreground)] bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-xl hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
            >
              <Pencil className="w-4 h-4" /> Редагувати
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Видалити
            </button>
          </div>
        )}
      </div>

      <section className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-brand-soft)] rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[var(--color-brand-soft)] text-[var(--color-brand)] font-bold text-xs tracking-wider uppercase rounded-full">
            {quiz.category || "Загальне"}
          </span>
          <span className="px-3 py-1 bg-[var(--color-background-secondary)] text-[var(--color-foreground-secondary)] text-xs font-semibold rounded-full flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> {questionsCount} питань
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
          {quiz.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-foreground-secondary)] pt-2 border-t border-[var(--color-outline)]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-peach)] flex items-center justify-center text-[var(--color-brown)] font-bold">
              <User className="w-4 h-4" />
            </div>
            <span>Автор: <strong className="text-[var(--color-foreground)]">{authorName}</strong></span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--color-brand)] transition-all duration-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group shadow-sm hover:shadow-md">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
              Пройти самостійно
            </h3>
            <p className="text-sm text-[var(--color-foreground-secondary)] mb-6 leading-relaxed">
              Індивідуальне проходження у власному темпі для перевірки знань або тренування.
            </p>
          </div>
          
          <button
            onClick={() => console.log("Запуск соло")}
            className="w-full py-3.5 px-6 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Play className="w-5 h-5 fill-current" /> Соло-режим
          </button>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--color-brand)] transition-all duration-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group shadow-sm hover:shadow-md">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
              Запустити для групи
            </h3>
            <p className="text-sm text-[var(--color-foreground-secondary)] mb-6 leading-relaxed">
              Створення інтерактивної кімнати з PIN-кодом для проведення змагання в реальному часі.
            </p>
          </div>

          <button
            onClick={() => console.log("Запуск для групи")}
            className="w-full py-3.5 px-6 bg-[var(--color-brand-soft)] hover:bg-[var(--color-brand)] text-[var(--color-brand)] hover:text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-5 h-5" /> Командна гра
          </button>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-outline)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-foreground)] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[var(--color-brand)]" />
            Питання у квізі
          </h2>
          <span className="text-sm font-semibold text-[var(--color-foreground-muted)]">
            Всього: {questionsCount}
          </span>
        </div>

        {questionsCount === 0 ? (
          <p className="text-center py-8 text-[var(--color-foreground-muted)]">
            У цьому квізі поки немає доданих питань.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {quiz.questions?.map((question, index) => (
              <div
                key={question.id || index}
                className="bg-[var(--color-brand-subtle)] border border-[var(--color-outline)]/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[var(--color-outline-hover)] transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-[var(--color-foreground)] text-base sm:text-lg leading-snug">
                    {question.questionText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}