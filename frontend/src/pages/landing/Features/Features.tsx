import { HeroSection } from "./components/HereSection";
import { AudienceSection } from "./components/AudienceSection";
import { FeatureSection } from "./components/FeaturesSection";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <HeroSection />
            <FeatureSection/>
            <AudienceSection />
        </div>
    );
}