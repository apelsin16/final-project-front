# IconButton

Универсальная кликабельная кнопка с иконкой для различных действий.

## Использование

```jsx
import { IconButton } from '../../common/ui';

// Кнопка добавления в избранное
<IconButton
  icon="heart"
  filled={isFavorite}
  onClick={toggleFavorite}
  ariaLabel="Add to favorites"
/>

// Кнопка открытия рецепта
<IconButton
  icon="arrow"
  onClick={openRecipe}
  variant="filled"
  ariaLabel="Open recipe"
/>

// Кнопка удаления
<IconButton
  icon="delete"
  onClick={deleteRecipe}
  variant="outlined"
  size="small"
  ariaLabel="Delete recipe"
/>
```

## Props

| Prop        | Type                                  | Default     | Description                            |
| ----------- | ------------------------------------- | ----------- | -------------------------------------- |
| `icon`      | `'heart' \| 'arrow' \| 'delete'`      | -           | **Required.** Тип иконки               |
| `size`      | `'small' \| 'medium' \| 'large'`      | `'medium'`  | Размер кнопки                          |
| `variant`   | `'default' \| 'filled' \| 'outlined'` | `'default'` | Вариант стиля                          |
| `filled`    | `boolean`                             | `false`     | Для иконки heart - заполненная или нет |
| `onClick`   | `function`                            | -           | Обработчик клика                       |
| `disabled`  | `boolean`                             | `false`     | Отключена ли кнопка                    |
| `className` | `string`                              | -           | Дополнительные CSS классы              |
| `ariaLabel` | `string`                              | -           | Aria-label для доступности             |

## Доступные иконки

-   **heart** - Сердечко для избранного (поддерживает `filled`)
-   **arrow** - Стрелка для открытия/навигации
-   **delete** - Корзина для удаления

## Варианты стилей

-   **default** - Прозрачный фон, появляется при hover
-   **filled** - Темный фон с белой иконкой
-   **outlined** - Обводка, заливается при hover

## Размеры

-   **small** - 32x32px (иконка 16x16px)
-   **medium** - 48x48px (иконка 24x24px)
-   **large** - 64x64px (иконка 32x32px)

## Добавление новых иконок

Чтобы добавить новую иконку:

1. Создай SVG компонент в `IconButton.jsx`
2. Добавь его в объект `ICONS`
3. Обнови TypeScript типы в JSDoc

```jsx
const NewIcon = () => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
        {/* SVG path */}
    </svg>
);

const ICONS = {
    heart: HeartIcon,
    arrow: ArrowIcon,
    delete: DeleteIcon,
    newIcon: NewIcon, // добавь сюда
};
```
