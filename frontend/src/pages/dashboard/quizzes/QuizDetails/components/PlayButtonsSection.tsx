import { Play, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const PlayButtonsSelection = () => {
    const navigate = useNavigate()
    
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--color-brand)] transition-all duration-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group shadow-sm hover:shadow-md">
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 fill-current" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                        Пройти самостійно
                    </h3>
                    <p className="text-sm text-[var(--color-foreground-secondary)] mb-6 leading-relaxed">
                        Індивідуальне проходження у власному темпі для перевірки знань або тренування.
                    </p>
                </div>

                <button
                    onClick={() => navigate("quiz")}
                    className="w-full py-3.5 px-6 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                    <Play className="w-5 h-5 fill-current" /> Соло-режим
                </button>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] hover:border-[var(--color-brand)] transition-all duration-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group shadow-sm hover:shadow-md">
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                        Запустити для групи
                    </h3>
                    <p className="text-sm text-[var(--color-foreground-secondary)] mb-6 leading-relaxed">
                        Створення інтерактивної кімнати з PIN-кодом для проведення змагання в реальному часі.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/will-be-soon")}
                    className="w-full py-3.5 px-6 bg-[var(--color-brand-soft)] hover:bg-[var(--color-brand)] text-[var(--color-brand)] hover:text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Users className="w-5 h-5" /> Командна гра
                </button>
            </div>
        </section>
    )
}