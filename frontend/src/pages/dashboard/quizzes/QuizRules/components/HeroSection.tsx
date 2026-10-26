import { Player } from "@lottiefiles/react-lottie-player";
import stickerAnimation from "/stickers/022.json?url"

export const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 space-y-4">
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Правила публікації <br />
          <span className="text-brand">контенту</span>
        </h1>
        <p className="text-foreground-secondary text-lg md:text-xl leading-relaxed">
          Щоб ReadyFox залишався безпечним і корисним для всіх, дотримуйтеся цих правил під час створення та публікації квізів і навчальних матеріалів.
        </p>
      </div>

      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-[260px] sm:max-w-xs drop-shadow-md">
          <Player src={stickerAnimation} loop autoplay className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}