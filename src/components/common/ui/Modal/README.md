# Modal Component

Універсальний компонент модального вікна для відображення контенту поверх основного інтерфейсу.

## Особливості

-   Відображає контент у модальному вікні з backdrop
-   Кнопка закриття (іконка X) у правому верхньому куті
-   Закриття за кліком на backdrop
-   Закриття за натисканням клавіші Escape
-   Блокування скролу сторінки при відкритому модальному вікні
-   Портал рендеринг в document.body
-   Центроване позиціонування
-   Responsive дизайн

## Props

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `isOpen`    | `boolean`   | -       | Чи відкрите модальне вікно         |
| `onClose`   | `function`  | -       | Функція закриття модального вікна  |
| `children`  | `ReactNode` | -       | Контент модального вікна           |
| `className` | `string`    | -       | Додаткові CSS класи для контейнера |

## Використання

```jsx
import { useState } from 'react';
import Modal from '../components/common/ui/Modal/Modal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Modal Title</h2>
                <p>Modal content goes here</p>
            </Modal>
        </div>
    );
}
```

## Способи закриття

1. **Кнопка X** - клік по іконці закриття у правому верхньому куті
2. **Backdrop** - клік поза областю модального вікна
3. **Escape** - натискання клавіші Escape

## Стилізація

Компонент використовує CSS Modules. Доступні класи:

-   `.backdrop` - затемнений фон
-   `.modal` - контейнер модального вікна
-   `.closeButton` - контейнер кнопки закриття
-   `.content` - контейнер контенту

## Приклади

Базове використання:

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
    <h2>Simple Modal</h2>
    <p>Some content</p>
</Modal>
```

Модальне вікно підтвердження:

```jsx
<Modal isOpen={isConfirmOpen} onClose={handleCancel}>
    <h2>ARE YOU SURE?</h2>
    <p>This action cannot be undone.</p>
    <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
</Modal>
```

## Accessibility

-   Фокус управління автоматично
-   Клавіша Escape для закриття
-   Семантична розмітка
-   ARIA-labels для кнопки закриття
