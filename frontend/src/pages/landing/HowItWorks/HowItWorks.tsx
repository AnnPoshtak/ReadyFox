import { Player } from "@lottiefiles/react-lottie-player";
import { 
    Zap, 
    Brain, 
    Smile, 
    TrendingUp, 
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { BlobShape } from "../../components/BlobShape";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse pb-20">
            
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col items-start space-y-6">

                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                            Чому інтерактив <br />
                            <span className="text-brand">працює краще за лекції?</span>
                        </h1>

                        <p className="text-foreground-secondary text-lg md:text-xl max-w-xl leading-relaxed">
                            ReadyFox перетворює нудне зубріння на захопливу гру. Мозок засвоює до 80% більше інформації, коли залучений у процес.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center relative">
                        <BlobShape />
                        <div className="relative z-10 w-full max-w-[260px] sm:max-w-xs md:max-w-sm drop-shadow-xl">
                            <Player src="/stickers/006.json" loop autoplay className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 border-t border-outline/60">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
                        Усе простіше, ніж здається
                    </h2>
                    <p className="text-foreground-secondary text-base md:text-lg">
                        Ніяких складних інструкцій та довгих налаштувань.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-surface p-8 rounded-3xl border border-outline/70 space-y-4 relative">
                        <span className="text-4xl font-heading font-black text-brand/30 absolute top-6 right-6">01</span>
                        <h3 className="font-heading text-xl font-bold">Створіть квіз</h3>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                            Заберіть кілька питань у конструкторі, встановіть таймер та варіанти відповідей.
                        </p>
                    </div>
                    <div className="bg-surface p-8 rounded-3xl border border-outline/70 space-y-4 relative">
                        <span className="text-4xl font-heading font-black text-brand/30 absolute top-6 right-6">02</span>
                        <h3 className="font-heading text-xl font-bold">Поділіться кодом</h3>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                            Гравці вводять 6-значний PIN на своїх телефонах. Жодних реєстрацій чи завантажень.
                        </p>
                    </div>
                    <div className="bg-surface p-8 rounded-3xl border border-outline/70 space-y-4 relative">
                        <span className="text-4xl font-heading font-black text-brand/30 absolute top-6 right-6">03</span>
                        <h3 className="font-heading text-xl font-bold">Грайте та аналізуйте</h3>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                            Відповідайте наживо, бачте лідерборд після кожного питання та дивіться підсумковий звіт.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 border-t border-outline/60">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                    <div className="px-4 py-1.5 rounded-full bg-brand-soft text-brand font-heading text-xs uppercase tracking-wider font-bold border border-outline/50 inline-block">
                        Секрет ефективності
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
                        Що робить ReadyFox дієвим?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-5 p-6 rounded-3xl bg-surface border border-outline/70">
                        <div className="p-3.5 rounded-2xl bg-brand-soft text-brand shrink-0 h-fit">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-heading text-xl font-bold">Миттєвий дофамін</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Швидкий зворотний зв’язок стимулює мозок. Коли гравець бачить правильну відповідь одразу, інформація фіксується у пам'яті в 3 рази краще.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5 p-6 rounded-3xl bg-surface border border-outline/70">
                        <div className="p-3.5 rounded-2xl bg-peach text-orange-dark shrink-0 h-fit">
                            <Smile className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-heading text-xl font-bold">Навчання без страху</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Замість стресу від «виклику до дошки» — ігровий формат. Помилка сприймається не як вирок, а як привід спробувати ще раз.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5 p-6 rounded-3xl bg-surface border border-outline/70">
                        <div className="p-3.5 rounded-2xl bg-peach text-orange-dark shrink-0 h-fit">
                            <Brain className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-heading text-xl font-bold">Активне згадування (Active Recall)</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Пасивне читання підручника дає 10% результат. Вибір відповіді за обмежений час змушує мозок шукати зв'язки та активізувати пам'ять.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5 p-6 rounded-3xl bg-surface border border-outline/70">
                        <div className="p-3.5 rounded-2xl bg-brand-soft text-brand shrink-0 h-fit">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-heading text-xl font-bold">Здоровий азарт</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Таблиця лідерів у реальному часі залучає навіть найпасивніших студентів. Кожен хоче піднятися бодай на одну сходинку вище.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-12 border-t border-outline/60">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-extrabold">
                        Відчуйте різницю
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface/50 p-6 md:p-8 rounded-3xl border border-outline/50 space-y-4 opacity-80">
                        <h3 className="font-heading text-lg font-bold text-foreground-muted">Звичайний тест / Лекція</h3>
                        <ul className="space-y-3 text-sm text-foreground-secondary">
                            <li className="flex items-center gap-2.5">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                <span>Суха теорія та монотонні слайди</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                <span>Результати через кілька днів</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                <span>Низька залученість та нудьга</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-brand-soft/60 p-6 md:p-8 rounded-3xl border border-brand/40 space-y-4 shadow-sm">
                        <h3 className="font-heading text-lg font-bold text-brand">з ReadyFox</h3>
                        <ul className="space-y-3 text-sm text-foreground font-medium">
                            <li className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                                <span>Динамічний ігровий процес з першої секунди</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                                <span>Миттєва аналітика та розбір помилок</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                                <span>100% залученість усієї аудиторії</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 pt-8">
                <div className="bg-surface border border-outline rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-sm">
                    <h2 className="font-heading text-2xl md:text-3xl font-extrabold">
                        Не впевнені у простоті?
                    </h2>
                    <p className="text-foreground-secondary text-sm md:text-base max-w-md mx-auto">
                        Перегляньте відео про нашу платформу  все стане на свої місця
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        ВІДЕОЛІНК
                    </div>
                </div>
            </section>

        </div>
    );
}