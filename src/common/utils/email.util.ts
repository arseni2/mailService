/**
 * Форматирует email адрес
 * @param email - Email адрес в формате строки
 * @returns Отформатированный email или null если email некорректный
 */
export function emailUtil(email: string): string | null {
    try {
        if (!email) return null;

        // Очищаем от пробелов
        const cleaned = email.trim().toLowerCase();
        if (!emailUtil.valid(cleaned)) return null;

        return cleaned;
    } catch {
        return null;
    }
}

// Добавляем метод для проверки валидности email
emailUtil.valid = function(email: string): boolean {
    try {
        if (!email) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
    } catch {
        return false;
    }
};

// Добавляем метод для получения ссылки mailto:
emailUtil.href = function(email: string): string | null {
    try {
        if (!email) return null;
        const cleaned = email.trim().toLowerCase();
        if (!emailUtil.valid(cleaned)) return null;
        return `mailto:${cleaned}`;
    } catch {
        return null;
    }
};
