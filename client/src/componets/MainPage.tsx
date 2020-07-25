import React, {useState, useEffect, FunctionComponent} from 'react'
import { Recipe, RecipeReport } from '../model/recipe'
import { makeStyles, GridList } from '@material-ui/core'
import RecipeCard from './RecipeCard'
import axios, { AxiosResponse, AxiosError } from 'axios';
import {environment} from 'environments/environment.json';
import If from './If';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFEEDF',
    },
    recipes: {
        marginTop: 10,
        marginLeft: '15%',
        marginRight: '15%'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
})

interface MainPageProps {
    search: string;
    updated: boolean;
    setUpdated: Function;
}

const MainPage: FunctionComponent<MainPageProps> = ({search, updated, setUpdated}) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [pageSize, setPageSize] = useState(12);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const styles = useStyles();

    const loadRecipes = (page: number) => {
        const mandatoryUrl = `${environment.apiUrl}/api/recipes/${page}/${pageSize}`;
        const optionalUrl = search ? `/${search}` : '';
        const finalUrl = mandatoryUrl + optionalUrl;

        axios.get(finalUrl, {withCredentials: true, headers: {'content-type': 'application/json'}}).then((result: AxiosResponse<RecipeReport>) => {
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
            loadRecipes(1);
            setUpdated(false);
        }
    });

    const onPageChange = (event: any, value: number) => {
        loadRecipes(value);
    }

    return (
        <div className={styles.root}>
            <div className={styles.recipes}>
                <GridList cellHeight={200} spacing={6}>
                    { 
                    recipes.map((recipe: Recipe) =>
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    )}
                </GridList>
            </div>
            <div className={styles.paginationContainer}>
                <If condition={totalItems > pageSize}>
                    <Pagination
                        count={Math.round(totalItems / pageSize)}
                        page={page}
                        color="primary"
                        onChange={(event, value) => onPageChange(event, value)}
                    />
                </If>
            </div>
        </div>
    )
}

export default MainPage;