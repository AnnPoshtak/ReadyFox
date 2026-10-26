import { FileText } from "lucide-react";

interface LessonGoalProps {
    goal: string;
}

export const  LessonGoal = ({ goal }: LessonGoalProps) => {
    if (!goal) return null;

    return (
        <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-3">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand" />
                Мета уроку
            </label>
            <div className="bg-cream py-3 px-4 rounded-xl text-sm font-medium text-foreground border border-outline/60 leading-relaxed">
                {goal}
            </div>
        </div>
    );
}