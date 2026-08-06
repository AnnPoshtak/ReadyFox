import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/home");
      } else {
        await axios.post(`${BACKEND_URL}/auth/register`, { email, password });
        
        const loginRes = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
        localStorage.setItem("accessToken", loginRes.data.accessToken);
        localStorage.setItem("refreshToken", loginRes.data.refreshToken);

        navigate("/onboarding");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
      } else {
        setErrorMessage("Помилка авторизації. Перевірте дані.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans text-foreground">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative">
        
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-brand-subtle relative p-12 flex-col items-center justify-center text-center overflow-hidden border-r border-outline/10">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none opacity-5 font-heading font-black text-[10vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
            <div>READYFOX READYFOX</div>
            <div>READYFOX READYFOX</div>
            <div>READYFOX READYFOX</div>
          </div>

          <div className="w-64 h-64 md:w-80 md:h-80 relative z-10 mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-500 ease-out">
            <Player 
              src="/stickers/020.json" 
              loop 
              autoplay 
              className="w-full h-full object-contain" 
            />
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="font-heading font-extrabold text-4xl text-foreground mb-1 tracking-tight">
              ReadyFox
            </h1>
            <p className="font-heading font-bold text-xs uppercase tracking-widest text-brand mb-4">
              ОСВІТА ДЛЯ СВОЇХ 🇺🇦
            </p>
            <p className="text-foreground-secondary text-sm font-medium leading-relaxed">
              Ваша історія успіху починається тут. Створюйте, грайте та навчайте з азартом!
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 bg-background flex items-center justify-center relative p-6 sm:p-10">
          <div className="w-full max-w-md bg-surface border-2 border-outline/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-shadow/10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
            
            <div className="flex lg:hidden flex-col items-center mb-4">
              <div className="w-24 h-24 mb-2">
                <Player src="/stickers/017.json" loop autoplay className="w-full h-full" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mb-1">
                {isLogin ? "З поверненням!" : "Створити акаунт"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted font-medium">
                {isLogin ? "Продовжуйте навчання в ReadyFox" : "Приєднуйтеся до спільноти ReadyFox"}
              </p>
            </div>

            <div className="flex bg-brand-soft/50 p-1 rounded-2xl mb-6 border border-outline/40">
              <button
                type="button"
                onClick={() => { setIsLogin(false); setErrorMessage(null); }}
                className={`flex-1 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  !isLogin 
                    ? "bg-surface text-foreground shadow-md" 
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Реєстрація
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setErrorMessage(null); }}
                className={`flex-1 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isLogin 
                    ? "bg-surface text-foreground shadow-md" 
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                Вхід
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline/60 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-sm font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="block text-xs font-bold text-foreground">
                    Пароль
                  </label>
                  {isLogin && (
                    <Link 
                      to="/auth/forgot-password" 
                      className="text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
                    >
                      Забули пароль?
                    </Link>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Мінімум 8 символів"
                    className="w-full pl-4 pr-11 py-3 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline/60 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-foreground-muted hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-danger/10 border border-danger/30 text-danger text-xs font-semibold rounded-xl text-center animate-bounce">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand hover:bg-brand-hover active:scale-[0.98] text-foreground-inverse font-heading font-bold py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-brand/25 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                <span>{isLogin ? "Увійти" : "Продовжити"}</span>
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-outline/40" />
                <span className="text-[10px] font-extrabold text-foreground-muted uppercase tracking-widest">
                  АБО
                </span>
                <div className="flex-1 h-px bg-outline/40" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-surface hover:bg-surface-hover active:scale-[0.98] border-2 border-outline/60 text-foreground font-heading font-bold py-3 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.7372 23.5556 10.0381H12V14.7041H18.6029C18.3148 16.1843 17.4497 17.4414 16.1479 18.3146V21.3116H20.1068C22.4208 19.1809 23.766 16.0279 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12 24C15.24 24 17.9654 22.9299 19.9575 21.0946L16.0007 18.0976C14.9088 18.8309 13.5186 19.2804 12 19.2804C8.87103 19.2804 6.22457 17.1681 5.27539 14.3292H1.17676V17.507C3.19839 21.5226 7.33758 24 12 24Z" fill="#34A853"/>
                  <path d="M5.27539 14.3292C5.03102 13.6 4.89795 12.8185 4.89795 12C4.89795 11.1815 5.03102 10.4 5.27539 9.67083V6.49304H1.17676C0.360156 8.11304 0 9.98804 0 12C0 14.012 0.360156 15.887 1.17676 17.507L5.27539 14.3292Z" fill="#FBBC05"/>
                  <path d="M12 4.71963C13.7628 4.71963 15.3411 5.32463 16.5861 6.51338L20.0454 3.05408C17.961 1.11188 15.2355 0 12 0C7.33758 0 3.19839 2.47743 1.17676 6.49304L5.27539 9.67083C6.22457 6.83188 8.87103 4.71963 12 4.71963Z" fill="#EA4335"/>
                </svg>
                <span>Увійти через Google</span>
              </button>

              <p className="text-[11px] text-center text-foreground-muted leading-tight mt-6">
                Реєструючись, ви погоджуєтеся з{" "}
                <Link to="/terms" className="text-brand font-semibold hover:underline">
                  Умовами використання
                </Link>{" "}
                та{" "}
                <Link to="/privacy" className="text-brand font-semibold hover:underline">
                  Політикою конфіденційності
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;