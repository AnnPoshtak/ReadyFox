import { Search } from "lucide-react";

interface FilterSectionProps {
    activeTab: "all" | "lessons" | "quizzes";
    searchQuery: string;
    selectedCategory: string;
    lessonsCount: number;
    quizzesCount: number;
    categoriesList: string[];
    setActiveTab: (tab: "all" | "lessons" | "quizzes") => void;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string) => void;
}

export const FilterSection = ({
    activeTab,
    searchQuery,
    selectedCategory,
    lessonsCount,
    quizzesCount,
    categoriesList,
    setActiveTab,
    setSearchQuery,
    setSelectedCategory,
}: FilterSectionProps) => {
    return (
        <section className="bg-surface p-4 sm:p-5 rounded-3xl border border-outline shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-center bg-background-secondary p-1.5 rounded-2xl border border-outline self-start md:self-auto w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${activeTab === "all"
                            ? "bg-surface text-brand shadow-sm"
                            : "text-foreground-secondary hover:text-foreground"
                            }`}
                    >
                        Усі
                    </button>
                    <button
                        onClick={() => setActiveTab("lessons")}
                        className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === "lessons"
                            ? "bg-surface text-brand shadow-sm"
                            : "text-foreground-secondary hover:text-foreground"
                            }`}
                    >
                        <span>Уроки</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-soft text-brand">
                            {lessonsCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("quizzes")}
                        className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === "quizzes"
                            ? "bg-surface text-brand shadow-sm"
                            : "text-foreground-secondary hover:text-foreground"
                            }`}
                    >
                        <span>Квізи</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-soft text-brand">
                            {quizzesCount}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Пошук за назвою..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-outline focus:border-brand focus:bg-surface rounded-2xl text-xs sm:text-sm font-medium text-foreground outline-none transition-all placeholder-foreground-muted"
                        />
                    </div>

                    {categoriesList.length > 0 && (
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 bg-background-secondary border border-outline focus:border-brand focus:bg-surface rounded-2xl text-xs sm:text-sm font-semibold text-foreground outline-none cursor-pointer transition-all"
                        >
                            <option value="all">Усі предмети</option>
                            {categoriesList.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
        </section>
    );
};