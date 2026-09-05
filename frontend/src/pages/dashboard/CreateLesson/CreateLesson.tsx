import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, BookOpen, AlertCircle, ArrowRight, Clock3, FileText, Link2 } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";
import { quizzesApi } from "@/api/services/quizzes";
import type { Quiz } from "@/api/types";

interface LocalResource {
  title: string;
  url: string;
}

export default function CreateLesson() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Option | null>(null);
  const [goal, setGoal] = useState("");
  const [content, setContent] = useState("");
  const [mainMediaType, setMainMediaType] = useState<"NONE" | "PRESENTATION" | "VIDEO">("NONE");
  const [mainMediaUrl, setMainMediaUrl] = useState("");
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [quizSearch, setQuizSearch] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [additionalResources, setAdditionalResources] = useState<LocalResource[]>([
    { title: "", url: "" },
  ]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizzesApi.findAll();
        setAvailableQuizzes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
  }, []);

  const matchingQuizzes = availableQuizzes.filter((quiz) => {
    const query = quizSearch.trim().toLowerCase();
    if (!query) return true;
    return quiz.title.toLowerCase().includes(query);
  });

  const handleAddResource = () => {
    setAdditionalResources([...additionalResources, { title: "", url: "" }]);
  };

  const handleRemoveResource = (index: number) => {
    if (additionalResources.length <= 1) {
      setError("Урок повинен мати хоча б один додатковий ресурс або залишити поле порожнім.");
      return;
    }
    setError(null);
    setAdditionalResources(additionalResources.filter((_, idx) => idx !== index));
  };

  const handleResourceChange = (index: number, field: "title" | "url", value: string) => {
    const updated = [...additionalResources];
    updated[index][field] = value;
    setAdditionalResources(updated);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Будь ласка, вкажіть назву уроку.");
      return;
    }

    if (!selectedSubject) {
      setError("Будь ласка, оберіть предмет.");
      return;
    }

    if (!goal.trim()) {
      setError("Вкажіть мету уроку.");
      return;
    }

    if (!content.trim()) {
      setError("Заповніть зміст уроку.");
      return;
    }

    if (mainMediaType !== "NONE" && !mainMediaUrl.trim()) {
      setError("Додайте посилання на основний медіа-матеріал, якщо обрано тип медіа.");
      return;
    }

    const filteredResources = additionalResources
      .filter((resource) => resource.title.trim() || resource.url.trim())
      .map((resource) => ({
        title: resource.title.trim(),
        url: resource.url.trim(),
      }));

    const payload = {
      title: title.trim(),
      category: selectedSubject.label,
      goal: goal.trim(),
      content: content.trim(),
      mainMediaType,
      mainMediaUrl: mainMediaType === "NONE" ? undefined : mainMediaUrl.trim(),
      additionalResources: filteredResources,
      quizId: selectedQuizId ?? undefined,
    };

    navigate("/dashboard/lessons/rules", { state: { lessonData: payload } });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
      <section className="text-center max-w-3xl w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground flex items-center justify-center gap-3 mb-2">
          Створити урок
        </h1>
        <p className="text-base sm:text-lg text-foreground-secondary">
          Додайте навчальний матеріал, мету та зміст для вашого уроку
        </p>
      </section>

      <form onSubmit={handleNext} className="w-full max-w-4xl flex flex-col gap-6">
        <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground">Основна інформація</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground-secondary">
              Назва уроку
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введіть назву уроку..."
              className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <CustomSelect
              options={SUBJECT_OPTIONS}
              value={selectedSubject}
              onChange={(val) => setSelectedSubject(val)}
              label="Предмет"
              placeholder="Оберіть предмет..."
              icon={BookOpen}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand" />
              Мета уроку
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
              placeholder="Яку мету ви ставите перед учнями?"
              className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-brand" />
              Зміст уроку
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Напишіть теоретичну частину, пояснення та інформацію уроку..."
              className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal resize-none"
            />
          </div>
        </div>

        <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold text-foreground">Медіа та ресурси</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-brand" />
              Прикріпити існуючий квіз
            </label>
            <input
              type="text"
              value={quizSearch}
              onChange={(e) => {
                const nextValue = e.target.value;
                setQuizSearch(nextValue);

                const matched = availableQuizzes.find(
                  (quiz) => quiz.title.toLowerCase() === nextValue.trim().toLowerCase(),
                );

                if (matched) {
                  setSelectedQuizId(matched.id);
                } else if (!nextValue.trim()) {
                  setSelectedQuizId(null);
                }
              }}
              placeholder="Почніть вводити назву квізу..."
              list="quiz-search-options"
              className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
            />
            <datalist id="quiz-search-options">
              {matchingQuizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.title} />
              ))}
            </datalist>
            {selectedQuizId && (
              <p className="text-[11px] text-foreground-secondary">
                Обрано: {availableQuizzes.find((quiz) => quiz.id === selectedQuizId)?.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                <Clock3 className="w-4 h-4 text-brand" />
                Тип основного медіа
              </label>
              <select
                value={mainMediaType}
                onChange={(e) => setMainMediaType(e.target.value as "NONE" | "PRESENTATION" | "VIDEO")}
                className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground h-[42px]"
              >
                <option value="NONE">Без медіа</option>
                <option value="PRESENTATION">Презентація</option>
                <option value="VIDEO">Відео</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-foreground-secondary">
                Посилання на медіа
              </label>
              <input
                type="url"
                value={mainMediaUrl}
                onChange={(e) => setMainMediaUrl(e.target.value)}
                placeholder="https://..."
                className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Додаткові ресурси</h3>
              <button
                type="button"
                onClick={handleAddResource}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-soft text-brand font-bold text-xs border border-outline hover:bg-brand/10 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Додати
              </button>
            </div>

            {additionalResources.map((resource, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 items-end">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-foreground-secondary">Назва</label>
                  <input
                    type="text"
                    value={resource.title}
                    onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                    placeholder="Наприклад: Енциклопедія історії"
                    className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-foreground-secondary">Посилання</label>
                  <input
                    type="url"
                    value={resource.url}
                    onChange={(e) => handleResourceChange(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveResource(index)}
                  className="h-[42px] px-3 rounded-xl border border-outline text-foreground-muted hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Видалити ресурс"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="w-full bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-hover transition-all cursor-pointer"
          >
            Далі
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
