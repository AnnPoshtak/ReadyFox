import { useEffect, useState } from "react";
import { useQuizSocket } from "@/context/QuizSocketContext";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
    QrCode,
    X,
    Users,
    Play,
    Copy,
    Check
} from "lucide-react";

const AVATAR_COLORS = [
    "bg-amber-100",
    "bg-rose-100",
    "bg-sky-100",
    "bg-emerald-100",
    "bg-purple-100",
    "bg-indigo-100",
    "bg-orange-100",
    "bg-teal-100",
];

function getAvatarProps(keyStr: string) {
    let hash = 0;
    for (let i = 0; i < keyStr.length; i++) {
        hash = keyStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const colorClass = AVATAR_COLORS[absHash % AVATAR_COLORS.length];
    return { colorClass };
}

export default function HostLobby() {
    const { pin, players, createRoom, startGame, isConnected } = useQuizSocket();
    const location = useLocation();
    const quizId = location.state?.quizId;

    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    const [copiedPin, setCopiedPin] = useState(false);

    useEffect(() => {
        if (quizId && !pin && isConnected) {
            createRoom(quizId);
        }
    }, [quizId, pin, isConnected, createRoom]);

    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const joinUrl = pin ? `${baseUrl}/quiz/username?pin=${pin}` : "";

    const handleCopyPin = () => {
        if (!pin) return;
        navigator.clipboard.writeText(pin);
        setCopiedPin(true);
        setTimeout(() => setCopiedPin(false), 2000);
    };

    return (
        <div className="relative min-h-screen w-full bg-background flex flex-col justify-between p-4 sm:p-8 overflow-hidden font-sans text-foreground select-none">

            <div className="absolute inset-0 bg-brand-subtle flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none z-0">
                <div className="flex flex-col justify-between w-full h-full opacity-[0.04] font-heading font-black text-[16vw] leading-none text-brand uppercase tracking-tighter whitespace-nowrap -rotate-6">
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                    <div>READYFOX READYFOX</div>
                </div>
            </div>

            <header className="relative z-10 w-full max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 bg-surface/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-outline shadow-xl shadow-shadow">

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-brand-soft px-4 sm:px-6 py-2 rounded-2xl border border-outline-hover flex items-center gap-3">
                        <div>
                            <span className="text-[10px] sm:text-xs font-black text-foreground-secondary uppercase tracking-widest block">
                                Код гри
                            </span>
                            <span className="text-3xl sm:text-5xl font-black text-brand tracking-[0.15em] font-mono leading-none">
                                {pin || "......"}
                            </span>
                        </div>
                        {pin && (
                            <button
                                onClick={handleCopyPin}
                                className="p-2 hover:bg-white/80 rounded-xl transition-all border border-transparent hover:border-outline text-foreground-secondary cursor-pointer active:scale-95 ml-1"
                                title="Копіювати код гри"
                            >
                                {copiedPin ? (
                                    <Check className="w-5 h-5 text-emerald-600" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
                {pin && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsQrModalOpen(true)}
                            className="flex items-center gap-3 bg-cream hover:bg-peach border-2 border-outline hover:border-brand/40 p-2 sm:p-2.5 pr-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                            title="Відкрити QR-код на весь екран"
                        >
                            <div className="p-1.5 bg-white rounded-xl border border-outline">
                                <QRCodeSVG
                                    value={joinUrl}
                                    size={40}
                                    bgColor="transparent"
                                    fgColor="#3A1F12"
                                    level="M"
                                />
                            </div>
                            <div className="hidden sm:flex flex-col items-start text-left">
                                <span className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1">
                                    <QrCode className="w-3.5 h-3.5 text-brand" /> QR-код
                                </span>
                                <span className="text-[11px] font-bold text-foreground-muted">
                                    На увесь екран
                                </span>
                            </div>
                        </button>
                    </div>
                )}
            </header>

            <main className="relative z-10 w-full max-w-5xl mx-auto my-6 flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-6 bg-surface px-6 py-2.5 rounded-full border border-outline shadow-sm">
                    <Users className="w-5 h-5 text-brand" />
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">
                        Гравці в лобі:
                    </h2>
                    <span className="bg-brand text-foreground-inverse font-black text-lg px-3 py-0.5 rounded-full">
                        {players.length}
                    </span>
                </div>

                {players.length === 0 && (
                    <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-surface/60 border-2 border-dashed border-outline rounded-3xl max-w-3xl my-auto transition-all">
                        <div className="p-4 bg-brand-soft rounded-2xl border border-outline mb-4">
                            <Users className="w-10 h-10 text-brand" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
                            Чекаємо на перших гравців...
                        </h3>
                        <p className="text-base sm:text-lg text-foreground-muted max-w-lg leading-relaxed">
                            Введіть код гри на своєму пристрої або відскануйте QR-код для швидкого підключення до кімнати.
                        </p>
                    </div>
                )}

                {players.length > 0 && (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[55vh] overflow-y-auto p-2">
                        {players.map((p, idx) => {
                            const { colorClass } = getAvatarProps(p.id || p.name);
                            return (
                                <div
                                    key={p.id}
                                    className="bg-surface border-2 border-outline hover:border-brand-hover p-4 rounded-2xl flex flex-col items-center justify-center gap-3 font-bold text-base text-foreground shadow-sm transition-all animate-in zoom-in-95 duration-200 text-center"
                                    style={{ animationDelay: `${(idx % 10) * 40}ms` }}
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${colorClass}`}>
                                        <img
                                            src="/fox-head-only.jpg"
                                            alt="Avatar"
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>

                                    <span className="truncate w-full font-extrabold text-sm sm:text-base">{p.name}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <footer className="relative z-10 w-full max-w-md mx-auto">
                <button
                    onClick={startGame}
                    disabled={players.length === 0}
                    className="w-full h-14 bg-brand hover:bg-brand-hover active:bg-brand-active disabled:opacity-40 disabled:cursor-not-allowed text-foreground-inverse font-black text-lg rounded-2xl transition-all shadow-md active:scale-[0.99] cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 border-orange-dark active:border-b-0"
                >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Почати квіз</span>
                </button>
            </footer>

            {isQrModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setIsQrModalOpen(false)}
                >
                    <div
                        className="bg-surface border-4 border-brand p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-md w-full text-center relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsQrModalOpen(false)}
                            className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2 rounded-2xl hover:bg-brand-soft transition-colors cursor-pointer"
                        >
                            <X className="w-7 h-7" />
                        </button>

                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                                Відскануйте QR-код
                            </h3>
                        </div>

                        <div className="p-5 bg-white rounded-3xl border-2 border-outline shadow-inner">
                            <QRCodeSVG
                                value={joinUrl}
                                size={260}
                                bgColor="#FFFFFF"
                                fgColor="#3A1F12"
                                level="H"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}