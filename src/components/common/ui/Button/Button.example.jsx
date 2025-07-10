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
                <h2>Варіанти (Variants)</h2>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <Button variant='primary' onClick={() => handleClick('primary', 'medium')}>
                        PRIMARY
                    </Button>
                    <Button variant='secondary' onClick={() => handleClick('secondary', 'medium')}>
                        SECONDARY
                    </Button>
                    <Button variant='outline' onClick={() => handleClick('outline', 'medium')}>
                        OUTLINE
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
                    <Button variant='primary' size='medium'>
                        MEDIUM
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
                    <h3>Sign In варіанти</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <Button variant='secondary' size='medium'>
                            SIGN IN
                        </Button>
                        <Button variant='primary' size='medium'>
                            SIGN IN
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h3>Publish варіанти</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <Button variant='primary' size='medium'>
                            PUBLISH
                        </Button>
                        <Button variant='primary' size='large'>
                            PUBLISH
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h3>Add Recipe варіанти</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <Button variant='outline' size='large'>
                            ADD RECIPE
                        </Button>
                        <Button variant='primary' size='large'>
                            ADD RECIPE
                        </Button>
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <h3>Sign Up / Sign In комбо</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <h4>Sign Up</h4>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    width: '200px',
                                }}>
                                <Button variant='primary' size='medium'>
                                    SIGN UP
                                </Button>
                                <Button variant='primary' size='medium'>
                                    SIGN UP
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h4>Sign In</h4>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    width: '200px',
                                }}>
                                <Button variant='primary' size='medium'>
                                    SIGN IN
                                </Button>
                                <Button variant='primary' size='medium'>
                                    SIGN IN
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ButtonExample;
