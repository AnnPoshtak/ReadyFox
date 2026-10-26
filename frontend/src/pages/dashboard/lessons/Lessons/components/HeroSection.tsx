import { Search, BookOpen } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubject: Option | null;
  setSelectedSubject: (subject: Option | null) => void;
}

export const HeroSection = ({
  searchQuery,
  setSearchQuery,
  selectedSubject,
  setSelectedSubject,
}: HeroSectionProps) => {
  return (
    <section className="mb-8 text-center max-w-3xl w-full">
      <h1 className="text-3xl sm:text-5xl font-bold text-foreground flex items-center justify-center gap-3 mb-4">
        Знайдіть урок на будь-яку тему!
      </h1>
      <p className="mt-2 text-base sm:text-lg text-foreground-secondary">
        Вивчайте нові теми або додавайте свій власний урок.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-end w-full">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-cream py-3 pl-14 pr-6 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
            placeholder="Пошук за назвою..."
          />
        </div>

        <div className="w-full sm:w-72">
          <CustomSelect
            options={SUBJECT_OPTIONS}
            value={selectedSubject}
            onChange={(val) => setSelectedSubject(val)}
            label="Предмет"
            placeholder="Оберіть предмет..."
            icon={BookOpen}
          />
        </div>
      </div>
    </section>
  );
};