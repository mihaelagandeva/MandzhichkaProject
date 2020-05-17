import { Request, Response } from "express";
import User from "./db-config/models/user";
import bcrypt from 'bcrypt';

export let login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    await User.findOne({username: username}, (err: any, user: any) => {
        if (err) {
            res.status(501).send("Error!");
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send('Error');
                } else if (result) {
                    res.send(user);
                } else {
                    res.status(401).send("Потребителското име или парола са грешни");
                }
            });
        }
    }).exec();
};

export let registration = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password && req.body.passwordConf) {

        if (req.body.password !== req.body.passwordConf) {
            res.send("Паролата не съвпада с паролата за потвърждение.");
            return;
        }

        await User.findOne({username: req.body.username}, (err: any, user: any) => {
            if (!user) {
                User.create({ username: req.body.username, password: req.body.password },
                        function (err: any, user: any) {
                    if (err) {
                        res.status(501).send("Error!");
                    } else {
                        res.send();
                    }
                });
            } else {
                res.status(400).send('Потребителското име е вече заето!');
            }
        });

    };
};