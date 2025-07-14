import { useState, useEffect } from 'react';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import styles from './Testimonials.module.css';

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Мок даних для відгуків
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

    // Завантаження відгуків (поки що мок дані)
    useEffect(() => {
        const fetchTestimonials = async () => {
            setIsLoading(true);
            try {
                // TODO: Замінити на реальний API запит
                // const response = await fetch('/api/testimonials');
                // const data = await response.json();
                // setTestimonials(data);
                
                // Поки що використовуємо мок дані
                setTestimonials(mockTestimonials);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Автоматичне перегортання слайдів
    useEffect(() => {
        if (testimonials.length > 0) {
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

    if (isLoading) {
        return (
            <section className={styles.testimonials}>
                <div className={styles.testimonialsHeader}>
                    <Subtitle color="dark" align="center" as="h3">
                        What our users say
                    </Subtitle>
                    <MainTitle color="dark" as="h2">
                        Testimonials
                    </MainTitle>
                </div>
                <div className={styles.loadingMessage}>Loading testimonials...</div>
            </section>
        );
    }

    return (
        <section className={styles.testimonials}>
            <div className={styles.testimonialsHeader}>
                <Subtitle color="dark" align="center" as="h3">
                    What our users say
                </Subtitle>
                <MainTitle color="dark" as="h2">
                    Testimonials
                </MainTitle>
            </div>
            
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
                
                <div className={styles.testimonialsPagination}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.paginationDot} ${
                                index === currentSlide ? styles.active : ''
                            }`}
                            onClick={() => handleSlideChange(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 