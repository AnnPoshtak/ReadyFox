import { HeroSection } from "./components/HeroSection";
import { LessonSection } from "./components/LessonsSection";
import { CreateButton } from "./components/CreateLessonButton";
import useLessons from "./hooks/useLessons";

export default function Lessons() {
  const {
    loading,
    filteredLessons,
    searchQuery,
    setSearchQuery,
    selectedSubject,
    setSelectedSubject,
  } = useLessons();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
      <LessonSection filteredLessons={filteredLessons} loading={loading} />
      <CreateButton />
    </div>
  );
}