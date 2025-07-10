# PathInfo Component

Универсальный компонент для отображения навигационных хлебных крошек (breadcrumbs). Показывает ссылку на главную страницу и название текущей страницы.

## Features

-   ✅ Семантическая навигация с поддержкой accessibility
-   ✅ Интеграция с React Router
-   ✅ Точные стили из Figma (Mulish Bold, 12px)
-   ✅ Кастомизируемые разделители и тексты
-   ✅ Hover и focus состояния
-   ✅ Адаптивный дизайн
-   ✅ Поддержка светлой/темной темы

## Typography Specifications

Согласно дизайну из Figma:

-   **Font Family**: Mulish
-   **Font Weight**: 700 (Bold)
-   **Font Size**: 12px
-   **Line Height**: 18px
-   **Letter Spacing**: -2%
-   **Text Transform**: Uppercase
-   **Color**: #050505

## Usage

```jsx
import { PathInfo } from '../common/ui';

// Основное использование
<PathInfo currentPage="Profile" />

// Кастомная настройка
<PathInfo
  currentPage="Add Recipe"
  homeText="Main"
  homeLink="/dashboard"
  separator=">"
/>
```

## Props

| Prop          | Type      | Default  | Description                              |
| ------------- | --------- | -------- | ---------------------------------------- |
| `currentPage` | `string`  | -        | Название текущей страницы (обязательный) |
| `homeLink`    | `string`  | `'/'`    | Ссылка на главную страницу               |
| `homeText`    | `string`  | `'HOME'` | Текст ссылки на главную                  |
| `separator`   | `string`  | `'/'`    | Разделитель между элементами             |
| `withLink`    | `boolean` | `true`   | Делать ли HOME кликабельной ссылкой      |
| `className`   | `string`  | -        | Дополнительные CSS классы                |

## Examples

### Основные варианты из дизайна

```jsx
// Страница профиля
<PathInfo currentPage="Profile" />
// Результат: HOME / PROFILE

// Страница добавления рецепта
<PathInfo currentPage="Add Recipe" />
// Результат: HOME / ADD RECIPE
```

### Кастомные настройки

```jsx
// Кастомный разделитель
<PathInfo currentPage="Settings" separator=">" />
// Результат: HOME > SETTINGS

// Кастомный HOME текст
<PathInfo currentPage="Dashboard" homeText="Main" />
// Результат: MAIN / DASHBOARD

// Без ссылки (только текст)
<PathInfo currentPage="About" withLink={false} />
// Результат: HOME / ABOUT (HOME не кликабельный)

// Кастомная ссылка на главную
<PathInfo
  currentPage="Profile"
  homeLink="/dashboard"
  homeText="Dashboard"
/>
// Результат: DASHBOARD / PROFILE (ссылка ведет на /dashboard)
```

### Различные разделители

```jsx
<PathInfo currentPage="Recipe" separator="/" />   // HOME / RECIPE
<PathInfo currentPage="Recipe" separator=">" />   // HOME > RECIPE
<PathInfo currentPage="Recipe" separator="•" />   // HOME • RECIPE
<PathInfo currentPage="Recipe" separator="→" />   // HOME → RECIPE
<PathInfo currentPage="Recipe" separator="|" />   // HOME | RECIPE
```

## Theming

### Темная тема

```jsx
<div style={{ backgroundColor: '#1a1a1a' }}>
    <PathInfo currentPage='Profile' className='light' />
</div>
```

Компонент поддерживает класс `light` для использования на темных фонах.

## Real-world Usage

### В страничных компонентах

```jsx
// ProfilePage.jsx
const ProfilePage = () => {
    return (
        <div>
            <PathInfo currentPage='Profile' />
            {/* Остальной контент страницы */}
        </div>
    );
};

// AddRecipePage.jsx
const AddRecipePage = () => {
    return (
        <div>
            <PathInfo currentPage='Add Recipe' />
            {/* Форма добавления рецепта */}
        </div>
    );
};

// RecipeDetailsPage.jsx
const RecipeDetailsPage = ({ recipeName }) => {
    return (
        <div>
            <PathInfo currentPage={recipeName} />
            {/* Детали рецепта */}
        </div>
    );
};
```

### С React Router

```jsx
import { useLocation } from 'react-router-dom';

const getPageName = pathname => {
    const routes = {
        '/profile': 'Profile',
        '/add-recipe': 'Add Recipe',
        '/recipes': 'Recipes',
        '/favorites': 'Favorites',
    };
    return routes[pathname] || 'Page';
};

const PageHeader = () => {
    const location = useLocation();
    const currentPage = getPageName(location.pathname);

    return <PathInfo currentPage={currentPage} />;
};
```

## Accessibility

Компонент полностью соответствует принципам accessibility:

-   **Семантическая разметка**: Использует `<nav>` и `<ol>` для правильной структуры
-   **ARIA атрибуты**: `aria-label="Breadcrumb"`, `aria-current="page"`
-   **Клавиатурная навигация**: Поддержка Tab и Enter
-   **Состояния фокуса**: Визуальные индикаторы фокуса
-   **Screen readers**: Правильная интерпретация содержимого

## Styling

Компонент использует CSS модули. Основные классы:

-   `.pathInfo` - Обертка компонента
-   `.breadcrumbList` - Список элементов навигации
-   `.breadcrumbItem` - Отдельный элемент списка
-   `.homeLink` - Ссылка на главную страницу
-   `.homeText` - Текст главной страницы (без ссылки)
-   `.separator` - Разделитель между элементами
-   `.currentPage` - Название текущей страницы

### Кастомизация стилей

```jsx
// Кастомные стили через className
<PathInfo
  currentPage="Profile"
  className="my-custom-breadcrumb"
/>

// Кастомные стили через style
<PathInfo
  currentPage="Profile"
  style={{ margin: '20px 0' }}
/>
```

## Layout Integration

### В шапке страницы

```jsx
const PageLayout = ({ children, currentPage }) => {
    return (
        <div className='page'>
            <header className='page-header'>
                <PathInfo currentPage={currentPage} />
            </header>
            <main className='page-content'>{children}</main>
        </div>
    );
};
```

### В карточках контента

```jsx
const ContentCard = ({ title, children }) => {
    return (
        <div className='card'>
            <div className='card-header'>
                <PathInfo currentPage={title} />
            </div>
            <div className='card-content'>{children}</div>
        </div>
    );
};
```

## Performance

-   Минимальный DOM footprint
-   Оптимизированные CSS селекторы
-   Отсутствие избыточных re-renders
-   Lazy loading готовность

## Browser Support

-   Современные браузеры (Chrome, Firefox, Safari, Edge)
-   IE11+ (с полифиллами)
-   Мобильные браузеры (iOS Safari, Android Chrome)
