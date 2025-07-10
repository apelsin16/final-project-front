import IconButton from './IconButton';
import { useState } from 'react';

const IconButtonExample = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        console.log('Favorite toggled:', !isFavorite);
    };

    const handleDeleteClick = () => {
        console.log('Delete clicked');
    };

    const handleArrowClick = () => {
        console.log('Arrow clicked - open recipe');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>IconButton Examples</h3>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <h4>Heart (Favorites):</h4>
                <IconButton
                    icon='heart'
                    filled={isFavorite}
                    onClick={handleFavoriteClick}
                    ariaLabel='Toggle favorite'
                />
                <IconButton
                    icon='heart'
                    filled={isFavorite}
                    onClick={handleFavoriteClick}
                    size='small'
                    ariaLabel='Toggle favorite small'
                />
                <IconButton
                    icon='heart'
                    filled={isFavorite}
                    onClick={handleFavoriteClick}
                    size='large'
                    ariaLabel='Toggle favorite large'
                />
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <h4>Arrow (Open):</h4>
                <IconButton icon='arrow' onClick={handleArrowClick} ariaLabel='Open recipe' />
                <IconButton
                    icon='arrow'
                    onClick={handleArrowClick}
                    variant='filled'
                    ariaLabel='Open recipe filled'
                />
                <IconButton
                    icon='arrow'
                    onClick={handleArrowClick}
                    variant='outlined'
                    ariaLabel='Open recipe outlined'
                />
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <h4>Delete:</h4>
                <IconButton icon='delete' onClick={handleDeleteClick} ariaLabel='Delete recipe' />
                <IconButton
                    icon='delete'
                    onClick={handleDeleteClick}
                    variant='outlined'
                    ariaLabel='Delete recipe outlined'
                />
                <IconButton
                    icon='delete'
                    onClick={handleDeleteClick}
                    disabled
                    ariaLabel='Delete recipe disabled'
                />
            </div>
        </div>
    );
};

export default IconButtonExample;
