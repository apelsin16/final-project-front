# Modal Component

Универсальный компонент модального окна для отображения контента поверх основного интерфейса.

## Особенности

-   Отображает контент в модальном окне с backdrop
-   Кнопка закрытия (иконка X) в правом верхнем углу
-   Закрытие по клику на backdrop
-   Закрытие по нажатию клавиши Escape
-   Блокировка скролла страницы при открытом модальном окне
-   Портал рендеринг в document.body
-   Центрированное позиционирование
-   Responsive дизайн

## Props

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `isOpen`    | `boolean`   | -       | Открыто ли модальное окно                |
| `onClose`   | `function`  | -       | Функция закрытия модального окна         |
| `children`  | `ReactNode` | -       | Контент модального окна                  |
| `className` | `string`    | -       | Дополнительные CSS классы для контейнера |

## Использование

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

## Способы закрытия

1. **Кнопка X** - клик по иконке закрытия в правом верхнем углу
2. **Backdrop** - клик вне области модального окна
3. **Escape** - нажатие клавиши Escape

## Стилизация

Компонент использует CSS Modules. Доступные классы:

-   `.backdrop` - затемненный фон
-   `.modal` - контейнер модального окна
-   `.closeButton` - контейнер кнопки закрытия
-   `.content` - контейнер контента

## Примеры

Базовое использование:

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
    <h2>Simple Modal</h2>
    <p>Some content</p>
</Modal>
```

Модальное окно подтверждения:

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

-   Фокус управление автоматически
-   Клавиша Escape для закрытия
-   Семантическая разметка
-   ARIA-labels для кнопки закрытия
