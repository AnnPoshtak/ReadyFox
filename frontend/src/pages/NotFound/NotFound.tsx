import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden">
            <div className="relative flex items-center justify-center mb-6">
                <Player
                    src="/stickers/023.json"
                    className="w-64 h-64 sm:w-80 sm:h-80 relative z-10"
                    loop
                    autoplay
                />
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-3 max-w-xl leading-tight z-10">
                Упс! Здається ви трохи заблукали...
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary mb-8 max-w-md leading-relaxed z-10">
                Здається, цю сторінку поцупили! Ми шукали скрізь, але нічого не знайшли.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto z-10">
                <button
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto px-7 py-3.5 bg-brand hover:bg-brand-hover active:bg-brand-active text-foreground-inverse font-semibold rounded-2xl shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    На головну
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-foreground/5 active:bg-foreground/10 text-foreground font-semibold rounded-2xl border border-foreground/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    Назад
                </button>
            </div>
        </div>
    );
}