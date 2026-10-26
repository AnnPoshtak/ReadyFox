export const formatErrorMessage = (message: unknown): string => {
    const rawMessage = Array.isArray(message) ? message[0] : message;
    const text = typeof rawMessage === "string" ? rawMessage.trim() : "";

    if (!text) {
        return "Помилка авторизації. Перевірте дані.";
    }

    const normalized = text.toLowerCase();

    if (normalized.includes("email") && normalized.includes("password")) {
        return "Невірний email або пароль.";
    }

    if (normalized.includes("already exists") || normalized.includes("вже існує")) {
        return "Користувач з таким email вже існує.";
    }

    if (normalized.includes("access denied") || normalized.includes("доступ заборонено")) {
        return "Доступ заборонено.";
    }

    if (normalized.includes("not found") || normalized.includes("не знайдено")) {
        return "Користувача не знайдено.";
    }

    if (normalized.includes("validation") || normalized.includes("must be")) {
        return "Перевірте правильність введених даних.";
    }

    return text;
};