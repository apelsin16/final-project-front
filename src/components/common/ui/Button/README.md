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

| Проп        | Тип                                     | За замовчуванням | Опис                                   |
| ----------- | --------------------------------------- | ---------------- | -------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline'` | `'primary'`      | Варіант стилю кнопки                   |
| `size`      | `'small' \| 'medium' \| 'large'`        | `'medium'`       | Розмір кнопки                          |
| `disabled`  | `boolean`                               | `false`          | Чи вимкнена кнопка                     |
| `fullWidth` | `boolean`                               | `false`          | Чи займає кнопка всю ширину контейнера |
| `onClick`   | `function`                              | -                | Обробник події кліку                   |
| `children`  | `React.ReactNode`                       | -                | Вміст кнопки (текст/іконки)            |
| `className` | `string`                                | -                | Додаткові CSS класи                    |

## Варіанти (Variants)

### Primary

Основна чорна кнопка для головних дій.

```jsx
<Button variant='primary'>SIGN IN</Button>
```

### Secondary

Сіра кнопка для вторинних дій.

```jsx
<Button variant='secondary'>CANCEL</Button>
```

### Outline

Прозора кнопка з межею для альтернативних дій.

```jsx
<Button variant='outline'>ADD RECIPE</Button>
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

### Різні варіанти кнопок

```jsx
function AuthButtons() {
    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            {/* Основна дія */}
            <Button variant='primary' size='medium'>
                SIGN IN
            </Button>

            {/* Вторинна дія */}
            <Button variant='secondary' size='medium'>
                CANCEL
            </Button>

            {/* Альтернативна дія */}
            <Button variant='outline' size='large'>
                ADD RECIPE
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
<Button variant='outline' className='my-custom-class' onClick={() => alert('Clicked!')}>
    CUSTOM STYLED BUTTON
</Button>
```

## Стилізація

Компонент використовує CSS модулі (`Button.module.css`). Всі стилі інкапсульовані і не впливають на інші компоненти.

### Кастомізація через CSS змінні

Ти можеш перевизначити кольори через CSS змінні в глобальних стилях:

```css
:root {
    --button-primary-bg: #1a1a1a;
    --button-secondary-bg: #a8a8a8;
    --button-outline-border: #1a1a1a;
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
