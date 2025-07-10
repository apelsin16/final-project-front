# Button Component

Універсальний компонент кнопки для проекту Foodies.

## Огляд

Компонент `Button` створений для використання всіх типів кнопок в додатку. Він підтримує різні варіанти стилів, розміри та стани.

## Імпорт

```jsx
import { Button } from '@/components/common/ui';
// або
import Button from '@/components/common/ui/Button/Button';
```

## Пропси

| Проп        | Тип                              | За замовчуванням | Опис                                   |
| ----------- | -------------------------------- | ---------------- | -------------------------------------- |
| `variant`   | `'primary' \| 'white'`           | `'primary'`      | Варіант стилю кнопки                   |
| `size`      | `'small' \| 'medium' \| 'large'` | `'medium'`       | Розмір кнопки                          |
| `disabled`  | `boolean`                        | `false`          | Чи вимкнена кнопка                     |
| `fullWidth` | `boolean`                        | `false`          | Чи займає кнопка всю ширину контейнера |
| `onClick`   | `function`                       | -                | Обробник події кліку                   |
| `children`  | `React.ReactNode`                | -                | Вміст кнопки (текст/іконки)            |
| `className` | `string`                         | -                | Додаткові CSS класи                    |

## Варіанти кнопок

### Primary (Чорна)

Основна чорна кнопка для головних дій.

```jsx
<Button variant='primary'>SIGN IN</Button>
```

### White (Біла)

Біла кнопка з чорною межею для альтернативних дій.

```jsx
<Button variant='white'>ADD RECIPE</Button>
```

### Disabled (Сіра)

Будь-яка кнопка автоматично стає сірою при `disabled={true}`.

```jsx
<Button variant='primary' disabled>
    PUBLISH
</Button>
```

## Розміри (Sizes)

### Small

Компактні кнопки для обмеженого простору.

```jsx
<Button size='small'>Small Button</Button>
```

### Medium

Стандартний розмір для більшості випадків.

```jsx
<Button size='medium'>Medium Button</Button>
```

### Large

Великі кнопки для важливих дій.

```jsx
<Button size='large'>Large Button</Button>
```

## Приклади використання

### Базовий приклад

```jsx
function LoginForm() {
    const handleLogin = () => {
        console.log('Login clicked');
    };

    return (
        <Button variant='primary' size='medium' onClick={handleLogin}>
            SIGN IN
        </Button>
    );
}
```

### Усі варіанти кнопок

```jsx
function ButtonExamples() {
    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            {/* Чорна кнопка */}
            <Button variant='primary'>SIGN IN</Button>

            {/* Біла кнопка */}
            <Button variant='white'>ADD RECIPE</Button>

            {/* Сіра кнопка (disabled) */}
            <Button variant='primary' disabled>
                PUBLISH
            </Button>
        </div>
    );
}
```

### Вимкнена кнопка

```jsx
<Button variant='primary' disabled>
    LOADING...
</Button>
```

### Кнопка на всю ширину

```jsx
<Button variant='primary' fullWidth>
    PUBLISH RECIPE
</Button>
```

### З додатковими класами

```jsx
<Button variant='white' className='my-custom-class' onClick={() => alert('Clicked!')}>
    CUSTOM STYLED BUTTON
</Button>
```

## Стилізація

Компонент використовує CSS модулі (`Button.module.css`). Всі стилі інкапсульовані і не впливають на інші компоненти.

### Кастомізація через CSS змінні

Ти можеш перевизначити кольори через CSS змінні в глобальних стилях:

```css
:root {
    --color-dark: #1a1a1a; /* Колір чорних кнопок */
    --color-white: #ffffff; /* Колір білих кнопок */
    --color-light: #bfbebe; /* Колір сірих кнопок (disabled) */
}
```

## Доступність (Accessibility)

-   Підтримка навігації з клавіатури
-   Focus-visible стилі для кращої доступності
-   Семантичний HTML (button елемент)
-   Підтримка `disabled` стану

## Примітки для розробників

1. **Консистентність**: Використовуй цей компонент для всіх кнопок в додатку
2. **Розширення**: При необхідності додавання нових варіантів, додай їх в CSS модуль та TypeScript типи
3. **Тестування**: Перевір всі варіанти та розміри перед деплоєм
4. **Перформанс**: Компонент оптимізований та не ререндериться без необхідності
