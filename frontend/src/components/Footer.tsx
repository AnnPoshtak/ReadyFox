import { Link } from "react-router-dom"
import { ArrowUp } from "lucide-react"

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-background w-full transition-colors duration-300">
            <footer className="bg-brown text-foreground-inverse pt-10 pb-6 px-6 rounded-t-[30px] md:rounded-t-[40px] relative z-10 w-full -mt-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <Link 
                            to="/" 
                            className="font-heading text-2xl font-extrabold text-brand hover:text-brand-hover transition-colors inline-block mb-1"
                        >
                            ReadyFox
                        </Link>
                        <p className="text-foreground-inverse/70 text-sm">
                            Інтерактивна платформа для навчання
                        </p>
                    </div>
                    <button 
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground-inverse/10 hover:bg-foreground-inverse/20 text-foreground-inverse/90 text-sm font-medium transition-all cursor-pointer active:scale-95"
                    >
                        <span>Нагору</span>
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
                <div className="max-w-7xl mx-auto border-t border-foreground-inverse/10 mt-6 pt-4 text-center text-foreground-inverse/40 text-xs">
                    <p>© {new Date().getFullYear()} ReadyFox</p>
                </div>
            </footer>
        </div>
    )
}