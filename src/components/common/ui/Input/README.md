# Input Component

Универсальный компонент для текстовых полей ввода с поддержкой различных типов: email, password, text.

## Features

-   ✅ Поддержка типов: `text`, `email`, `password`
-   ✅ Два размера: `small` (48px) и `large` (56px)
-   ✅ Показать/скрыть пароль для `type="password"`
-   ✅ Валидация и отображение ошибок
-   ✅ Лейблы с поддержкой обязательных полей
-   ✅ Состояния: обычное, фокус, ошибка, отключено
-   ✅ Адаптивный дизайн
-   ✅ Доступность (a11y)

## Usage

```jsx
import { Input } from '../common/ui';

// Email поле
<Input
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
  label="Email Address"
  required
  error={emailError}
/>

// Password поле с показать/скрыть
<Input
  type="password"
  value={password}
  onChange={setPassword}
  placeholder="Enter your password"
  label="Password"
  required
/>

// Обычное текстовое поле
<Input
  type="text"
  value={name}
  onChange={setName}
  placeholder="Enter your name"
  label="Full Name"
/>
```

## Props

| Prop          | Type                              | Default   | Description                   |
| ------------- | --------------------------------- | --------- | ----------------------------- |
| `type`        | `'text' \| 'email' \| 'password'` | `'text'`  | Тип поля ввода                |
| `value`       | `string`                          | -         | Значение поля                 |
| `onChange`    | `(value: string) => void`         | -         | Обработчик изменения значения |
| `placeholder` | `string`                          | -         | Текст плейсхолдера            |
| `label`       | `string`                          | -         | Текст лейбла                  |
| `size`        | `'small' \| 'large'`              | `'large'` | Размер поля (48px \| 56px)    |
| `required`    | `boolean`                         | `false`   | Обязательно ли поле           |
| `disabled`    | `boolean`                         | `false`   | Выключено ли поле             |
| `error`       | `string`                          | -         | Текст ошибки                  |
| `className`   | `string`                          | -         | Дополнительные CSS классы     |
| `name`        | `string`                          | -         | Имя поля                      |
| `id`          | `string`                          | -         | ID поля                       |

## Examples

### Email с валидацией

```jsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = value => {
    if (!value) {
        setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
        setEmailError('Please enter a valid email');
    } else {
        setEmailError('');
    }
};

<Input
    type='email'
    value={email}
    onChange={value => {
        setEmail(value);
        validateEmail(value);
    }}
    label='Email'
    error={emailError}
    required
/>;
```

### Password с показать/скрыть

```jsx
const [password, setPassword] = useState('');

<Input
    type='password'
    value={password}
    onChange={setPassword}
    label='Password'
    placeholder='Enter your password'
    size='small'
    required
/>;
```

### Размеры полей

```jsx
// Маленький размер (48px высота)
<Input
    type='email'
    size='small'
    placeholder='Small input'
    label='Small Field'
/>

// Большой размер (56px высота) - по умолчанию
<Input
    type='email'
    size='large'
    placeholder='Large input'
    label='Large Field'
/>
```

## Styling

Компонент использует CSS модули. Основные классы:

-   `.wrapper` - Обертка компонента
-   `.label` - Стили лейбла
-   `.inputWrapper` - Обертка для поля и иконки
-   `.input` - Стили поля ввода
-   `.toggleButton` - Кнопка показать/скрыть пароль
-   `.errorMessage` - Сообщение об ошибке

## Accessibility

-   Правильная связь `label` и `input` через `htmlFor` и `id`
-   Поддержка `aria-label` для кнопки показать/скрыть пароль
-   Семантическая разметка ошибок
-   Поддержка навигации с клавиатуры
