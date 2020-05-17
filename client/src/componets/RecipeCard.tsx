import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Recipe } from '../model/recipe'
import { Chip } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 350,
            margin: 10,
            border: '2px solid #E1BFBF',
        },
        media: {
            height: 50,
            paddingTop: '56.25%', // 16:9
            objectFit: 'contain'
        },
        tags: {
            margin: 3,
        },
        summary: {
            height: 70,
        }
    }),
);

interface ReciepProps {
    // id: string
    recipe: Recipe // This will be changed to just id when we have the requests 
}


const RecipeCard = (props: ReciepProps) => {
    const [recipe] = useState(props.recipe);   //This will be changed to get request 

    const classes = useStyles()


    return (recipe) ? (
        <Card className={classes.root}>
            <CardHeader
                title={recipe.title}
                subheader={`${recipe.author} - ${recipe.date}`}
            />
            <CardMedia
                className={classes.media}
                image={recipe.picturePath}
                title={recipe.title}
            />
            <CardContent>
                <Typography className={classes.summary} variant="body2" color="textSecondary" component="p">
                    {recipe.summary}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Tags: 
                    {recipe.tags.map(tag => (
                        <Chip className={classes.tags} key={tag.id} label={tag.value} size="small" variant="outlined" />
                    ))}
                </Typography>
            </CardContent>
        </Card>
    ) : (<div>
        No such recipe found
    </div>);
}

export default RecipeCard;