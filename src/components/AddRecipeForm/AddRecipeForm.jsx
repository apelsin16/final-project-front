import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from "./AddRecipeForm.module.css";
import stylesInput from "../common/ui/Input/Input.module.css";
import stylesIconButton from "../common/ui/IconButton/IconButton.module.css";
import { Input, Select, FileInput, Textarea, Button, CookTimeInput, IconButton } from '../common/ui';

const categoryOptions = [
  { value: 'beef', label: 'Beef' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'lamb', label: 'Lamb' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
  { value: 'pasta', label: 'Pasta' },
  { value: 'pork', label: 'Pork' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'side', label: 'Side' },
  { value: 'starter', label: 'Starter' },
];

const ingredientsOption = [
    {
        "_id": "640c2dd963a319ea671e37aa",
        "name": "Squid",
        "desc": "A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.",
        "img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png"
    },{
        "_id": "640c2dd963a319ea671e37f5",
        "name": "Cabbage",
        "desc": "A leafy green or purple vegetable that is often used in salads, coleslaw, and stir-fry dishes, and is also commonly fermented into sauerkraut.",
        "img": "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37f5.png"
    }
]


const schema = Yup.object().shape({
  image: Yup.mixed().required('Фото обовʼязкове'),
  title: Yup.string().required('Назва обовʼязкова'),
  description: Yup.string()
    .max(200, 'Максимум 200 символів')
    .required('Опис обовʼязковий'),
  category: Yup.string().required('Оберіть категорію'),
  cookTime: Yup.number()
    .min(1, 'Мінімум 1 хвилина')
    .required('Час обовʼязковий'),
  instruction: Yup.string()
    .max(200, 'Максимум 200 символів')
    .required('Інструкція обовʼязкова'),
});

const AddRecipeForm = ({
  ingredientsOptions = ingredientsOption,
  onSubmitToBackend, // (formData) => Promise, має кидати помилку або повертати успіх
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const imageFile = watch('image');
  const description = watch('description') || '';
  const instruction = watch('instruction') || '';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue('image', file, { shouldValidate: true });
    }
  };

  const handleAddIngredient = () => {
    if (ingredientId && ingredientAmount) {
      const existing = selectedIngredients.find((ing) => ing._id === ingredientId);
      if (!existing) {
        const ingredient = ingredientsOptions.find((i) => i._id === ingredientId);
        setSelectedIngredients((prev) => [
          ...prev,
          { id: ingredientId, name: ingredient.name, image: ingredient.image, amount: ingredientAmount },
        ]);
        setIngredientId('');
        setIngredientAmount('');
      }
    }
  };

    const selectOptions = ingredientsOptions.map(({ _id, name }) => ({
        value: _id,
        label: name,
    }));


    const handleRemoveIngredient = (id) => {
        setSelectedIngredients((prev) => prev.filter((i) => i.id !== id));
    };

  const handleClear = () => {
    reset();
    setPreviewUrl(null);
    setSelectedIngredients([]);
    setIngredientId('');
    setIngredientAmount('');
  };

  const onSubmit = async (data) => {
    if (selectedIngredients.length === 0) {
      alert('Додайте хоча б один інгредієнт');
      return;
    }

    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('cookTime', data.cookTime);
    formData.append('instruction', data.instruction);
    formData.append('ingredients', JSON.stringify(selectedIngredients));

    try {
      await onSubmitToBackend(formData);
      navigate('/user');
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
                    options={categoryOptions}
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
        <div>
             <Select
                options={selectOptions}
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

            <Button 
                variant='white' 
                onClick={handleAddIngredient}
                type="button"
            >
                Add ingredient +
            </Button>
        </div>

      {/* Список інгредієнтів */}
      <ul className={styles.ingridientList}>
        {selectedIngredients.map((ing) => (
          <li key={ing._id} className={styles.ingridient}>
            <div className={styles.imageWrapper}>
                <img src={ing.img} alt={ing.name} width="50" />
            </div>
            <div className={styles.info}>
                <span className={styles.ingridientName}>{ing.name}</span>
                <span className={styles.ingridientQn}>{ing.amount}</span>
            </div>
            <IconButton icon='close' onClick={() => handleRemoveIngredient(ing.id)} className={stylesIconButton.ingridientRemoveButton}/>
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
        <IconButton icon='delete' onClick={handleClear} ariaLabel='Delete recipe' />
        <Button type="submit">Publish</Button>
      </div>
    </form>
  );
};

export default AddRecipeForm;