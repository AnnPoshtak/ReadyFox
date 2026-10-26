import { BookOpen, Brain, Lightbulb } from "lucide-react"

export const AllowedContent = () => {
    const allowedContent = [
        {icon: BookOpen, title: "Навчальний контент", desc: "Уроки, які пояснюють тему, тренують навички і відповідають програмі навчання."},
        {icon: Lightbulb, title: "Корисні матеріали", desc: "Конспекти, пояснення, посилання, які справді допомагають у навчанні."},
        {icon: Brain, title: "Структурована подача", desc: "Класичний формат мета + зміст + джерела для чіткого пояснення теми."},
    ]
    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-success">Дозволений контент</span>
                <h2 className="font-heading text-2xl font-extrabold">Що можна публікувати?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allowedContent.map((item, idx) => (
                    <div className="p-5 rounded-2xl bg-surface border border-outline space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold">{item.title}</h3>
                    <p className="text-foreground-secondary text-xs leading-relaxed">
                        {item.desc}
                    </p>
                </div>
                ))}
                

            </div>
        </section>
    )
}