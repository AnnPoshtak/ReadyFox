import useLesson from "./hooks/useLesson";
import { NotFound } from "./components/NotFound";
import { HeaderSelection } from "./components/HeaderSelection";
import { HeroSection } from "./components/HeroSection";
import { LessonCard } from "./components/LessonCard";

export default function LessonDetails() {
  const { lesson, isLoading } = useLesson();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8">
        <div className="rounded-3xl border border-outline bg-surface p-8 text-center text-foreground-secondary">
          Завантаження уроку...
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col gap-8">
      <HeaderSelection />
      <HeroSection />
      <LessonCard />
    </div>
  );
}
