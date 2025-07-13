import Select from './Select';
import { useState } from 'react';

const SelectExample = () => {
    const [category, setCategory] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [size, setSize] = useState('');
    const [categoryError, setCategoryError] = useState('');

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

    const ingredientOptions = [
        { value: 'cabbage', label: 'Cabbage' },
        { value: 'cucumber', label: 'Cucumber' },
        { value: 'tomato', label: 'Tomato' },
        { value: 'corn', label: 'Corn' },
        { value: 'radish', label: 'Radish' },
        { value: 'parsley', label: 'Parsley' },
    ];

    const sizeOptions = [
        { value: 'small', label: 'Small Size' },
        { value: 'medium', label: 'Medium Size' },
        { value: 'large', label: 'Large Size' },
    ];

    const validateCategory = value => {
        if (!value) {
            setCategoryError('Category is required');
        } else {
            setCategoryError('');
        }
    };

    const handleCategoryChange = value => {
        setCategory(value);
        validateCategory(value);
    };

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '500px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}>
            <h3>Select Examples</h3>

            <Select
                options={categoryOptions}
                value={category}
                onChange={handleCategoryChange}
                placeholder='Select a category'
                label='CATEGORY'
                size='large'
                required
                error={categoryError}
            />

            <Select
                options={ingredientOptions}
                value={ingredient}
                onChange={setIngredient}
                placeholder='Add the ingredient'
                label='INGREDIENTS'
                size='large'
            />

            <Select
                options={sizeOptions}
                value={size}
                onChange={setSize}
                placeholder='Choose size'
                label='SIZE (SMALL - 48PX)'
                size='small'
            />

            <Select
                options={categoryOptions}
                value=''
                onChange={() => {}}
                placeholder='Disabled select'
                label='DISABLED SELECT'
                size='large'
                disabled
            />

            <div
                style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                }}>
                <h4>Current Values:</h4>
                <p>
                    <strong>Category:</strong> {category || 'Not selected'}
                </p>
                <p>
                    <strong>Ingredient:</strong> {ingredient || 'Not selected'}
                </p>
                <p>
                    <strong>Size:</strong> {size || 'Not selected'}
                </p>
            </div>

            <div
                style={{
                    padding: '15px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                    fontSize: '14px',
                }}>
                <h4>Features:</h4>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>✅ Клік для відкриття/закриття</li>
                    <li>✅ Клик вне области закрывает селект</li>
                    <li>✅ Escape закрывает селект</li>
                    <li>✅ Стрелка поворачивается при открытии</li>
                    <li>✅ Hover эффекты на опциях</li>
                    <li>✅ Выбранная опция подсвечивается</li>
                    <li>✅ Два размера: 48px и 56px</li>
                </ul>
            </div>
        </div>
    );
};

export default SelectExample;
