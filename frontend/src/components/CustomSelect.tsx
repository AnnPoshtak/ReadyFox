import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, type LucideIcon } from 'lucide-react';

interface Option {
  id: string | number;
  label: string;
}

interface GroupedOption {
  category: string;
  items: Option[];
}

interface CustomSelectProps {
  options: GroupedOption[];
  value: Option | null;
  onChange: (value: Option) => void;
  label: string;
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Оберіть зі списку...",
  icon: Icon,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative pt-2 w-full font-sans ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <span className="absolute top-0 left-3 bg-surface px-1 text-[9px] font-black text-foreground-muted uppercase z-10 tracking-widest rounded">
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-3 bg-background-secondary rounded-xl text-xs font-bold text-foreground border border-outline hover:border-outline-hover outline-none transition-all text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon size={16} className="text-brand shrink-0" />}
          <span className={`truncate ${!value ? 'text-foreground-muted font-normal' : ''}`}>
            {value?.label || placeholder}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-72 bg-surface rounded-2xl shadow-lg border border-outline p-1.5 overflow-y-auto">
          {options.map((group) => (
            <div key={group.category} className="mb-2 last:mb-0">
              <div className="px-3 py-1 text-[10px] font-black text-foreground-muted uppercase tracking-wider bg-background-secondary/60 rounded-lg mb-1">
                {group.category}
              </div>
              {group.items.map((option) => {
                const isSelected = value?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full flex items-center justify-between py-2 px-3 rounded-xl transition-colors mb-0.5 last:mb-0 text-left cursor-pointer
                      ${isSelected ? 'bg-brand-soft text-brand font-black' : 'text-foreground hover:bg-surface-hover font-medium'}
                    `}
                  >
                    <span className="block truncate text-xs">
                      {option.label}
                    </span>
                    {isSelected && (
                      <Check size={14} className="text-brand shrink-0" strokeWidth={3} />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;