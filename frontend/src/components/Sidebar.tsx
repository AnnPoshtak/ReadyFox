import { useNavigate } from "react-router-dom";
import { authApi } from "../api/services/auth";

interface SidebarProps {
  tab: string;
  setTab: (tab: "dashboard" | "quizzes" | "materials" | "results") => void;
}

export const Sidebar = ({ tab, setTab }: SidebarProps) => {
  const navigate = useNavigate();
  const selectedTabClass = "bg-brand-subtle text-brand font-semibold";

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col h-screen w-64 bg-background p-4 border-r border-border border-outline">
      <button 
        className="flex items-center gap-3 select-none mb-6 cursor-pointer" 
        onClick={() => setTab("dashboard")}
      >
        <img src="/logo.png" alt="ReadyFox Logo" className="h-10 w-auto object-contain" />
        <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
          Ready<span className="text-brand">Fox</span>
        </span>
      </button>

      <nav className="flex flex-col gap-2">
        <button 
          className={`px-4 py-2 rounded-lg text-left text-foreground hover:bg-brand-subtle transition-colors cursor-pointer ${tab === "quizzes" ? selectedTabClass : ""}`} 
          onClick={() => setTab("quizzes")}
        >
          Усі квізи
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-left text-foreground hover:bg-brand-subtle transition-colors cursor-pointer ${tab === "materials" ? selectedTabClass : ""}`} 
          onClick={() => setTab("materials")}
        >
          Всі матеріали
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-left text-foreground hover:bg-brand-subtle transition-colors cursor-pointer ${tab === "results" ? selectedTabClass : ""}`} 
          onClick={() => setTab("results")}
        >
          Дошка результатів
        </button>
      </nav>

      <div className="mt-auto">
        <button 
          onClick={() => { authApi.logout(); navigate("/"); }} 
          className="px-4 py-2 rounded-lg text-white bg-[#F87171] hover:bg-[#EF4444] transition-colors w-full cursor-pointer"
        >
          Вийти
        </button>
      </div>
    </div>
  );
};