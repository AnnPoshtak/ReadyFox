import { AboutSection } from "./components/AboutSection";
import { HeroSection } from "./components/HeroSection";

export default function AboutPage() {
    
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse pb-20">
            <HeroSection />
            <AboutSection />
        </div>
    );
}