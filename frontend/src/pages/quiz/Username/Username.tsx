import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuizSocket } from "@/context/QuizSocketContext";

export default function Username() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { joinRoom } = useQuizSocket();
    const code = location.state?.code || searchParams.get("pin");

    const [username, setUsername] = useState("");
    if (!code) {
        navigate("/quiz/code", { replace: true });
        return null;
    }

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        try {
            await joinRoom(code, username.trim());
            navigate("/quiz/lobby");
        } catch (error) {
            alert(error);
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
                        Введіть ваше ім'я
                    </h1>
                    <p className="text-sm font-semibold text-brand bg-brand-soft py-1 px-3 rounded-full inline-block">
                        Код гри: <span className="font-mono font-bold tracking-wider">{code}</span>
                    </p>
                </div>

                <form onSubmit={handleJoin} className="w-full space-y-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            maxLength={16}
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Лисичка"
                            className="w-full h-14 bg-brand-subtle text-center text-xl font-bold tracking-normal text-foreground placeholder:text-foreground-muted/50 rounded-2xl border-2 border-outline focus:border-brand focus:bg-surface outline-none transition-all duration-200 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!username.trim()}
                        className="w-full h-14 bg-brand hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 disabled:cursor-not-allowed text-foreground-inverse font-bold text-lg rounded-2xl transition-all duration-200 shadow-lg shadow-brand/25 active:scale-[0.98] cursor-pointer"
                    >
                        Приєднатися
                    </button>
                </form>
            </div>
        </div>
    );
}