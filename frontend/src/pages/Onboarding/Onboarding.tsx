import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { authApi } from "../../api/services/auth";

export const OnboardingPage = () => {
  const navigate = useNavigate();

  const [nameAndSurname, setNameAndSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await authApi.completeOnboarding({
        fullName: nameAndSurname,
      });
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Не вдалося зберегти профіль. Спробуйте ще раз."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans text-foreground">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Лівий блок */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-brand-subtle relative p-12 flex-col items-center justify-center text-center overflow-hidden border-r border-outline/20">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none opacity-5 font-heading font-black text-[10vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
            <div>READYFOX READYFOX</div>
            <div>READYFOX READYFOX</div>
            <div>READYFOX READYFOX</div>
          </div>

          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            <Player 
              src="/stickers/005.json" 
              loop 
              autoplay 
              className="w-full h-full object-contain" 
            />
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="font-heading font-extrabold text-4xl text-foreground mb-2 tracking-tight">
              Останній штрих!
            </h1>
            <p className="text-foreground-secondary text-sm font-medium leading-relaxed">
              Лишилося одне-єдине питання, і ми відкриваємо двері у ваш особистий кабінет.
            </p>
          </div>
        </div>

        {/* Правий блок */}
        <div className="lg:col-span-6 xl:col-span-5 bg-background-secondary p-6 sm:p-10 flex items-center justify-center relative h-full">
          <div className="w-full max-w-md bg-surface border-2 border-outline rounded-3xl p-6 sm:p-8 shadow-xl shadow-shadow/20 relative z-10 transition-all duration-300">
            
            <div className="flex lg:hidden flex-col items-center mb-4">
              <div className="w-28 h-28 mb-2">
                <Player src="/stickers/005.json" loop autoplay className="w-full h-full" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mb-1">
                Як до вас звертатися?
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted font-medium">
                Введіть ім'я та прізвище, щоб ми знали, кому віддавати всі респекти 
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs font-medium text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleFinish} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 ml-1">
                  Ваше ім'я та прізвище
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  disabled={isLoading}
                  value={nameAndSurname}
                  onChange={(e) => setNameAndSurname(e.target.value)}
                  placeholder="Олена Коваленко"
                  className="w-full px-4 py-3.5 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium disabled:opacity-50 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !nameAndSurname.trim()}
                className="w-full bg-brand hover:bg-brand-hover active:scale-[0.98] text-foreground-inverse font-heading font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand/25 flex items-center justify-center gap-2 text-sm cursor-pointer mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand disabled:active:scale-100"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <span>Вриваємося!</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPage;