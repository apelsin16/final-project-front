import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import Button from '../common/ui/Button/Button';
import { openModal } from '../../features/modal/modalSlice';
import styles from './Hero.module.css';

const Hero = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector(state => state.auth);

    const handleAddRecipeClick = () => {
        if (isAuth) {
            navigate('/add-recipe');
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <MainTitle color="white" as="h1" centered>
                    Improve Your Culinary Talents
                </MainTitle>
                <Subtitle color="light" align="center" as="p" className={styles.heroSubtitle}>
                    Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.
                </Subtitle>
                <Button variant="white" size="large" onClick={handleAddRecipeClick}>
                    ADD RECIPE
                </Button>
            </div>
            <div className={styles.heroImage}>
                <picture>
                    <source
                        media="(max-width: 767px)"
                        srcSet="/src/assets/images/header-big-image-mob.png 1x, /src/assets/images/header-big-image-mob@2x.png 2x, /src/assets/images/header-big-image-mob@3x.png 3x"
                    />
                    <source
                        media="(min-width: 768px)"
                        srcSet="/src/assets/images/header-big-image.png 1x, /src/assets/images/header-big-image@2x.png 2x, /src/assets/images/header-big-image@3x.png 3x"
                    />
                    <img
                        src="/src/assets/images/header-big-image.png"
                        alt="Culinary inspiration"
                        className={styles.heroImg}
                    />
                </picture>
            </div>
        </section>
    );
};

export default Hero; 