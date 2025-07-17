import { useState, useEffect } from 'react';
import axios from 'axios';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import styles from './Testimonials.module.css';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

// Мок даних для відгуків (fallback)
const mockTestimonials = [
    {
        id: 1,
        text: 'This recipe platform has completely transformed my cooking experience! The variety of dishes and clear instructions make it so easy to try new cuisines.',
        author: 'Sarah Johnson',
    },
    {
        id: 2,
        text: "I love how I can share my own recipes and get feedback from the community. It's like having a cookbook that never ends!",
        author: 'Mike Chen',
    },
    {
        id: 3,
        text: 'The recipe filters are incredibly helpful. I can find exactly what I need based on ingredients I have at home.',
        author: 'Emma Rodriguez',
    },
    {
        id: 4,
        text: 'As a beginner cook, this platform has been a game-changer. The step-by-step instructions and tips from other users are invaluable.',
        author: 'David Thompson',
    },
];

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Завантаження відгуків з API
    useEffect(() => {
        const fetchTestimonials = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URL}/testimonials`);

                // Перетворюємо дані з API в потрібний формат
                const apiTestimonials = response.data.testimonials.map(item => ({
                    id: item.id,
                    text: item.testimonial,
                    author: item.user?.name || 'Anonymous',
                }));

                setTestimonials(apiTestimonials);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError('Failed to load testimonials');

                // Використовуємо мок дані як fallback
                setTestimonials(mockTestimonials);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Скидання currentSlide коли змінюються testimonials
    useEffect(() => {
        if (testimonials.length > 0) {
            setCurrentSlide(0);
        }
    }, [testimonials.length]);

    // Автоматичне перегортання слайдів
    useEffect(() => {
        if (testimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % testimonials.length);
            }, 5000); // Кожні 5 секунд

            return () => clearInterval(interval);
        }
    }, [testimonials.length]);

    // Обробник ручного перегортання
    const handleSlideChange = index => {
        setCurrentSlide(index);
    };

    // Обробники для навігації клавіатурою
    useEffect(() => {
        const handleKeyDown = event => {
            if (testimonials.length > 1) {
                if (event.key === 'ArrowLeft') {
                    setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
                } else if (event.key === 'ArrowRight') {
                    setCurrentSlide(prev => (prev + 1) % testimonials.length);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [testimonials.length]);

    if (isLoading) {
        return (
            <section className={styles.testimonials}>
                <div className={styles.testimonialsHeader}>
                    <Subtitle color="dark" align="center" as="h3">
                        What our customer say
                    </Subtitle>
                    <MainTitle color="dark" as="h2">
                        Testimonials
                    </MainTitle>
                </div>
                <div className={styles.loadingMessage}>Loading testimonials...</div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return (
            <section className={styles.testimonials}>
                <div className={styles.testimonialsHeader}>
                    <Subtitle color="dark" align="center" as="h3">
                        What our customer say
                    </Subtitle>
                    <MainTitle color="dark" as="h2">
                        Testimonials
                    </MainTitle>
                </div>
                <div className={styles.loadingMessage}>No testimonials available</div>
            </section>
        );
    }

    return (
        <section className={styles.testimonials}>
            <div className={styles.testimonialsHeader}>
                <Subtitle color="dark" align="center" as="h3">
                    What our customer say
                </Subtitle>
                <MainTitle color="dark">Testimonials</MainTitle>
            </div>

            {error && (
                <div className={styles.errorMessage}>{error} - Showing sample testimonials</div>
            )}

            <div className={styles.testimonialsSlider}>
                <div className={styles.testimonialsContainer}>
                    {testimonials.length > 0 && (
                        <div className={styles.testimonialSlide}>
                            <div className={styles.testimonialContent}>
                                <p className={styles.testimonialText}>
                                    {testimonials[currentSlide].text}
                                </p>
                                <p className={styles.testimonialAuthor}>
                                    {testimonials[currentSlide].author}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {testimonials.length > 1 && (
                    <div className={styles.testimonialsPagination}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.paginationDot} ${
                                    index === currentSlide ? styles.active : ''
                                }`}
                                onClick={() => handleSlideChange(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
            <svg
                className={styles.testimonialsIcon}
                width="59"
                height="48"
                viewBox="0 0 59 48"
                fill="none"
            >
                <path
                    d="M0 48V31.9412C0 25.9412 1.05672 20.4118 3.17015 15.3529C5.28358 10.2941 8.86468 5.17647 13.9134 0L23.0716 7.2353C20.1363 10.1765 17.9055 12.9412 16.3791 15.5294C14.8527 18.1177 13.8547 20.7647 13.3851 23.4706H24.6567V48H0ZM34.3433 48V31.9412C34.3433 25.9412 35.4 20.4118 37.5134 15.3529C39.6269 10.2941 43.208 5.17647 48.2567 0L57.4149 7.2353C54.4796 10.1765 52.2488 12.9412 50.7224 15.5294C49.196 18.1177 48.198 20.7647 47.7284 23.4706H59V48H34.3433Z"
                    fill="#BFBEBE"
                />
            </svg>
        </section>
    );
};

export default Testimonials;
