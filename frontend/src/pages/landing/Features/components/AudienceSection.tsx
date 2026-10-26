import { FOR_STUDENTS_LIST, FOR_TEACHERS_LIST } from "../landingConstants";
import { CheckCircle2, GraduationCap, Users } from "lucide-react";

export const AudienceSection = () => {
    return (
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
                            {FOR_STUDENTS_LIST.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-foreground-secondary font-medium text-base">
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
                            {FOR_TEACHERS_LIST.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-foreground-secondary font-medium text-base">
                                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}