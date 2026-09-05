import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Play,
  User,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Lesson, UserProfile } from "@/api/types";
import { lessonsApi } from "@/api/services/lessons";
import { authApi } from "@/api/services/auth";

export default function LessonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      try {
        const data = await lessonsApi.findOne(+id);
        setLesson(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLesson();
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

  const isAuthor = lesson?.author?.email === user?.email;

  const handleDelete = async () => {
    if (!id) return;
    try {
      await lessonsApi.remove(+id);
      navigation("/dashboard/lessons");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigation(`/dashboard/lessons/edit/${id}`);
  };

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-foreground">Урок не знайдено 🦊</h2>
        <Link
          to="/dashboard/lessons"
          className="inline-flex items-center gap-2 mt-4 text-brand font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> На головну
        </Link>
      </div>
    );
  }

  const authorName = lesson.author?.nameAndSurname || lesson.author?.email || "Анонімний автор";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/lessons"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-secondary hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад до уроків
        </Link>

        {isAuthor && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground bg-surface border border-outline rounded-xl hover:bg-brand-soft hover:text-brand transition-colors cursor-pointer"
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

      <section className="bg-surface border border-outline rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-soft rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-brand-soft text-brand font-bold text-xs tracking-wider uppercase rounded-full">
            {lesson.category || "Загальне"}
          </span>
          <span className="px-3 py-1 bg-background-secondary text-foreground-secondary text-xs font-semibold rounded-full flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Урок
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          {lesson.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-secondary pt-2 border-t border-outline/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-peach flex items-center justify-center text-brown font-bold">
              <User className="w-4 h-4" />
            </div>
            <span>
              Автор: <strong className="text-foreground">{authorName}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-surface border border-outline rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Мета уроку</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed whitespace-pre-line">{lesson.goal}</p>
        </div>

        <div className="bg-surface border border-outline rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand flex items-center justify-center">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Навчання</h2>
            </div>
            <p className="text-sm text-foreground-secondary mb-6">
              Почніть урок з нуля та ознайомтеся з матеріалом у структурованому форматі.
            </p>
          </div>

          <button
            type="button"
            onClick={() => console.log("Start lesson")}
            className="w-full py-3.5 px-6 bg-brand text-white font-bold rounded-2xl hover:bg-brand-hover active:bg-brand-active transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Play className="w-5 h-5 fill-current" /> Почати урок
          </button>
        </div>
      </section>

    </div>
  );
}
