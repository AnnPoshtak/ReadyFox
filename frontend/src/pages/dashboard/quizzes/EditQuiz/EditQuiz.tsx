import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Check, Clock, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { SUBJECT_OPTIONS, type Option } from "@/constants/subjects";
import { quizzesApi } from "@/api/services/quizzes";

interface LocalOption {
    id: string | number;
    text: string;
    isCorrect: boolean;
}

interface LocalQuestion {
    id: string;
    questionText: string;
    options: LocalOption[];
}

export default function EditQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [selectedSubject, setSelectedSubject] = useState<Option | null>(null);
    const [timeToRead, setTimeToRead] = useState<number>(5);
    const [timeToPass, setTimeToPass] = useState<number>(15);
    const [questions, setQuestions] = useState<LocalQuestion[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchQuiz = async () => {
            try {
                const data = await quizzesApi.findOne(+id);
                setTitle(data.title || "");
                setSelectedSubject(SUBJECT_OPTIONS.find((opt) => opt.id === data.subjectId) || null);
                setTimeToRead(data.timeToRead || 5);
                setTimeToPass(data.timeToPass || 15);

                if (Array.isArray(data.questions)) {
                    const formattedQuestions = data.questions.map((q: any) => ({
                        id: q.id ? String(q.id) : crypto.randomUUID(),
                        questionText: q.questionText || "",
                        options: Array.isArray(q.options)
                            ? q.options.map((opt: any) => ({
                                id: opt.id ? String(opt.id) : crypto.randomUUID(),
                                text: opt.text || "",
                                isCorrect: Boolean(opt.isCorrect),
                            }))
                            : [],
                    }));
                    setQuestions(formattedQuestions);
                }
            } catch (err) {
                setError("Не вдалося завантажити дані квізу.");
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                questionText: "",
                options: [
                    { id: crypto.randomUUID(), text: "", isCorrect: true },
                    { id: crypto.randomUUID(), text: "", isCorrect: false },
                ],
            },
        ]);
    };

    const handleRemoveQuestion = (qId: string) => {
        if (questions.length <= 1) {
            setError("Квіз повинен містити хоча б одне запитання.");
            return;
        }
        setError(null);
        setQuestions((prev) => prev.filter((q) => q.id !== qId));
    };

    const handleQuestionTextChange = (qId: string, text: string) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === qId ? { ...q, questionText: text } : q))
        );
    };

    const handleAddOption = (qId: string) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== qId) return q;
                return {
                    ...q,
                    options: [...q.options, { id: crypto.randomUUID(), text: "", isCorrect: false }],
                };
            })
        );
    };

    const handleRemoveOption = (qId: string, oId: string | number) => {
        const targetQuestion = questions.find((q) => q.id === qId);
        if (targetQuestion && targetQuestion.options.length <= 2) {
            setError("Запитання повинно мати щонайменше 2 варіанти відповіді.");
            return;
        }
        setError(null);

        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== qId) return q;
                const filteredOptions = q.options.filter((opt) => opt.id !== oId);
                const hasCorrect = filteredOptions.some((opt) => opt.isCorrect);

                return {
                    ...q,
                    options: filteredOptions.map((opt, oIdx) =>
                        !hasCorrect && oIdx === 0 ? { ...opt, isCorrect: true } : opt
                    ),
                };
            })
        );
    };

    const handleOptionTextChange = (qId: string, oId: string | number, text: string) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== qId) return q;
                return {
                    ...q,
                    options: q.options.map((opt) => (opt.id === oId ? { ...opt, text } : opt)),
                };
            })
        );
    };

    const handleToggleCorrect = (qId: string, oId: string | number) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== qId) return q;
                return {
                    ...q,
                    options: q.options.map((opt) => ({
                        ...opt,
                        isCorrect: opt.id === oId,
                    })),
                };
            })
        );
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!id) {
            setError("Невірний ID квізу.");
            return;
        }

        if (!title.trim()) {
            setError("Будь ласка, вкажіть назву квізу.");
            return;
        }
        if (!selectedSubject) {
            setError("Будь ласка, оберіть предмет.");
            return;
        }

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.questionText.trim()) {
                setError(`Вкажіть текст для запитання №${i + 1}.`);
                return;
            }
            for (let j = 0; j < q.options.length; j++) {
                if (!q.options[j].text.trim()) {
                    setError(`Заповніть варіант ${j + 1} у запитанні №${i + 1}.`);
                    return;
                }
            }
        }

        const payload = {
            title: title.trim(),
            category: selectedSubject.label,
            subjectId: selectedSubject.id,
            timeToRead: Number(timeToRead) || 5,
            timeToPass: Number(timeToPass) || 15,
            questions: questions.map((q, qIdx) => ({
                questionText: q.questionText.trim(),
                options: q.options.map((opt, idx) => ({
                    id: typeof opt.id === "number" ? opt.id : qIdx * 10 + idx + 1,
                    text: opt.text.trim(),
                    isCorrect: Boolean(opt.isCorrect),
                })),
            })),
        };

        try {
            await quizzesApi.update(+id, payload);
            navigate(`/dashboard/quizzes/${id}`);
        } catch (err) {
            setError("Помилка під час збереження квізу.");
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8 relative">
            <section className="text-center max-w-3xl w-full">
                <h1 className="text-3xl sm:text-5xl font-bold text-foreground flex items-center justify-center gap-3 mb-2">
                    Редагування квізу
                </h1>
                <p className="text-base sm:text-lg text-foreground-secondary">
                    Змініть інформацію нижче, щоб оновити квіз
                </p>
            </section>

            <form onSubmit={handleUpdate} className="w-full max-w-3xl flex flex-col gap-6">
                <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-foreground">Основні параметри</h2>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-foreground-secondary">
                            Назва квізу
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введіть назву квізу..."
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-brand" />
                                Час на прочитання питання (сек)
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={timeToRead}
                                onChange={(e) => setTimeToRead(Number(e.target.value))}
                                className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground h-[42px]"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-brand" />
                                Час на відповідь на питання (сек)
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={timeToPass}
                                onChange={(e) => setTimeToPass(Number(e.target.value))}
                                className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground h-[42px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-foreground">Запитання</h2>

                    {questions.map((question, qIndex) => (
                        <div
                            key={question.id}
                            className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-brown bg-brand-soft px-3 py-1 rounded-lg border border-outline-hover">
                                    Питання #{qIndex + 1}
                                </span>

                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveQuestion(question.id)}
                                        className="text-foreground-muted hover:text-danger transition-colors cursor-pointer p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                                placeholder="Текст запитання..."
                                className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
                            />

                            <div className="flex flex-col gap-2.5 mt-1">
                                <span className="text-xs font-bold text-foreground-secondary">
                                    Варіанти відповідей:
                                </span>

                                {question.options.map((option, oIndex) => (
                                    <div key={option.id} className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleCorrect(question.id, option.id)}
                                            className={`w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                                                option.isCorrect
                                                    ? "bg-success text-white border-success"
                                                    : "bg-cream text-foreground-muted border-outline hover:border-outline-hover"
                                            }`}
                                            title={option.isCorrect ? "Правильна відповідь" : "Зробити правильною"}
                                        >
                                            <Check className="w-4 h-4 stroke-[3]" />
                                        </button>

                                        <input
                                            type="text"
                                            value={option.text}
                                            onChange={(e) => handleOptionTextChange(question.id, option.id, e.target.value)}
                                            placeholder={`Варіант ${oIndex + 1}`}
                                            className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-bold text-foreground placeholder:text-foreground-muted placeholder:font-normal h-[42px]"
                                        />

                                        {question.options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(question.id, option.id)}
                                                className="text-foreground-muted hover:text-danger p-2 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => handleAddOption(question.id)}
                                    className="mt-1 self-start flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-hover transition-colors cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" /> Додати варіант
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full py-3.5 border border-dashed border-outline hover:border-brand rounded-2xl bg-surface hover:bg-surface-hover text-brand font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                        <Plus className="w-4 h-4" /> Додати ще одне запитання
                    </button>
                </div>

                {error && (
                    <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-brand text-white font-bold hover:bg-brand-hover py-3 px-4 rounded-xl transition-colors cursor-pointer text-xs flex items-center justify-center gap-2 h-[42px] shadow-sm"
                >
                    Готово <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}