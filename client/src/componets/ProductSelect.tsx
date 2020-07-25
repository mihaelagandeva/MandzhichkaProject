import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useQuery } from 'helper/useQuery';
import { Product } from 'model/Product';


const useStyles = makeStyles({
    root: {
        width: 500
    },
    formControl: {
        minWidth: "100%",
    },
    boxes: {
        width: "33%",
        float: "left"
    },
    inputDiv: {
        width: 150,
        float: "left",
        marginRight: 10
    },
    input: {
        padding: 8,
        marginLeft: 10,
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        borderBottom: "1px solid black"
    },
    addButton: {
        marginTop: 10,
        float: 'right',
        padding: 5
    },
    removeButton: {
        marginLeft: 10,
        marginTop: 5,
        float: 'left',
    },
    
})

interface ProductSelectProps {
    productList: { name: string; quantity: number; metric: string }[],
    setProductList: (val: { name: string; quantity: number; metric: string }[]) => void
}

export const ProductSelect = (props: ProductSelectProps) => {
    const [products] = useQuery<Product[]>('products',null,[])
    
    const classes = useStyles();
    
    
    const handleValueChange = (e: any, index: number) => {
        const name = e.target.value;
        const list = [...props.productList];
        const quantity = list[index].quantity
        let metric: string;
        if (list[index].metric === "") {
            metric = products.find(el => el.name === name)!.metrics[0]
        }
        else {
            metric = list[index].metric
        }
        list[index] = { name, quantity, metric };
        props.setProductList(list);
    };

    const handleMetricChange = (e: any, index: number) => {
        const metric = e.target.value;
        const list = [...props.productList];
        const name = list[index].name;
        const quantity = list[index].quantity
        list[index] = { name, quantity, metric };
        props.setProductList(list);
    };
    
    const handleRemoveClick = (index: number) => {
        const list = [...props.productList];
        list.splice(index, 1);
        props.setProductList(list);
    };

    const handleQuantityChange = (e: any, index: number) => {
        const quantity = e.target.value;
        const list = [...props.productList];
        const name = list[index].name;
        const metric = list[index].metric;
        list[index] = { name, quantity, metric };
        props.setProductList(list)
    }
    
    const handleAddClick = () => {
        props.setProductList([...props.productList, {name:"",quantity:0,metric:""}]);
        
    };
    
    
    return (
        <>
        {props.productList.map((x, i) => 
            <div style={{clear:"both"}}>
            <div className={classes.boxes}>
            <InputLabel htmlFor="value">Продукт</InputLabel>
            <Select
            native
            className={classes.formControl}
            value={x.name}
            onChange={e => handleValueChange(e,i)}
            inputProps={{
                name: 'value',
                id: 'value',
            }}
            >
            <option aria-label="None" value="" />
            {products.map(elem => 
                <option key={elem.name} value={elem.name}>{elem.name}</option>
                )}
                </Select>
                </div>  
                
                <div className={classes.inputDiv}>
                <InputLabel style={{marginLeft:10}} htmlFor="value">Количество</InputLabel>
                <input style={{width:100}} className={classes.input} type="number"
                onChange={e => handleQuantityChange(e,i)}
                />
                </div>
                
                
                {x.name !== "" ? 
                <div className={classes.boxes}>
                <InputLabel htmlFor="metric">Мерна единица</InputLabel>
                <Select
                className={classes.formControl}
                native
                value={x.metric}
                onChange={e => handleMetricChange(e, i)}
                inputProps={{
                    name: 'metric',
                    id: 'metric',
                }}
                >
                {products.find(e => e.name === x.name)?.metrics.map(elem =>
                    <option key={elem} value={elem}>{elem}</option>
                    )}
                    </Select>
                    </div>
                    :
                    ""
                } 
                
                {props.productList.length !== 1 &&
                    <Button
                    className={classes.removeButton}
                    onClick={() => handleRemoveClick(i)}><CancelIcon /></Button>}
                    
                    {props.productList.length - 1 === i && <button className={classes.addButton} onClick={handleAddClick}>Добави друг продукт</button>}
                    </div>
                    )}
                    </>
                    );
                }