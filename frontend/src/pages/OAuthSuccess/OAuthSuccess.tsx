import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const isOnboardedParam = searchParams.get("isOnboarded"); 

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (accessToken) {
      if (isOnboardedParam === "false") {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
      return;
    }

    navigate("/auth");
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      <span className="font-bold text-slate-700">Завершуємо вхід через Google...</span>
    </div>
  );
};