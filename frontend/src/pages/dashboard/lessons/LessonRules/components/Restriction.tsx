import { AlertTriangle, Copyright, Flame, Ghost, HelpCircle, MessageSquareX, ShieldAlert, UserX } from "lucide-react"

export const RestrictionSelection = () => {
    return (
        <>
            <section className="space-y-6">
                <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-danger">Обмеження</span>
                    <h2 className="font-heading text-2xl font-extrabold">Що суворо заборонено?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { icon: ShieldAlert, title: "Насильство та матірна мова", desc: "Заборонено нецензурну лексику, матеріали з насильством або образи." },
                        { icon: Copyright, title: "Порушення авторських прав", desc: "Не публікуйте чужий вміст без дозволу." },
                        { icon: Flame, title: "Неприйнятний контент", desc: "Це може бути контент сексуального або неприйнятного характеру." },
                        { icon: AlertTriangle, title: "Небезпечний контент", desc: "Заборонено матеріали, що навчають небезпечним діям." },
                        { icon: MessageSquareX, title: "Мова ворожнечі", desc: "Матеріали, що принижують людей чи ведуть до цькування." },
                        { icon: Ghost, title: "Спам та обман", desc: "Реклама, шахрайство або навмисно хибна інформація." },
                    ].map((item, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-background-secondary border border-outline space-y-2">
                            <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold">{item.title}</h3>
                            <p className="text-foreground-secondary text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="p-6 rounded-2xl bg-cream border border-outline flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand text-foreground-inverse flex items-center justify-center shrink-0">
                    <UserX className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-xs sm:text-sm">
                    <h3 className="font-heading font-bold text-base">Контроль та видалення контенту</h3>
                    <p className="text-foreground-secondary">
                        У разі порушення правил <strong className="text-foreground font-bold">урок може бути видалений</strong>, а акаунт — заблокований.
                    </p>
                </div>
            </section>

            <section className="p-5 rounded-2xl bg-brand-subtle border border-outline text-center space-y-1">
                <HelpCircle className="w-5 h-5 text-brand mx-auto" />
                <h3 className="font-heading font-bold text-sm">Сумніваєтеся, чи можна публікувати?</h3>
                <p className="text-foreground-secondary text-xs max-w-md mx-auto">
                    Якщо ви не впевнені, краще перевірте зміст до публікації.
                </p>
            </section>
        </>
    )
}