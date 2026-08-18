import { BookOpen, Gamepad2, TrendingUp } from "lucide-react";

export const MainFeatures = () => {
    const mainFeatures = [
        {
            title: "Інтерактивні квізи",
            badge: "Грай та створюй",
            icon: Gamepad2,
            description: "Швидко приєднуйся до гри за кодом або знаходь тести у загальній бібліотеці. Створюй власні квізи на будь-яку тему для друзів чи самоперевірки.",
        },
        {
            title: "База знань та матеріалів",
            badge: "Відкрита бібліотека",
            icon: BookOpen,
            description: "Єдиний відкритий каталог із презентаціями, конспектами та відеоуроками. Зручний пошук дозволяє швидко знайти потрібний матеріал на будь-яку тему.",
        },
        {
            title: "Рейтинг та статистика",
            badge: "Твій акаунт",
            icon: TrendingUp,
            description: "Змагайся з іншими за кількістю пройдених квізів та точністю відповідей. З акаунтом результати квізів зберігаються, а також прогрес та рекорди.",
        },
    ];

    return (
        <div className="space-y-20 md:space-y-28">
            {mainFeatures.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={index}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                    >
                        <div
                            className={`lg:col-span-6 flex flex-col items-start space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 flex items-center justify-center bg-brand-subtle text-brand rounded-2xl">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <span className="px-3.5 py-1 rounded-full bg-peach/60 text-brand font-heading text-xs font-bold uppercase tracking-wider">
                                    {item.badge}
                                </span>
                            </div>

                            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-foreground-secondary text-base md:text-lg leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div
                            className={`lg:col-span-6 flex justify-center items-center ${isEven ? "lg:order-2" : "lg:order-1"
                                }`}
                        >
                            <div className="w-full h-64 md:h-80 bg-surface border border-outline rounded-3xl shadow-sm flex items-center justify-center p-8">
                                <div className="w-16 h-16 rounded-2xl bg-brand-subtle text-brand flex items-center justify-center">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}