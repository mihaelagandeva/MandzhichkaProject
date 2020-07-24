import React, { useState } from 'react'
import { Recipe } from '../model/recipe'
import { makeStyles, Theme, Button, TextField } from '@material-ui/core'
import TopAppBar from './TopAppBar';
import picture from '../assets/main.jpg';
import Rating from '@material-ui/lab/Rating';
import TimerIcon from '@material-ui/icons/Timer';


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
        float: "left",
        marginBottom: 10
    },
    commentsSection: {
        height: 200
    },
    creator: {
        fontSize: 15,
        fontStyle: 'italic'
    },
    inputField: {
        flex: 1,
        minWidth: 800,
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: '#ffffff'
    },
}))


interface SingleRecipeProps {
    // id: number   we will use this to make get query later
    recipe: Recipe
}

const SingleRecipe = (props: SingleRecipeProps) => {
    const { recipe } = props //will be later changed with a get query
    const user = "some";
    const [haveBeenAdded, setHaveBeenAdded] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false);
    const [comment, setComment] = useState("");
    
    const addComment = () => {
        // query to add comment
        
        setIsCommenting(false)
    }
    
    const addProductsToList = () => {
        // query to add products to list
        setHaveBeenAdded(true);
    }
    
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
        <p className={styles.creator}>Създадена от: {recipe.author} на {recipe.date}</p>
        <div>
        <h3>Описание: </h3>
        <p>{recipe.summary}</p>
        <div className={styles.image} >
        <img height="400" width="400" src={recipe.picturePath} />
        </div>
        <div className={styles.products}>
        <Rating className={styles.rating} name="read-only" value={recipe.rating} readOnly />
        <div style={{float:"left", marginLeft: 40}}>
        <TimerIcon />
        </div>
        <h3 style={{ float: "left", marginLeft: 10, marginTop: -1 }}>{recipe.prepTime} мин.</h3> 
        <h3 style={{clear: "both"}}> Продукти: </h3>
        {recipe.products?.map(product => <p>{product.name} - {product.quantity} {product.metric}</p>)}
        {haveBeenAdded ?
            <Button variant="contained" disabled>
            Продуктите бяха добавени
            </Button>
            :
            <Button variant="contained" onClick={() => addProductsToList()}>
            Добави в шопинг листа
            </Button>
        }
        </div>
        </div>
        <div className={styles.steps} >
        <h3>Стъпки:</h3>
        {recipe.steps?.map((element, index) =>
            <p key={++index}>{index}. {element}</p>
            )}
            </div>
            <h2>Коментари: </h2>
            <div className={styles.commentsSection} >
            {recipe.comments?.map(comment => 
                <div style={{ marginTop: 10, border: '1px solid black', padding: 10, width: "40%"}}>
                <h4 style={{margin:0}}>Oт {comment.author} на {comment.date}:</h4>
                <div style={{margin: 10}}>
                {comment.text}
                </div>
                </div>
                )}
                </div>
                <div className={styles.commentsSection}>
                
                {user && !isCommenting ?
                    <div style={{marginTop: 20, width:"58%", float:"right"}}>
                    <Button variant="contained" onClick={() => setIsCommenting(true)}>
                    Добави коментар
                    </Button>
                    </div>
                    :
                    isCommenting ? 
                    <>
                    <TextField
                    className={styles.inputField}
                    id="comment"
                    name="comment"
                    label="Коментар"
                    variant="outlined"
                    multiline
                    
                    onChange={e => setComment(e.target.value)}
                    onBlur={e => setComment(e.target.value)}
                    />
                    <div style={{ marginTop: 20, width: "58%", float: "right" }}>
                    <Button variant="contained" onClick={() => addComment()}>
                    Публикувай коментар
                    </Button>
                    </div>
                    </>
                    :
                    ""
                }
                </div>
                
                
                </div>
                </div>
                )
                
            }
            
            export default SingleRecipe;