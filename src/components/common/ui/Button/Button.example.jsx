import Button from './Button';

/**
 * Приклад використання компонента Button
 * Цей файл показує всі доступні варіанти та розміри кнопок
 */
const ButtonExample = () => {
    const handleClick = (variant, size) => {
        alert(`Clicked ${variant} ${size} button`);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1>Button Component Examples</h1>

            {/* Варіанти кнопок */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Варіанти кнопок</h2>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Button variant='primary' onClick={() => handleClick('primary', 'large')}>
                        ЧОРНА
                    </Button>
                    <Button variant='white' onClick={() => handleClick('white', 'large')}>
                        БІЛА
                    </Button>
                    <Button variant='primary' disabled>
                        СІРА (DISABLED)
                    </Button>
                </div>
            </section>

            {/* Розміри кнопок */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Розміри (Sizes)</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <Button variant='primary' size='small'>
                        SMALL
                    </Button>
                    <Button variant='primary' size='large'>
                        LARGE
                    </Button>
                </div>
            </section>

            {/* Стани кнопок */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Стани (States)</h2>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Button variant='primary'>NORMAL</Button>
                    <Button variant='primary' disabled>
                        DISABLED
                    </Button>
                </div>
            </section>

            {/* Повна ширина */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Повна ширина (Full Width)</h2>
                <div style={{ marginBottom: '16px' }}>
                    <Button variant='primary' fullWidth>
                        FULL WIDTH BUTTON
                    </Button>
                </div>
            </section>

            {/* Комбінації з UI кіту */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Приклади з UI кіту</h2>

                <div style={{ marginBottom: '24px' }}>
                    <h3>Приклади з дизайну</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <Button variant='primary'>SIGN IN</Button>
                        <Button variant='white'>SIGN IN</Button>
                        <Button variant='primary'>PUBLISH</Button>
                        <Button variant='white'>ADD RECIPE</Button>
                        <Button variant='primary' disabled>
                            PUBLISH (DISABLED)
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ButtonExample;
