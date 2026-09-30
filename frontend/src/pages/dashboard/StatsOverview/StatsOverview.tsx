import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/services/auth";
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  Percent, 
  PieChart, 
  CheckCircle2, 
  Search, 
  Calendar, 
  Trophy, 
  Loader2,
  AlertCircle,
  ExternalLink
} from "lucide-react";

export function StatsOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ lessons: [], quizzes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("all");
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
            quizzes: data?.quizzes || []
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
    return () => { isMounted = false; };
  }, []);

  const metrics = useMemo(() => {
    const lessonsList = stats.lessons || [];
    const quizzesList = stats.quizzes || [];

    const totalLessons = lessonsList.filter((l) => l.isCompleted !== false).length;
    const totalQuizzes = quizzesList.length;

    const avgScore = totalQuizzes > 0
      ? Math.round(quizzesList.reduce((sum, q) => sum + (Number(q.score) || 0), 0) / totalQuizzes)
      : 0;

    const avgGrade = totalQuizzes > 0
      ? (quizzesList.reduce((sum, q) => sum + (Number(q.grade12) || 0), 0) / totalQuizzes).toFixed(1)
      : "0.0";

    const categoryMap = {};
    [...lessonsList, ...quizzesList].forEach((item) => {
      const cat = item.subject || item.category || "Інше";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const totalItems = lessonsList.length + quizzesList.length;
    const categoryStats = Object.keys(categoryMap).map((cat) => ({
      name: cat,
      count: categoryMap[cat],
      percentage: totalItems > 0 ? Math.round((categoryMap[cat] / totalItems) * 100) : 0
    })).sort((a, b) => b.count - a.count);

    return {
      totalLessons,
      totalQuizzes,
      avgScore,
      avgGrade,
      categoryStats,
      totalItems
    };
  }, [stats]);

  const categoriesList = useMemo(() => {
    const set = new Set();
    (stats.lessons || []).forEach((l) => (l.subject || l.category) && set.add(l.subject || l.category));
    (stats.quizzes || []).forEach((q) => (q.subject || q.category) && set.add(q.subject || q.category));
    return Array.from(set);
  }, [stats]);

  const filteredLessons = useMemo(() => {
    return (stats.lessons || []).filter((lesson) => {
      const subject = lesson.subject || lesson.category || "";
      const matchesSearch = (lesson.title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || subject === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [stats.lessons, searchQuery, selectedCategory]);

  const filteredQuizzes = useMemo(() => {
    return (stats.quizzes || []).filter((quiz) => {
      const subject = quiz.subject || quiz.category || "";
      const matchesSearch = (quiz.title || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || subject === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [stats.quizzes, searchQuery, selectedCategory]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("uk-UA", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const chartColors = ["#FF6B00", "#FF9B42", "#FFC83D", "#4CAF50", "#42A5F5", "#AB47BC"];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-foreground-secondary">
        <Loader2 className="w-10 h-10 animate-spin text-brand" />
        <p className="text-base font-medium">Завантаження вашої статистики...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl my-12 p-6 rounded-3xl bg-surface border border-outline text-center space-y-4 shadow-sm">
        <AlertCircle className="w-12 h-12 text-danger mx-auto" />
        <h3 className="text-xl font-bold text-foreground">Виникла помилка</h3>
        <p className="text-sm text-foreground-secondary">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-2xl bg-brand text-foreground-inverse font-bold hover:bg-brand-hover transition-colors cursor-pointer"
        >
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col gap-8 relative text-foreground font-sans">
      <section className="text-center max-w-3xl mx-auto w-full">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3">
          Ваші результати
        </h1>
        <p className="text-base sm:text-lg text-foreground-secondary">
          Переглядайте статистику пройдених уроків, результати квізів та аналізуйте власний прогрес
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Завершено уроків</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
              {metrics.totalLessons}
            </div>
            <p className="text-xs text-foreground-secondary mt-1 font-medium">Опрацьовані уроки</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Завершено квізів</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">
              {metrics.totalQuizzes}
            </div>
            <p className="text-xs text-foreground-secondary mt-1 font-medium">Пройдені тестування</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Середній бал</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground flex items-baseline gap-1">
              {metrics.avgGrade}
              <span className="text-xs font-bold text-foreground-muted">/ 12</span>
            </div>
            <p className="text-xs text-foreground-secondary mt-1 font-medium">12-бальна система</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Середній %</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold">
              {metrics.avgScore}%
            </div>
            <p className="text-xs text-foreground-secondary mt-1 font-medium">Точність відповідей</p>
          </div>
        </div>
      </section>

      {metrics.categoryStats.length > 0 && (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Розподіл за предметами</h2>
              <p className="text-xs text-foreground-secondary">Які предмети ви вивчаєте найчастіше</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center py-2">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {metrics.categoryStats.map((item, i) => {
                    const color = chartColors[i % chartColors.length];
                    const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                    const prevPercentageSum = metrics.categoryStats
                      .slice(0, i)
                      .reduce((sum, curr) => sum + curr.percentage, 0);
                    const strokeDashoffset = 100 - prevPercentageSum;

                    return (
                      <circle
                        key={item.name}
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={color}
                        strokeWidth="3.8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-2xl font-black text-foreground">{metrics.totalItems}</span>
                  <span className="text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">Занять</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-8 space-y-3">
              {metrics.categoryStats.map((cat, index) => {
                const color = chartColors[index % chartColors.length];
                return (
                  <div key={cat.name} className="p-3.5 rounded-2xl bg-background-secondary border border-outline space-y-1.5">
                    <div className="flex justify-between items-center text-sm font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-foreground-secondary">
                        {cat.count} {cat.count === 1 ? "заняття" : "занять"} ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-outline">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%`, backgroundColor: color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface p-4 sm:p-5 rounded-3xl border border-outline shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center bg-background-secondary p-1.5 rounded-2xl border border-outline self-start md:self-auto w-full md:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              Усі
            </button>
            <button
              onClick={() => setActiveTab("lessons")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "lessons"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              <span>Уроки</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-soft text-brand">
                {filteredLessons.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "quizzes"
                  ? "bg-surface text-brand shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              <span>Квізи</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-soft text-brand">
                {filteredQuizzes.length}
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Пошук за назвою..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-outline focus:border-brand focus:bg-surface rounded-2xl text-xs sm:text-sm font-medium text-foreground outline-none transition-all placeholder-foreground-muted"
              />
            </div>

            {categoriesList.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-background-secondary border border-outline focus:border-brand focus:bg-surface rounded-2xl text-xs sm:text-sm font-semibold text-foreground outline-none cursor-pointer transition-all"
              >
                <option value="all">Усі предмети</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      {(activeTab === "all" || activeTab === "lessons") && (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Пройдені уроки</h2>
                <p className="text-xs text-foreground-secondary">Список завершених конспектів</p>
              </div>
            </div>
            <span className="text-xs font-bold text-foreground-secondary bg-background-secondary px-3 py-1.5 rounded-full border border-outline">
              Всього: {filteredLessons.length}
            </span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="text-center py-10 bg-background-secondary rounded-2xl border border-dashed border-outline">
              <BookOpen className="w-10 h-10 text-foreground-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground-secondary">Уроків не знайдено</p>
            </div>
          ) : (
            <div className="divide-y divide-outline">
              {filteredLessons.map((lesson) => (
                <div 
                  key={lesson.id || lesson.lessonId}
                  onClick={() => lesson.lessonId && navigate(`/dashboard/lessons/${lesson.lessonId}`)}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-hover px-3 rounded-2xl transition-colors cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                        {lesson.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-soft text-brand">
                        {lesson.subject || lesson.category}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Пройдено: {formatDate(lesson.completedAt)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-success-soft text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      Завершено
                    </span>
                    <ExternalLink className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {(activeTab === "all" || activeTab === "quizzes") && (
        <section className="bg-surface p-6 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Результати квізів</h2>
                <p className="text-xs text-foreground-secondary">Результати проходження тестів</p>
              </div>
            </div>
            <span className="text-xs font-bold text-foreground-secondary bg-background-secondary px-3 py-1.5 rounded-full border border-outline">
              Всього: {filteredQuizzes.length}
            </span>
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-10 bg-background-secondary rounded-2xl border border-dashed border-outline">
              <HelpCircle className="w-10 h-10 text-foreground-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground-secondary">Квізів не знайдено</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuizzes.map((quiz) => {
                const isHighGrade = (Number(quiz.grade12) || 0) >= 10;
                return (
                  <div 
                    key={quiz.id || quiz.quizId}
                    onClick={() => quiz.quizId && navigate(`/dashboard/quizzes/${quiz.quizId}`)}
                    className="p-4 rounded-2xl border border-outline bg-background-secondary hover:bg-surface-hover hover:border-outline-hover transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                          {quiz.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-soft text-brand">
                          {quiz.subject || quiz.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-foreground-secondary font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-foreground-muted" />
                          {formatDate(quiz.completedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-center">
                      <div className="text-right">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted">Точність</div>
                        <div className="text-base font-extrabold text-foreground">{quiz.score ?? 0}%</div>
                      </div>

                      <div className={"px-4 py-2 rounded-2xl text-center border bg-surface border-outline text-foreground"}>
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Оцінка</div>
                        <div className="text-lg font-black leading-none mt-0.5">
                          {quiz.grade12 ?? 0} <span className="text-xs font-normal opacity-70">/ 12</span>
                        </div>
                      </div>

                      <ExternalLink className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}   