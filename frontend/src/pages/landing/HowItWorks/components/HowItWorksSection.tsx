export const HowItWorksSection = () => {
    return (
        <section className = "max-w-7xl mx-auto px-6 py-12 border-t border-outline/60" >
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
            </section >
    )
}