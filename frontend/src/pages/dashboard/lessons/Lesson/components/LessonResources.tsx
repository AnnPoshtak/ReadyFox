import { Paperclip, ExternalLink } from "lucide-react";

export interface AdditionalResource {
    title: string;
    url: string;
}

interface LessonResourcesProps {
    resources?: AdditionalResource[];
}

export const LessonResources = ({ resources }: LessonResourcesProps) => {
    if (!resources || resources.length === 0) return null;

    return (
        <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-outline shadow-sm flex flex-col gap-3">
            <label className="text-xs font-bold text-foreground-secondary flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-brand" />
                Додаткові матеріали та ресурси
            </label>
            <div className="flex flex-col gap-2.5 pt-1">
                {resources.map((res, index) => (
                    <a
                        key={index}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-outline/70 bg-background hover:border-brand/50 hover:bg-brand/5 transition-all duration-200"
                    >
                        <span className="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                            {res.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-foreground-muted group-hover:text-brand transition-colors shrink-0 ml-2" />
                    </a>
                ))}
            </div>
        </div>
    );
}