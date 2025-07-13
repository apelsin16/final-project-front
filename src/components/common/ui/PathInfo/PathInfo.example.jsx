import PathInfo from './PathInfo';

const PathInfoExample = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                padding: '20px',
            }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>PathInfo Examples</h3>

            {/* Основні приклади з дизайну */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Основные варианты:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>PROFILE PAGE:</small>
                        <PathInfo currentPage='Profile' />
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>ADD RECIPE PAGE:</small>
                        <PathInfo currentPage='Add Recipe' />
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>USER PAGE:</small>
                        <PathInfo currentPage='User Profile' />
                    </div>
                </div>
            </div>

            {/* Кастомные варианты */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Кастомные настройки:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>Кастомный разделитель:</small>
                        <PathInfo currentPage='Settings' separator='>' />
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>Кастомный HOME текст:</small>
                        <PathInfo currentPage='Dashboard' homeText='Main' />
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>Без ссылки (только текст):</small>
                        <PathInfo currentPage='About' withLink={false} />
                    </div>

                    <div>
                        <small style={{ color: '#666', fontSize: '11px' }}>Кастомная ссылка:</small>
                        <PathInfo currentPage='Profile' homeLink='/dashboard' homeText='Dashboard' />
                    </div>
                </div>
            </div>

            {/* Варианты с разными разделителями */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Разные разделители:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <PathInfo currentPage='Recipe Details' separator='/' />
                    <PathInfo currentPage='Recipe Details' separator='>' />
                    <PathInfo currentPage='Recipe Details' separator='•' />
                    <PathInfo currentPage='Recipe Details' separator='→' />
                    <PathInfo currentPage='Recipe Details' separator='|' />
                </div>
            </div>

            {/* Вариант для темного фона */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>
                    Светлый вариант (для темного фона):
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <PathInfo
                        currentPage='Profile'
                        className='light'
                        style={{
                            color: '#ffffff',
                        }}
                    />
                    <PathInfo
                        currentPage='Add Recipe'
                        className='light'
                        style={{
                            color: '#ffffff',
                        }}
                    />
                </div>
            </div>

            {/* Длинные названия страниц */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Длинные названия:</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <PathInfo currentPage='Recipe Management Dashboard' />
                    <PathInfo currentPage='User Profile Settings and Preferences' />
                    <PathInfo currentPage='Advanced Recipe Search and Filtering' />
                </div>
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
                    <li>✅ Шрифт: Mulish Bold (700)</li>
                    <li>✅ Размер: 12px</li>
                    <li>✅ Высота строки: 18px</li>
                    <li>✅ Letter spacing: -2%</li>
                    <li>✅ Uppercase трансформация</li>
                    <li>✅ Цвет: #050505</li>
                    <li>✅ Семантическая навигация</li>
                    <li>✅ Поддержка React Router</li>
                    <li>✅ Полная доступность (a11y)</li>
                </ul>
            </div>

            {/* Використання в реальних сценаріях */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#fff3e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Реальные сценарии использования:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                        <strong>Страница профиля:</strong>
                        <br />
                        <PathInfo currentPage='Profile' />
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                        <strong>Добавление рецепта:</strong>
                        <br />
                        <PathInfo currentPage='Add Recipe' />
                    </div>
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                        <strong>Детали рецепта:</strong>
                        <br />
                        <PathInfo currentPage='Salmon Avocado Salad' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathInfoExample;
