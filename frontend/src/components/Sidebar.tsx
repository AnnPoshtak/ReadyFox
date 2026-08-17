import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Trophy,
  LogOut,
} from "lucide-react";
import { authApi } from "@/api/services/auth";

export const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "Головна", icon: LayoutDashboard, end: true },
    { to: "/dashboard/quizzes", label: "Усі квізи", icon: HelpCircle },
    { to: "/dashboard/materials", label: "Всі матеріали", icon: BookOpen },
    { to: "/dashboard/results", label: "Дошка результатів", icon: Trophy },
  ];

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/");
  };

  return (
    <aside className="fixed top-0 left-0 z-20 flex flex-col h-screen w-64 bg-background/95 backdrop-blur-md p-5 border-r border-border/60 border-outline shadow-sm">
      <NavLink
        to="/dashboard"
        className="flex items-center gap-3 select-none mb-8 group transition-transform active:scale-95"
      >
        <img src="/logo.png" alt="ReadyFox Logo" className="h-8 w-auto object-contain" />
        <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
          Ready<span className="text-brand">Fox</span>
        </span>
      </NavLink>

      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                ? "bg-brand text-white shadow-md shadow-brand/20 font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-brand-subtle/60"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-brand"}`} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-3 border-t border-border/50 border-outline">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-all duration-200 w-full cursor-pointer group"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Вийти з акаунту</span>
        </button>
      </div>
    </aside>
  );
};