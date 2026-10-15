import { type Option } from "@/constants/subjects";

interface QuizOptionProps {
    option: Option;
    isSelected: boolean;
    onSelect: (optionId: string | number) => void;
}

export function QuizOption({ option, isSelected, onSelect }: QuizOptionProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(option.id)}
            className={`group w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150 active:scale-[0.99] ${
                isSelected
                    ? "bg-brand text-foreground-inverse border-brand shadow-md"
                    : "bg-surface hover:bg-brand-subtle border-outline hover:border-outline-hover text-foreground"
            }`}
        >
            <span className="text-sm font-medium leading-snug break-words flex-1">
                {option.text}
            </span>

            <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                        ? "border-foreground-inverse bg-foreground-inverse/20"
                        : "border-outline group-hover:border-foreground-muted"
                }`}
            >
                {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground-inverse" />
                )}
            </span>
        </button>
    );
}