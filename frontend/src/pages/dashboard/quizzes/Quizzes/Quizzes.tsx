import useQuizzes from "./hooks/useQuizzes";
import { QuizSection } from "./components/QuizzesSection";
import { CreateButton } from "./components/CreateQuizButton";
import { HeroSection } from "./components/HeroSection";
export default function Quizzes() {
  const { loading, setSearchQuery, setSelectedSubject, selectedSubject, filteredQuizzes, searchQuery } = useQuizzes()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <QuizSection filteredQuizzes={filteredQuizzes} loading={loading} />
        <CreateButton />
      </div>
    </div>
  );
}