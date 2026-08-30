import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Trophy,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { authApi } from "@/api/services/auth";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/dashboard", label: "Головна", icon: LayoutDashboard, end: true },
    { to: "/dashboard/quizzes", label: "Усі квізи", icon: HelpCircle },
    { to: "/dashboard/lessons", label: "Усі уроки", icon: BookOpen },
    { to: "/dashboard/results", label: "Дошка результатів", icon: Trophy },
  ];

  const handleLogout = async () => {
    await authApi.logout();
    navigate("/");
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed top-3 left-3 z-30 p-2 rounded-xl bg-background/90 border border-outline shadow-md text-foreground hover:bg-accent transition-all cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex flex-col h-screen bg-background/95 backdrop-blur-md border-r border-outline shadow-sm transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-64 p-5" : "-translate-x-full"} 
          md:translate-x-0 ${isCollapsed ? "md:w-20 p-3" : "md:w-64 p-5"}`}
      >
        {/* Кнопка toggler виклику функції onToggle з лейауту */}
        <button
          onClick={onToggle}
          className="hidden md:flex absolute -right-3.5 top-7 z-10 items-center justify-center w-7 h-7 bg-background border border-outline rounded-full text-muted-foreground hover:text-foreground shadow-sm transition-transform active:scale-95 cursor-pointer"
          title={isCollapsed ? "Розгорнути" : "Згорнути"}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
        </button>

        <div className={`flex items-center mb-8 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 select-none group transition-transform active:scale-95"
          >
            <img src="/logo.png" alt="ReadyFox Logo" className="h-8 w-auto object-contain shrink-0" />
            {!isCollapsed && (
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight whitespace-nowrap">
                Ready<span className="text-brand">Fox</span>
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-brand"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="pt-3 border-t border-outline mt-auto">
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Вийти з акаунту" : undefined}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-all duration-200 w-full cursor-pointer group ${
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