import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import stickerAnimation from "/stickers/015.json?url";

export default function WillBeSoon() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-brand/10 rounded-full blur-3xl pointer-events-none" />
            <span className="absolute text-[120px] sm:text-[220px] md:text-[280px] font-black text-foreground/5 leading-none pointer-events-none select-none -translate-y-12">
                Will be soon ...
            </span>
            <div className="relative flex items-center justify-center mb-4">
                <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-foreground/5 blur-xl pointer-events-none" />
                <Player
                    src={stickerAnimation}
                    className="w-56 h-56 sm:w-72 sm:h-72 relative z-10"
                    loop
                    autoplay
                />
            </div>
            <div className="relative z-10 space-y-3">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                    Здається ви потрапили на сторінку, яка на етапі створення
                </h1>
                <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
                    Повертайтеся пізніше, можливо знайдете тут щось цікавеньке🤫😙
                </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-8">
                <button
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand hover:bg-brand-hover active:bg-brand-active text-foreground-inverse font-semibold rounded-2xl shadow-lg shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                    На головну
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-background hover:bg-foreground/5 active:bg-foreground/10 text-foreground font-semibold rounded-2xl border border-foreground/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-sm"
                >
                    Назад
                </button>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-foreground/10 flex flex-wrap justify-center gap-6 text-sm text-foreground-secondary">
                <button onClick={() => navigate("/dashboard/quizzes")} className="hover:text-brand transition-colors cursor-pointer">
                    Усі квізи
                </button>
                <button onClick={() => navigate("/dashboard/lessons")} className="hover:text-brand transition-colors cursor-pointer">
                    Усі уроки
                </button>
                <button onClick={() => navigate("/dashboard/results")} className="hover:text-brand transition-colors cursor-pointer">
                    Дошка результатів
                </button>
            </div>

        </div>
    );
}