import { useEffect, useState } from "react";
import { WelcomeBlock } from "./components/WelcomeBlock";
import type { UserProfile } from "@/api/types";
import { authApi } from "@/api/services/auth";

const MOCK_QUIZZES = [
  { id: "q1", title: "Основи мови JavaScript", questionsCount: 10, createdAt: "12 травня" },
  { id: "q2", title: "Алгебра: Квадратні рівняння", questionsCount: 15, createdAt: "08 травня" },
];

const MOCK_LESSONS = [
  { id: "l1", title: "Історія України: ХХ століття", createdAt: "10 травня" },
  { id: "l2", title: "Вступ до органічної хімії", createdAt: "01 травня" },
];

export default function Main() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-8 py-8 text-foreground-muted font-sans">Завантаження...</div>; 
  }

  const firstName = user?.nameAndSurname ? user.nameAndSurname.split(" ")[0] : "користувач";

  return (
    <div className="mx-auto max-w-7xl px-8 py-8 space-y-10 font-sans text-foreground">
      <WelcomeBlock firstName={firstName} />

      {/* Hero-блок без іконок */}
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

      {/* Створення: акцент на типографіці та плашках */}
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
          <a
            href="/quizzes/new"
            className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
          >
            + Новий квіз
          </a>
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
          <a
            href="/lessons/new"
            className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
          >
            + Новий урок
          </a>
        </div>
      </section>

      {/* Твої квізи */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Твої квізи</h2>
          <a href="/quizzes" className="text-sm font-bold text-brand hover:underline">
            Усі квізи →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              className="p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-xs px-3 py-1 bg-brand-soft text-brand rounded-full font-mono font-bold inline-block border border-outline tracking-tight">
                  {quiz.questionsCount} питань
                </span>
                <h3 className="font-bold text-lg text-foreground line-clamp-2">{quiz.title}</h3>
              </div>

              <div className="pt-4 mt-4 border-t border-outline flex items-center justify-between text-sm">
                <span className="text-xs text-foreground-muted font-sans">{quiz.createdAt}</span>
                <a
                  href={`/quizzes/${quiz.id}/edit`}
                  className="px-3.5 py-1.5 bg-brand-subtle text-brand font-bold rounded-xl hover:bg-brand-soft transition-colors border border-outline text-xs"
                >
                  Редагувати
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Твої уроки */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Твої уроки</h2>
          <a href="/lessons" className="text-sm font-bold text-brand hover:underline">
            Усі уроки →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              className="p-5 bg-surface border border-outline rounded-2xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-sm"
            >
              <div className="space-y-2">
                <span className="text-xs px-3 py-1 bg-cream text-brown-light rounded-full font-bold inline-block border border-outline">
                  Урок
                </span>
                <h3 className="font-bold text-lg text-foreground line-clamp-2">{lesson.title}</h3>
              </div>

              <div className="pt-4 mt-4 border-t border-outline flex items-center justify-between text-sm">
                <span className="text-xs text-foreground-muted">{lesson.createdAt}</span>
                <a
                  href={`/lessons/${lesson.id}/edit`}
                  className="px-3.5 py-1.5 bg-brand-subtle text-brand font-bold rounded-xl hover:bg-brand-soft transition-colors border border-outline text-xs"
                >
                  Редагувати
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}