import { type NavigateFunction } from "react-router-dom";
import { authApi } from "@/api/services/auth";
import { type AuthFormData } from "@/api/types";
import { formatErrorMessage } from "./FormatErrorMessage";

interface AuthSubmitParams {
  data: AuthFormData;
  isLogin: boolean;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (value: string | null) => void;
  navigate: NavigateFunction;
}

export const handleAuthSubmit = async ({
  data,
  isLogin,
  setIsLoading,
  setErrorMessage,
  navigate,
}: AuthSubmitParams) => {
  setErrorMessage(null);
  setIsLoading(true);

  try {
    if (isLogin) {
      const res = await authApi.login({
        email: data.email.trim(),
        password: data.password,
      });

      const accessToken = res.data?.accessToken || res.accessToken;
      const refreshToken = res.data?.refreshToken || res.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Токени відсутні");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/dashboard");
    } else {
      const firstName = data.firstName?.trim() || "";
      const lastName = data.lastName?.trim() || "";
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName) {
        setErrorMessage("Вкажіть ім'я та прізвище");
        setIsLoading(false);
        return;
      }

      await authApi.register({
        email: data.email.trim(),
        password: data.password,
        nameAndSurname: fullName,
      });

      const loginRes = await authApi.login({
        email: data.email.trim(),
        password: data.password,
      });

      const accessToken = loginRes.data?.accessToken || loginRes.accessToken;
      const refreshToken = loginRes.data?.refreshToken || loginRes.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Токени відсутні");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard");
    }
  } catch (err: any) {
    console.error("Auth error:", err);
    const backendMessage = err.response?.data?.message || err.response?.data?.error;
    setErrorMessage(formatErrorMessage(backendMessage || err.message));
  } finally {
    setIsLoading(false);
  }
};