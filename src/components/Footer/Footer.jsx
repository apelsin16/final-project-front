import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <p className={styles.footerLogo}>foodies</p>
                <ul className={styles.socialList}>
                    <li>
                        <a href="#" aria-label="Facebook" className={styles.socialBtn}>
                            <svg width="24" height="24">
                                <use href="/sprite.svg#facebook"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Instagram" className={styles.socialBtn}>
                            <svg width="24" height="24">
                                <use href="/sprite.svg#instagram"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="YouTube" className={styles.socialBtn}>
                            <svg width="24" height="24">
                                <use href="/sprite.svg#youtube"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>

            <hr className={styles.divider} />

            <p className={styles.copy}>&copy;2024, Foodies. All rights reserved</p>
        </footer>
    );
};

export default Footer;
