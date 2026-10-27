import { Player } from "@lottiefiles/react-lottie-player";
import stickerAnimation from "/stickers/016.json?url";

const testers = [
    { name: "@berizka" },
    { name: "Блазень"},
    { name: "@swedka.121"},
    
];

export default function CreditsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <div className="relative overflow-hidden">
                <main className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <section className="rounded-[32px] border border-outline/70 bg-surface/90 p-6 shadow-[0_32px_80px_rgba(74,40,22,0.08)] backdrop-blur-sm sm:p-8 lg:p-12">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
                            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
                            Дякую
                        </div>

                        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                            <div>
                                <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                                    Дякую всім,
                                    <span className="block text-brand">хто був зі мною.</span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-base leading-8 text-foreground-secondary sm:text-lg">
                                    Дякую кожному, хто був поруч під час розробки, хто перевіряв, тестував,
                                    підтримував ідею, давав фідбек і вчив мене писати код краще, чіткіше й
                                    сміливіше.
                                </p>

                                <p className="mt-4 max-w-2xl text-base leading-8 text-foreground-secondary sm:text-lg">
                                    Без вас цей проєкт не став би таким, яким він є зараз. Ваші поради, підтримка,
                                    критика і віра в мене були не менш важливими, ніж сам код.
                                </p>
                            </div>

                            <div className="flex justify-center items-center w-full min-h-[280px]">
                                <Player 
                                    src={stickerAnimation} 
                                    loop 
                                    autoplay 
                                    style={{ height: '280px', width: '280px' }} 
                                />
                            </div>
                        </div>
                    </section>

                    <section className="mt-16">
                        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Тестувальники</p>
                                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                                    Люди, завдяки яким проєкт став кращим
                                </h2>
                            </div>
                            <div className="rounded-full border border-outline bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary">
                                {testers.length} людей у команді підтримки
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {testers.map((tester) => (
                                <article
                                    key={tester.name}
                                    className="flex items-center justify-start gap-3 rounded-[24px] border border-outline bg-surface p-4 shadow-[0_8px_20px_rgba(74,40,22,0.03)]"
                                >
                                    <span className="text-lg text-brand">✦</span>
                                    <h3 className="font-heading text-lg font-bold text-foreground">{tester.name}</h3>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}