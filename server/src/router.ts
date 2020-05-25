import express, { Request, Response } from "express";
import * as controller from "./controller"

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log("Home page");
});

router.get('/page', (req: Request, res: Response) => {
    console.log("Page with recipes");
});

router.get('/recipes/:recipeId', (req: Request, res: Response) => {
    console.log("Get recipe");
});

router.put('/recipes/:recipeId', (req: Request, res: Response) => {
    console.log("Update recipe");
});

router.delete('/recipes/:recipeId', (req: Request, res: Response) => {
    console.log("Delete recipe");
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

router.post('/recipes/myRecipes/add', (req: Request, res: Response) => {
    console.log("Create recipe");
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

router.get('/tags', (req: Request, res: Response) => {
    console.log("tags");
});

router.post('/tags', (req: Request, res: Response) => {
    console.log("Create tags");
});

router.get('/achievements', (req: Request, res: Response) => {
    console.log("achievements");
});

// so we can create restaurants if we need to
router.post('/restaurants', async (req: Request, res: Response) => { 
    await controller.createRestaurant(req, res);
});