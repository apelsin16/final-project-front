import { useState, useEffect } from 'react';
import axios from 'axios';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import styles from './Testimonials.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Мок даних для відгуків (fallback)
const mockTestimonials = [
    {
        id: 1,
        text: "This recipe platform has completely transformed my cooking experience! The variety of dishes and clear instructions make it so easy to try new cuisines.",
        author: "Sarah Johnson"
    },
    {
        id: 2,
        text: "I love how I can share my own recipes and get feedback from the community. It's like having a cookbook that never ends!",
        author: "Mike Chen"
    },
    {
        id: 3,
        text: "The recipe filters are incredibly helpful. I can find exactly what I need based on ingredients I have at home.",
        author: "Emma Rodriguez"
    },
    {
        id: 4,
        text: "As a beginner cook, this platform has been a game-changer. The step-by-step instructions and tips from other users are invaluable.",
        author: "David Thompson"
    }
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
                    author: item.user?.name || 'Anonymous'
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

    // Автоматичне перегортання слайдів
    useEffect(() => {
        if (testimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 5000); // Кожні 5 секунд

            return () => clearInterval(interval);
        }
    }, [testimonials.length]);

    // Обробник ручного перегортання
    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    // Обробники для навігації клавіатурою
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (testimonials.length > 1) {
                if (event.key === 'ArrowLeft') {
                    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                } else if (event.key === 'ArrowRight') {
                    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
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
                <MainTitle color="dark" as="h2">
                    Testimonials
                </MainTitle>
            </div>
            
            {error && (
                <div className={styles.errorMessage}>
                    {error} - Showing sample testimonials
                </div>
            )}
            
            <div className={styles.testimonialsSlider}>
                <div className={styles.testimonialsContainer}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`${styles.testimonialSlide} ${
                                index === currentSlide ? styles.active : ''
                            }`}
                        >
                            <div className={styles.testimonialContent}>
                                <p className={styles.testimonialText}>
                                    "{testimonial.text}"
                                </p>
                                <p className={styles.testimonialAuthor}>
                                    — {testimonial.author}
                                </p>
                            </div>
                        </div>
                    ))}
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
        </section>
    );
};

export default Testimonials; 