import { useNavigate } from "react-router-dom"

export const JoinByCodeSection = () => {
    const navigate = useNavigate();
    return (
        <section className="p-6 sm:p-8 bg-brand-soft border border-outline rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 max-w-xl">
                <h2 className="text-2xl font-bold text-foreground">Маєте код для гри?</h2>
                <p className="text-foreground-secondary text-sm sm:text-base">
                    Введіть PIN-код та одразу приєднуйтесь до гри!
                </p>
            </div>

            <button
                onClick={() => navigate("/will-be-soon")}
                className="px-6 py-3.5 bg-brand text-foreground-inverse font-bold rounded-2xl hover:bg-brand-hover active:bg-brand-active transition-all cursor-pointer shadow-sm hover:shadow-md shrink-0 w-full sm:w-auto text-center"
            >
                Приєднатися за кодом
            </button>
        </section>
    )
}