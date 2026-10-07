import { MainFeatures } from "./MainFeatures";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <HeroSection />
            <MainFeatures />
        </div>
    );
}