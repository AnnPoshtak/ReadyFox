import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between bg-background">
      <Link to="/" className="flex items-center gap-3 select-none">
        <img src="/logo.png" alt="ReadyFox Logo" className="h-10 w-auto object-contain" />
        <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
          Ready<span className="text-brand">Fox</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 font-sans font-medium">
        <NavLink to="/how-it-works" className="transition-colors hover:text-brand">
          Як це працює
        </NavLink>
        <NavLink to="/features" className="transition-colors hover:text-brand">
          Можливості
        </NavLink>
        <NavLink to="/about" className="transition-colors hover:text-brand">
          Про нас
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <Link 
          to="/auth"
          className="px-5 py-2.5 rounded-xl border border-outline bg-brand-subtle hover:bg-brand-soft text-brand font-heading font-semibold text-sm transition-all text-center inline-block"
        >
          Увійти в акаунт
        </Link>
        
      </div>
    </header>
  );
};