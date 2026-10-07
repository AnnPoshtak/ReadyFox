import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ComparisonSection } from "./components/ComparisonSection";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse pb-20">
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <ComparisonSection />
        </div>
    );
}