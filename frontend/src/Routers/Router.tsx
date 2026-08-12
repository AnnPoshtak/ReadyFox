import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Home from "../pages/Home/Home";
import FeaturesPage from "../pages/Features/Features";
import HowItWorksPage from "../pages/HowItWorks/HowItWorks";
import AboutPage from "../pages/About/AboutPage";
import AuthPage from "../pages/Auth/Auth";
import OnboardingPage from "../pages/Onboarding/Onboarding";
import { OAuthSuccess } from "../pages/OAuthSuccess/OAuthSuccess";
import Dashboard from "../pages/Dashboard/Dashboard";

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/oauth-success" element={<OAuthSuccess />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};