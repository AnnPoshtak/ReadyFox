import { FEATURES_LIST } from "../landingConstants";

export const FeatureSection = () => {
    return (
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
                {FEATURES_LIST.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
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
    )
}