import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WelcomeBlock } from "./components/WelcomeBlock";
import type { UserProfile, Quiz, Lesson } from "@/api/types";
import { authApi } from "@/api/services/auth";
import { quizzesApi } from "@/api/services/quizzes";
import { lessonsApi } from "@/api/services/lessons";
import { formatIsoTimestamp } from "@/utilities/FormatIsoTimestamp";

export default function Main() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [usersQuizzes, setUsersQuizzes] = useState<Quiz[]>([]);
  const [userLessons, setUserLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-8 py-8 text-foreground-muted font-sans">Завантаження...</div>;
  }

  const firstName = user?.nameAndSurname ? user.nameAndSurname.split(" ")[0] : "користувач";

  return (
    <div className="mx-auto max-w-7xl px-8 py-8 space-y-10 font-sans text-foreground">
      <WelcomeBlock firstName={firstName} />
      <section className="p-6 sm:p-8 bg-brand-soft border border-outline rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 max-w-xl">
          <h2 className="text-2xl font-bold text-foreground">Маєш код від вчителя чи друга?</h2>
          <p className="text-foreground-secondary text-sm sm:text-base">
            Вводь PIN-код та одразу приєднуйся до тестування!
          </p>
        </div>

        <button
          onClick={() => alert("Відкрити модалку з кодом")}
          className="px-6 py-3.5 bg-brand text-foreground-inverse font-bold rounded-2xl hover:bg-brand-hover active:bg-brand-active transition-all cursor-pointer shadow-sm hover:shadow-md shrink-0 w-full sm:w-auto text-center"
        >
          Приєднатися за кодом
        </button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-surface border border-outline rounded-3xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-md group">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-soft text-brand text-xs font-mono font-bold rounded-lg border border-outline">
              QUIZ
            </span>
            <h3 className="text-xl font-bold text-foreground">Створити квіз</h3>
            <p className="text-sm text-foreground-secondary">
              Збирай інтерактивні питання та перевіряй знання учнів чи друзів.
            </p>
          </div>
          <Link
            to="/dashboard/quizzes/new"
            className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
          >
            + Новий квіз
          </Link>
        </div>

        <div className="p-6 bg-surface border border-outline rounded-3xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-md group">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-cream text-brown-light text-xs font-mono font-bold rounded-lg border border-outline">
              LESSON
            </span>
            <h3 className="text-xl font-bold text-foreground">Створити урок</h3>
            <p className="text-sm text-foreground-secondary">
              Ділися навчальними матеріалами, теорією та готовими конспектами.
            </p>
          </div>
          <Link
            to="/dashboard/lessons/new"
            className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
          >
            + Новий урок
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Твої квізи</h2>
          <Link to="/dashboard/quizzes" className="text-sm font-bold text-brand hover:underline">
            Усі квізи →
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-2">
          {usersQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="w-72 sm:w-80 shrink-0 p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-xs px-3 py-1 bg-brand-soft text-brand rounded-full font-mono font-bold inline-block border border-outline tracking-tight">
                  Кількість питань: {quiz.questions?.length || 0}
                </span>

                <h3 className="font-bold text-lg text-foreground line-clamp-2">
                  {quiz.title}
                </h3>

                {quiz.category && (
                  <span className="inline-block text-xs font-semibold text-foreground-muted bg-outline/20 px-2.5 py-0.5 rounded-md border border-outline/50">
                    {quiz.category}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <span className="text-xs text-foreground-muted font-sans block mb-3">
                  {formatIsoTimestamp(quiz.createdAt)}
                </span>

                <div className="pt-3 border-t border-outline">
                  <button className="w-[50%] flex items-center justify-center px-4 py-2.5 bg-brand-subtle text-brand border border-outline font-bold rounded-xl hover:bg-brand-soft transition-colors text-center" onClick={() => navigation(`quizzes/${quiz.id}`)}>
                    Детальніше
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Твої уроки</h2>
          <Link to="/dashboard/lessons" className="text-sm font-bold text-brand hover:underline">
            Усі уроки →
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-2">
          {userLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="w-72 sm:w-80 shrink-0 p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-xs px-3 py-1 bg-cream text-brown-light rounded-full font-bold inline-block border border-outline">
                  Урок
                </span>
                <h3 className="font-bold text-lg text-foreground line-clamp-2">{lesson.title}</h3>
                {lesson.category && (
                  <span className="inline-block text-xs font-semibold text-foreground-muted bg-outline/20 px-2.5 py-0.5 rounded-md border border-outline/50">
                    {lesson.category}
                  </span>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-outline flex items-center justify-between text-sm">
                <span className="text-xs text-foreground-muted">{formatIsoTimestamp(lesson.createdAt)}</span>
                <button
                  type="button"
                  onClick={() => navigation(`/dashboard/lessons/${lesson.id}`)}
                  className="px-3.5 py-1.5 bg-brand-subtle text-brand font-bold rounded-xl hover:bg-brand-soft transition-colors border border-outline text-xs cursor-pointer"
                >
                  Детальніше
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}