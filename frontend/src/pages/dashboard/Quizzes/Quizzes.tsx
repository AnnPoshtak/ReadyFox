import { useEffect, useState } from "react";
import { Search, BookOpen, Plus } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";
import { useNavigate } from "react-router-dom";
import { quizzesApi } from "@/api/services/quizzes";

interface QuizAuthor {
  id: number;
  email: string;
  nameAndSurname: string;
}

interface Quiz {
  id: number;
  name: string;
  category: string;
  timeToRead: number;
  timeToPass: number;
  author: QuizAuthor;
  createdAt: string;
  editedAt: string;
}

export default function Quizzes() {
  const navigation = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Option | null>(
    SUBJECT_OPTIONS[0]?.items[0] || null
  );

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizzesApi.findAll();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ?? false;

    const matchesSubject =
      !selectedSubject ||
      selectedSubject.id === "all" ||
      quiz.category === selectedSubject.label;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
      <section className="mb-8 text-center max-w-3xl w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground flex items-center justify-center gap-3 mb-4">
          Знайдіть квіз на будь-яку тему!
        </h1>
        <p className="mt-2 text-base sm:text-lg text-foreground-secondary">
          Знайдіть потрібний квіз, або створіть власний!
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

      <section className="w-full">
        {loading ? (
          <div className="text-center py-12 text-foreground-muted text-base font-medium">
            Завантаження квізів...
          </div>
        ) : filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-surface p-5 rounded-2xl border border-outline hover:border-outline-hover transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {quiz.name}
                  </h2>
                  <p className="text-sm text-foreground-secondary font-medium">
                    Автор: {quiz.author?.nameAndSurname || quiz.author?.email || "Невідомий"}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">
                    Предмет: {quiz.category}
                  </p>
                </div>
                <button className="mt-6 w-full bg-brand text-white font-bold hover:bg-brand-hover py-2.5 px-4 rounded-xl transition-colors cursor-pointer text-xs">
                  Детальніше
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-foreground-muted text-base font-medium">
            Нічого не знайдено за вашим запитом
          </div>
        )}
      </section>

      <div className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center">
        <div className="pointer-events-none opacity-0 translate-y-2 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 mb-2.5 rounded-xl bg-brand-soft px-3.5 py-1.5 text-xs font-bold text-brown border border-outline-hover shadow-md whitespace-nowrap relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-brand-soft">
          Створіть свій квіз
        </div>

        <button
          aria-label="Створити свій квіз"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-shadow transition-all duration-300 ease-out hover:bg-brand-hover hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer border border-brand-hover"
          onClick={() => {
            navigation("new");
          }}
        >
          <Plus className="h-7 w-7 transition-transform duration-300 ease-out group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
}