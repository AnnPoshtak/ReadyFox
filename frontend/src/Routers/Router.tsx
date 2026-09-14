import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

// Layouts & Guard Routes
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Landing Pages
import Home from "@/pages/landing/Home/Home";
import FeaturesPage from "@/pages/landing/Features/Features";
import HowItWorksPage from "@/pages/landing/HowItWorks/HowItWorks";
import AboutPage from "@/pages/landing/About/AboutPage";

// Dashboard Pages
import Dashboard from "@/pages/dashboard/Dashboard/Dashboard";
import Quizzes from "@/pages/dashboard/Quizzes/Quizzes";
import QuizDetails from "@/pages/dashboard/QuizDetails/QuizDetails";
import CreateQuiz from "@/pages/dashboard/CreateQuiz/CreateQuiz";
import Rules from "@/pages/dashboard/Rules/Rules";
import Lessons from "@/pages/dashboard/Lessons/Lessons";
import LessonDetails from "@/pages/dashboard/LessonDetails/LessonDetails";
import CreateLesson from "@/pages/dashboard/CreateLesson/CreateLesson";
import LessonRules from "@/pages/dashboard/LessonRules/LessonRules";

// Auth Pages
import AuthPage from "@/pages/auth/Auth/Auth";
import { OAuthSuccess } from "@/pages/auth/OAuthSuccess/OAuthSuccess";

// General Pages
import NotFound from "@/pages/NotFound/NotFound";
import Code from "@/pages/quiz/CodePage/CodePage";
import Username from "@/pages/quiz/Username/Username";
import HostLobby from "@/pages/quiz/HostLobby/HostLobby";
import QuizSocket from "./QuizSocket";
import Lobby from "@/pages/quiz/Lobby/Lobby";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="quizzes" element={<Quizzes />} />
                        <Route path="quizzes/:id" element={<QuizDetails />} />
                        <Route path="quizzes/new" element={<CreateQuiz />} />
                        <Route path="rules" element={<Rules />} />
                        <Route path="lessons" element={<Lessons />} />
                        <Route path="lessons/:id" element={<LessonDetails />} />
                        <Route path="lessons/new" element={<CreateLesson />} />
                        <Route path="lessons/rules" element={<LessonRules />} />
                    </Route>
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

                {/* SOСKET ROUTES */}
                <Route element={<QuizSocket />}>
                    <Route path="/quiz" element={<Outlet />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path="host" element={<HostLobby />} />
                        </Route>

                        <Route path="code" element={<Code />} />
                        <Route path="username" element={<Username />} />
                        <Route path="lobby" element={<Lobby />} />
                        <Route path="game" element={<QuizDetails />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};