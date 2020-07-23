import { Request, Response } from "express";
import User from "./db-config/models/user";
import Recipe from "./db-config/models/recipe";
import Tag, { ITag } from "./db-config/models/tag";
import bcrypt from 'bcrypt';

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
                    res.cookie('loggedUser', user.username,  { maxAge: 900000, httpOnly: true, secure: true }).send(user);
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
            if (err) {
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

export let getUser = async (req: Request, res: Response) => {
    try {
        const result = await findUser(req, res);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(501).send("Error!");
    }
};


let findUser = async (req: Request, res: Response): Promise<any> => {
    await User.findOne({ _id: req.params.recipeId },
        function (err: any, user: any) {
            if (err) {
                throw new Error();
            } else {
                if (user) {
                    return user;
                } else {
                    return false;
                }
            }
        }
    );
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
