import { useQuizSocket } from "@/context/QuizSocketContext";

export default function Lobby() {
    const { pin, players } = useQuizSocket();
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
                        Чекаємо інших гравців...
                    </h1>
                    <div>
                        <h2>Кімната: {pin}</h2>
                        <div>Гравців у кімнаті: {players.length}</div>
                        {players.map((p) => (
                            <div key={p.id}>{p.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}