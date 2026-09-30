import { AuthBanner } from "./components/AuthBanner";
import { AuthForm } from "./components/AuthForm";



export const AuthPage = () => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans text-foreground">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative">
        <AuthBanner />
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;