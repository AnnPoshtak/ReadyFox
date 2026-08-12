export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-8">
      {/* Заголовок */}
      <section className="mb-8">
        <h1 className="text-5xl font-bold text-foreground">
          Привіт, Аня 👋
        </h1>

        <p className="mt-2 text-lg text-foreground-secondary">
          Готова до нових знань сьогодні?
        </p>
      </section>

      {/* Статистика */}
      <section className="mb-8 grid grid-cols-4 gap-5">
        <div className="rounded-3xl border border-outline bg-surface p-6 shadow-sm">
          <p className="text-4xl font-bold text-brand">24</p>
          <p className="mt-2 text-foreground-secondary">
            Пройдено тестів
          </p>
        </div>

        <div className="rounded-3xl border border-outline bg-surface p-6 shadow-sm">
          <p className="text-4xl font-bold text-brand">1850</p>
          <p className="mt-2 text-foreground-secondary">
            Загальний бал
          </p>
        </div>

        <div className="rounded-3xl border border-outline bg-surface p-6 shadow-sm">
          <p className="text-4xl font-bold text-brand">7</p>
          <p className="mt-2 text-foreground-secondary">
            Днів поспіль
          </p>
        </div>

        <div className="rounded-3xl border border-outline bg-surface p-6 shadow-sm">
          <p className="text-4xl font-bold text-brand">92%</p>
          <p className="mt-2 text-foreground-secondary">
            Середня точність
          </p>
        </div>
      </section>

      {/* Контент */}
      <section className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Останні результати */}
        <div className="rounded-3xl border border-outline bg-surface p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Останні результати
            </h2>

            <button className="rounded-xl bg-brand-soft px-4 py-2 text-sm font-medium text-brand transition hover:bg-brand">
              Переглянути всі
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-background-secondary p-5">
              <div>
                <h3 className="font-medium text-foreground">
                  Фізика: Механіка
                </h3>
                <p className="text-sm text-foreground-muted">
                  5 червня • 14:30
                </p>
              </div>

              <span className="text-2xl font-bold text-success">
                90%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-background-secondary p-5">
              <div>
                <h3 className="font-medium text-foreground">
                  Алгебра: Квадратні рівняння
                </h3>
                <p className="text-sm text-foreground-muted">
                  5 червня • 11:15
                </p>
              </div>

              <span className="text-2xl font-bold text-warning">
                80%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-background-secondary p-5">
              <div>
                <h3 className="font-medium text-foreground">
                  Українська мова
                </h3>
                <p className="text-sm text-foreground-muted">
                  4 червня • 16:45
                </p>
              </div>

              <span className="text-2xl font-bold text-success">
                95%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-background-secondary p-5">
              <div>
                <h3 className="font-medium text-foreground">
                  English: Tenses
                </h3>
                <p className="text-sm text-foreground-muted">
                  4 червня • 10:20
                </p>
              </div>

              <span className="text-2xl font-bold text-brand">
                85%
              </span>
            </div>
          </div>
        </div>

        {/* Лідерборд */}
        <aside className="rounded-3xl border border-outline bg-surface p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Лідерборд
            </h2>

            <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
              Тиждень
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>🥇 Аня</span>
              <span className="font-semibold">1850</span>
            </div>

            <div className="flex justify-between">
              <span>🥈 Максим</span>
              <span>1720</span>
            </div>

            <div className="flex justify-between">
              <span>🥉 Софія</span>
              <span>1680</span>
            </div>

            <div className="flex justify-between">
              <span>4. Дмитро</span>
              <span>1540</span>
            </div>

            <div className="flex justify-between">
              <span>5. Марія</span>
              <span>1490</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-brand-soft p-4 text-center">
            <p className="text-sm text-foreground-secondary">
              Твоя позиція
            </p>

            <p className="mt-1 text-3xl font-bold text-brand">
              1 із 128
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}