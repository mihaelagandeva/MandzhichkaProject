import React, { useState, useEffect } from 'react'
import { Recipe } from '../model/recipe'
import { makeStyles, Theme, Button, TextField } from '@material-ui/core'
import TopAppBar from './TopAppBar';
import picture from '../assets/main.jpg';
import Rating from '@material-ui/lab/Rating';
import TimerIcon from '@material-ui/icons/Timer';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useParams } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from "axios"
import { environment } from '../environments/environment.json';
import { ShoppingListModel } from '../model/shoppingList';
import {Comment} from '../model/comment'
import { useQuery } from 'helper/useQuery';

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


const SingleRecipe = () => {
    const { id } = useParams<{ id: string }>()
    const [recipe] = useQuery<Recipe | null>(`/recipes/${id}`, null, null)
    const user = document.cookie.includes('loggedUser')
    const [haveBeenAdded, setHaveBeenAdded] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false);
    const [isAddedToFav, setIsAddedToFav] = useState(false)
    const [comments, setCommentList] = useState<Comment[] | undefined>([]);
    const [comment, setComment] = useState("");
    const [usersFavourites] = useQuery<Recipe[]>('recipes/favorites', null, []);
    const [shoppingList, setShoppingList] = useState<ShoppingListModel>({entities:[] })
    
    const checkIfIsFavourite = () => {
        if (recipe?._id) {
            for (let i = 0; i < usersFavourites.length; i++){
                if (usersFavourites[i]._id === recipe._id)
                    return true;
            }
        }
        return false;
    }
    
    const addToFavourites = () => {
        const newFavs = usersFavourites.concat(recipe!)
        const body = { favourites: newFavs }
        axios.put(`${environment.apiUrl}/api/profile`, body, { withCredentials: true })
        setIsAddedToFav(true)
    }

    const addComment = () => {
        const body = {recipeId: id, text: comment}
        axios.post(`${environment.apiUrl}/api/comment`, body, { withCredentials: true }).then(() => {
            setIsCommenting(false);
            getAllComments();
        });
    }
    
    const addProductsToList = () => {
        if (recipe?.products) {
            const p = recipe.products;
            const arr: {product: {name: string}, quantity: number, metrics: string}[] = [];
            p.forEach(el => arr.push({product: {name: el.name}, quantity: el.quantity, metrics: el.metrics}))
            axios.put(`${environment.apiUrl}/api/shopping-list`, arr, { withCredentials: true }).then();
        }
        setHaveBeenAdded(true);
    }

    const getAllComments = () => {
        axios.get(`${environment.apiUrl}/api/comment/${id}`, {withCredentials: true})
            .then((comments: AxiosResponse<Comment[]>) => {
            setCommentList(comments.data);
        });
    }

    const getShoppingList = () => {
        axios.get(`${environment.apiUrl}/api/shopping-list`,{ withCredentials: true })
            .then((shoppingList: AxiosResponse<ShoppingListModel>) => {
            setShoppingList(shoppingList.data);
        });
    }


    const formatDate = (date: string): string => {
        return date.replace('T', ' ').split('.')[0];
    }

    useEffect(() => {
        getShoppingList();
        getAllComments();
    }, []);
    
    const styles = useStyles()
    
    return (
        <>
            {recipe ?
                <div className={styles.root}>
                    <div className="topAppBar">
                        <TopAppBar />
                    </div>
                    <div className="topImage">
                        <img src={picture} height='10%' width='100%' alt='img' />
                    </div>
                    <div className={styles.recipeContainer} >
                        <h1 style={{ float: "left" }}>{recipe.name}</h1>
                        {user ?
                            <div style={{ float: "left", padding: 10 }}>
                                {checkIfIsFavourite() || isAddedToFav ?
                                    <Button disabled size="large">
                                        <StarIcon fontSize="large" />
                                    </Button>
                                    :
                                    <Button size="large" onClick={() => addToFavourites()}>
                                        <StarBorderIcon fontSize="large" />
                                    </Button>

                                }
                            </div> : ""}
                            <p style={{ clear: "both" }} className={styles.creator}>
                                Създадена на {formatDate(recipe.date)}
                            </p>
                        <div>
                            <h3>Описание: </h3>
                            <p>{recipe.summary}</p>
                            <div className={styles.image} >
                                <img height="400" width="400" src={recipe.picturePath} />
                            </div>
                            <div className={styles.products}>
                                <Rating className={styles.rating} name="read-only" value={recipe.rating} readOnly />
                                <div style={{ float: "left", marginLeft: 40 }}>
                                    <TimerIcon />
                                </div>
                                <h3 style={{ float: "left", marginLeft: 10, marginTop: -1 }}>{recipe.prepTime} мин.</h3>
                                <h3 style={{ clear: "both" }}> Продукти: </h3>
                                {recipe.products?.map(product => <p>{product.name} - {product.quantity} {product.metrics}</p>)}
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
                            {comments?.map(comment =>
                                <div style={{ marginTop: 10, border: '1px solid black', padding: 10, width: "40%" }}>
                                    <h4 style={{ margin: 0 }}>Публикувано на {formatDate(comment.date)}</h4>
                                    <div style={{ margin: 10 }}>
                                        {comment.text}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.commentsSection}>
                
                            {user && !isCommenting ?
                                <div style={{ marginTop: 20, width: "58%", float: "right" }}>
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
                :
                "No recipe"
            }
            </>
                )
                
            }
            
            export default SingleRecipe;