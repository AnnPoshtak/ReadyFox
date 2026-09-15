import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  BookOpen,
  Lightbulb,
  Brain,
  ShieldAlert,
  Copyright,
  Flame,
  AlertTriangle,
  MessageSquareX,
  Ghost,
  ShieldCheck,
  UserX,
  HelpCircle,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { lessonsApi } from "@/api/services/lessons";

export default function LessonRules() {
  const location = useLocation();
  const navigate = useNavigate();

  const lessonData = location.state?.lessonData;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [hasScrolledHalf, setHasScrolledHalf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0 || window.scrollY / scrollTotal >= 0.5) {
        setHasScrolledHalf(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCreateLesson = async () => {
    if (!lessonData || !isChecked || !hasScrolledHalf) return;

    setError(null);
    try {
      setIsSubmitting(true);
      await lessonsApi.create(lessonData as any);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Помилка при створенні уроку.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach/60 text-foreground-secondary font-heading text-xs uppercase tracking-wider font-bold border border-outline">
              <ShieldCheck className="w-4 h-4 text-brand" />
              Стандарти спільноти
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Правила публікації <br />
              <span className="text-brand">уроків</span>
            </h1>
            <p className="text-foreground-secondary text-lg md:text-xl leading-relaxed">
              Перед публікацією уроку переконайтеся, що курс відповідає навчальним стандартам і не містить забороненого або небезпечного контенту.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[260px] sm:max-w-xs drop-shadow-md">
              <Player src="/stickers/022.json" loop autoplay className="w-full h-auto" />
            </div>
          </div>
        </section>

        <hr className="border-outline" />

        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-success">Дозволений контент</span>
            <h2 className="font-heading text-2xl font-extrabold">Що можна публікувати?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-outline space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold">Навчальний контент</h3>
              <p className="text-foreground-secondary text-xs leading-relaxed">
                Уроки, які пояснюють тему, тренують навички і відповідають програмі навчання.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-outline space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold">Корисні матеріали</h3>
              <p className="text-foreground-secondary text-xs leading-relaxed">
                Конспекти, пояснення, посилання, які справді допомагають у навчанні.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-outline space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold">Структурована подача</h3>
              <p className="text-foreground-secondary text-xs leading-relaxed">
                Класичний формат мета + зміст + джерела для чіткого пояснення теми.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-outline" />

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

        {lessonData && (
          <section className="p-6 rounded-2xl bg-surface border border-outline shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className={`flex items-start sm:items-center gap-3 select-none ${hasScrolledHalf ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={!hasScrolledHalf}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-outline text-brand accent-brand cursor-pointer disabled:cursor-not-allowed shrink-0"
                />
                <span className="text-xs sm:text-sm font-semibold text-foreground">
                  {hasScrolledHalf ? (
                    <>Я прочитав(-ла) та погоджуюся з правилами для уроку «<span className="text-brand font-bold">{lessonData.title}</span>»</>
                  ) : (
                    <span className="text-foreground-muted flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Прогортайте сторінку вище, щоб ознайомитися з правилами
                    </span>
                  )}
                </span>
              </label>

              <button
                type="button"
                onClick={handleCreateLesson}
                disabled={!isChecked || !hasScrolledHalf || isSubmitting}
                className="w-full sm:w-auto bg-brand text-white font-bold hover:bg-brand-hover active:bg-brand-active disabled:opacity-40 disabled:cursor-not-allowed px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shrink-0 h-11"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Створити урок"}
              </button>
            </div>

            {error && (
              <div className="text-danger text-xs font-bold flex items-center gap-1.5 bg-danger/10 px-3 py-2 rounded-lg border border-danger/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
