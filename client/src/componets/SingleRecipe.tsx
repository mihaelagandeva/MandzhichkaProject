import React, { useState } from 'react'
import { Recipe } from '../model/recipe'
import { makeStyles, Theme } from '@material-ui/core'
import TopAppBar from './TopAppBar';
import picture from '../assets/main.jpg';
import classes from '*.module.css';
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#FFEEDF'
    },
    recipeContainer: {
        marginTop: 35,
        marginLeft: 30,
    },
    image: {
        marginLeft: '10%',
        width: 400,
        float: 'left'
    },
    products: {
        float: 'left',
        marginLeft: 50
    },
    steps: {
        clear: 'both',
        marginTop: 10,
        marginBottom: 50
    },
    rating: {
        marginBottom: 10
    },
    commentsSection: {
        height: 200
    }
}))


interface SingleRecipeProps{
    // id: number   we will use this to make get query later
    recipe: Recipe
}

const SingleRecipe = (props: SingleRecipeProps) => {
    const [recipe] = useState(props.recipe) //will be later changed with a get query

    const styles = useStyles()

    return (
        <div className={styles.root}>
            <div className="topAppBar">
                <TopAppBar />
            </div>
            <div className="topImage">
                <img src={picture} height='10%' width='100%' alt='img' />
            </div>
            <div className={styles.recipeContainer} >
                <h1>{recipe.title}</h1>
                <p>Created by: {recipe.author} on {recipe.date}</p>
                <div>
                <div className={styles.image} >
                    <img height="400" width="400" src={recipe.picturePath} />
                </div>
                    <div className={styles.products}>
                    <Rating className={styles.rating} name="read-only" value={recipe.rating} readOnly />
                    <h3> Products: </h3>
                    {recipe.products?.map(product => <p>{product}</p>)}
                    </div>
                </div>
                <div className={styles.steps} >
                    <h3>Steps:</h3>
                    {recipe.steps?.map((element, index) => 
                        <p key={++index}>{index}. {element}</p>
                    )}
                </div>
                <h2>Comments: </h2>
                <div className={styles.commentsSection} >

                </div>
            </div>
        </div>
    )

}

export default SingleRecipe;