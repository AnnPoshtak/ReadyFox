import { Player } from "@lottiefiles/react-lottie-player";
import { Flame, Heart, Gift, Quote } from "lucide-react";
import { BlobShape } from "../../components/BlobShape";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse pb-20">
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col items-start space-y-6">

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                            Сучасна освіта, <br />
                            <span className="text-brand">створена для своїх</span>
                        </h1>

                        <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed">
                            Ми створили ReadyFox, щоб зробити процес навчання простим, безкоштовним та інтерактивним для кожного українського вчителя та студента.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center relative">
                        <BlobShape />
                        <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs md:max-w-sm drop-shadow-xl">
                            <Player src="/stickers/010.json" loop autoplay className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-6 py-12 border-t border-outline/60 space-y-12">
                <article className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-brand-soft text-brand">
                            <Flame className="w-6 h-6" />
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            Навчання без стресу та рутини
                        </h2>
                    </div>
                    
                    <div className="space-y-3 text-foreground-secondary text-base sm:text-lg leading-relaxed pl-1 shadow-none">
                        <p>
                            Ми створили ReadyFox як відповідь на монотонні лекції та нудні контрольні. Освіта не повинна сприйматися як примус чи привід для хвилювання — вона має захоплювати, тримати в тонусі та викликати щирий азарт.
                        </p>
                        <p>
                            Платформа поєднує прості ігрові механіки з потужними інструментами перевірки знань. Викладачеві потрібно лише 2 хвилини, щоб створити інтерактивний квіз, а студентам — 2 секунди, щоб ввести 6-значний код зі смартфона та одразу включитися в гру.
                        </p>
                    </div>
                </article>

                <div className="w-16 h-[2px] bg-brand/30 rounded-full" />
                <article className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-peach text-orange-dark">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            Зроблено в Україні — для своїх 🇺🇦
                        </h2>
                    </div>

                    <div className="space-y-3 text-foreground-secondary text-base sm:text-lg leading-relaxed pl-1">
                        <p>
                            Цей проєкт повністю розроблений українською командою з думкою про наші школи, університети, коледжі та освітні хаби. Для нас важливо розвивати якісний, сучасний та швидкий продукт рідною мовою, який працює без збоїв і без зайвої бюрократії.
                        </p>
                    </div>
                </article>

                <div className="w-16 h-[2px] bg-brand/30 rounded-full" />
                <article className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-brand-soft text-brand">
                            <Gift className="w-6 h-6" />
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                            100% безкоштовно й без обмежень 🎉
                        </h2>
                    </div>

                    <div className="space-y-3 text-foreground-secondary text-base sm:text-lg leading-relaxed pl-1">
                        <p>
                            Тут немає прихованих пейволів, "преміум-функцій" чи лімітів на кількість гравців у кімнаті. ReadyFox — це наш свідомий внесок у розвиток української освіти. Ми віримо, що сучасні навчальні технології мають бути повністю відкритими для кожного, хто прагне навчати чи здобувати знання.
                        </p>
                    </div>
                </article>
                <div className="pt-8 border-t border-outline/60 flex gap-4 items-start">
                    <Quote className="w-8 h-8 text-brand shrink-0 rotate-180 mt-1" />
                    <blockquote className="font-heading text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
                        «Наша мета — дати викладачам зручний спосіб запалити азарт у навчанні, а студентам — відчуття, що здобувати знання — це справді круто.»
                    </blockquote>
                </div>

            </section>
        </div>
    );
}