# Style Constants - Константи стилів

Файл з константами стилів для проекту Foodies. Тут знаходяться всі основні значення дизайн-системи.

## 📁 Файли

-   `constants.js` - основні константи дизайн-системи

## 🎨 Як використовувати

### В CSS модулях

```css
/* Замість хардкоженних значень */
.button {
    background-color: #050505; /* ❌ Погано */
    padding: 12px 32px; /* ❌ Погано */
    border-radius: 50px; /* ❌ Погано */
}

/* Використовуй змінні з constants.js в коментарях */
.button {
    background-color: #050505; /* COLORS.PRIMARY */
    padding: 12px 32px; /* BUTTON_SIZES.MEDIUM.PADDING */
    border-radius: 50px; /* BORDER_RADIUS.PILL */
}
```

### В JavaScript/JSX

```jsx
import { COLORS, SPACING, FONT_SIZES } from '@/styles/constants';

// Інлайн стилі
const styles = {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.MD,
    fontSize: FONT_SIZES.MEDIUM,
};

// В компоненті
<div style={styles}>Content</div>;
```

## 🎯 Доступні константи

### COLORS - Кольори

```js
COLORS.BLACK; // #050505 - основний чорний
COLORS.DARK_GRAY; // #1A1A1A - темно-сірий
COLORS.LIGHT_GRAY; // #BFBEBE - світло-сірий
COLORS.WHITE; // #FFFFFF - білий

// Аліаси
COLORS.PRIMARY; // #050505 - основний колір
COLORS.SECONDARY; // #1A1A1A - вторинний колір
COLORS.MUTED; // #BFBEBE - приглушений колір
COLORS.BACKGROUND; // #FFFFFF - колір фону
```

### FONT_SIZES - Розміри шрифтів

```js
FONT_SIZES.SMALL; // 14px
FONT_SIZES.MEDIUM; // 16px
FONT_SIZES.LARGE; // 18px
FONT_SIZES.XL; // 24px
FONT_SIZES.XXL; // 32px
FONT_SIZES.TITLE; // 48px
```

### SPACING - Відступи

```js
SPACING.XS; // 4px
SPACING.SM; // 8px
SPACING.MD; // 16px
SPACING.LG; // 24px
SPACING.XL; // 32px
SPACING.XXL; // 48px
SPACING.XXXL; // 64px
```

### BORDER_RADIUS - Закруглення

```js
BORDER_RADIUS.SMALL; // 8px
BORDER_RADIUS.MEDIUM; // 12px
BORDER_RADIUS.LARGE; // 16px
BORDER_RADIUS.PILL; // 50px - для кнопок
BORDER_RADIUS.CIRCLE; // 50% - для аватарів
```

### BUTTON_SIZES - Розміри кнопок

```js
BUTTON_SIZES.SMALL.PADDING; // 8px 20px
BUTTON_SIZES.SMALL.HEIGHT; // 36px
BUTTON_SIZES.SMALL.FONT_SIZE; // 14px

BUTTON_SIZES.MEDIUM.PADDING; // 12px 32px
BUTTON_SIZES.MEDIUM.HEIGHT; // 48px
BUTTON_SIZES.MEDIUM.FONT_SIZE; // 16px

BUTTON_SIZES.LARGE.PADDING; // 16px 40px
BUTTON_SIZES.LARGE.HEIGHT; // 56px
BUTTON_SIZES.LARGE.FONT_SIZE; // 18px
```

## 📱 Breakpoints - Адаптив

```js
BREAKPOINTS.MOBILE; // 768px
BREAKPOINTS.TABLET; // 1024px
BREAKPOINTS.DESKTOP; // 1440px
```

## ✅ Правила використання

1. **Завжди використовуй константи** замість хардкоженних значень
2. **Коментуй в CSS** яку константу використовуєш
3. **Не змінюй константи** без узгодження з командою
4. **Додавай нові константи** якщо потрібні повторювані значення

## 🔄 Як додати нову константу

1. Відкрий `constants.js`
2. Додай нове значення в відповідну секцію
3. Оновлюй цю документацію
4. Повідом команду про зміни

## 🎨 Приклади компонентів

### Кнопка з константами

```jsx
import { COLORS, BORDER_RADIUS, BUTTON_SIZES } from '@/styles/constants';

const buttonStyle = {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.PILL,
    padding: BUTTON_SIZES.MEDIUM.PADDING,
    fontSize: BUTTON_SIZES.MEDIUM.FONT_SIZE,
};
```

### Карточка з константами

```jsx
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/styles/constants';

const cardStyle = {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.MEDIUM,
    boxShadow: SHADOWS.LIGHT,
    marginBottom: SPACING.MD,
};
```
