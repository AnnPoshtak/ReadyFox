import { Player } from "@lottiefiles/react-lottie-player";
import { 
    BookOpen, 
    Lightbulb, 
    Brain, 
    ShieldAlert, 
    Copyright, 
    Flame, 
    AlertTriangle, 
    MessageSquareX, 
    Ghost, 
    ShieldCheck, 
    UserX, 
    HelpCircle 
} from "lucide-react";

export default function Rules() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand selection:text-foreground-inverse">
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
                
                {/* Hero */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach/60 text-foreground-secondary font-heading text-xs uppercase tracking-wider font-bold border border-outline">
                            <ShieldCheck className="w-4 h-4 text-brand" />
                            Стандарти спільноти
                        </div>
                        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Правила публікації <br />
                            <span className="text-brand">контенту</span>
                        </h1>
                        <p className="text-foreground-secondary text-lg md:text-xl leading-relaxed">
                            Щоб ReadyFox залишався безпечним і корисним для всіх, дотримуйтеся цих правил під час створення та публікації квізів і навчальних матеріалів.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="w-full max-w-[260px] sm:max-w-xs drop-shadow-md">
                            <Player src="/stickers/022.json" loop autoplay className="w-full h-auto" />
                        </div>
                    </div>
                </section>

                <hr className="border-outline" />

                {/* Що можна публікувати */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-success">
                            Дозволений контент
                        </span>
                        <h2 className="font-heading text-3xl font-extrabold">
                            Що можна публікувати?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-surface border border-outline hover:border-outline-hover transition-all space-y-3 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Навчальний контент</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Квізи та матеріали, які допомагають вивчати навчальні або пізнавальні теми.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface border border-outline hover:border-outline-hover transition-all space-y-3 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Власні матеріали</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Контент, створений вами або такий, на використання якого ви маєте відповідні права.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface border border-outline hover:border-outline-hover transition-all space-y-3 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-brand">
                                <Brain className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Пізнавальний контент</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Цікаві факти, пояснення, задачі, тести та інші матеріали, що відповідають тематиці платформи.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="border-outline" />

                {/* Що заборонено */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-danger">
                            Обмеження
                        </span>
                        <h2 className="font-heading text-3xl font-extrabold">
                            Що суворо заборонено?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Насильство та матірна мова</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Заборонено нецензурну лексику, матерні слова, а також матеріали, які містять або пропагують насильство, жорстокість чи заклики до заподіяння шкоди.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <Copyright className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Порушення авторських прав</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Не публікуйте чужі тексти, зображення чи навчальні матеріали без права на їх використання. Не видавайте чужу роботу за власну.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <Flame className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Неприйнятний контент</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Контент сексуального характеру, порнографічні матеріали та будь-який інший неприйнятний для навчальної платформи вміст.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Небезпечний контент</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Заборонено матеріали, що заохочують до небезпечних дій, незаконної діяльності або можуть створити реальну загрозу для людей.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <MessageSquareX className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Мова ворожнечі та цькування</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Матеріали, що принижують або атакують людей за їхніми особистими характеристиками, а також контент, спрямований на цькування.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-background-secondary border border-outline space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                                <Ghost className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg">Спам та обман</h3>
                            <p className="text-foreground-secondary text-sm leading-relaxed">
                                Реклама, шахрайський контент, навмисно неправдива інформація або матеріали, створені виключно для спаму.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Модерація */}
                <section className="p-6 sm:p-8 rounded-3xl bg-cream border border-outline flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand text-foreground-inverse flex items-center justify-center shrink-0 shadow-sm">
                        <UserX className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-heading font-extrabold text-xl">Контроль та видалення акаунтів</h3>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                            Наша модерація постійно перевіряє публікації. У разі виявлення контенту з матом, насильством чи іншими грубими порушеннями, <strong className="text-foreground font-bold">акаунт користувача буде негайно видалено</strong>.
                        </p>
                    </div>
                </section>

                {/* Сумніви */}
                <section className="p-6 rounded-2xl bg-brand-subtle border border-outline text-center space-y-2">
                    <div className="flex justify-center text-brand">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg">Сумніваєтеся, чи можна публікувати матеріал?</h3>
                    <p className="text-foreground-secondary text-sm max-w-xl mx-auto leading-relaxed">
                        Якщо ви не впевнені, що маєте право використовувати певний контент або що він відповідає правилам ReadyFox, краще утриматися від його публікації.
                    </p>
                </section>

            </main>
        </div>
    );
}