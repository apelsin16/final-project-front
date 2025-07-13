import Subtitle from './Subtitle';

const SubtitleExample = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                padding: '20px',
            }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Subtitle Examples</h3>

            {/* Основні приклади з дизайну */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Основные варианты из дизайна:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>ADD RECIPE PAGE:</small>
                        <Subtitle as='h1' align='left'>
                            Add Recipe
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>PROFILE PAGE:</small>
                        <Subtitle as='h1' align='left'>
                            Profile
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>КАТЕГОРИИ:</small>
                        <Subtitle as='h2' align='left'>
                            Categories
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>РЕЦЕПТЫ:</small>
                        <Subtitle as='h2' align='left'>
                            Popular Recipes
                        </Subtitle>
                    </div>
                </div>
            </div>

            {/* Разные размеры */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Разные размеры:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>SMALL SIZE:</small>
                        <Subtitle size='small' as='h3' align='left'>
                            Small Subtitle
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>MEDIUM SIZE (DEFAULT):</small>
                        <Subtitle size='medium' as='h2' align='left'>
                            Medium Subtitle
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>LARGE SIZE:</small>
                        <Subtitle size='large' as='h1' align='left'>
                            Large Subtitle
                        </Subtitle>
                    </div>
                </div>
            </div>

            {/* Центрированные заголовки */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    padding: '20px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Центрированные заголовки:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Subtitle align='center'>Centered Title</Subtitle>
                    <Subtitle align='center' size='small'>
                        Small Centered
                    </Subtitle>
                    <Subtitle align='center' size='large'>
                        Large Centered
                    </Subtitle>
                </div>
            </div>

            {/* Светлая тема */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>Светлая тема (для темного фона):</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Subtitle color='light' align='left'>
                        Light Subtitle
                    </Subtitle>
                    <Subtitle color='light' align='center'>
                        Centered Light
                    </Subtitle>
                    <Subtitle color='light' size='small' align='center'>
                        Small Light
                    </Subtitle>
                </div>
            </div>

            {/* Семантические теги */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Семантические HTML теги:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>
                            as="h1" - главный заголовок страницы
                        </small>
                        <Subtitle as='h1' size='medium' align='left'>
                            Main Page Title
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>as="h2" - заголовок секции</small>
                        <Subtitle as='h2' size='medium' align='left'>
                            Section Title
                        </Subtitle>
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '12px' }}>as="h3" - подзаголовок</small>
                        <Subtitle as='h3' size='small' align='left'>
                            Subsection Title
                        </Subtitle>
                    </div>
                </div>
            </div>

            {/* Адаптивная демонстрация */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#fff3e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Адаптивні розміри:</h4>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>📱 Дуже маленькі екрани (&lt; 480px): 20px / 24px / 28px</li>
                    <li>📱 Мобільні пристрої (480px+): 24px / 28px / 32px</li>
                    <li>📱 Планшети (768px+): 28px / 36px / 44px</li>
                    <li>
                        💻 Десктопи (1024px+): 32px / <strong>40px</strong> / 48px
                    </li>
                    <li>🖥️ Великі екрани (1440px+): 36px / 44px / 52px</li>
                </ul>
                <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#666' }}>
                    * Medium розмір на десктопі = 40px (точно з Figma)
                </p>
            </div>

            {/* Технические характеристики */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#f0f8ff',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Технические характеристики:</h4>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>✅ Шрифт: Mulish ExtraBold (800)</li>
                    <li>✅ Letter spacing: -2%</li>
                    <li>✅ Uppercase трансформация</li>
                    <li>✅ Цвет по умолчанию: #050505</li>
                    <li>✅ 3 размера: small / medium / large</li>
                    <li>✅ Семантические HTML теги (h1-h6)</li>
                    <li>✅ Адаптивный дизайн</li>
                    <li>✅ Плавные анимации</li>
                </ul>
            </div>

            {/* Реальные сценарии использования */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Реальные сценарии использования:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px' }}>
                        <strong>Заголовок страницы добавления рецепта:</strong>
                        <br />
                        <Subtitle as='h1' style={{ fontSize: '24px', lineHeight: '28px' }} align='left'>
                            Add Recipe
                        </Subtitle>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px' }}>
                        <strong>Заголовок страницы профиля:</strong>
                        <br />
                        <Subtitle as='h1' style={{ fontSize: '24px', lineHeight: '28px' }} align='left'>
                            Profile
                        </Subtitle>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px' }}>
                        <strong>Заголовок секции категорий:</strong>
                        <br />
                        <Subtitle
                            as='h2'
                            size='small'
                            style={{ fontSize: '20px', lineHeight: '24px' }}
                            align='left'>
                            Categories
                        </Subtitle>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px' }}>
                        <strong>Заголовок популярных рецептов:</strong>
                        <br />
                        <Subtitle
                            as='h2'
                            size='small'
                            style={{ fontSize: '20px', lineHeight: '24px' }}
                            align='left'>
                            Popular Recipes
                        </Subtitle>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubtitleExample;
