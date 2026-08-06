import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import FeaturesPage from "./pages/Features/Features";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HowItWorksPage from "./pages/HowItWorks/HowItWorks";
import AboutPage from "./pages/AboutPage/AboutPage";

import AuthPage from "./pages/Auth/Auth";
import OnboardingPage from "./pages/Onboarding/Onboarding";
import { OAuthSuccess } from "./pages/OAuthSuccess/OAuthSuccess";

function AppContent() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/auth", "/onboarding", "/oauth-success"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;