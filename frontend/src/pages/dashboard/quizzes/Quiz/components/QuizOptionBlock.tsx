import { QuizOption } from "./QuizOption";

interface QuestionOption {
    id: string | number;
    text: string;
}

interface QuizOptionsListProps {
    options: QuestionOption[];
    selectedAnswerId?: string | number;
    onSelectOption: (optionId: string | number) => void;
}

export function QuizOptionsList({ options, selectedAnswerId, onSelectOption }: QuizOptionsListProps) {
    return (
        <div className="w-full flex flex-col gap-2.5 overflow-y-auto pr-1 custom-scrollbar">
            {options.map((option) => (
                <QuizOption
                    key={option.id}
                    option={option}
                    isSelected={selectedAnswerId === option.id}
                    onSelect={onSelectOption}
                />
            ))}
        </div>
    );
}