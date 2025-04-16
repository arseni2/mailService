/**
 * Форматирует телефонный номер
 * @param phone - Номер телефона в формате строки
 * @returns Отформатированный номер или null если номер некорректный
 */
export function phoneUtil(phone: string): string | null {
    try {
        if (!phone) return null;

        // Очищаем от всех символов кроме цифр
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

        if (match) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }

        return null;
    } catch {
        return null;
    }
}


// Добавляем метод для проверки валидности телефона
phoneUtil.valid = function (phone: string): boolean {
    try {
        if (!phone) return false;
        const cleaned = phone.replace(/\D/g, '');
        return /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/.test(cleaned);
    } catch {
        return false;
    }
};

// Добавляем метод для получения ссылки tel:
phoneUtil.href = function (phone: string): string | null {
    try {
        if (!phone) return null;
        return `tel:+${phone.replace(/\D/g, '')}`;
    } catch {
        return null;
    }
};