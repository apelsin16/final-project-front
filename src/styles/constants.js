// Design System Constants для проекту Foodies
// Прості константи для початківців

// COLORS - Кольори з Figma
export const COLORS = {
    // Основні кольори
    BLACK: '#050505',
    DARK_GRAY: '#1A1A1A',
    LIGHT_GRAY: '#BFBEBE',
    WHITE: '#FFFFFF',

    // Аліаси для зручності
    PRIMARY: '#050505', // Основний чорний
    SECONDARY: '#1A1A1A', // Темно-сірий
    MUTED: '#BFBEBE', // Світло-сірий
    BACKGROUND: '#FFFFFF', // Білий фон
};

// FONTS - Шрифти
export const FONTS = {
    FAMILY: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    WEIGHT: {
        NORMAL: 400,
        MEDIUM: 500,
        SEMIBOLD: 600,
        BOLD: 700,
    },
};

// FONT SIZES - Розміри шрифтів
export const FONT_SIZES = {
    SMALL: '14px',
    MEDIUM: '16px',
    LARGE: '18px',
    XL: '24px',
    XXL: '32px',
    TITLE: '48px',
};

// SPACING - Відступи та розміри
export const SPACING = {
    XS: '4px',
    SM: '8px',
    MD: '16px',
    LG: '24px',
    XL: '32px',
    XXL: '48px',
    XXXL: '64px',
};

// BORDER RADIUS - Закруглення
export const BORDER_RADIUS = {
    SMALL: '8px',
    MEDIUM: '12px',
    LARGE: '16px',
    PILL: '50px', // Для кнопок
    CIRCLE: '50%', // Для аватарів
};

// BUTTON SIZES - Розміри кнопок
export const BUTTON_SIZES = {
    SMALL: {
        PADDING: '8px 20px',
        HEIGHT: '36px',
        FONT_SIZE: '14px',
    },
    MEDIUM: {
        PADDING: '12px 32px',
        HEIGHT: '48px',
        FONT_SIZE: '16px',
    },
    LARGE: {
        PADDING: '16px 40px',
        HEIGHT: '56px',
        FONT_SIZE: '18px',
    },
};

// SHADOWS - Тіні (якщо будуть потрібні)
export const SHADOWS = {
    LIGHT: '0 2px 8px rgba(0, 0, 0, 0.1)',
    MEDIUM: '0 4px 12px rgba(0, 0, 0, 0.15)',
    HEAVY: '0 8px 24px rgba(0, 0, 0, 0.2)',
};

// BREAKPOINTS - Адаптив
export const BREAKPOINTS = {
    MOBILE: '375px', // Адаптивна верстка з 375px (гумова від 320px)
    TABLET: '768px', // Планшети з 768px
    DESKTOP: '1440px', // Десктоп з 1440px
};
