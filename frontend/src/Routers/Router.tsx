import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "@/pages/Home/Home";
import FeaturesPage from "@/pages/Features/Features";
import HowItWorksPage from "@/pages/HowItWorks/HowItWorks";
import AboutPage from "@/pages/About/AboutPage";
import AuthPage from "@/pages/Auth/Auth";
import OnboardingPage from "@/pages/Onboarding/Onboarding";
import { OAuthSuccess } from "@/pages/OAuthSuccess/OAuthSuccess";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateQuiz from "@/pages/CreateQuiz/CreateQuiz";
import Rules from "@/pages/Rules/Rules";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Quizzes from "@/pages/Quizzes/Quizzes";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "@/pages/NotFound/NotFound";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="quizzes" element={<Quizzes />} />
                        <Route path="quizzes/new" element={<CreateQuiz />} />
                        <Route path="rules" element={<Rules />} />
                    </Route>
                    <Route path="/onboarding" element={<OnboardingPage />} />
                </Route>

                {/* Public routes */}
                <Route element={<PublicRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Route>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/auth/callback" element={<OAuthSuccess />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};