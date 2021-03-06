import express, { Request, Response } from "express";
import * as controller from "./controller"

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log("Home page");
});

router.get('/recipes/favorites', async (req: Request, res: Response) => {
    await controller.listUserFavouriteRecipes(req, res);
});

router.post('/recipes/favorites', async (req: Request, res: Response) => {
    await controller.addUserFavouriteRecipes(req, res);
});

router.get('/recipes/myRecipes', async (req: Request, res: Response) => {
    await controller.listUserOwnRecipes(req, res);
});

router.post('/recipes/myRecipes/add', async (req: Request, res: Response) => {
    await controller.createRecipe(req, res);
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

router.get('/shopping-list', async (req: Request, res: Response) => {
    await controller.getShoppingList(req, res);
});

router.put('/shopping-list', async (req: Request, res: Response) => {
    await controller.updateShoppingList(req, res);
});

router.get('/profile', async (req: Request, res: Response) => {
    await controller.findUser(req, res);
});

router.put('/profile', async (req: Request, res: Response) => {
    await controller.updateUser(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
    await controller.login(req, res);
});

router.post('/registration', async (req: Request, res: Response) => {
    await controller.registration(req, res);
});

router.get('/restaurants/:page/:size/:search?/:filter?', async (req: Request, res: Response) => {
    await controller.getRestaurants(req, res);
});

router.get('/shops/:page/:size/:search?', async (req: Request, res: Response) => {
    await controller.getShops(req, res);
});

router.get('/courses/:page/:size/:search?', async (req: Request, res: Response) => {
    await controller.getAllCourses(req, res);
});

router.get('/events/:page/:size/:search?', async (req: Request, res: Response) => {
    await controller.getAllEvents(req, res);
});

router.get('/tags', async (req: Request, res: Response) => {
    await controller.listTags(req, res);
});

router.post('/tags', async (req: Request, res: Response) => {
    await controller.createTags(req, res);
});

router.get('/achievements/:page/:size', async (req: Request, res: Response) => {
    await controller.getAllAchievements(req, res);
});

router.post('/upload', async (req: Request, res: Response) => {
    await controller.uploadPicture(req, res);
});

router.get('/products', async (req: Request, res: Response) => {
    await controller.getAllProducts(req, res);
});

router.post('/products', async (req: Request, res: Response) => {
    await controller.addProducts(req, res);
});

router.post('/restaurants', async (req: Request, res: Response) => {
    await controller.createRestaurant(req, res);
});

router.post('/shops', async (req: Request, res: Response) => {
    await controller.createShop(req, res);
});

router.post('/courses', async (req: Request, res: Response) => {
    await controller.createCourse(req, res);
});

router.post('/events', async (req: Request, res: Response) => {
    await controller.createEvent(req, res);
});

router.put('/courses/:courseId', async (req: Request, res: Response) => {
    await controller.joinCourse(req, res);
});

router.put('/events/:eventId', async (req: Request, res: Response) => {
    await controller.joinEvent(req, res);
});

router.put('/courses/leave/:courseId', async (req: Request, res: Response) => {
    await controller.leaveCourse(req, res);
});

router.put('/courses/leave/:eventId', async (req: Request, res: Response) => {
    await controller.leaveEvent(req, res);
});

router.post('/rating', async (req: Request, res: Response) => {
    await controller.addRating(req, res);
});

router.post('/comment', async (req: Request, res: Response) => {
    await controller.addComment(req, res);
});

router.get('/comment/:recipeId', async (req: Request, res: Response) => {
    await controller.getComment(req, res);
});
router.post('/logout', async (req: Request, res: Response) => {
    await controller.logout(req, res);
});