import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/onboarding");
    } else {
      navigate("/auth");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      <span className="font-bold text-slate-700">Завершуємо вхід через Google...</span>
    </div>
  );
};