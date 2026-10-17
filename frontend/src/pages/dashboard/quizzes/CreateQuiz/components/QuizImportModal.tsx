import { useEffect, useState } from "react";
import { Book, Copy, Check, X } from "lucide-react";

interface TextImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (text: string) => void;
}

const PROMPT_TEMPLATE = `Створи навчальний тест для учнів [N] класу.

Предмет: [НАЗВА_ПРЕДМЕТА]
Тема: [ТЕМА]

Вимоги до тесту:
- Створи, який складається з [N] запитань
- Добирай запитання відповідно до віку, класу та рівня знань учнів.
- Зроби тест персоналізованим: враховуй специфіку предмета, особливості теми та навчальну програму відповідного класу.
- Поєднуй запитання різних типів за складністю: від перевірки базових знань до застосування матеріалу на практиці.
- Не використовуй надто очевидні, шаблонні або повторювані запитання.
- Кожне запитання має перевіряти конкретне знання або навичку з теми.
- Формулюй запитання чітко, зрозуміло та грамотно, без двозначностей.
- Кількість варіантів відповідей на кожне питання: [N] 
- У кожному запитанні має бути рівно одна правильна відповідь.
- Неправильні варіанти мають бути правдоподібними, відповідати темі та не бути абсурдними.
- Розподіляй правильні відповіді між варіантами рівномірно, наскільки це можливо. Не розташовуй їх постійно під однією літерою та уникай очевидних закономірностей.
- Познач правильну відповідь знаком плюс безпосередньо перед літерою, наприклад: +б).
- Не додавай пояснень, підказок, вступів, висновків або відповідей поза самим тестом.
- Не вигадуй фактів, правил, формул, дат чи інших навчальних відомостей. Використовуй достовірний матеріал, що відповідає зазначеній темі та класу.
- Якщо для теми характерні обчислення, задачі, аналіз тексту, робота з кодом або інші практичні завдання, за можливості включай їх до тесту.

Формат виведення:
Використовуй простий текст без Markdown, таблиць і зайвого оформлення. Тест має бути готовим до копіювання та вставлення в інший редактор.

Дотримуйся такого шаблону:

1) Текст запитання
а) Варіант відповіді 1
+б) Варіант відповіді 2
в) Варіант відповіді 3
г) Варіант відповіді 4

2) Текст запитання
а) Варіант відповіді 1
б) Варіант відповіді 2
+в) Варіант відповіді 3
г) Варіант відповіді 4

Перед відправленням обов'язково виконай внутрішню перевірку всього тесту:
1. Переконайся, що кількість запитань становить [N]
2. Перевір, що кожне запитання має рівно [N] варіанти відповіді.
3. Перевір правильність кожної позначеної відповіді за достовірними знаннями з предмета.
4. Переконайся, що кожне запитання має лише одну правильну відповідь, а інші варіанти справді неправильні.
5. Перевір відсутність помилок у фактах, обчисленнях, формулах, правописі та формулюваннях.
6. Переконайся, що запитання відповідають зазначеному класу й темі, а складність тесту доречна для учнів.
7. Перевір правильність нумерації, форматування та позначення відповідей.
8. Переконайся, що правильні відповіді не утворюють очевидної закономірності.

Якщо знайдеш помилку або недолік, виправ їх до відправлення. Надсилай лише остаточний, перевірений тест.

ВАЖЛИВА ПЕРЕВІРКА ПЕРЕД СТВОРЕННЯМ ТЕСТУ

Перед початком генерації обов'язково перевір, чи заповнені всі п'ять обов'язкових параметрів:

Клас учнів.

Назва предмета.

Тема тесту.

Кількість запитань.

Кількість варіантів відповідей на кожне запитання.

Якщо хоча б одне поле порожнє, містить незамінений шаблонний маркер (наприклад, [N] або [ТЕМА]) чи має некоректне значення, НЕ створюй тест.

Натомість коротко повідом, яких саме даних бракує або які значення потрібно виправити. Наприклад:
«Не вдалося створити тест. Будь ласка, вкажи тему тесту та кількість запитань».

Не намагайся самостійно вгадувати відсутні значення, підставляти значення за замовчуванням або створювати тест лише на основі частини параметрів.

Якщо всі п'ять параметрів заповнені коректно, переходь до створення тесту та виконай усі зазначені вимоги й перевірки перед його відправленням.`;

export const TextImportModal = ({
  isOpen,
  onClose,
  onImport,
}: TextImportModalProps) => {
  const [pastedText, setPastedText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(PROMPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!pastedText.trim()) return;
    onImport(pastedText);
    setPastedText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-surface border border-outline rounded-2xl p-6 sm:p-7 shadow-2xl z-10 flex flex-col gap-5 animate-in zoom-in-95 fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
            <Book className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground leading-snug">
              Швидкий імпорт тесту
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-cream p-4 rounded-xl border border-outline">
          <p className="text-xs font-medium text-foreground-secondary leading-relaxed">
            Скопіюйте промт для ШІ, згенеруйте тест у будь-якій нейромережі та вставте отриманий текст у поле нижче:
          </p>
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-surface hover:bg-surface-hover text-brand border border-outline rounded-lg text-xs font-bold transition-all cursor-pointer self-start"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-success" /> Промт скопійовано!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Скопіювати промт для ШІ
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-foreground-secondary">
            Вставте готовий текст тесту сюди:
          </label>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={8}
            placeholder={`1. Що таке моральний вибір?\na) Варіант 1\n+б) Правильний вариант\nв) Варіант 3\nг) Варіант 4`}
            className="bg-cream py-3 px-4 rounded-xl w-full outline-none border border-outline focus:border-brand transition-colors text-xs font-medium text-foreground placeholder:text-foreground-muted resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-foreground-secondary hover:text-foreground hover:bg-outline/40 transition-all duration-150 cursor-pointer"
          >
            Скасувати
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!pastedText.trim()}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold bg-brand text-white hover:bg-brand-hover active:bg-brand-active transition-all duration-150 shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Імпортувати питання
          </button>
        </div>
      </div>
    </div>
  );
};