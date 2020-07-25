import React from "react"
import { makeStyles, GridList } from '@material-ui/core'
import RecipeCard from './RecipeCard'
import TopAppBar from "./TopAppBar"
import picture from '../assets/main.jpg';
import { useQuery } from "helper/useQuery";
import { Recipe } from "model/recipe";

const musakapic = 'https://amiraspantry.com/wp-content/uploads/2019/11/moussaka-I.jpg'
const hardcodedRecipe = { id: 1, name: 'Musakichka', author: 'Musakichka Master', prepTime: 120, date: '06/12/2020', picturePath: musakapic, rating: 4, tags: [{ id: 1, value: 'musaka' }, { id: 2, value: 'good' }], summary: 'A very simple recipe to make delicious musaka', products: [{ name: "potatoes", quantity: 500, metric: "grams" }, { name: "minced meat", quantity: 500, metric: "grams" }] }

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#FFEEDF',
    },
    recipes: {
        marginTop: 10,
        marginLeft: '15%',
        marginRight: '15%'
    }
})

interface DisplayUserRecipesProps{
    load: string;
}

 const DisplayUserRecipes = (props: DisplayUserRecipesProps) => {
     const [allRecipes] = useQuery<Recipe[]>(`${props.load}`,null,[]);

     // we will determine which get request to query like this
    //  if (props.load === "favourites") {
    //      rec = [hardcodedRecipe, hardcodedRecipe, hardcodedRecipe];
    //      recipe=useQuery<Recipe[]>
    //  }
    //  else {
    //      rec = [hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe]
    //  }
    
    const styles = useStyles();
    
    return (
        <div className={styles.root}>
            <TopAppBar />
            <div className="topImage">
                <img src={picture} height='10%' width='100%' alt='img' />
            </div>
        <div className={styles.recipes}>
        <GridList cellHeight={200} spacing={6}>
        {allRecipes.map((recipe: Recipe) =>
           <RecipeCard key={recipe._id} recipe={recipe} />
            )}
            </GridList>
            </div>
        </div>
            )
 }
        
export default DisplayUserRecipes;