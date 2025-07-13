# MainTitle Component

Універсальний компонент заголовка для використання на різних сторінках додатку. Адаптивний дизайн з точними стилями з Figma для всіх пристроїв.

## Features

-   ✅ Адаптивные размеры для всех устройств
-   ✅ Точные стили из Figma (Mulish ExtraBold, uppercase)
-   ✅ Семантические HTML теги (h1-h6)
-   ✅ Два цветовых варианта (белый и темный)
-   ✅ Центрированное и левое выравнивание
-   ✅ Оптимизированное отображение текста
-   ✅ Плавные анимации

## Responsive Breakpoints

| Устройство            | Размер экрана | Font Size | Line Height | Max Width |
| --------------------- | ------------- | --------- | ----------- | --------- |
| Мобильные (маленькие) | < 480px       | 40px      | 40px        | 280px     |
| Мобильные             | 480px+        | 48px      | 48px        | 320px     |
| Планшеты              | 768px+        | 70px      | 70px        | 678px     |
| Десктопы              | 1024px+       | 90px      | 90px        | 875px     |
| Большие экраны        | 1440px+       | 100px     | 100px       | 950px     |

## Usage

```jsx
import { MainTitle } from '../common/ui';

// Hero секция
<MainTitle color="white">
  Improve Your Culinary Talents
</MainTitle>

// Обычная секция
<MainTitle color="dark" as="h2">
  Our Best Recipes
</MainTitle>
```

## Props

| Prop        | Type                                           | Default   | Description               |
| ----------- | ---------------------------------------------- | --------- | ------------------------- |
| `children`  | `ReactNode`                                    | -         | Текст заголовка           |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'`    | HTML тег для семантики    |
| `color`     | `'white' \| 'dark'`                            | `'white'` | Цвет текста               |
| `centered`  | `boolean`                                      | `true`    | Центрировать текст        |
| `className` | `string`                                       | -         | Дополнительные CSS классы |

## Examples

### Hero заголовок

```jsx
<div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px' }}>
    <MainTitle color='white'>Improve Your Culinary Talents</MainTitle>
    <p style={{ color: '#cccccc', textAlign: 'center', marginTop: '24px' }}>
        Amazing recipes for beginners in the world of cooking
    </p>
</div>
```

### Заголовок секции

```jsx
<MainTitle color='dark' as='h2'>
    Our Best Recipes
</MainTitle>
```

### Заголовок без центрирования

```jsx
<MainTitle color='dark' centered={false} as='h3'>
    Categories
</MainTitle>
```

### Кастомные стили

```jsx
<MainTitle color='dark' as='h2' style={{ fontSize: '32px', lineHeight: '32px' }}>
    Custom Sized Title
</MainTitle>
```

## Typography Specifications

Согласно дизайну из Figma:

-   **Font Family**: Mulish
-   **Font Weight**: 800 (ExtraBold)
-   **Text Transform**: Uppercase
-   **Letter Spacing**: -2%
-   **Text Align**: Center (по умолчанию)
-   **Text Rendering**: Optimized для больших размеров

## Color Variants

### White

```jsx
<MainTitle color='white'>White Title for Dark Backgrounds</MainTitle>
```

Используется на темных фонах, особенно в hero секциях.

### Dark

```jsx
<MainTitle color='dark'>Dark Title for Light Backgrounds</MainTitle>
```

Используется на светлых фонах в обычных секциях.

## Semantic HTML

Компонент поддерживает правильную семантику:

```jsx
// Основной заголовок страницы
<MainTitle as="h1">Main Page Title</MainTitle>

// Заголовок секции
<MainTitle as="h2">Section Title</MainTitle>

// Подзаголовок
<MainTitle as="h3">Subsection Title</MainTitle>
```

## Accessibility

-   Правильная семантическая разметка с тегами h1-h6
-   Оптимизированное отображение для screen readers
-   Высокий контраст цветов
-   Читаемые размеры шрифта на всех устройствах

## Styling

Компонент использует CSS модули. Основные классы:

-   `.mainTitle` - Базовые стили заголовка
-   `.white` - Белый цвет текста
-   `.dark` - Темный цвет текста
-   `.centered` - Центрированное выравнивание

## Performance

-   Оптимизированное отображение шрифта (-webkit-font-smoothing)
-   CSS трансформации для анимаций
-   Минимальный DOM footprint
-   Эффективные медиа-запросы

## Font Loading

Убедитесь что шрифт Mulish загружен в проекте:

```css
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@800&display=swap');
```

Или используйте локальные шрифты для лучшей производительности.
