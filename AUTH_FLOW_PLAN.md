# Auth Flow Implementation Plan (Frontend)

## 0. Подключение к серверу (API URL) (ВЫПОЛНЕНО)

-   Использовать переменные окружения для хранения адреса API.
-   В корне проекта создать `.env` с переменной `VITE_API_URL`.
-   В коде получать адрес через `import.meta.env.VITE_API_URL`.
-   Не хардкодить адреса серверов в исходниках.
-   Для разных окружений (dev/prod) использовать разные `.env` файлы.

---

## 1. Подготовка окружения (ВЫПОЛНЕНО)

-   Установить зависимости: `@reduxjs/toolkit`, `react-redux`, `axios`, `izitoast`.
-   Подключить стили iziToast (import в index.js или index.html).
-   Проверить структуру проекта, убедиться, что есть папки `features/auth`, `features/modal`, `store.js`.
-   Проверить .env с VITE_API_URL.
-   Проверить package.json на наличие всех зависимостей.

---

## 2. Redux Store (ВЫПОЛНЕНО)

-   Создан store в `src/store.js` с редьюсерами для `auth` и `modal`.
-   Store подключён к React через `<Provider store={store}>` в `src/main.jsx`.

---

## 3. Auth Slice (features/auth/authSlice.js) (ВЫПОЛНЕНО)

-   Стейт: user, token, isLoading, error, isAuth.
-   Асинхронные экшены (createAsyncThunk): register, login, logout, fetchCurrentUser.
-   Логика:
    -   При успехе: сохранять токен в localStorage, user в стейт.
    -   При ошибке: показывать iziToast с сообщением с бэка (только для rejected login/register/logout).
    -   Для fetchCurrentUser.rejected iziToast не используется — просто сбрасывается стейт.
    -   При logout: чистить localStorage, стейт, дергать endpoint.
    -   При старте приложения: если есть токен — валидировать через fetchCurrentUser.
    -   В fetchCurrentUser.fulfilled токен сохраняется только в state.token, а user — только публичные данные.
    -   iziToast.error вызывается только в .rejected, не в catch asyncThunk.

---

## 4. Modal Slice (features/modal/modalSlice.js) (ВЫПОЛНЕНО)

-   Создан modalSlice с:
    -   Стейтом: modalType ('login' | 'register' | 'logout' | null), modalProps (объект параметров).
    -   Экшенами: openModal({type, props}), closeModal().
-   Reducer подключён к store.
-   Управление всеми модалками централизовано через redux.

---

## 5. Модальные окна (components/common/ui/Modal) (ВЫПОЛНЕНО)

-   Использован/доработан существующий Modal.jsx.
-   Реализованы компоненты:
    -   LoginModal
    -   RegisterModal
    -   LogoutModal
-   Управление открытием/закрытием через modalSlice.
-   Передаются isLoading, errorMessage (валидация), onSubmit, onClose как пропсы.
-   Используются кастомные UI-компоненты (Input, Button и т.д.).
-   Лоадер + подпись статуса реализованы через текст на кнопке.
-   Ошибки с бэка — только через iziToast.

---

## 6. Интеграция iziToast (ВЫПОЛНЕНО)

-   Импортированы и подключены стили.
-   Используется iziToast.error только в .rejected обработчиках extraReducers, не в catch внутри asyncThunk (чтобы не было дублей).
-   UI сообщений — только на английском.
-   Время показа ошибок увеличено до 7 секунд.

---

## 7. Восстановление пользователя по токену (ВЫПОЛНЕНО)

-   При старте приложения (SharedLayout) диспатчится fetchCurrentUser().
-   Если токен валиден — user появляется в стейте.
-   Если токен невалиден — user/token/isAuth сбрасываются, токен удаляется из localStorage.

---

## 8. TODO / Возможные доработки

-   [ ] Добавить визуальный спиннер (иконку) в Button при isLoading (если нужно).
-   [ ] Добавить явное отображение ошибок с бэка в модалке (если нужно, сейчас только iziToast).
-   [ ] Реализовать PrivateRoute с реальной проверкой авторизации (isAuth из redux).
-   [ ] Доработать Header для отображения состояния авторизации (user info, logout и т.д.).
-   [ ] Покрыть тестами основные сценарии (auth, модалки, восстановление сессии).

---

**Если появляются новые задачи — добавляй их в TODO. Все выполненные пункты остаются в плане с пометкой (ВЫПОЛНЕНО).**
