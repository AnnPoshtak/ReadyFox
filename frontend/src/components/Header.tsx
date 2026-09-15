import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm i lucide-react

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-brand ${
      isActive ? "text-brand font-semibold" : "text-foreground"
    }`;

  return (
    <header className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between bg-background z-50">
      <Link to="/" onClick={closeMenu} className="flex items-center gap-3 select-none z-50">
        <img src="/logo.png" alt="ReadyFox Logo" className="h-10 w-auto object-contain" />
        <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
          Ready<span className="text-brand">Fox</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 font-sans font-medium">
        <NavLink to="/how-it-works" className={linkClass}>
          Як це працює
        </NavLink>
        <NavLink to="/features" className={linkClass}>
          Можливості
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          Про нас
        </NavLink>
      </nav>
      <div className="flex items-center gap-3 z-50">
        <Link 
          to="/auth"
          onClick={closeMenu}
          className="hidden sm:inline-block px-5 py-2.5 rounded-xl border border-outline bg-brand-subtle hover:bg-brand-soft text-brand font-heading font-semibold text-sm transition-all text-center"
        >
          Увійти в акаунт
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-xl text-foreground hover:bg-brand-subtle transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-md transition-all duration-300 md:hidden flex flex-col justify-between px-6 pt-28 pb-10 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-6 font-sans text-xl font-medium">
          <NavLink to="/how-it-works" onClick={closeMenu} className={linkClass}>
            Як це працює
          </NavLink>
          <NavLink to="/features" onClick={closeMenu} className={linkClass}>
            Можливості
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={linkClass}>
            Про нас
          </NavLink>
        </nav>

        <div className="pt-6 border-t border-outline flex flex-col gap-3">
          <Link 
            to="/auth"
            onClick={closeMenu}
            className="w-full px-5 py-3 rounded-xl border border-outline bg-brand-subtle hover:bg-brand-soft text-brand font-heading font-semibold text-center transition-all"
          >
            Увійти в акаунт
          </Link>
        </div>
      </div>
    </header>
  );
};