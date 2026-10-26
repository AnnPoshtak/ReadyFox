import { WelcomeBlock } from "./components/WelcomeBlock";
import { useUserProfile } from "@/pages/dashboard/Dashboard/hooks/useUserProfile";
import { JoinByCodeSection } from "./components/JoinByCodeSection";
import { CreateContentSection } from "./components/CreateContentSection";
import { QuizCard } from "./components/QuizCard";
import { LessonCard } from "./components/LessonCard";

export default function Main() {
  const { user, isLoading } = useUserProfile()
  const firstName = user?.nameAndSurname ? user.nameAndSurname.split(" ")[0] : "користувач";

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-8 py-8 text-foreground-muted font-sans">Завантаження...</div>;
  }
  
  return (
    <div className="mx-auto max-w-7xl px-8 py-8 space-y-10 font-sans text-foreground">
      <WelcomeBlock firstName={firstName} />
      <JoinByCodeSection />
      <CreateContentSection />
      <QuizCard />
      <LessonCard />
    </div>
  );
}