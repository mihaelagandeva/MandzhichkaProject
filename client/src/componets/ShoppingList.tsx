import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, TextField, Select } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import TopAppBar from './TopAppBar';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ProductSelect } from './ProductSelect';


const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '40%',
        height: '60%',
        left: '30%',
        top: '20%',
        backgroundColor: "#f0ca99",
        overflow: "scroll"
    },
    button: {
        float: "left",
        marginTop: 20
    }
})

const ShoppingList = () => {
    const [products, setProducts] = useState<{ name: string, quantity: number, metric: string }[]>([]);
    const [newProducts, setNewProducts] = useState<{ name: string, quantity: number, metric: string }[]>([{ name: "", quantity: 0, metric: "" }])
    const [isEditing, setIsEditing] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const allProducts = [{ name: 'Eggs', metric: ['number'] }, { name: 'Flour', metric: ['spoon', 'cup', 'teaspoon'] }, { name: "Milk", quantity: 1, metric: ["cups"] } , { name: 'Cacao', metric: ['spoon', 'cup', 'teaspoon'] }]
    const styles = useStyles()

    const handleDelete = (index:number) => {
        const list = [...products];
        list.splice(index, 1);
        setProducts(list);
    }

    const handleChange = () => {
        setIsEditing(false)
    }

    const handleQuantityChange = (e: any, index: number) => {
        const quantity = e.target.value;
        const list = [...products];
        const name = list[index].name;
        const metric = list[index].metric;
        list[index] = { name, quantity, metric };
        setProducts(list)
    }

    const handleMetricChange = (e: any, index: number ) => {
        const metric = e.target.value;
        const list = [...products];
        const name = list[index].name;
        const quantity = list[index].quantity
        list[index] = { name, quantity, metric };
        setProducts(list);
    };

    const handleAdding = () => {
        const result = products.concat(newProducts)
        setProducts(result);
        setNewProducts([{ name: "", quantity: 0, metric: "" }])
        setIsAdding(false);
    }

    return (
        <>
            <TopAppBar />
        <div className={styles.root}>
                <h1 style={{ textAlign: "center" }}>Шопинг лист</h1>
                {products.length === 0 ? 
                    <>
                        {isAdding ?
                            <>
                                <div style={{marginLeft: 20}}>
                                <ProductSelect productList={newProducts} setProductList={setNewProducts} />
                                </div>
                                    <div style={{ clear: "both" }}>
                                    <Button style={{ float: "right", marginTop: 10 }} size="large" onClick={handleAdding}>
                                        <CheckIcon fontSize="large" />
                                    </Button>
                                </div>
                            </>
                            :
                            <>
                            <h3 style={{ textAlign: "center", marginTop: "20%" }}> Нямате продукти в списъка</h3>
                            <div style={{ float: "right" }}>
                                <Button className={styles.button} onClick={() => setIsAdding(true)}>
                                        <AddShoppingCartIcon fontSize="large" />
                                </Button>
                                </div>
                                </>
                        }
                    </>
                :
                <div>
                        {products.map((elem, index) => 
                            isEditing ?
                                <div style={{ clear: "both" }}>
                                    <p style={{ fontSize: 26, marginLeft: 20, float: "left" }}>{elem.name} - </p>
                                    <input style={{ width: 100, marginTop: 30, marginLeft: 20, padding: 8 }} type="number" value={elem.quantity}
                                        onChange={e => handleQuantityChange(e, index)}
                                    />
                                    <Select
                                        native
                                        value={elem.metric || ""}
                                        onChange={e => handleMetricChange(e, index)}
                                        inputProps={{
                                            name: 'metric',
                                            id: 'metric',
                                        }}
                                    >
                                        {allProducts.find(el => el.name === elem.name)?.metric.map(elem =>
                                            <option key={elem} value={elem}>{elem}</option>
                                        )}
                                    </Select>
                                
                                </div>
                                :
                                    
                                <div style={{ clear: "both" }}>
                                    <p style={{ fontSize: 26, marginLeft: 20, float: "left" }}>{elem.name} - {elem.quantity} {elem.metric}</p>
                                    <div style={{ float: "right" }}>
                                        <Button className={styles.button} onClick={() => handleDelete(index)}>
                                            <DeleteIcon fontSize="large" />
                                        </Button>
                                    </div>
                                </div>
                        
                    )}
                    
                    
                </div>    
                }
                {isEditing && isAdding ? 
                    <>
                        <div style={{ marginLeft: 20 }}>
                            <ProductSelect productList={newProducts} setProductList={setNewProducts} />
                            </div>
                        <div style={{clear:"both"}}>
                            <Button style={{ float: "right", marginTop: 10 }} size="large" onClick={handleAdding}>
                                <CheckIcon fontSize="large" />
                            </Button>
                        </div>
                    </>
                    :
                isEditing && !isAdding ? 
                    <div style={{ float: "right" }}>
                        <Button className={styles.button} onClick={() => setIsAdding(true)}>
                                <AddShoppingCartIcon fontSize="large" />
                        </Button>
                        <Button className={styles.button} onClick={() => handleChange()}>
                                <CheckIcon fontSize="large" />
                        </Button>
                    </div>
                        :
                    products.length>0 ?
                    <div style={{ clear: "both", float: "right", paddingTop: 20 }}>
                        <Button className={styles.button} onClick={() => setIsEditing(true)}>
                            <CreateIcon fontSize="large" />
                        </Button>
                            </div>
                            :
                            ""
                }
            </div>
            </>
    )
}

export default ShoppingList;