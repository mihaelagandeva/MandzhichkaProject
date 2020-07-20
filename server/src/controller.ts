import { Request, Response } from "express";
import User from "./db-config/models/user";
import Restaurant from "./db-config/models/restaurant";

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

export let getRestaurants = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let restaurants: any[] = [];
        const query = {$or: [ {name: {$regex: search || ''}}, {address: {$regex: search || ''}} ]};

        await Restaurant.find(query, (err: any, result: any[]) => {
            if (err) {
                res.status(500).send();
            } else {
                restaurants = result;
            }
        }).skip(firstRecord).limit(size);
        
        const totalItems = await Restaurant.find(query).countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: restaurants,
            totalItems: totalItems
        });
    } else {
        res.status(400).send('Липстват задължителните параметри');
    }
}

export let createRestaurant = async (req: Request, res: Response) => {
    const body = req.body;

    Restaurant.findOne({name: body.name, address: body.address}, (err: any, result: any) => {
        if (err) {
            res.status(400).send(err);
        } else if (result) {
            res.status(400).send('Този ресторант вече съществува');
        } else {

            Restaurant.create(body).then((restaurant) => {
                if (restaurant) {
                    res.send('Ресторанта беше създаден успешно');
                } else {
                    res.status(500).send('Грешка, ресторанта не беше създаден');
                }
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
    });
}
