import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Trophy,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { authApi } from "@/api/services/auth";
import { ProfileButton } from "./ProfileButton";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "Головна", icon: LayoutDashboard, end: true },
    { to: "/dashboard/quizzes", label: "Квізи", icon: HelpCircle },
    { to: "/dashboard/lessons", label: "Уроки", icon: BookOpen },
    { to: "/dashboard/results", label: "Рейтинг", icon: Trophy },
  ];

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/");
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. Мобільна адаптація: Нижня панель навігації (Bottom Nav) */}
      {/* ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-outline px-2 py-1.5 flex items-center justify-around shadow-lg safe-area-bottom">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "text-brand font-semibold scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] leading-none">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ========================================================= */}
      {/* 2. Десктопний Сайдбар (Відображається лише від md: екранів)*/}
      {/* ========================================================= */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 z-40 flex-col h-screen h-[100dvh] bg-background/95 backdrop-blur-md border-r border-outline shadow-sm transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20 p-3" : "w-64 p-5"
        }`}
      >
        {/* Перемикач (Collapse Button) */}
        <button
          onClick={onToggle}
          className="absolute -right-3.5 top-7 z-10 flex items-center justify-center w-7 h-7 bg-background border border-outline rounded-full text-muted-foreground hover:text-foreground shadow-sm transition-transform active:scale-95 cursor-pointer"
          title={isCollapsed ? "Розгорнути" : "Згорнути"}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Логотип */}
        <div
          className={`flex items-center mb-8 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 select-none group transition-transform active:scale-95"
          >
            <img
              src="/logo.png"
              alt="ReadyFox Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            {!isCollapsed && (
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight whitespace-nowrap">
                Ready<span className="text-brand">Fox</span>
              </span>
            )}
          </NavLink>
        </div>

        {/* Навігація десктоп */}
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={isCollapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isCollapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-brand text-white shadow-md shadow-brand/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-brand-subtle/60"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground group-hover:text-brand"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Футер сайдбару */}
        <div className="pt-3 border-t border-outline mt-auto flex flex-col gap-1">
          <ProfileButton />
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Вийти з акаунту" : undefined}
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-all duration-200 w-full cursor-pointer group ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            {!isCollapsed && <span className="truncate">Вийти з акаунту</span>}
          </button>
        </div>
      </aside>
    </>
  );
};