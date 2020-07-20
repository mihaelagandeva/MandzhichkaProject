import express, { Request, Response } from "express";
import * as controller from "./controller"

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log("Home page");
});

router.get('/recipes/:page/:size/:search?', async (req: Request, res: Response) => {
    await controller.listAllRecipes(req, res);
});

router.get('/recipes/:recipeId', async (req: Request, res: Response) => {
    await controller.getRecipe(req, res);
});

router.put('/recipes/:recipeId', async (req: Request, res: Response) => {
    await controller.updateRecipe(req, res);

});

router.delete('/recipes/:recipeId', async (req: Request, res: Response) => {
    await controller.deleteRecipe(req, res);
});

router.get('/shopping-list', (req: Request, res: Response) => {
    console.log("Get shopping list");
});

router.get('/profile', (req: Request, res: Response) => {
    console.log("Get user information");
});

router.put('/profile', (req: Request, res: Response) => {
    console.log("Update user information");
});

router.post('/login', async (req: Request, res: Response) => {
    await controller.login(req, res);
});

router.post('/registration', async (req: Request, res: Response) => {
    await controller.registration(req, res);
});

router.get('/recipes/favorites', (req: Request, res: Response) => {
    console.log("List of ordered by name user’s favorite recipes");
});

router.get('/recipes/myRecipes', (req: Request, res: Response) => {
    console.log("List of ordered by name user’s recipes");
});

router.post('/recipes/myRecipes/add', async (req: Request, res: Response) => {
    await controller.createRecipe(req, res);
});

router.post('/forgottenPassword', (req: Request, res: Response) => {
    console.log("Form to fill in order to request new password");
});

router.get('/restaurants/:page/:size/:search?', async (req: Request, res: Response) => {
    await controller.getRestaurants(req, res);
});

router.get('/shops', (req: Request, res: Response) => {
    console.log("shops");
});

router.get('/courses', (req: Request, res: Response) => {
    console.log("courses");
});

router.get('/events', (req: Request, res: Response) => {
    console.log("events");
});

router.get('/tags', async (req: Request, res: Response) => {
    await controller.listTags(req, res);
});

router.post('/tags', async (req: Request, res: Response) => {
    await controller.createTags(req, res);
});

router.get('/achievements', (req: Request, res: Response) => {
    console.log("achievements");
});

// so we can create restaurants if we need to
router.post('/restaurants', async (req: Request, res: Response) => { 
    await controller.createRestaurant(req, res);
});