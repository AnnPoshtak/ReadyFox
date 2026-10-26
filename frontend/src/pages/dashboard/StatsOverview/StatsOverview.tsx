import { Loader2, AlertCircle } from "lucide-react";
import { useStatsOverview } from "./hooks/useStatsOverview";

import { StatsHeader } from "./components/StatsHeader";
import { MetricsSection } from "./components/MetricsSection";
import { CategoryChart } from "./components/CategoryChart";
import { FilterSection } from "./components/FilterSection";
import { LessonsList } from "./components/LessonsList";
import { QuizzesList } from "./components/QuizzesList";

export const StatsOverview = () => {
  const {
    loading,
    error,
    activeTab,
    searchQuery,
    selectedCategory,
    metrics,
    categoriesList,
    filteredLessons,
    filteredQuizzes,
    chartColors,
    setActiveTab,
    setSearchQuery,
    setSelectedCategory,
    formatDate,
    handleLessonClick,
    handleQuizClick,
  } = useStatsOverview();

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
      <StatsHeader />

      <MetricsSection
        totalLessons={metrics.totalLessons}
        totalQuizzes={metrics.totalQuizzes}
        avgGrade={metrics.avgGrade}
        avgScore={metrics.avgScore}
      />

      <CategoryChart
        categoryStats={metrics.categoryStats}
        totalItems={metrics.totalItems}
        chartColors={chartColors}
      />

      <FilterSection
        activeTab={activeTab}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        lessonsCount={filteredLessons.length}
        quizzesCount={filteredQuizzes.length}
        categoriesList={categoriesList}
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />

      {(activeTab === "all" || activeTab === "lessons") && (
        <LessonsList
          lessons={filteredLessons}
          formatDate={formatDate}
          onLessonClick={handleLessonClick}
        />
      )}

      {(activeTab === "all" || activeTab === "quizzes") && (
        <QuizzesList
          quizzes={filteredQuizzes}
          formatDate={formatDate}
          onQuizClick={handleQuizClick}
        />
      )}
    </div>
  );
};