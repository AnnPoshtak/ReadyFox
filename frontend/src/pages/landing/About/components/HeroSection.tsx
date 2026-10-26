import { Player } from "@lottiefiles/react-lottie-player";
import { BlobShape } from "@/components/BlobShape";
import stickerAnimation from "/stickers/010.json?url";

export function HeroSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                        Сучасна освіта, <br />
                        <span className="text-brand">створена для своїх</span>
                    </h1>
                    <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed">
                        ReadyFox створено для того, щоб зробити навчання простим, безкоштовним та захопливим для кожного українського вчителя та студента.
                    </p>
                </div>

                <div className="lg:col-span-5 flex justify-center items-center relative">
                    <BlobShape />
                    <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs md:max-w-sm drop-shadow-xl">
                        <Player src={stickerAnimation} loop autoplay className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
}