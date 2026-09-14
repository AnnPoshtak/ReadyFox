import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Code() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlPin = searchParams.get("pin");

    const [code, setCode] = useState<string>(urlPin || "");
    useEffect(() => {
        if (urlPin && urlPin.length === 6) {
            navigate(`/quiz/username?pin=${urlPin}`, { replace: true });
        }
    }, [urlPin, navigate]);

    const handleNext = () => {
        if (code.length === 6) {
            navigate("/quiz/username", { state: { code } });
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-background flex items-center justify-center p-4 overflow-hidden font-sans text-foreground">
            <div className="absolute inset-0 bg-brand-subtle flex flex-col items-center justify-center text-center overflow-hidden border-r border-outline/10">
                <div className="flex flex-col justify-between w-full h-full pointer-events-none select-none opacity-[0.06] font-heading font-black text-[15vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-surface p-8 sm:p-10 rounded-3xl border border-outline shadow-xl shadow-brand/10 backdrop-blur-sm flex flex-col items-center gap-6 text-center">

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        Введіть 6-значний код
                    </h1>
                </div>

                <div className="w-full space-y-4">
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            maxLength={6}
                            autoFocus
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            placeholder="123456" 
                            className="w-full h-14 bg-brand-subtle text-center text-2xl font-black tracking-[0.2em] text-foreground placeholder:text-foreground-muted/50 rounded-2xl border-2 border-outline focus:border-brand focus:bg-surface outline-none transition-all duration-200 shadow-sm font-mono"
                        />
                    </div>

                    <button 
                        disabled={code.length !== 6}
                        onClick={handleNext}
                        className="w-full h-14 bg-brand hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 disabled:cursor-not-allowed text-foreground-inverse font-bold text-lg rounded-2xl transition-all duration-200 shadow-lg shadow-brand/25 active:scale-[0.98] cursor-pointer"
                    >
                        Далі
                    </button>
                </div>
            </div>
        </div>
    );
}