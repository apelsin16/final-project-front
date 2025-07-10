# Subtitle Component

Универсальный компонент подзаголовка для использования на разных страницах приложения. Меньше чем MainTitle, но больше обычного текста.

## Features

-   ✅ Адаптивные размеры для всех устройств
-   ✅ Точные стили из Figma (Mulish ExtraBold, 40px на десктопе)
-   ✅ 3 размера: small, medium, large
-   ✅ Семантические HTML теги (h1-h6)
-   ✅ Цветовые варианты (dark/light)
-   ✅ Центрированное и левое выравнивание
-   ✅ Плавные анимации

## Responsive Breakpoints

### Small Size

| Устройство             | Размер экрана | Font Size | Line Height |
| ---------------------- | ------------- | --------- | ----------- |
| Очень маленькие экраны | < 480px       | 20px      | 24px        |
| Мобильные              | 480px+        | 24px      | 28px        |
| Планшеты               | 768px+        | 28px      | 32px        |
| Десктопы               | 1024px+       | 32px      | 36px        |
| Большие экраны         | 1440px+       | 36px      | 40px        |

### Medium Size (Default)

| Устройство             | Размер экрана | Font Size | Line Height |
| ---------------------- | ------------- | --------- | ----------- |
| Очень маленькие экраны | < 480px       | 24px      | 28px        |
| Мобильные              | 480px+        | 28px      | 32px        |
| Планшеты               | 768px+        | 36px      | 40px        |
| Десктопы               | 1024px+       | **40px**  | **44px**    |
| Большие экраны         | 1440px+       | 44px      | 48px        |

### Large Size

| Устройство             | Размер экрана | Font Size | Line Height |
| ---------------------- | ------------- | --------- | ----------- |
| Очень маленькие экраны | < 480px       | 28px      | 32px        |
| Мобильные              | 480px+        | 32px      | 36px        |
| Планшеты               | 768px+        | 44px      | 48px        |
| Десктопы               | 1024px+       | 48px      | 52px        |
| Большие экраны         | 1440px+       | 52px      | 56px        |

> **Примечание**: Medium размер на десктопе (40px/44px) точно соответствует дизайну из Figma

## Usage

```jsx
import { Subtitle } from '../common/ui';

// Заголовок страницы
<Subtitle as="h1">Add Recipe</Subtitle>

// Заголовок секции
<Subtitle as="h2" size="small">Categories</Subtitle>

// Центрированный заголовок
<Subtitle centered>Profile</Subtitle>
```

## Props

| Prop        | Type                                           | Default    | Description               |
| ----------- | ---------------------------------------------- | ---------- | ------------------------- |
| `children`  | `ReactNode`                                    | -          | Текст подзаголовка        |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'`     | HTML тег для семантики    |
| `size`      | `'small' \| 'medium' \| 'large'`               | `'medium'` | Размер подзаголовка       |
| `color`     | `'dark' \| 'light'`                            | `'dark'`   | Цвет текста               |
| `centered`  | `boolean`                                      | `false`    | Центрировать текст        |
| `className` | `string`                                       | -          | Дополнительные CSS классы |

## Typography Specifications

Согласно дизайну из Figma:

-   **Font Family**: Mulish
-   **Font Weight**: 800 (ExtraBold)
-   **Text Transform**: Uppercase
-   **Letter Spacing**: -2%
-   **Color**: #050505 (dark)
-   **Medium Size Desktop**: 40px font-size, 44px line-height

## Examples

### Основные варианты из дизайна

```jsx
// Страница добавления рецепта
<Subtitle as="h1">Add Recipe</Subtitle>

// Страница профиля
<Subtitle as="h1">Profile</Subtitle>

// Секция категорий
<Subtitle as="h2">Categories</Subtitle>

// Популярные рецепты
<Subtitle as="h2">Popular Recipes</Subtitle>
```

### Разные размеры

```jsx
// Маленький подзаголовок
<Subtitle size="small" as="h3">Small Section</Subtitle>

// Средний (по умолчанию)
<Subtitle size="medium" as="h2">Medium Section</Subtitle>

// Большой подзаголовок
<Subtitle size="large" as="h1">Large Section</Subtitle>
```

### Центрированные заголовки

```jsx
<Subtitle centered>Centered Title</Subtitle>
<Subtitle centered size="small">Small Centered</Subtitle>
<Subtitle centered size="large">Large Centered</Subtitle>
```

### Цветовые варианты

```jsx
// Темный (по умолчанию)
<Subtitle color="dark">Dark Subtitle</Subtitle>

// Светлый для темного фона
<div style={{ backgroundColor: '#1a1a1a' }}>
  <Subtitle color="light">Light Subtitle</Subtitle>
</div>
```

## Real-world Usage

### В страничных компонентах

```jsx
// AddRecipePage.jsx
const AddRecipePage = () => {
    return (
        <div>
            <PathInfo currentPage='Add Recipe' />
            <Subtitle as='h1'>Add Recipe</Subtitle>
            {/* Форма добавления рецепта */}
        </div>
    );
};

// ProfilePage.jsx
const ProfilePage = () => {
    return (
        <div>
            <PathInfo currentPage='Profile' />
            <Subtitle as='h1'>Profile</Subtitle>
            {/* Контент профиля */}
        </div>
    );
};
```

### В секциях контента

```jsx
const HomePage = () => {
    return (
        <div>
            <section>
                <Subtitle as='h2' size='small'>
                    Categories
                </Subtitle>
                {/* Список категорий */}
            </section>

            <section>
                <Subtitle as='h2' size='small'>
                    Popular Recipes
                </Subtitle>
                {/* Список рецептов */}
            </section>
        </div>
    );
};
```

### С динамическим контентом

```jsx
const RecipeSection = ({ title, recipes }) => {
    return (
        <section>
            <Subtitle as='h2' size='small'>
                {title}
            </Subtitle>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </section>
    );
};
```

## Size Guidelines

### Когда использовать какой размер:

**Small (`size="small"`):**

-   Заголовки секций на главной странице
-   Подзаголовки в карточках контента
-   Навигационные заголовки

**Medium (`size="medium"` - default):**

-   Основные заголовки страниц (Add Recipe, Profile)
-   Заголовки форм
-   Основные секции контента

**Large (`size="large"`):**

-   Особенно важные заголовки
-   Landing page заголовки
-   Промо секции

## Semantic HTML

Правильное использование семантических тегов:

```jsx
// Основной заголовок страницы
<Subtitle as="h1" size="medium">Add Recipe</Subtitle>

// Заголовки секций
<Subtitle as="h2" size="small">Categories</Subtitle>
<Subtitle as="h2" size="small">Popular Recipes</Subtitle>

// Подзаголовки в секциях
<Subtitle as="h3" size="small">Breakfast Recipes</Subtitle>
```

## Accessibility

-   **Семантическая разметка**: Использует правильные HTML теги (h1-h6)
-   **Читаемые размеры**: Достаточные размеры шрифта на всех устройствах
-   **Высокий контраст**: Цвета обеспечивают хорошую читаемость
-   **Структура документа**: Помогает screen readers понимать иерархию

## Styling

Компонент использует CSS модули. Основные классы:

-   `.subtitle` - Базовые стили
-   `.small`, `.medium`, `.large` - Размеры
-   `.dark`, `.light` - Цветовые варианты
-   `.centered` - Центрированное выравнивание

### Кастомизация

```jsx
// Через className
<Subtitle className="my-custom-subtitle">Title</Subtitle>

// Через style
<Subtitle style={{ marginBottom: '20px' }}>Title</Subtitle>

// Переопределение размера
<Subtitle style={{ fontSize: '32px' }}>Custom Size</Subtitle>
```

## Comparison with Other Components

| Компонент    | Размер        | Использование                  |
| ------------ | ------------- | ------------------------------ |
| MainTitle    | 40px-100px    | Hero секции, главные заголовки |
| **Subtitle** | **20px-52px** | **Заголовки страниц и секций** |
| Typography   | 12px-18px     | Обычный текст, параграфы       |

## Performance

-   Оптимизированное отображение шрифта
-   Минимальный DOM footprint
-   Эффективные CSS медиа-запросы
-   Плавные анимации с CSS трансформами

## Browser Support

-   Современные браузеры (Chrome, Firefox, Safari, Edge)
-   IE11+ (с полифиллами)
-   Мобильные браузеры (iOS Safari, Android Chrome)
