import { Request, Response } from "express";
import User from "./db-config/models/user";
import Recipe from "./db-config/models/recipe";
import Tag, {ITag} from "./db-config/models/tag";
import bcrypt from 'bcrypt';
import Restaurant from "./db-config/models/restaurant";
import Product from './db-config/models/product';
import Shop from './db-config/models/shop';

export let login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    await User.findOne({ username: username }, (err: any, user: any) => {
        if (err) {
            res.status(501).send("Error!");
        } else if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send('Error');
                } else if (result) {
                    res.send(user);
                } else {
                    // username is correct but the password is incorrect
                    res.status(401).send("Потребителското име или парола са грешни");
                }
            });
        } else {
            // no user with this username
            res.status(401).send("Потребителското име или парола са грешни");
        }
    }).exec();
};

export let registration = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password && req.body.passwordConf) {

        if (req.body.password !== req.body.passwordConf) {
            res.send("Паролата не съвпада с паролата за потвърждение.");
            return;
        }

        await User.findOne({ username: req.body.username }, (err: any, user: any) => {
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

export let createRecipe = async (req: Request, res: Response) => {
    await Recipe.findOne({ name: req.body.name, author: req.body.author },
        async function (err: any, recipe: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                if (recipe) {
                    res.status(400).send();
                } else {
                    const tagsToBeInserted = await handleTags(req.body.tags, res);
                    await Recipe.create({
                        name: req.body.name,
                        author: req.body.author,
                        date: Date.now(),
                        rating: 0,
                        picturePath: req.body.picturePath,
                        tags: tagsToBeInserted
                    }, function (err: any, recipe: any) {
                        if (err) {
                            console.log(err)
                            res.status(501).send("Error!");
                        } else {
                            res.status(201).send(recipe);
                        }
                    })
                }
            }
        });
};

export let getRecipe = async (req: Request, res: Response) => {
    await Recipe.findOne({ _id: req.params.recipeId },
        function (err: any, recipe: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                if (recipe) {
                    res.status(200).send(recipe);
                } else {
                    res.status(404).send();
                }
            }
        }
    );
};

export let updateRecipe = async (req: Request, res: Response) => {
    await Recipe.updateOne({ _id: req.params.recipeId }, { $set: req.body, $currentDate: { lastModified: true } },
        function (err: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                res.status(200).send();
            }
        }
    );
};

export let deleteRecipe = async (req: Request, res: Response) => {
    await Recipe.deleteOne({ _id: req.params.recipeId },
        function (err: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                res.status(204).send();
            }
        }
    );
};

export let listAllRecipes = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let recipes: any[] = [];
        const query = {}; //should be added later

        await Recipe.find(query, (err: any, result: any[]) => {
            if(err) {
                res.status(501).send("Error!");
            } else {
                recipes = result;
            }
        }).skip(firstRecord).limit(size);

        const totalItems = await Recipe.find(query).countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: recipes,
            totalItems: totalItems
        });
    } else {
        res.status(400).send();
    }
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
            Restaurant.create(body, (err: any, restaurant: any) => {
                if (err) {
                    res.status(400).send(err);
                } else if (restaurant) {
                    res.send('Ресторанта беше създаден успешно');
                } else {
                    res.status(500).send('Грешка, ресторанта не беше създаден');
                }
            });
        }
    });
}

export let createTags = async (req: Request, res: Response) => {
    await Tag.create(req.body, function (err: any, tags: any) {
        if (err) {
            res.status(501).send("Error!");
        } else {
            res.status(201).send(tags);
        }
    });
};

export let listTags = async (_req: Request, res: Response) => {
    await Tag.find(function (err: any, tags: any) {
        if (err) {
            res.status(501).send("Error!");
        } else {
            res.status(200).send(tags);
        }
    });
};

async function handleTags(tags: ITag[], res: Response) {
    let result: any[] = [];
    for (let i = 0; i < tags.length; i++) {
        await Tag.findOne({ value: tags[i].value },
            async function (err: any, tag: any) {
                if (err) {
                    res.status(501).send("Error!");
                } else {
                    if (tag) {
                        result.push(tag);
                    }
                    else {
                        await Tag.create(tags[i], function (err: any, tag: any) {
                            if (err) {
                                res.status(501).send("Error!");
                            } else {
                                result.push(tag);
                            }
                        })
                    }
                }
            }
        )
    }
    return result;
}

export let addProducts = async (req: Request, res: Response) => {
    const {products} = req.body;

    if (products && Array.isArray(products) && products.length) {
        const errorList: any[] = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            await Product.findOne({name: product.name}, async (err: any, result: any) => {
                if (err) {
                    errorList.push(err);
                } else if (result) {
                    errorList.push(`Вече съществува продукт с име '${product.name}'`);
                } else {
                    if (product.name && product.type && product.metrics) {
                        await Product.create(product, (err: any, record: any) => {
                            if (err) {
                                errorList.push(err);
                            } else if (!record) {
                                res.status(500).send(`Грещка при създаване на продукт!`);
                            }
                        });
                    } else {
                        errorList.push('Не бяха предоставени задължителните параметри за продукта');
                    }
                }
            });
        }

        if (errorList.length > 0) {
            res.status(400).send(errorList);
        } else {
            res.send(`Oперацията завърши успешно`);
        }
    } else {
        res.status(400).send('Невалидно тяло на заявката');
    }
}

export let getAllProducts = async (req: Request, res: Response) => {
    Product.find((err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}

export let getShops = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let shop: any[] = [];
        const query = {$or: [ {name: {$regex: search || ''}}, {address: {$regex: search || ''}} ]};

        await Shop.find(query, (err: any, result: any[]) => {
            if (err) {
                res.status(500).send();
            } else {
                shop = result;
            }
        }).skip(firstRecord).limit(size);
        
        const totalItems = await Shop.find(query).countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: shop,
            totalItems: totalItems
        });
    } else {
        res.status(400).send('Липстват задължителните параметри');
    }
}

export let createShop = async (req: Request, res: Response) => {
    const body = req.body;

    Shop.findOne({name: body.name, address: body.address}, (err: any, result: any) => {
        if (err) {
            res.status(400).send(err);
        } else if (result) {
            res.status(400).send('Този магазина вече съществува');
        } else {
            Shop.create(body, (err: any, shop: any) => {
                if (err) {
                    res.status(400).send(err);
                } else if (shop) {
                    res.send('Магазина беше създаден успешно');
                } else {
                    res.status(500).send('Грешка, магазина не беше създаден');
                }
            });
        }
    });
}