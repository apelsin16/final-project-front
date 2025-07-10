# Select Component

Компонент выпадающего списка (селектора) с современным дизайном и полной функциональностью.

## Features

-   ✅ Два размера: `small` (48px) и `large` (56px)
-   ✅ Клик для открытия/закрытия
-   ✅ Клик вне области закрывает селект
-   ✅ Escape закрывает селект
-   ✅ Анимированная стрелка
-   ✅ Валидация и отображение ошибок
-   ✅ Лейблы с поддержкой обязательных полей
-   ✅ Состояния: обычное, фокус, ошибка, отключено
-   ✅ Доступность (a11y)
-   ✅ Адаптивный дизайн

## Usage

```jsx
import { Select } from '../common/ui';

// Основное использование
<Select
    options={[
        { value: 'beef', label: 'Beef' },
        { value: 'chicken', label: 'Chicken' },
        { value: 'pork', label: 'Pork' },
    ]}
    value={category}
    onChange={setCategory}
    placeholder='Select a category'
    label='CATEGORY'
    size='large'
    required
/>;
```

## Props

| Prop          | Type                                | Default              | Description                   |
| ------------- | ----------------------------------- | -------------------- | ----------------------------- |
| `options`     | `Array<{value, label}>`             | `[]`                 | Массив опций для выбора       |
| `value`       | `string \| number`                  | -                    | Выбранное значение            |
| `onChange`    | `(value: string \| number) => void` | -                    | Обработчик изменения значения |
| `placeholder` | `string`                            | `'Select an option'` | Текст плейсхолдера            |
| `label`       | `string`                            | -                    | Текст лейбла                  |
| `size`        | `'small' \| 'large'`                | `'large'`            | Размер селекта (48px \| 56px) |
| `required`    | `boolean`                           | `false`              | Обязательно ли поле           |
| `disabled`    | `boolean`                           | `false`              | Выключен ли селект            |
| `error`       | `string`                            | -                    | Текст ошибки                  |
| `className`   | `string`                            | -                    | Дополнительные CSS классы     |
| `name`        | `string`                            | -                    | Имя поля                      |
| `id`          | `string`                            | -                    | ID поля                       |

## Examples

### Базовый селект

```jsx
const [category, setCategory] = useState('');

const options = [
    { value: 'beef', label: 'Beef' },
    { value: 'chicken', label: 'Chicken' },
    { value: 'pork', label: 'Pork' },
];

<Select
    options={options}
    value={category}
    onChange={setCategory}
    placeholder='Select a category'
    label='CATEGORY'
/>;
```

### Селект с валидацией

```jsx
const [category, setCategory] = useState('');
const [error, setError] = useState('');

const handleChange = value => {
    setCategory(value);
    if (!value) {
        setError('Category is required');
    } else {
        setError('');
    }
};

<Select options={options} value={category} onChange={handleChange} label='CATEGORY' required error={error} />;
```

### Размеры селекта

```jsx
// Маленький размер (48px высота)
<Select
  options={options}
  size="small"
  placeholder="Small select"
  label="SMALL SIZE"
/>

// Большой размер (56px высота) - по умолчанию
<Select
  options={options}
  size="large"
  placeholder="Large select"
  label="LARGE SIZE"
/>
```

### Отключенный селект

```jsx
<Select
    options={options}
    value=''
    onChange={() => {}}
    placeholder='Disabled select'
    label='DISABLED'
    disabled
/>
```

## Структура опций

Опции должны быть массивом объектов с обязательными полями `value` и `label`:

```jsx
const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];
```

-   `value` - уникальное значение опции (string | number)
-   `label` - отображаемый текст опции (string)

## Styling

Компонент использует CSS модули. Основные классы:

-   `.wrapper` - Обертка компонента
-   `.label` - Стили лейбла (uppercase, жирный шрифт)
-   `.selectWrapper` - Обертка для селекта
-   `.select` - Основной элемент селекта
-   `.selectText` - Текст выбранной опции/placeholder
-   `.arrow` - Стрелка (поворачивается при открытии)
-   `.dropdown` - Выпадающий список
-   `.option` - Отдельная опция в списке
-   `.errorMessage` - Сообщение об ошибке

## Accessibility

-   Правильная связь `label` и селекта через `htmlFor` и `id`
-   Роли ARIA: `combobox`, `listbox`, `option`
-   Атрибуты `aria-expanded`, `aria-haspopup`, `aria-selected`
-   Поддержка навигации с клавиатуры (Enter, Space, Escape)
-   Семантическая разметка ошибок

## Keyboard Navigation

-   **Click/Enter/Space** - открыть/закрыть селект
-   **Escape** - закрыть селект
-   **Click на опцию** - выбрать опцию
-   **Click вне области** - закрыть селект
