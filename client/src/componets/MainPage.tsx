import React from 'react'
import { Recipe } from '../model/recipe'
import { makeStyles, GridList } from '@material-ui/core'
import RecipeCard from './RecipeCard'

const musakapic = 'https://amiraspantry.com/wp-content/uploads/2019/11/moussaka-I.jpg'
const hardcodedRecipe = { id: 1, title: 'Musakichka', author: 'Musakichka Master', date: '06/12/2020', prepTime: 120, picturePath: musakapic, rating: 4, tags: [{ id: 1, value: 'musaka' }, { id: 2, value: 'good' }], summary: 'A very simple recipe to make delicious musaka', products: [{ name: "potatoes", quantity: 500, metric: "grams" }, { name: "minced meat", quantity: 500, metric: "grams" }] }

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFEEDF',
    },
    recipes: {
        marginTop: 10,
        marginLeft: '15%',
        marginRight: '15%'
    }
})

const MainPage = () => {
    const recipes: Recipe[] = [hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe]

    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.recipes}>
                <GridList cellHeight={200} spacing={6}>
                    {recipes.map(recipe =>
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    )}
                </GridList>
            </div>
        </div>
    )
}

export default MainPage;