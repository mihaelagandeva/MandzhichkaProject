import { Request, Response } from "express";
import User, { IUser } from "./db-config/models/user";
import { resolve } from 'path';
import Recipe from "./db-config/models/recipe";
import Tag, { ITag } from "./db-config/models/tag";
import bcrypt from 'bcrypt';
import Restaurant from "./db-config/models/restaurant";
import Product from './db-config/models/product';
import Course from './db-config/models/courses';
import Event from './db-config/models/event';
import Shop from './db-config/models/shop';
import Achievement from "./db-config/models/achievements";
import Comment from './db-config/models/comment';
import Rating from "./db-config/models/rating";
import ShoppingList from "./db-config/models/shoppingList";

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
                    res.cookie('loggedUser', user.username, { maxAge: 900000, httpOnly: true }).send(user);
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
                            ShoppingList.create({ user: user, entities: [] }, (err: any, shoppingList: any) => {
                                if (err) {
                                    res.status(501).send();
                                } else {
                                    res.status(201).send({ user: user, shoppingList: shoppingList });
                                }
                            })
                        }
                    });
            } else {
                res.status(400).send('Потребителското име е вече заето!');
            }
        });
    };
};

export let createRecipe = async (req: Request, res: Response) => {
    await Recipe.findOne({ name: req.body.name, 'author.username': req.body.author },
        async function (err: any, recipe: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                if (recipe) {
                    res.status(400).send();
                } else {
                    const tagsToBeInserted = await handleTags(req.body.tags, res);
                    let author;
                    await User.findOne({ username: req.body.author }, function (err: any, user: any) {
                        if (err) {
                            res.status(501).send();
                        } else {
                            author = user;
                        }
                    });
                    await Recipe.create({
                        name: req.body.name,
                        author: author,
                        summary: req.body.summary,
                        date: Date.now(),
                        rating: 0,
                        picturePath: req.body.picturePath,
                        products: req.body.products,
                        tags: tagsToBeInserted,
                        preparationTime: req.body.preparationTime,
                        steps: req.body.steps
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

export const uploadPicture = async (req: Request, res: Response) => {
    if (!req.files) {
        return res.status(400).send('Няма качен файл')
    }

    const { file } = req.files;
    if (!Array.isArray(file)) {
        const path = resolve(`${__dirname}/../../client/public/uploads/${file.name}`);
        console.log(path)
        file.mv(path, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err)
            }

            res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
        })
    }
};

export let getRecipe = async (req: Request, res: Response) => {
    await Recipe.findOne({ _id: req.params.recipeId },
        async function (err: any, recipe: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                if (recipe) {
                    await Comment.find({ recipeId: req.params.recipeId }, (err: any, comments: any[]) => {
                        if (err) {
                            res.status(501).send();
                        } else {
                            let result = { recipe: recipe, comments: comments };
                            res.status(200).send(result);
                        }
                    })
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

export let listUserFavouriteRecipes = async (req: Request, res: Response) => {
    await User.findOne({ username: req.cookies.loggedUser }, function (err, user) {
        if (err) {
            res.status(501).send();
        } else {
            if (user) {
                res.status(200).send(user?.favourites);
            } else {
                res.status(400).send();
            }
        }
    })
};

export let listUserOwnRecipes = async (req: Request, res: Response) => {
    await Recipe.find({ 'author.username': req.cookies.loggedUser }, function (err, recipes) {
        if (err) {
            res.status(501).send();
        } else {
            if (recipes) {
                res.status(200).send(recipes);
            } else {
                res.status(400).send();
            }
        }
    })
};

export let getRestaurants = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let restaurants: any[] = [];
        const query = { $or: [{ name: { $regex: search || '' } }, { address: { $regex: search || '' } }] };

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

    Restaurant.findOne({ name: body.name, address: body.address }, (err: any, result: any) => {
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

export let findUser = async (req: Request, res: Response): Promise<any> => {
    await User.findOne({ username: req.cookies.loggedUser },
        function (err: any, user: any) {
            if (err) {
                res.status(501).send();
            } else {
                if (user) {
                    return res.status(200).send(user);
                } else {
                    return res.status(404).send();
                }
            }
        }
    );
};

export let updateUser = async (req: Request, res: Response) => {
    await User.updateOne({ _id: req.cookies.loggedUser }, { $set: req.body, $currentDate: { lastModified: true } },
        function (err: any) {
            if (err) {
                res.status(501).send("Error!");
            } else {
                res.status(200).send();
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

export let addProducts = async (req: Request, res: Response) => {
    const { products } = req.body;

    if (products && Array.isArray(products) && products.length) {
        const errorList: any[] = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            await Product.findOne({ name: product.name }, async (err: any, result: any) => {
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

export let createCourse = async (req: Request, res: Response) => {
    const { body } = req;

    if (body.name && body.date) {
        const { name, date } = body;

        await Course.findOne({ name: name, date: date }, async (err: any, result: any) => {
            if (err) {
                res.status(400).send(err);
            } else if (result) {
                res.status(400).send('Този курс вече съществува');
            } else {
                await Course.create(body, (err: any, record: any) => {
                    if (err) {
                        res.status(400).send(err);
                    } else if (record) {
                        res.send('Курса беше създаден успешно');
                    } else {
                        res.status(500).send('Грешка при създаване на курса');
                    }
                });
            }
        });
    } else {
        res.status(400).send('Навалидно тяло на заявката');
    }
}

export let getAllCourses = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let courses: any[] = [];
        const query = { $or: [{ name: { $regex: search || '' } }, { address: { $regex: search || '' } }] };

        await Course.find(query, (err: any, records: any[]) => {
            if (err) {
                res.status(500).send();
            } else {
                courses = records.map((record) => {
                    return {
                        id: record._id,
                        name: record.name,
                        date: record.date,
                        address: record.address,
                        picturePath: record.picturePath,
                        duration: record.duration.quantity.toString() + " " + record.duration.metric,
                        joined: record.participants
                            .find((user: any) => user.username === req.cookies.loggedUser) !== undefined,
                        canJoin: req.cookies.loggedUser !== undefined
                    };
                });;
            }
        }).skip(firstRecord).limit(size);

        const totalItems = await Shop.find(query).countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: courses,
            totalItems: totalItems
        });
    } else {
        res.status(400).send('Липстват задължителни параметери');
    }
}

export let createEvent = async (req: Request, res: Response) => {
    const { body } = req;

    if (body.name && body.date) {
        const { name, date } = body;

        await Event.findOne({ name: name, date: date }, async (err: any, result: any) => {
            if (err) {
                res.status(400).send(err);
            } else if (result) {
                res.status(400).send('Това събитие вече съществува');
            } else {
                await Event.create(body, (err: any, record: any) => {
                    if (err) {
                        res.status(400).send(err);
                    } else if (record) {
                        res.send('Събитието беше създадено успешно');
                    } else {
                        res.status(500).send('Грешка при създаване на събитието');
                    }
                });
            }
        });
    } else {
        res.status(400).send('Навалидно тяло на заявката');
    }
}

export let getAllEvents = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let events: any[] = [];
        const query = { $or: [{ name: { $regex: search || '' } }, { address: { $regex: search || '' } }] };

        await Event.find(query, (err: any, records: any[]) => {
            if (err) {
                res.status(500).send();
            } else {
                events = records.map((record) => {
                    return {
                        id: record._id,
                        name: record.name,
                        date: record.date,
                        address: record.address,
                        picturePath: record.picturePath,
                        duration: record.duration.quantity.toString() + " " + record.duration.metric,
                        joined: record.participants
                            .find((user: any) => user.username === req.cookies.loggedUser) !== undefined,
                        canJoin: req.cookies.loggedUser !== undefined
                    };
                });;
            }
        }).skip(firstRecord).limit(size);

        const totalItems = await Event.find(query).countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: events,
            totalItems: totalItems
        });
    } else {
        res.status(400).send('Липстват задълбителни параметри');
    }
}
export let getShops = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let shop: any[] = [];
        const query = { $or: [{ name: { $regex: search || '' } }, { address: { $regex: search || '' } }] };

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

export let joinCourse = async (req: Request, res: Response) => {
    const currentUser = await getUserByCookie(req);

    if (currentUser) {
        const { courseId } = req.params;

        Course.updateOne({ _id: courseId }, { $push: { participants: currentUser } },
            (err: any, result: any) => {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {
                    res.send('Записването за курса беше успешно');
                }
            });
    } else {
        res.status(401).send();
    }
}

export let joinEvent = async (req: Request, res: Response) => {
    const currentUser = getUserByCookie(req);

    if (currentUser) {
        const { eventId } = req.params;

        Event.updateOne({ _id: eventId }, { $push: { participants: currentUser } },
            (err: any, result: any) => {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {
                    res.send('Бяхте записани за събитието успешно');
                }
            })
    } else {
        res.status(401).send();
    }
}

export let leaveCourse = async (req: Request, res: Response) => {
    const currentUser = getUserByCookie(req);

    if (currentUser) {
        const { courseId } = req.params;

        Course.updateOne({ _id: courseId }, { $pull: { participants: currentUser } },
            (err: any, result: any) => {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {
                    res.send();
                }
            });
    } else {
        res.status(401).send();
    }
}

export let leaveEvent = async (req: Request, res: Response) => {
    const currentUser = getUserByCookie(req);

    if (currentUser) {
        const { courseId } = req.params;

        Event.updateOne({ _id: courseId }, { $pull: { participants: currentUser } },
            (err: any, result: any) => {
                if (err) {
                    res.status(500).send(err);
                } else if (result) {
                    res.send();
                }
            });
    } else {
        res.status(401).send();
    }
}

export let getAllAchievements = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const size = Number(req.params.size);

    if (page && size) {
        const firstRecord = (page - 1) * size;
        const search = req.params.search;
        let achievements: any[] = [];

        await Achievement.find((err: any, result: any[]) => {
            if (err) {
                res.status(500).send();
            } else {
                achievements = result;
            }
        }).skip(firstRecord).limit(size);

        const totalItems = await Achievement.find().countDocuments();

        res.send({
            page: page,
            size: size,
            resultSet: achievements,
            totalItems: totalItems
        });
    } else {
        res.status(400).send();
    }
};

export let createShop = async (req: Request, res: Response) => {
    const body = req.body;

    Shop.findOne({ name: body.name, address: body.address }, (err: any, result: any) => {
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
};

export let addRating = async (req: Request, res: Response) => {
    await Rating.create({
        recipeId: req.body.recipeId,
        userId: req.cookies.loggedUser,
        value: req.body.value
    }, (err: any, _rating: any) => {
        if (err) {
            res.status(501).send();
            return;
        }
    });

    let sum = 0;
    let size = 0;
    await Rating.find({ recipeId: req.body.recipeId }, (err: any, ratings: any[]) => {
        if (err) {
            res.status(501).send();
            return;
        } else {
            if (ratings) {
                sum = ratings.reduce((sum, current) => sum + current.value, 0);
                size = ratings.length;
            }
        }
    });

    const newRating = sum / size;
    await Recipe.updateOne({ _id: req.body.recipeId }, { rating: newRating }, (err: any, recipe: any) => {
        if (err) {
            res.status(501).send();
        } else {
            res.status(201).send();
        }
    });

};

export let addComment = async (req: Request, res: Response) => {
    const authoR = await getUserByCookie(req);
    await Comment.create({
        author: authoR,
        recipeId: req.body.recipeId,
        text: req.body.text,
        date: Date.now()
    }, (err: any, comment: any) => {
        if (err) {
            res.status(501).send();
        } else {
            res.status(201).send(comment);
        }
    })
};

export let getShoppingList = async (req: Request, res: Response) => {
    const user = await getUserByCookie(req);
    if (user) {
        await ShoppingList.findOne({ 'user.username': user.username }, (err: any, shoppingList: any) => {
            if (err) {
                res.status(501).send();
            } else {
                res.status(200).send(shoppingList);
            }
        })
    }
};

export let updateShoppingList = async (req: Request, res: Response) => {
    const user = await getUserByCookie(req);
    if (user) {
        await ShoppingList.updateOne({ 'user.username': user.username }, { $set: req.body, $currentDate: { lastModified: true } },
            function (err: any) {
                if (err) {
                    res.status(501).send("Error!");
                } else {
                    res.status(200).send();
                }
            }
        );
    }
};


export let logout = async (req: Request, res: Response) => {
    res.status(200).clearCookie("loggedUser").send();
};

let getUserByCookie = async (req: Request): Promise<IUser | undefined> => {
    let result;
    if (req.cookies.loggedUser) {
        await User.findOne({ username: req.cookies.loggedUser }).then((user) => {
            result = user;
        }).catch((err) => {
            result = undefined;
        });
    }

    return result;
}
