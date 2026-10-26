import { Player } from "@lottiefiles/react-lottie-player"
import stickerAnimation from "/stickers/020.json?url"

export const AuthBanner = () => {
    return (
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-brand-subtle relative p-12 flex-col items-center justify-center text-center overflow-hidden border-r border-outline/10">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none opacity-5 font-heading font-black text-[10vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
                <div>READYFOX READYFOX</div>
                <div>READYFOX READYFOX</div>
                <div>READYFOX READYFOX</div>
            </div>

            <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-500 ease-out">
                <Player
                    src={stickerAnimation}
                    loop
                    autoplay
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="relative z-10 max-w-md">
                <h1 className="font-heading font-extrabold text-4xl text-foreground mb-1 tracking-tight">
                    ReadyFox
                </h1>
                <p className="font-heading font-bold text-xs uppercase tracking-widest text-brand mb-4">
                    ОСВІТА ДЛЯ СВОЇХ 🇺🇦
                </p>
                <p className="text-foreground-secondary text-sm font-medium leading-relaxed">
                    Ваша історія успіху починається тут. Створюйте, грайте та навчайте з азартом!
                </p>
            </div>
        </div>
    )
}