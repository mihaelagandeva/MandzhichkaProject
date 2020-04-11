import express from "express";
import { Recipe } from "../models/recipe";

export const router = express.Router();

router.get('/hello', (req, res) => {
    console.log("Hello " + req.body);
    Recipe.create({ name: "Musakichka" }).then(() => { });
    res.send('Hello response');
});