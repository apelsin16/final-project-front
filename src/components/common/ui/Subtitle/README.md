# Компонент Subtitle

Універсальний компонент підзаголовка для використання на різних сторінках додатку. Менший за MainTitle, але більший за звичайний текст.

## Можливості

-   ✅ Адаптивні розміри для всіх пристроїв
-   ✅ Точні стилі з Figma (Mulish ExtraBold, 40px на десктопі)
-   ✅ 3 розміри: small, medium, large
-   ✅ Семантичні HTML теги (h1-h6)
-   ✅ Кольорові варіанти (dark/light)
-   ✅ Вирівнювання по центру або зліва (align)
-   ✅ Плавні анімації

## Пропси

| Проп        | Тип                                            | За замовчуванням | Опис                   |
| ----------- | ---------------------------------------------- | ---------------- | ---------------------- |
| `children`  | `ReactNode`                                    | -                | Текст підзаголовка     |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'`           | HTML тег для семантики |
| `size`      | `'small' \| 'medium' \| 'large'`               | `'medium'`       | Розмір підзаголовка    |
| `color`     | `'dark' \| 'light'`                            | `'dark'`         | Колір тексту           |
| `align`     | `'left' \| 'center'`                           | `'left'`         | Вирівнювання тексту    |
| `className` | `string`                                       | -                | Додаткові CSS класи    |

## Використання

```jsx
import { Subtitle } from '../common/ui';

// Заголовок сторінки (по лівому краю)
<Subtitle as="h1" align="left">Add Recipe</Subtitle>

// Заголовок секції (по центру)
<Subtitle as="h2" align="center">Categories</Subtitle>
```

## Типографіка

Згідно з дизайном Figma:

-   **Font Family**: Mulish
-   **Font Weight**: 800 (ExtraBold)
-   **Text Transform**: Uppercase
-   **Letter Spacing**: -2%
-   **Color**: #050505 (dark)
-   **Medium Size Desktop**: 40px font-size, 44px line-height

## Приклади

### Основні варіанти з дизайну

```jsx
// Сторінка додавання рецепта
<Subtitle as="h1" align="left">Add Recipe</Subtitle>

// Сторінка профілю
<Subtitle as="h1" align="left">Profile</Subtitle>

// Секція категорій
<Subtitle as="h2" align="left">Categories</Subtitle>

// Популярні рецепти
<Subtitle as="h2" align="left">Popular Recipes</Subtitle>
```

### Різні розміри

```jsx
// Маленький підзаголовок
<Subtitle size="small" as="h3" align="left">Small Section</Subtitle>

// Середній (за замовчуванням)
<Subtitle size="medium" as="h2" align="left">Medium Section</Subtitle>

// Великий підзаголовок
<Subtitle size="large" as="h1" align="left">Large Section</Subtitle>
```

### Центровані заголовки

```jsx
<Subtitle align="center">Centered Title</Subtitle>
<Subtitle align="center" size="small">Small Centered</Subtitle>
<Subtitle align="center" size="large">Large Centered</Subtitle>
```

### Кольорові варіанти

```jsx
// Темний (за замовчуванням)
<Subtitle color="dark" align="left">Dark Subtitle</Subtitle>

// Світлий для темного фону
<div style={{ backgroundColor: '#1a1a1a' }}>
  <Subtitle color="light" align="center">Light Subtitle</Subtitle>
</div>
```

## Реальні приклади використання

### У сторінкових компонентах

```jsx
// AddRecipePage.jsx
const AddRecipePage = () => {
    return (
        <div>
            <PathInfo currentPage='Add Recipe' />
            <Subtitle as='h1' align='left'>
                Add Recipe
            </Subtitle>
            {/* Форма додавання рецепта */}
        </div>
    );
};

// ProfilePage.jsx
const ProfilePage = () => {
    return (
        <div>
            <PathInfo currentPage='Profile' />
            <Subtitle as='h1' align='left'>
                Profile
            </Subtitle>
            {/* Контент профілю */}
        </div>
    );
};
```

### У секціях контенту

```jsx
const HomePage = () => {
    return (
        <div>
            <section>
                <Subtitle as='h2' size='small' align='left'>
                    Categories
                </Subtitle>
                {/* Список категорій */}
            </section>

            <section>
                <Subtitle as='h2' size='small' align='left'>
                    Popular Recipes
                </Subtitle>
                {/* Список рецептів */}
            </section>
        </div>
    );
};
```

### З динамічним контентом

```jsx
const RecipeSection = ({ title, recipes }) => {
    return (
        <section>
            <Subtitle as='h2' size='small' align='left'>
                {title}
            </Subtitle>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </section>
    );
};
```

## Рекомендації по розміру

### Коли який розмір використовувати:

**Small (`size="small"`):**

-   Заголовки секцій на головній сторінці
-   Підзаголовки в картках контенту
-   Навігаційні заголовки

**Medium (`size="medium"` - за замовчуванням):**

-   Основні заголовки сторінок (Add Recipe, Profile)
-   Заголовки форм
-   Основні секції контенту

**Large (`size="large"`):**

-   Особливо важливі заголовки
-   Landing page заголовки
-   Промо секції

## Семантичний HTML

Правильне використання семантичних тегів:

```jsx
// Основний заголовок сторінки
<Subtitle as="h1" size="medium" align="left">Add Recipe</Subtitle>

// Заголовки секцій
<Subtitle as="h2" size="small" align="left">Categories</Subtitle>
<Subtitle as="h2" size="small" align="left">Popular Recipes</Subtitle>

// Підзаголовки в секціях
<Subtitle as="h3" size="small" align="left">Breakfast Recipes</Subtitle>
```

## Accessibility

-   **Семантична розмітка**: Використовує правильні HTML теги (h1-h6)
-   **Читабельні розміри**: Достатні розміри шрифту на всіх пристроях
-   **Високий контраст**: Кольори забезпечують хорошу читабельність
-   **Структура документа**: Допомагає screen readers розуміти ієрархію

## Styling

Компонент використовує CSS модулі. Основні класи:

-   `.subtitle` - Базові стилі
-   `.small`, `.medium`, `.large` - Розміри
-   `.dark`, `.light` - Кольорові варіанти
-   `.centered` - Центроване вирівнювання (align='center')

### Кастомізація

```jsx
// Через className
<Subtitle className="my-custom-subtitle" align="left">Title</Subtitle>

// Через style
<Subtitle style={{ marginBottom: '20px' }} align="left">Title</Subtitle>

// Перевизначення розміру
<Subtitle style={{ fontSize: '32px' }} align="left">Custom Size</Subtitle>
```

## Порівняння з іншими компонентами

| Компонент    | Розмір        | Використання                    |
| ------------ | ------------- | ------------------------------- |
| MainTitle    | 40px-100px    | Hero секції, головні заголовки  |
| **Subtitle** | **20px-52px** | **Заголовки сторінок і секцій** |
| Typography   | 12px-18px     | Звичайний текст, параграфи      |

## Performance

-   Оптимізоване відображення шрифту
-   Мінімальний DOM footprint
-   Ефективні CSS медіа-запити
-   Плавні анімації з CSS трансформами

## Browser Support

-   Сучасні браузери (Chrome, Firefox, Safari, Edge)
-   IE11+ (з поліфілами)
-   Мобільні браузери (iOS Safari, Android Chrome)
