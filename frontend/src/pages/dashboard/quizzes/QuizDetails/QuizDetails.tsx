import useQuiz from "./hooks/useQuiz";
import { HeaderSelection } from "./components/HeaderSelection";
import { HeroSection } from "./components/HeroSection";
import { PlayButtonsSelection } from "./components/PlayButtonsSection";
import { QuestionList } from "./components/QuestionList";
import { NotFound } from "./components/NotFound";

export default function QuizDetails() {
  const { quiz } = useQuiz()

  if (!quiz) {
    return <NotFound />
  }


  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col gap-8">
      <HeaderSelection />
      <HeroSection />
      <PlayButtonsSelection />
      <QuestionList />
    </div>
  );
}