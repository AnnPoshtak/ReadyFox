import { Flame, Heart, Gift, Quote } from "lucide-react";

export const AboutSection = () => {
    return (
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
                        ReadyFox — це відповідь на нудні лекції та однотипні тестування. Навчання не має бути приводом для стресу чи хвилювання. Воно повинно затягувати та викликати справжній азарт.
                    </p>
                    <p>
                        Платформа поєднує легкі ігрові механіки із зручною перевіркою знань. Викладачеві потрібні лише 2 хвилини, щоб створити інтерактивний квіз, а студентам — кілька секунд, щоб ввести код зі смартфона й одразу включитися в гру.
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
                        Цей проєкт створений з думкою про наші школи, університети, коледжі та освітні хаби. Для мене важливо розвивати якісний, сучасний та швидкий продукт рідною мовою — без зайвої бюрократії, збоїв та складних налаштувань.
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
                        Тут немає прихованої подписки, «преміум-функцій» чи лімітів на кількість гравців у кімнаті. ReadyFox — це свідомий внесок у розвиток української освіти. Сучасні навчальні інструменти мають бути повністю відкритими для кожного, хто прагне навчати чи дізнаватися щось нове.
                    </p>
                </div>
            </article>

            <div className="pt-8 border-t border-outline/60 flex gap-4 items-start">
                <Quote className="w-8 h-8 text-brand shrink-0 rotate-180 mt-1" />
                <blockquote className="font-heading text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
                    «Головна мета — дати викладачам зручний інструмент, щоб запалити азарт у навчанні, а студентам — відчуття, що здобувати знання — це справді круто.»
                </blockquote>
            </div>

        </section>
    )
}