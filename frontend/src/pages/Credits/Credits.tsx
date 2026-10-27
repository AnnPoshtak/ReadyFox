const testers = [
  {
    name: "@berizka",
    accent: "from-orange-200 via-orange-100 to-amber-50",
  },
  {
    name: "@legenda",
    accent: "from-amber-200 via-yellow-100 to-orange-50",
  },
  {
    name: "@sora",
    accent: "from-orange-100 via-rose-100 to-yellow-50",
  },
  {
    name: "@vex",
    accent: "from-yellow-200 via-orange-100 to-rose-50",
  },
  {
    name: "@mira",
    accent: "from-amber-100 via-orange-50 to-white",
  },
  {
    name: "@danylo",
    accent: "from-orange-100 via-amber-50 to-white",
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,0,0.14),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,184,108,0.22),_transparent_28%)]" />

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

              <div className="rounded-[28px] border border-outline bg-brand-subtle p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-brand/20 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand/80">Проєкт</p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">ReadyFox</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-foreground-inverse shadow-lg shadow-brand/20">
                    ❤
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm text-foreground-secondary">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/80 px-4 py-3">
                    <span>Підтримка</span>
                    <strong className="font-heading text-base text-foreground">Безмежна</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/80 px-4 py-3">
                    <span>Фідбек</span>
                    <strong className="font-heading text-base text-foreground">Щирий</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface/80 px-4 py-3">
                    <span>Навчання</span>
                    <strong className="font-heading text-base text-foreground">Щоденне</strong>
                  </div>
                </div>
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
                  className="group rounded-[28px] border border-outline bg-surface p-5 shadow-[0_18px_40px_rgba(74,40,22,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(255,107,0,0.12)]"
                >
                  <div className={`rounded-[22px] bg-gradient-to-br ${tester.accent} p-4`}>
                    <div className="flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface/85 text-lg font-bold text-foreground shadow-sm">
                        ✦
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="font-heading text-xl font-bold text-foreground">{tester.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
