export interface Option {
  id: string | number;
  label: string;
}

export interface GroupedOption {
  category: string;
  items: Option[];
}

export const SUBJECT_OPTIONS: GroupedOption[] = [
  {
    category: "Загальні",
    items: [
      { id: "all", label: "Усі предмети" },
    ],
  },
  {
    category: "Початкова школа",
    items: [
      { id: "read_elem", label: "Читання" },
      { id: "write_elem", label: "Письмо" },
      { id: "math_elem", label: "Математика" },
      { id: "nature_elem", label: "Природознавство" },
      { id: "art_elem", label: "Образотворче мистецтво" },
      { id: "music_elem", label: "Музичне мистецтво" },
      { id: "labor_elem", label: "Трудове навчання" },
      { id: "pe_elem", label: "Фізична культура" },
      { id: "english_elem", label: "Англійська мова" },
    ],
  },
  {
    category: "Мови та література",
    items: [
      { id: "ukr_lang", label: "Українська мова" },
      { id: "ukr_lit", label: "Українська література" },
      { id: "world_lit", label: "Зарубіжна література" },
      { id: "english", label: "Англійська мова" },
      { id: "german", label: "Німецька мова" },
      { id: "french", label: "Французька мова" },
      { id: "spanish", label: "Іспанська мова" },
      { id: "polish", label: "Польська мова" },
    ],
  },
  {
    category: "Математика та IT",
    items: [
      { id: "math", label: "Математика" },
      { id: "algebra", label: "Алгебра" },
      { id: "geometry", label: "Геометрія" },
      { id: "math_analysis", label: "Алгебра і початки аналізу" },
      { id: "info", label: "Інформатика" },
      { id: "robotics", label: "Робототехніка" },
    ],
  },
  {
    category: "Природничі науки",
    items: [
      { id: "physics", label: "Фізика" },
      { id: "chemistry", label: "Хімія" },
      { id: "biology", label: "Біологія" },
      { id: "ecology", label: "Екологія" },
      { id: "geography", label: "Географія" },
      { id: "astronomy", label: "Астрономія" },
      { id: "natural_science", label: "Природничі науки" },
    ],
  },
  {
    category: "Суспільні науки та право",
    items: [
      { id: "history_ukr", label: "Історія України" },
      { id: "world_history", label: "Всесвітня історія" },
      { id: "jurisprudence", label: "Правознавство" },
      { id: "civic_edu", label: "Громадянська освіта" },
      { id: "ethics", label: "Етика" },
      { id: "economics", label: "Економіка" },
      { id: "financial_literacy", label: "Фінансова грамотність" },
      { id: "media_literacy", label: "Медіаграмотність" },
    ],
  },
  {
    category: "Прикладні предмети та безпека",
    items: [
      { id: "health_basics", label: "Основи здоров'я" },
      { id: "labor", label: "Трудове навчання" },
      { id: "tech", label: "Технології" },
      { id: "defense", label: "Захист України" },
      { id: "pe", label: "Фізична культура" },
      { id: "life_safety", label: "Безпека життєдіяльності" },
    ],
  },
  {
    category: "Мистецтво та культура",
    items: [
      { id: "visual_art", label: "Образотворче мистецтво" },
      { id: "music_art", label: "Музичне мистецтво" },
      { id: "art_culture", label: "Художня культура" },
      { id: "art", label: "Мистецтво" },
      { id: "drawing", label: "Креслення" },
    ],
  },
];