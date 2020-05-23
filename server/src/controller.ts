import { Request, Response } from "express";
import User from "./db-config/models/user";

export let login = async (req: Request, res: Response) => {
    await User.findOne({ username: "user1" }, (err: any, user: any[]) => {
        if (err) {
            res.status(501).send("Error!");
        } else if (!user) {
            res.status(401).send("Потребителското име или парола са грешни");
        } else {
            res.send(user);
        }
    }).exec();
};

export let registration = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password && req.body.passwordConf) {

        if (req.body.password !== req.body.passwordConf) {
            res.send("Паролата не съвпада с паролата за потвърждение.");
            return;
        }

        await User.create({ username: req.body.username, password: req.body.password }, function (err: any, user: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                return res.redirect('/profile');
            }
        });
    };
};