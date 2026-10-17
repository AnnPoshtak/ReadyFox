import useQuiz from "./hooks/useQuiz";
import { HeroSection } from "./components/HeroSection";
import { AllowedContent } from "./components/AllowedContent";
import { RestrictionSelection } from "./components/Restriction";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Rules() {
    const { isSubmitting, setIsChecked, isChecked, error, handleCreateQuiz, quizData } = useQuiz();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
                <HeroSection />
                <hr className="border-outline" />
                <AllowedContent />
                <hr className="border-outline" />
                <RestrictionSelection />

                {quizData && (
                    <section className="p-6 rounded-2xl bg-surface border border-outline shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <label className={`flex items-start sm:items-center gap-3 select-none cursor-pointer`}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-outline text-brand accent-brand cursor-pointer disabled:cursor-not-allowed shrink-0"
                                />
                                <span className="text-xs sm:text-sm font-semibold text-foreground">
                                    <>Я прочитав(-ла) та погоджуюся з правилами для квізу «<span className="text-brand font-bold">{quizData.title}</span>»</>
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={handleCreateQuiz}
                                disabled={!isChecked || isSubmitting}
                                className="w-full sm:w-auto bg-brand text-white font-bold hover:bg-brand-hover active:bg-brand-active disabled:opacity-40 disabled:cursor-not-allowed px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shrink-0 h-11"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Створити квіз"}
                            </button>
                        </div>

                        {error && (
                            <div className="text-danger text-xs font-bold flex items-center gap-1.5 bg-danger/10 px-3 py-2 rounded-lg border border-danger/20">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}
                    </section>
                )}

            </main>
        </div>
    );
}