import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './AddRecipeForm.module.css';
import stylesInput from '../common/ui/Input/Input.module.css';
import stylesIconButton from '../common/ui/IconButton/IconButton.module.css';
import {
    Input,
    Select,
    FileInput,
    Textarea,
    Button,
    CookTimeInput,
    IconButton,
} from '../common/ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients } from '../../features/ingridient/ingridientsSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { fetchIngredients } from '../../features/ingridient/ingridientsOps';
import { createRecipe } from '../../features/recipe/recipeSlice';

const schema = Yup.object().shape({
    image: Yup.mixed().required('Фото обовʼязкове'),
    title: Yup.string().required('Назва обовʼязкова'),
    description: Yup.string().max(200, 'Максимум 200 символів').required('Опис обовʼязковий'),
    category: Yup.string().required('Оберіть категорію'),
    cookTime: Yup.number().min(1, 'Мінімум 1 хвилина').required('Час обовʼязковий'),
    instruction: Yup.string().max(200, 'Максимум 200 символів').required('Інструкція обовʼязкова'),
});

const AddRecipeForm = () => {
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            image: null,
            title: '',
            description: '',
            category: '',
            cookTime: '',
            instruction: '',
        },
    });

    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const dispatch = useDispatch();
    //   const loading = useSelector(selectLoading);
    //   const error = useSelector(selectError);
    const ingredientsOptions = useSelector(selectIngredients);
    const { categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(fetchCategories());
    }, []);

    const handleImageChange = file => {
        if (file) {
            setValue('image', file, { shouldValidate: true });
        } else {
            setValue('image', null);
        }
    };

    const handleAddIngredient = () => {
        if (ingredientId && ingredientAmount) {
            const existing = selectedIngredients.find(ing => ing.id === ingredientId);
            if (!existing) {
                const ingredient = ingredientsOptions.find(i => i.id === ingredientId);
                setSelectedIngredients(prev => [
                    ...prev,
                    {
                        ingredientId,
                        name: ingredient.name,
                        image: ingredient.img,
                        measure: ingredientAmount,
                    },
                ]);
                setIngredientId('');
                setIngredientAmount('');
            }
        }
    };

    const selectOptions = arr =>
        arr.map(({ id, name }) => ({
            value: id,
            label: name,
        }));

    const handleRemoveIngredient = id => {
        setSelectedIngredients(prev => prev.filter(i => i.ingredientId !== id));
    };

    const handleClear = () => {
        reset();
        setPreviewUrl(null);
        setSelectedIngredients([]);
        setIngredientId('');
        setIngredientAmount('');
    };

    const onSubmit = async data => {
        if (selectedIngredients.length === 0) {
            alert('Додайте хоча б один інгредієнт');
            return;
        }

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('categoryId', data.category);
        formData.append('time', data.cookTime);
        formData.append('instructions', data.instruction);
        formData.append(
            'ingredients',
            JSON.stringify(
                selectedIngredients.map(({ ingredientId, measure }) => ({
                    ingredientId,
                    measure,
                }))
            )
        );

        try {
            dispatch(createRecipe(formData));
            navigate('/user/' + user.id);
        } catch (error) {
            alert('Сталася помилка: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.AddRecipeForm}>
            {/* Фото */}
            <FileInput
                name="image"
                onChange={handleImageChange}
                error={errors.image?.message}
                required
            />
            {/* Назва */}
            <div className={styles.rightSide}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="The name of the recipe"
                            required
                            error={errors.title?.message}
                            className={stylesInput.inputRecipe}
                        />
                    )}
                />

                {/* Опис */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Enter a description of the dish"
                            required
                            error={errors.description?.message}
                            maxLength={200}
                        />
                    )}
                />

                {/* Категорія */}
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'category' }}
                    render={({ field }) => (
                        <Select
                            options={selectOptions(categories)}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select a category"
                            label="category"
                            size="large"
                            required
                            error={errors.category?.message}
                        />
                    )}
                />

                {/* Час приготування */}
                <Controller
                    name="cookTime"
                    control={control}
                    rules={{ required: 'cookTime' }}
                    render={({ field }) => (
                        <CookTimeInput
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.cookTime?.message}
                        />
                    )}
                />

                {/* Інгредієнти */}
                <div className={styles.ingredients}>
                    <Select
                        options={selectOptions(ingredientsOptions)}
                        value={ingredientId}
                        onChange={setIngredientId}
                        placeholder="Add the ingredient"
                        label="Ingredients"
                        required
                        size="large"
                        error={!ingredientId && ingredientAmount ? 'Оберіть інгредієнт' : undefined}
                    />

                    <Input
                        type="text"
                        placeholder="Enter quantity"
                        value={ingredientAmount}
                        onChange={setIngredientAmount}
                        error={!ingredientAmount && ingredientId ? 'Вкажіть кількість' : undefined}
                        className={stylesInput.quantity}
                    />

                    <Button variant="white" onClick={handleAddIngredient} type="button">
                        Add ingredient +
                    </Button>
                </div>

                {/* Список інгредієнтів */}
                <ul className={styles.ingridientList}>
                    {selectedIngredients.map(ing => (
                        <li key={ing.ingredientId} className={styles.ingridient}>
                            <div className={styles.imageWrapper}>
                                <img src={ing.image} alt={ing.name} width="75" />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.ingridientName}>{ing.name}</span>
                                <span className={styles.ingridientQn}>{ing.measure}</span>
                            </div>
                            <IconButton
                                icon="close"
                                onClick={() => handleRemoveIngredient(ing.ingredientId)}
                                className={stylesIconButton.ingridientRemoveButton}
                            />
                        </li>
                    ))}
                </ul>

                {/* Інструкція */}
                <Controller
                    name="instruction"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Enter recipe"
                            required
                            error={errors.instruction?.message}
                            maxLength={200}
                        />
                    )}
                />

                {/* Кнопки */}
                <div className={styles.buttons}>
                    <IconButton icon="delete" onClick={handleClear} ariaLabel="Delete recipe" />
                    <Button type="submit">Publish</Button>
                </div>
            </div>
        </form>
    );
};

export default AddRecipeForm;
