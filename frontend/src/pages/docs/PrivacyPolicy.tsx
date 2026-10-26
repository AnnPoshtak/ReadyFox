import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Database, 
  EyeOff, 
  Lock, 
  UserCheck, 
  Mail, 
  ArrowLeft,
  Server
} from "lucide-react";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-8 py-8 flex flex-col gap-8 relative text-foreground font-sans">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground-secondary hover:text-brand transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>
      </div>

      <section className="text-center max-w-2xl mx-auto w-full space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mx-auto font-bold">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Політика конфіденційності
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-foreground-muted uppercase tracking-wider">
          Остання редакція: 2026 рік
        </p>
      </section>

      <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          Ми в <strong className="text-foreground">ReadyFox</strong> поважаємо приватність наших користувачів і прагнемо зробити навчання безпечним та прозорим. Ця Політика конфіденційності пояснює, які саме дані ми зберігаємо та як їх використовуємо.
        </p>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          Користуючись платформою ReadyFox (далі — «Платформа»), ви погоджуєтеся з правилами обробки даних, описаними в цьому документі.
        </p>
      </section>

      <div className="space-y-6">
        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              1. Які дані ми збираємо та зберігаємо
            </h3>
          </div>
          
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Ми дотримуємося принципу мінімізації даних і зберігаємо у своїй базі лише те, що необхідно для функціонування сервісу:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-background-secondary border border-outline space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand block">
                Для зареєстрованих користувачів (при реєстрації):
              </span>
              <ul className="space-y-1.5 text-sm text-foreground-secondary list-disc pl-5">
                <li>Електронна пошта (email).</li>
                <li>Ім'я та прізвище.</li>
                <li>Пароль (зберігається виключно у зашифрованому/хешованому вигляді; ми не маємо доступу до вашого чистого пароля).</li>
                <li>Створені вами квізи, питання та статистика проведених ігрових сесій.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-background-secondary border border-outline space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand block">
                Для студентів / участников квізів (вхід за 6-значним кодом):
              </span>
              <ul className="space-y-1.5 text-sm text-foreground-secondary list-disc pl-5">
                <li>Ім'я або нікнейм, який ви вказуєте під час приєднання до ігрової кімнати.</li>
                <li>Ваші відповіді на питання та підсумкові бали в квізі.</li>
              </ul>
              <p className="text-xs text-foreground-muted italic pt-1">
                * Примітка: Студентам не потрібно проходити реєстрацію, вказувати пошту чи інші персональні дані для участі в грі.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-soft/30 border border-brand/20 space-y-2">
              <div className="flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-wider">
                <EyeOff className="w-4 h-4" />
                <span>Що ми НЕ зберігаємо:</span>
              </div>
              <p className="text-sm text-foreground font-medium">
                Ми НЕ записуємо та НЕ зберігаємо у своїй базі даних ваші IP-адреси, геолокацію, типи пристроїв або іншу технічну інформацію про ваш браузер чи систему.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              2. Як ми використовуємо ваші дані
            </h3>
          </div>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Збережені дані використовуються виключно для:
          </p>
          <ol className="space-y-2 text-sm sm:text-base text-foreground-secondary list-decimal pl-5">
            <li>Авторизації в системі та захисту вашого облікового запису.</li>
            <li>Забезпечення роботи ігрових кімнат у реальному часі та підрахунку балів.</li>
            <li>Відображення результатів квізів та аналітики для авторів/викладачів.</li>
          </ol>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              3. Передача даних третім особам
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>
              <strong className="text-foreground">Ми НЕ продаємо, не передаємо і не розкриваємо ваші персональні дані третім особам або рекламним компаніям.</strong>
            </li>
            <li>
              Дані можуть бути розкриті лише у випадках, прямо передбачених чинним законодавством України.
            </li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              4. Захист даних
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>Паролі зберігаються у зашифрованому вигляді за допомогою сучасних алгоритмів хешування.</li>
            <li>Доступ до створення та редагування квізів має лише власник облікового запису.</li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              5. Права користувачів та видалення даних
            </h3>
          </div>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Ви маєте повне право:
          </p>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>Змінити свої персональні дані в профілі.</li>
            <li>Надіслати запит на повне видалення вашого облікового запису, усіх створених квізів та збереженої статистики з нашої бази даних.</li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                6. Контакти та зворотний зв'язок
              </h3>
              <p className="text-xs text-foreground-secondary">
                З питань обробки або видалення даних
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-background-secondary border border-outline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted">Зв'язатися з нами</span>
              <p className="text-sm font-semibold text-foreground">
                @AnnPoshtak
              </p>
            </div>
            <a
              href="https://t.me/AnnPoshtak"
              className="px-5 py-2.5 rounded-2xl bg-brand text-foreground-inverse text-xs sm:text-sm font-bold hover:bg-brand-hover transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Написати</span>
            </a>
          </div>

          <div className="pt-2 text-center text-xs sm:text-sm font-semibold text-foreground-secondary">
            Проєкт: <strong className="text-foreground">ReadyFox</strong> — Сучасна освіта, створена для своїх 🇺🇦
          </div>
        </section>
      </div>
    </div>
  );
}