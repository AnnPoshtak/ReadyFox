import {
    Zap,
    Brain,
    Smile,
    TrendingUp
} from "lucide-react";

export const FeaturesSection = () => {
    return (
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
    )
}