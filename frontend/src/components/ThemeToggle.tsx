import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);

    if (newDarkState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Переключити тему"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)] text-[var(--color-foreground)] shadow-sm hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-outline-hover)] transition-all duration-200 focus:outline-none active:scale-95 cursor-pointer"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-[var(--color-warning)] transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-[var(--color-foreground-secondary)] transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}