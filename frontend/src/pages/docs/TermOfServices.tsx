import { Link } from "react-router-dom";
import { 
  FileText, 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  Scale, 
  Mail, 
  Sparkles,
  ArrowLeft
} from "lucide-react";

export function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-8 py-8 flex flex-col gap-8 relative text-foreground font-sans">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground-secondary hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Повернутися на головну</span>
        </Link>
      </div>

      <section className="text-center max-w-2xl mx-auto w-full space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mx-auto font-bold">
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Умови використання
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-foreground-muted uppercase tracking-wider">
          Остання редакція: 2026 рік
        </p>
      </section>

      <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Вітаємо на платформі <span className="text-brand">ReadyFox</span>!
        </h2>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          <strong className="text-foreground">ReadyFox</strong> — це безкоштовний освітній інструмент, створений для проведення інтерактивних квізів, гейміфікації навчання та перевірки знань.
        </p>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          Користуючись платформою ReadyFox (далі — «Платформа»), ви погоджуєтеся з цими Умовами використання. Будь ласка, уважно ознайомтеся з ними.
        </p>
      </section>

      <div className="space-y-6">
        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              1. Загальні положення
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>
              Платформа надається як безкоштовний освітній інструмент для вчителів, викладачів, студентів, учнів та освітніх хабів.
            </li>
            <li>
              Використання Платформи є повністю безкоштовним і не містить прихованих підписок чи платних лімітів.
            </li>
            <li>
              Сервіс може перебувати у стані активного розвитку (пет-проєкт / бета-версія), тому функціонал може періодично оновлюватися або змінюватися.
            </li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              2. Доступ та реєстрація
            </h3>
          </div>
          <div className="space-y-3 text-sm sm:text-base text-foreground-secondary leading-relaxed">
            <p>
              <strong className="text-foreground">Студенти / Учасники:</strong> можуть приєднуватися до ігрових кімнат за допомогою 6-значного коду без обов'язкової складної реєстрації.
            </p>
            <p>
              <strong className="text-foreground">Викладачі / Автори:</strong> для створення власного контенту (квізів) створюють обліковий запис.
            </p>
            <p>
              Ви зобов'язуєтеся надавати достовірну інформацію під час реєстрації та відповідаєте за збереження конфіденційності своїх даних для входу.
            </p>
          </div>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              3. Контент користувачів та правила поведінки
            </h3>
          </div>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Викладачі та автори самостійно несуть відповідальність за контент (питання, тексти, зображення), який вони створюють і публікують у конструкторі квізів.
          </p>
          
          <div className="p-4 rounded-2xl bg-background-secondary border border-outline space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-danger block">
              На Платформі суворо заборонено:
            </span>
            <ul className="space-y-2 text-sm text-foreground-secondary list-disc pl-5">
              <li>Публікувати контент, що порушує законодавство України, містить заклики до насильства, мову ворожнечі або образи.</li>
              <li>Розміщувати шкідливий код, спам чи матеріали, що порушують авторські права третіх осіб.</li>
              <li>Використовувати сторонній софт чи скрипти для накрутки балів, злому рейтингів або порушення роботи сервісу.</li>
            </ul>
          </div>

          <p className="text-sm text-foreground-secondary italic">
            Адміністрація ReadyFox залишає за собою право видаляти квізи або блокувати акаунти, які порушують ці правила.
          </p>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              4. Інтелектуальна власність
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>Усі виключні права на дизайн, логотип ReadyFox, програмний код та ігрові механіки належать розробникові Платформи.</li>
            <li>Авторські права на створені вами квізи та навчальні матеріали залишаються за їхніми авторами.</li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              5. Обмеження відповідальності
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm sm:text-base text-foreground-secondary list-disc pl-5">
            <li>
              Платформа надається за принципом <strong className="text-foreground">«як є» (AS IS)</strong>. Ми робимо все можливе для стабільної та швидкої роботи, але не гарантуємо 100% відсутність технічних збоїв або затримок.
            </li>
            <li>
              Адміністрація не несе відповідальності за зміст квізів, створених користувачами, а також за можливу втрату даних чи переривання сесії під час гри через проблеми з інтернет-з'єднанням.
            </li>
          </ul>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              6. Зміни до Умов
            </h3>
          </div>
          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            Ми залишаємо за собою право вносити зміни до цих Умов у будь-який час. Оновлена редакція набуває чинності з моменту її публікації на цій сторінці.
          </p>
        </section>

        <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-outline shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                7. Контакти та зворотний зв'язок
              </h3>
              <p className="text-xs text-foreground-secondary">
                Якщо ви виявили помилку або маєте запитання
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