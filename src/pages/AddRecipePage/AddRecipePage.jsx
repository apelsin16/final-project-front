import styles from './AddRecipePage.module.css';
import PathInfo from "../../components/common/ui/PathInfo/PathInfo.jsx";
import MainTitle from "../../components/common/ui/MainTitle/MainTitle.jsx";
import Subtitle from "../../components/common/ui/Subtitle/Subtitle.jsx";
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';

function AddRecipePage() {
    return ( 
        <div className="">
            <div className={styles.pathWrapper}>
                <PathInfo
                    currentPage='Add Recipe'
                />
            </div>
            <div className={styles.titleWrapper}>
                <MainTitle
                    color='dark'
                    as='h2'
                    style={{ textAlign: "center" }}
                    centered={false}
                >
                    Add recipe
                </MainTitle>
            </div>
            <Subtitle
                as='h2'
                align='left'
            >
                Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
            </Subtitle>
            <AddRecipeForm />

        </div>
     );
}

export default AddRecipePage;