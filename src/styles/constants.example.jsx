import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from './constants';

/**
 * Приклад використання констант стилів
 * Цей компонент показує як правильно використовувати constants.js
 */
const ConstantsExample = () => {
    // Приклад 1: Інлайн стилі з константами
    const headerStyle = {
        backgroundColor: COLORS.PRIMARY,
        color: COLORS.WHITE,
        padding: SPACING.LG,
        fontSize: FONT_SIZES.XL,
        borderRadius: BORDER_RADIUS.MEDIUM,
        marginBottom: SPACING.MD,
    };

    // Приклад 2: Карточка з константами
    const cardStyle = {
        backgroundColor: COLORS.WHITE,
        padding: SPACING.LG,
        borderRadius: BORDER_RADIUS.MEDIUM,
        boxShadow: SHADOWS.LIGHT,
        marginBottom: SPACING.MD,
        border: `1px solid ${COLORS.LIGHT_GRAY}`,
    };

    // Приклад 3: Текст з константами
    const textStyle = {
        fontSize: FONT_SIZES.MEDIUM,
        color: COLORS.DARK_GRAY,
        marginBottom: SPACING.SM,
        lineHeight: 1.5,
    };

    // Приклад 4: Сітка з константами
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: SPACING.MD,
        padding: SPACING.XL,
    };

    return (
        <div style={{ padding: SPACING.LG, backgroundColor: COLORS.BACKGROUND }}>
            <h1>Приклади використання констант</h1>

            {/* Заголовок з константами */}
            <div style={headerStyle}>
                <h2>Заголовок з COLORS.PRIMARY фоном</h2>
            </div>

            {/* Сітка карточок */}
            <div style={gridStyle}>
                {/* Карточка з кольорами */}
                <div style={cardStyle}>
                    <h3 style={{ color: COLORS.PRIMARY, marginBottom: SPACING.SM }}>Кольори</h3>
                    <div style={textStyle}>Використовуємо COLORS.PRIMARY для важливих елементів</div>
                    <div
                        style={{
                            backgroundColor: COLORS.PRIMARY,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.SMALL,
                            marginBottom: SPACING.SM,
                        }}
                    />
                    <div
                        style={{
                            backgroundColor: COLORS.SECONDARY,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.SMALL,
                            marginBottom: SPACING.SM,
                        }}
                    />
                    <div
                        style={{
                            backgroundColor: COLORS.MUTED,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.SMALL,
                        }}
                    />
                </div>

                {/* Карточка з відступами */}
                <div style={cardStyle}>
                    <h3 style={{ color: COLORS.PRIMARY, marginBottom: SPACING.SM }}>Відступи</h3>
                    <div style={textStyle}>Використовуємо SPACING для консистентних відступів</div>
                    <div
                        style={{
                            backgroundColor: COLORS.LIGHT_GRAY,
                            padding: SPACING.XS,
                            marginBottom: SPACING.XS,
                        }}>
                        SPACING.XS = {SPACING.XS}
                    </div>
                    <div
                        style={{
                            backgroundColor: COLORS.LIGHT_GRAY,
                            padding: SPACING.SM,
                            marginBottom: SPACING.XS,
                        }}>
                        SPACING.SM = {SPACING.SM}
                    </div>
                    <div
                        style={{
                            backgroundColor: COLORS.LIGHT_GRAY,
                            padding: SPACING.MD,
                        }}>
                        SPACING.MD = {SPACING.MD}
                    </div>
                </div>

                {/* Карточка з розмірами шрифтів */}
                <div style={cardStyle}>
                    <h3 style={{ color: COLORS.PRIMARY, marginBottom: SPACING.SM }}>Розміри шрифтів</h3>
                    <div style={{ fontSize: FONT_SIZES.SMALL, marginBottom: SPACING.XS }}>
                        FONT_SIZES.SMALL = {FONT_SIZES.SMALL}
                    </div>
                    <div style={{ fontSize: FONT_SIZES.MEDIUM, marginBottom: SPACING.XS }}>
                        FONT_SIZES.MEDIUM = {FONT_SIZES.MEDIUM}
                    </div>
                    <div style={{ fontSize: FONT_SIZES.LARGE, marginBottom: SPACING.XS }}>
                        FONT_SIZES.LARGE = {FONT_SIZES.LARGE}
                    </div>
                    <div style={{ fontSize: FONT_SIZES.XL }}>FONT_SIZES.XL = {FONT_SIZES.XL}</div>
                </div>

                {/* Карточка з закругленнями */}
                <div style={cardStyle}>
                    <h3 style={{ color: COLORS.PRIMARY, marginBottom: SPACING.SM }}>Закруглення</h3>
                    <div style={textStyle}>Різні варіанти BORDER_RADIUS</div>
                    <div
                        style={{
                            backgroundColor: COLORS.MUTED,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.SMALL,
                            marginBottom: SPACING.SM,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: FONT_SIZES.SMALL,
                        }}>
                        SMALL
                    </div>
                    <div
                        style={{
                            backgroundColor: COLORS.MUTED,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.MEDIUM,
                            marginBottom: SPACING.SM,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: FONT_SIZES.SMALL,
                        }}>
                        MEDIUM
                    </div>
                    <div
                        style={{
                            backgroundColor: COLORS.MUTED,
                            height: '40px',
                            borderRadius: BORDER_RADIUS.PILL,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: FONT_SIZES.SMALL,
                        }}>
                        PILL
                    </div>
                </div>
            </div>

            {/* Як НЕ треба робити */}
            <div
                style={{
                    backgroundColor: '#ff4444', // ❌ Хардкожене значення
                    color: '#ffffff', // ❌ Хардкожене значення
                    padding: '16px', // ❌ Хардкожене значення
                    borderRadius: '8px', // ❌ Хардкожене значення
                    marginTop: SPACING.XL,
                }}>
                <h3>❌ НЕ робіть так - хардкожені значення</h3>
                <p>Цей блок використовує хардкожені значення замість констант</p>
            </div>

            {/* Як треба робити */}
            <div
                style={{
                    backgroundColor: COLORS.PRIMARY, // ✅ Використання констант
                    color: COLORS.WHITE, // ✅ Використання констант
                    padding: SPACING.MD, // ✅ Використання констант
                    borderRadius: BORDER_RADIUS.SMALL, // ✅ Використання констант
                    marginTop: SPACING.MD,
                }}>
                <h3>✅ Робіть так - використовуйте константи</h3>
                <p>Цей блок правильно використовує константи з constants.js</p>
            </div>
        </div>
    );
};

export default ConstantsExample;
