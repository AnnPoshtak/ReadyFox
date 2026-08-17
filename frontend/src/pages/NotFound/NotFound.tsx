import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-sans">
                <Player 
                    src="/stickers/023.json"
                    className="w-72 h-72 sm:w-96 sm:h-96 relative z-10"
                    loop
                    autoplay
                />

            {/* Заголовок */}
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-3 max-w-xl leading-tight">
                Упс! Лисичка трохи заблукала...
            </h1>

            {/* Опис */}
            <p className="text-base sm:text-lg text-foreground-secondary mb-8 max-w-md leading-relaxed">
                Здається, цю сторінку поцупили! Ми шукали скрізь, але нічого не знайшли
            </p>

            {/* Кнопки дій */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button 
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto px-7 py-3.5 bg-brand hover:bg-brand-hover active:bg-brand-active text-foreground-inverse font-semibold rounded-2xl shadow-md shadow-shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    На головну
                </button>
            </div>
        </div>
    );
}