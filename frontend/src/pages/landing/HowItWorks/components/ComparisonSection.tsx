import {
    CheckCircle2,
    XCircle,
} from "lucide-react";

export const ComparisonSection = () => {
    return (
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
    )
}