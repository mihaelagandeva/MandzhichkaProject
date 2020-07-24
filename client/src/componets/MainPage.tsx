import React, {useState, useEffect, FunctionComponent} from 'react'
import { Recipe, RecipeReport } from '../model/recipe'
import { makeStyles, GridList } from '@material-ui/core'
import RecipeCard from './RecipeCard'
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';

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

interface MainPageProps {
    search: string;
    updated: boolean;
    setUpdated: Function;
}

const MainPage: FunctionComponent<MainPageProps> = ({search, updated, setUpdated}) => {
    // const recipes: Recipe[] = [hardcodedRecipe, hardcodedRecipe, hardcodedRecipe, hardcodedRecipe]
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [pageSize, setPageSize] = useState(12);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const styles = useStyles();

    const loadRecipes = () => {
        const mandatoryUrl = `${environment.apiUrl}/api/recipes/${page}/${pageSize}`;
        const optionalUrl = search ? `/${search}` : '';
        const finalUrl = mandatoryUrl + optionalUrl;

        axios.get(finalUrl, {withCredentials: true}).then((result: AxiosResponse<RecipeReport>) => {
            const response = result.data;

            setPage(response.page);
            setPageSize(response.size);
            setRecipes(response.resultSet);
            setTotalItems(response.totalItems);

        }).catch((error: AxiosError<string>) => {
            const message = error.message;
        });
    }

    useEffect(() => {
        if (updated) {
            loadRecipes();
            setUpdated(false);
        }
    });

    return (
        <div className={styles.root}>
            <div className={styles.recipes}>
                <GridList cellHeight={200} spacing={6}>
                    { 
                    recipes.map((recipe: Recipe) =>
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    )}
                </GridList>
            </div>
        </div>
    )
}

export default MainPage;