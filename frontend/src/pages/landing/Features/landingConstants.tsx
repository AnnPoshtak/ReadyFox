import {
    Gamepad2,
    Trophy,
    BarChart3,
    PenTool,
    Zap,
    GraduationCap,
    Users,
    CheckCircle2
} from "lucide-react";

export const FEATURES_LIST = [
    {
        icon: Gamepad2,
        title: "Квізи у реальному часі",
        description: "Приєднуйтесь до гри за 6-значним кодом без довгої реєстрації. Вводь код і одразу в бій!",
        badge: "Швидкий старт",
        color: "text-brand bg-brand-soft",
    },
    {
        icon: Trophy,
        title: "Гейміфікація та рейтинги",
        description: "Заробляйте бали за швидкі та правильні відповіді, піднімайтеся в загальному топі та змагайтеся з друзями.",
        badge: "Мотивація",
        color: "text-orange-dark bg-peach/60",
    },
    {
        icon: BarChart3,
        title: "Детальна статистика",
        description: "Відстежуйте свій прогрес, аналізуйте помилки та дивіться, які теми потребують додаткової уваги.",
        badge: "Аналітика",
        color: "text-brand bg-brand-soft",
    },
    {
        icon: PenTool,
        title: "Зручний конструктор",
        description: "Створюйте власні інтерактивні тести за декілька хвилин. Додавайте зображення, таймери та різні типи питань.",
        badge: "Для авторів",
        color: "text-orange-dark bg-peach/60",
    },
    {
        icon: Zap,
        title: "Миттєвий зворотний зв'язок",
        description: "Дізнавайтеся правильну відповідь одразу після кожного питання з роз'ясненнями від викладача.",
        badge: "Без затримок",
        color: "text-brand bg-brand-soft",
    },
    {
        icon: Users,
        title: "Командні режими",
        description: "Проходьте квізи самостійно або влаштовуйте групові турніри прямо на уроці чи під час відпочинку.",
        badge: "Фан",
        color: "text-orange-dark bg-peach/60",
    },
];

export const FOR_STUDENTS_LIST = [
    "Проходь квізи без нудної теорії",
    "Змагайся з одногрупниками чи друзями",
    "Зберігай свій прогрес",
    "Вчися у будь-якому місці"
];

export const FOR_TEACHERS_LIST = [
    "Створюй власні квізи за кілька хвилин",
    "Отримуй миттєві звіти за результатами групи",
    "Підвищуй залученість студентів на уроках",
    "Автоматична перевірка відповідей"
];