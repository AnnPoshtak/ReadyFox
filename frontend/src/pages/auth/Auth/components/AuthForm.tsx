import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { GoogleIcon } from "./GoogleIcon";
import { type AuthFormData } from "@/api/types";
import { handleAuthSubmit } from "./utils/OnSubmit";

export const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const onSubmit = (data: AuthFormData) => {
    handleAuthSubmit({
      data,
      isLogin,
      setIsLoading,
      setErrorMessage,
      navigate,
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="lg:col-span-6 xl:col-span-5 bg-background flex items-center justify-center relative p-6 sm:p-10">
      <div className="w-full max-w-md bg-surface border-2 border-outline/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-shadow/10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex lg:hidden flex-col items-center mb-4">
          <div className="w-24 h-24 mb-2">
            <Player src="/stickers/020.json" loop autoplay className="w-full h-full" />
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
            onClick={() => {
              setIsLogin(false);
              setErrorMessage(null);
              reset();
            }}
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
            onClick={() => {
              setIsLogin(true);
              setErrorMessage(null);
              reset();
            }}
            className={`flex-1 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
              isLogin
                ? "bg-surface text-foreground shadow-md"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Вхід
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 transition-all duration-200">
          {!isLogin && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 ml-1">
                  Ім'я
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: !isLogin ? "Вкажіть ім'я" : false,
                  })}
                  placeholder="Тарас"
                  className="w-full px-4 py-3 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline/60 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-sm font-medium"
                />
                {errors.firstName && (
                  <span className="text-xs text-danger ml-1 mt-1 block">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 ml-1">
                  Прізвище
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: !isLogin ? "Вкажіть прізвище" : false,
                  })}
                  placeholder="Шевченко"
                  className="w-full px-4 py-3 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline/60 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-sm font-medium"
                />
                {errors.lastName && (
                  <span className="text-xs text-danger ml-1 mt-1 block">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 ml-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email обов'язковий",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Некоректний формат email",
                },
              })}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-background text-foreground placeholder:text-foreground-muted/40 border-2 border-outline/60 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-300 text-sm font-medium"
            />
            {errors.email && (
              <span className="text-xs text-danger ml-1 mt-1 block">
                {errors.email.message}
              </span>
            )}
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
                {...register("password", {
                  required: "Пароль обов'язковий",
                  minLength: {
                    value: 8,
                    message: "Мінімум 8 символів",
                  },
                })}
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
            {errors.password && (
              <span className="text-xs text-danger ml-1 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              errorMessage ? "max-h-20 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"
            }`}
          >
            <div className="min-h-[48px] flex items-center justify-center p-3 bg-danger/10 border border-danger/30 text-danger text-xs font-semibold rounded-xl text-center">
              {errorMessage || " "}
            </div>
          </div>

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
            <GoogleIcon />
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
  );
};