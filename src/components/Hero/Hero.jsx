import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../features/modal/modalSlice';
import styles from './Hero.module.css';

// Import floating images
import headerBigImg from '../../assets/images/header-big-image.png';
import headerBigImg2x from '../../assets/images/header-big-image@2x.png';
import headerBigImg3x from '../../assets/images/header-big-image@3x.png';
import headerBigImgMob from '../../assets/images/header-big-image-mob.png';
import headerBigImgMob2x from '../../assets/images/header-big-image-mob@2x.png';
import headerBigImgMob3x from '../../assets/images/header-big-image-mob@3x.png';

import headerSmallImg from '../../assets/images/header-small-image.png';
import headerSmallImg2x from '../../assets/images/header-small-image@2x.png';
import headerSmallImg3x from '../../assets/images/header-small-image@3x.png';
import headerSmallImgMob from '../../assets/images/header-small-image-mob.png';
import headerSmallImgMob2x from '../../assets/images/header-small-image-mob@2x.png';
import headerSmallImgMob3x from '../../assets/images/header-small-image-mob@3x.png';

const Hero = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector(state => state.auth);
    const modalType = useSelector(state => state.modal.modalType);

    const handleAddRecipeClick = () => {
        if (isAuth) {
            navigate('/recipe/add');
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    return (
        <>
            <section className={styles.hero}>
                {/* Hero Content */}
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Improve Your Culinary Talents
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Amazing recipes for beginners in the world of cooking,
                        enveloping you in the aromas and tastes of various
                        cuisines.
                    </p>
                    <button
                        className={styles.heroButton}
                        onClick={handleAddRecipeClick}
                    >
                        <span className={styles.heroButtonText}>
                            Add recipe
                        </span>
                    </button>
                </div>

                {/* Large rotated image */}
                <picture className={styles.bigImage}>
                    <source
                        media="(max-width: 767px)"
                        srcSet={`${headerBigImgMob} 1x, ${headerBigImgMob2x} 2x, ${headerBigImgMob3x} 3x`}
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet={`${headerBigImg} 1x, ${headerBigImg2x} 2x, ${headerBigImg3x} 3x`}
                    />
                    <img
                        src={headerBigImg}
                        alt="Culinary dish"
                        className={styles.bigImageEl}
                    />
                </picture>

                {/* Small rotated image */}
                <picture className={styles.smallImage}>
                    <source
                        media="(max-width: 767px)"
                        srcSet={`${headerSmallImgMob} 1x, ${headerSmallImgMob2x} 2x, ${headerSmallImgMob3x} 3x`}
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet={`${headerSmallImg} 1x, ${headerSmallImg2x} 2x, ${headerSmallImg3x} 3x`}
                    />
                    <img
                        src={headerSmallImg}
                        alt="Small culinary element"
                        className={styles.smallImageEl}
                    />
                </picture>
            </section>
        </>
    );
};

export default Hero;
