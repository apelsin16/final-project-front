# CSS Переменные Проекта Foodies

Простий гайд по використанню CSS змінних для початківців.

## Що це таке?

CSS змінні (Custom Properties) - це спосіб зберігати значення, які можна використовувати по всьому проекту. Це робить код більш організованим і легким для змін.

## Як використовувати?

Щоб використати змінну, пишіть `var(--назва-змінної)`:

```css
/* Приклад */
.my-button {
    color: var(--color-black); /* Замість color: #050505; */
    font-size: var(--font-size-medium); /* Замість font-size: 16px; */
    padding: var(--spacing-md); /* Замість padding: 16px; */
}
```

## Доступні змінні

### 🎨 Кольори

-   `--color-black` - основний чорний (#050505)
-   `--color-dark` - темно-сірий (#1A1A1A)
-   `--color-light` - світло-сірий (#BFBEBE)
-   `--color-white` - білий (#FFFFFF)

### 🔤 Шрифти

-   `--font-family-main` - основний шрифт (Mulish + fallback)
-   `--font-weight-medium` - середня вага (500)
-   `--font-weight-bold` - жирний (700)
-   `--font-weight-extra-bold` - дуже жирний (800)

### 📝 Розміри шрифтів

-   `--font-size-small` - мелкий текст (14px)
-   `--font-size-medium` - звичайний текст (16px)
-   `--font-size-large` - крупний текст (18px)
-   `--font-size-title` - заголовки (24px)
-   `--font-size-hero` - головні заголовки (48px)

### 📏 Відступи

-   `--spacing-xs` - дуже маленькі (8px)
-   `--spacing-sm` - маленькі (12px)
-   `--spacing-md` - звичайні (16px)
-   `--spacing-lg` - великі (24px)
-   `--spacing-xl` - дуже великі (32px)

### 🔄 Скруглення

-   `--border-radius-small` - маленькі скруглення (8px)
-   `--border-radius-button` - скруглення кнопок (50px)

### 🌚 Тіні

-   `--shadow-light` - легка тінь
-   `--shadow-medium` - помітна тінь

## Приклади використання

### Створення кнопки

```css
.my-button {
    background-color: var(--color-black);
    color: var(--color-white);
    font-family: var(--font-family-main);
    font-weight: var(--font-weight-bold);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-button);
    font-size: var(--font-size-medium);
}
```

### Створення карточки

```css
.recipe-card {
    background-color: var(--color-white);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-small);
    box-shadow: var(--shadow-light);
}
```

### Створення заголовка

```css
.page-title {
    color: var(--color-black);
    font-family: var(--font-family-main);
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-extra-bold);
    margin-bottom: var(--spacing-xl);
}
```

## Важливо! ⚠️

1. **Завжди використовуй змінні замість хардкоду:**

    ```css
    /* ❌ Погано */
    color: #050505;

    /* ✅ Добре */
    color: var(--color-black);
    ```

2. **Якщо потрібного кольору/розміру немає:**

    - Спочатку подивись, чи можна використати існуючий
    - Якщо ні - додай нову змінну в `variables.css`
    - Повідом команді про зміни

3. **Де знаходяться файли:**
    - `src/styles/variables.css` - тут всі змінні
    - `src/index.css` - підключення змінних

## Переваги використання

✅ Легко змінювати кольори по всьому проекту  
✅ Консистентний дизайн  
✅ Менше помилок  
✅ Код легше читати  
✅ Швидка розробка

## Потрібна допомога?

Якщо щось незрозуміло - питай в чаті команди або дивись цей файл як довідник.
