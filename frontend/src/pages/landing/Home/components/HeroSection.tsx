import { BlobShape } from "@/components/BlobShape"
import { Player } from "@lottiefiles/react-lottie-player"
import stickerAnimation from "@/../public/stickers/017.json";
import { ArrowRight, KeyRound } from "lucide-react"
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
    const navigate = useNavigate();
    return (
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
                        <Player src={stickerAnimation} loop autoplay className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </section>
    )
}