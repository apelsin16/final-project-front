import MainTitle from './MainTitle';

const MainTitleExample = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {/* Hero секция с белым заголовком */}
            <div
                style={{
                    backgroundColor: '#1a1a1a',
                    padding: '60px 20px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                }}>
                <MainTitle color='white'>Improve Your Culinary Talents</MainTitle>

                <p
                    style={{
                        color: '#cccccc',
                        textAlign: 'center',
                        marginTop: '24px',
                        fontSize: '18px',
                        maxWidth: '600px',
                    }}>
                    Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
                    tastes of various cuisines.
                </p>
            </div>

            {/* Темный заголовок для обычных секций */}
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <MainTitle color='dark' as='h2'>
                    Our Best Recipes
                </MainTitle>

                <p
                    style={{
                        color: '#666',
                        marginTop: '20px',
                        fontSize: '16px',
                    }}>
                    Discover amazing recipes from around the world
                </p>
            </div>

            {/* Заголовок без центрирования */}
            <div style={{ padding: '20px' }}>
                <MainTitle color='dark' centered={false} as='h3'>
                    Categories
                </MainTitle>
            </div>

            {/* Мини демонстрация адаптивности */}
            <div
                style={{
                    padding: '40px 20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                }}>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Адаптивні розміри:</h3>
                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.6',
                    }}>
                    <li>📱 Мобільні пристрої (&lt; 480px): 40px</li>
                    <li>📱 Мобільні пристрої (480px+): 48px</li>
                    <li>📱 Планшети (768px+): 70px</li>
                    <li>💻 Десктопи (1024px+): 90px</li>
                    <li>🖥️ Великі екрани (1440px+): 100px</li>
                </ul>
            </div>

            {/* Демонстрация разных тегов */}
            <div
                style={{
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                }}>
                <h4 style={{ marginBottom: '20px', color: '#333' }}>Семантичні теги:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>as="h1" (по умолчанию)</small>
                        <MainTitle color='dark' style={{ fontSize: '32px', lineHeight: '32px' }}>
                            Main Page Title
                        </MainTitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>as="h2"</small>
                        <MainTitle color='dark' as='h2' style={{ fontSize: '28px', lineHeight: '28px' }}>
                            Section Title
                        </MainTitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>as="h3"</small>
                        <MainTitle color='dark' as='h3' style={{ fontSize: '24px', lineHeight: '24px' }}>
                            Subsection Title
                        </MainTitle>
                    </div>
                </div>
            </div>

            {/* Информация о шрифте */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Технічні характеристики:</h4>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>✅ Шрифт: Mulish ExtraBold (800)</li>
                    <li>✅ Uppercase трансформація</li>
                    <li>✅ Letter spacing: -2%</li>
                    <li>✅ Центроване вирівнювання</li>
                    <li>✅ Адаптивні розміри</li>
                    <li>✅ Оптимізація рендерингу</li>
                    <li>✅ Семантичні HTML теги</li>
                </ul>
            </div>
        </div>
    );
};

export default MainTitleExample;
