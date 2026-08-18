import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { ArrowRight, KeyRound } from "lucide-react";
import { BlobShape } from "@/components/BlobShape";
import { MainFeatures } from "./MainFeatures";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 md:pt-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col items-start space-y-8">

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                            Готові вчитися? <br />
                            <span className="text-brand">ReadyFox</span> — ваш помічник у навчанні!
                        </h1>

                        <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed">
                            Інтерактивна платформа, яка робить освітній процес ефективним, захопливим та доступним для кожного.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
                            <button 
                                onClick={() => navigate("/auth")}
                                className="px-7 py-4 rounded-2xl bg-brand hover:bg-brand-hover active:scale-95 text-foreground-inverse font-heading font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-brand/25 cursor-pointer text-base"
                            >
                                <span>Почати навчання</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-6 py-4 rounded-2xl bg-brand-soft hover:bg-peach active:scale-95 text-foreground font-heading font-semibold flex items-center justify-center gap-2.5 transition-all border border-outline cursor-pointer text-base">
                                <KeyRound className="w-5 h-5 text-brand" />
                                <span>Увійти за кодом</span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center relative my-4 lg:my-0">
                        <BlobShape />
                        <div className="relative z-10 w-full max-w-[280px] sm:max-w-xs md:max-w-md drop-shadow-xl">
                            <Player src="/stickers/017.json" loop autoplay className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-outline/60 space-y-16 md:space-y-24">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="px-4 py-1.5 rounded-full bg-peach/80 text-foreground-secondary font-heading text-xs uppercase tracking-wider font-bold border border-outline/50">
                        Як це працює
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
                        Все для швидкого та цікавого розвитку
                    </h2>
                    <p className="text-foreground-secondary text-base md:text-lg max-w-2xl">
                        Відкритий доступ до базових матеріалів та розширені можливості з власним акаунтом.
                    </p>
                </div>

                <MainFeatures />
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="relative bg-brand rounded-3xl p-8 md:p-14 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand/20 border border-brand-hover">
                    <div className="flex flex-col items-start space-y-6 z-10 max-w-xl text-foreground-inverse">
                        <h2 className="font-heading text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Зберігай свій прогрес та досягнення!
                        </h2>
                        <p className="text-brand-subtle text-base md:text-lg opacity-95 leading-relaxed">
                            Пройти квіз можна і без авторизації, але акаунт дозволить піднятися в рейтингу за кількістю правильних відповідей та зберегти власну статистику.
                        </p>
                        <button 
                            onClick={() => navigate("/auth")}
                            className="px-7 py-4 rounded-2xl bg-surface hover:bg-surface-hover text-brand font-heading font-bold flex items-center gap-3 transition-all cursor-pointer shadow-md active:scale-95 text-base"
                        >
                            <span>Зареєструватися безкоштовно</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative z-10 w-full max-w-xs lg:max-w-sm flex justify-center">
                        <Player src="/stickers/003.json" loop autoplay className="w-full h-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
}