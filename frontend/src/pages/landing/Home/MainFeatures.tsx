import { Gamepad2, BookOpen, TrendingUp } from "lucide-react";

export function MainFeatures() {
    const features = [
        {
            badge: "Грай та створюй",
            badgeIcon: Gamepad2,
            title: "Інтерактивні квізи",
            description:
                "Швидко приєднуйся до гри за кодом або знаходь тести у загальній бібліотеці. Створюй власні квізи на будь-яку тему для друзів чи самоперевірки.",
            image: "/quiz.png",
            alt: "Лисичка грає в квіз",
        },
        {
            badge: "Навчання та теми",
            badgeIcon: BookOpen,
            title: "Уроки та навчальні матеріали",
            description:
                "Проходь навчальні теми, детально опрацьовуй прикріплені викладачем матеріали та вдосконалюй свої знання у власному темпі.",
            image: "/lesson.png",
            alt: "Лисичка навчається",
        },
        {
            badge: "Твій акаунт",
            badgeIcon: TrendingUp,
            title: "Рейтинг та статистика",
            description:
                "Змагайся з іншими за кількістю пройдених квізів та точністю відповідей. З акаунтом результати квізів зберігаються, а також прогрес та рекорди.",
            image: "/progress.png",
            alt: "Лисичка дивиться на прогрес",
        },
    ];

    return (
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
            <div className="space-y-16 md:space-y-24">
                {features.map((feature, index) => {
                    const Icon = feature.badgeIcon;
                    const isReversed = index % 2 !== 0;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex-1 space-y-4 text-left max-w-xl">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/50 text-foreground-secondary font-heading text-xs font-bold border border-outline/40 uppercase tracking-wider">
                                    <Icon className="w-3.5 h-3.5 text-brand" />
                                    <span>{feature.badge}</span>
                                </div>

                                <h3 className="font-heading text-2xl md:text-4xl font-extrabold tracking-tight">
                                    {feature.title}
                                </h3>

                                <p className="text-foreground-secondary text-base md:text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="flex-1 w-full flex justify-center max-w-lg">
                                <div className="p-3 bg-surface rounded-3xl border border-outline/60 shadow-sm inline-block">
                                    <img
                                        src={feature.image}
                                        alt={feature.alt}
                                        className="max-h-64 md:max-h-80 w-auto object-contain rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}