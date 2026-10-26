import { BookOpen } from "lucide-react";
import { MdPreview } from "md-editor-rt";

interface LessonContentProps {
    content: string;
}

export const LessonContent = ({ content }: LessonContentProps) => {
    return (
        <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-3">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand" />
                Зміст уроку
            </label>
            <div className="rounded-xl overflow-hidden">
                <MdPreview modelValue={content || ""} />
            </div>
        </div>
    );
}