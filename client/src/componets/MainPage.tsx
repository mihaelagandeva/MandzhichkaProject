import React from 'react'
import { Recipe } from '../model/recipe'
import picture from '../assets/main.jpg'
import { makeStyles, GridList } from '@material-ui/core'
import RecipeCard from './RecipeCard'
import TopAppBar from './TopAppBar'

const musakapic = 'https://lh3.googleusercontent.com/proxy/xIdIfC-Z9xSpn4XkWc7xxumsjdNQX1tCGTLiuBYVOugqqXGyQvlyicuxTbYJc2fu1ksY4J4ah-7NP5ikFPcvRloFusiiv_fg54BIwuEsaFWDkgTOYtaqL2RDYiv8P4DM6PgMQWJ2jbOhljE5cL5AqFsKBQ'
const hardcodedRecipe = {id: 1, title: 'Musakichka', author:'Musakichka Master', date: '06/12/2020', picturePath: musakapic, rating: 4, tags: [{id:1,value: 'musaka'}, {id:2, value:'good'}], summary: 'A very simple recipe to make delicious musaka' }

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFEEDF'
    },
    recipes: {
        marginTop: 20,
        marginLeft: 250,
        marginRight: 250
    }
})

const MainPage = () => {
    const recipes: Recipe[] = [hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe]

    const styles = useStyles();
    
    return (
        <div className={styles.root}>
            <div className="topAppBar">
                <TopAppBar />
            </div>
            <div className="topImage">
                <img src={picture} height='10%' width='100%' alt='img'/>
            </div>
            <div className={styles.recipes}>
                <GridList cellHeight={200} spacing={3}>
                {recipes.map(recipe => 
                    <RecipeCard key={recipe.id} recipe={recipe} />
                    )}
                </GridList>
            </div>
        </div>
    )
}

export default MainPage;
