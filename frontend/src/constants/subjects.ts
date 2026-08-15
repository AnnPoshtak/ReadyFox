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
    items: [{ id: "all", label: "Усі предмети" }],
  },
  {
    category: "Початкова школа (1-4 класи)",
    items: [
      { id: "ya_i_svit", label: "Я досліджую світ (ЯДС)" },
      { id: "read_elem", label: "Навчання грамоти / Читання" },
      { id: "math_elem", label: "Математика (початкова)" },
      { id: "art_elem", label: "Образотворче мистецтво" },
      { id: "music_elem", label: "Музичне мистецтво" },
      { id: "design_tech_elem", label: "Дизайн і технології" },
      { id: "pe_elem", label: "Фізична культура" },
    ],
  },
  {
    category: "Мовно-літературна галузь",
    items: [
      { id: "ukr_lang", label: "Українська мова" },
      { id: "ukr_lit", label: "Українська література" },
      { id: "ukr_integrated", label: "Українська мова та література (інтегрований)" },
      { id: "world_lit", label: "Зарубіжна література (Світова)" },
      { id: "foreign_lang", label: "Іноземна мова (загальна)" },
      { id: "english", label: "Англійська мова" },
      { id: "german", label: "Німецька мова" },
      { id: "french", label: "Французька мова" },
      { id: "spanish", label: "Іспанська мова" },
      { id: "poland_lang", label: "Польська мова" },
      { id: "minority_lang", label: "Мова та література національних меншин" },
    ],
  },
  {
    category: "Математична та інформатична галузі",
    items: [
      { id: "math", label: "Математика (загальна)" },
      { id: "algebra", label: "Алгебра" },
      { id: "geometry", label: "Геометрія" },
      { id: "math_analysis", label: "Початкі аналізу / Алгебра і початки аналізу" },
      { id: "info", label: "Інформатика / Цифрова грамотність" },
      { id: "robotics", label: "Робототехніка / STEM" },
    ],
  },
  {
    category: "Природнича галузь",
    items: [
      { id: "nature", label: "Природознавство (класичне)" },
      { id: "nat_sci", label: "Природничі науки (інтегрований курс)" },
      { id: "physics", label: "Фізика" },
      { id: "chemistry", label: "Хімія" },
      { id: "biology", label: "Біологія" },
      { id: "biology_ecology", label: "Біологія і екологія" },
      { id: "geography", label: "Географія" },
      { id: "astronomy", label: "Астрономія" },
    ],
  },
  {
    category: "Суспільна та історична галузь",
    items: [
      { id: "history_ukr", label: "Історія України" },
      { id: "world_history", label: "Всесвітня історія" },
      { id: "history_integrated", label: "Історія: Україна і світ (інтегрований)" },
      { id: "history_elem", label: "Вступ до історії України та громадянської освіти" },
      { id: "civic_edu", label: "Громадянська освіта" },
      { id: "jurisprudence", label: "Правознавство" },
      { id: "ethics", label: "Етика / Курси духовно-морального спрямування" },
      { id: "pfg", label: "Підприємництво і фінансова грамотність (ПФГ)" },
      { id: "philosophy", label: "Людина і суспільство" },
    ],
  },
  {
    category: "Соціальна, здоров’язбережувальна та технологічна галузі",
    items: [
      { id: "zbd", label: "Здоров’я, безпека та добробут (ЗБД)" },
      { id: "health_basics", label: "Основи здоров'я (класичний)" },
      { id: "labor", label: "Трудове навчання" },
      { id: "tech", label: "Технології" },
      { id: "defense", label: "Захист України (Захист Вітчизни)" },
      { id: "pe", label: "Фізична культура" },
    ],
  },
  {
    category: "Мистецька галузь",
    items: [
      { id: "art_integrated", label: "Мистецтво (інтегрований курс)" },
      { id: "visual_art", label: "Образотворче мистецтво" },
      { id: "music_art", label: "Музичне мистецтво" },
      { id: "art_culture", label: "Художня культура" },
      { id: "aesthetics", label: "Естетика / Культурологія" },
    ],
  },
];