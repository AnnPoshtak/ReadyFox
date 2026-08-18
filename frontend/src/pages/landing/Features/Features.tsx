import { Player } from "@lottiefiles/react-lottie-player";
import {
    Gamepad2, 
    Trophy, 
    BarChart3, 
    PenTool, 
    Zap, 
    GraduationCap, 
    Users,
    CheckCircle2 
} from "lucide-react";
import { BlobShape } from "@/components/BlobShape";

export default function FeaturesPage() {
    const featuresList = [
        {
            icon: Gamepad2,
            title: "Квізи у реальному часі",
            description: "Приєднуйтесь до гри за 6-значним кодом без довгої реєстрації. Вводь код і одразу в бій!",
            badge: "Швидкий старт",
            color: "text-brand bg-brand-soft",
        },
        {
            icon: Trophy,
            title: "Гейміфікація та рейтинги",
            description: "Заробляйте бали за швидкі та правильні відповіді, піднімайтеся в загальному топі та змагайтеся з друзями.",
            badge: "Мотивація",
            color: "text-orange-dark bg-peach/60",
        },
        {
            icon: BarChart3,
            title: "Детальна статистика",
            description: "Відстежуйте свій прогрес, аналізуйте помилки та дивіться, які теми потребують додаткової уваги.",
            badge: "Аналітика",
            color: "text-brand bg-brand-soft",
        },
        {
            icon: PenTool,
            title: "Зручний конструктор",
            description: "Створюйте власні інтерактивні тести за декілька хвилин. Додавайте зображення, таймери та різні типи питань.",
            badge: "Для авторів",
            color: "text-orange-dark bg-peach/60",
        },
        {
            icon: Zap,
            title: "Миттєвий зворотний зв'язок",
            description: "Дізнавайтеся правильну відповідь одразу після кожного питання з роз'ясненнями від викладача.",
            badge: "Без затримок",
            color: "text-brand bg-brand-soft",
        },
        {
            icon: Users,
            title: "Командні режими",
            description: "Проходьте квізи самостійно або влаштовуйте групові турніри прямо на уроці чи під час відпочинку.",
            badge: "Фан",
            color: "text-orange-dark bg-peach/60",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col items-start space-y-6">

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                            Усе, що потрібно для <br />
                            <span className="text-brand">цікавого навчання</span>
                        </h1>

                        <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed">
                            ReadyFox поєднує в собі ігрові механіки та потужні освітні інструменти, щоб зробити кожне заняття захопливим.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center relative">
                        <BlobShape />
                        <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs md:max-w-sm drop-shadow-xl">
                            <Player src="/stickers/012.json" loop autoplay className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-outline/60">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
                        Основні фічі платформи
                    </h2>
                    <p className="text-foreground-secondary text-base md:text-lg">
                        Ми спростили складне, щоб ви могли зосередитися на головному — здобутті знань.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {featuresList.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-surface p-7 rounded-3xl border border-outline/70 shadow-sm hover:shadow-md hover:border-outline transition-all flex flex-col justify-between group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-3.5 rounded-2xl ${feature.color} inline-block group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-heading font-bold uppercase tracking-wider text-foreground-muted bg-cream px-3 py-1 rounded-full border border-outline/40">
                                            {feature.badge}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-xl font-bold text-foreground pt-1">
                                        {feature.title}
                                    </h3>

                                    <p className="text-foreground-secondary text-sm md:text-base leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 border-t border-outline/60">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                    <div className="px-4 py-1.5 rounded-full bg-peach/80 text-foreground-secondary font-heading text-xs uppercase tracking-wider font-bold border border-outline/50 inline-block">
                        Для кого ReadyFox?
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
                        Корисно як для студентів, так і для викладачів
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-brand-soft/50 p-8 md:p-10 rounded-3xl border border-outline flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-brand text-foreground-inverse rounded-2xl">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold">Для здобувачів знань</h3>
                            </div>
                            <ul className="space-y-3 pt-2">
                                {[
                                    "Проходь квізи без нудної теорії",
                                    "Змагайся з одногрупниками чи друзями",
                                    "Зберігай свій прогрес",
                                    "Вчися у будь-якому місці"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-foreground-secondary font-medium text-base">
                                        <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-surface p-8 md:p-10 rounded-3xl border border-outline flex flex-col justify-between space-y-6 shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-peach text-orange-dark rounded-2xl">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold">Для викладачів та менторів</h3>
                            </div>
                            <ul className="space-y-3 pt-2">
                                {[
                                    "Створюй власні квізи за кілька хвилин",
                                    "Отримуй миттєві звіти за результатами групи",
                                    "Підвищуй залученість студентів на уроках",
                                    "Автоматична перевірка відповідей"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-foreground-secondary font-medium text-base">
                                        <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}