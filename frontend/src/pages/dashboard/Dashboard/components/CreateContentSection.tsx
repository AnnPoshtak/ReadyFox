import { Link } from "react-router-dom"

export const CreateContentSection = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-surface border border-outline rounded-3xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-md group">
                <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-brand-soft text-brand text-xs font-mono font-bold rounded-lg border border-outline">
                        QUIZ
                    </span>
                    <h3 className="text-xl font-bold text-foreground">Створити квіз</h3>
                    <p className="text-sm text-foreground-secondary">
                        Проводьте інтерактивні тести та перевіряйте знання у цікавій формі
                    </p>
                </div>
                <Link
                    to="/dashboard/quizzes/new"
                    className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
                >
                    + Новий квіз
                </Link>
            </div>

            <div className="p-6 bg-surface border border-outline rounded-3xl flex flex-col justify-between hover:border-outline-hover transition-all hover:shadow-md group">
                <div className="space-y-3">
                    <span className="inline-block px-3 py-1 bg-cream text-brown-light text-xs font-mono font-bold rounded-lg border border-outline">
                        LESSON
                    </span>
                    <h3 className="text-xl font-bold text-foreground">Створити урок</h3>
                    <p className="text-sm text-foreground-secondary">
                        Діліться навчальними матеріалами, теорією та готовими конспектами.
                    </p>
                </div>
                <Link
                    to="/dashboard/lessons/new"
                    className="mt-6 inline-flex items-center justify-center w-full py-3 bg-brand-subtle text-brand border border-outline font-bold rounded-2xl hover:bg-brand-soft transition-colors text-center"
                >
                    + Новий урок
                </Link>
            </div>
        </section>
    )
}