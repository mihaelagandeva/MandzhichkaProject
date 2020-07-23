import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';


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
    productList: { value: string; quantity: number; metric: string }[],
    setProductList: (val: { value: string; quantity: number; metric: string }[]) => void
}

export const ProductSelect = (props: ProductSelectProps) => {
    const products = [{ value: 'Eggs', metric: ['number']},{ value: 'Flour', metric: ['spoon','cup','teaspoon']}]
    
    const classes = useStyles();
    
    
    const handleValueChange = (e: any, index: number) => {
        const { value } = e.target;
        const list = [...props.productList];
        const quantity = list[index].quantity
        let metric;
        if (list[index].metric === "") {
            metric = products.find(el => el.value === value)!.metric[0]
        }
        else {
            metric = list[index].metric
        }
        list[index] = { value, quantity, metric };
        props.setProductList(list);
    };

    const handleMetricChange = (e: any, index: number) => {
        const metric = e.target.value;
        const list = [...props.productList];
        const value = list[index].value;
        const quantity = list[index].quantity
        list[index] = { value, quantity, metric };
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
        const value = list[index].value;
        const metric = list[index].metric;
        list[index] = { value, quantity, metric };
        props.setProductList(list)
    }
    
    const handleAddClick = () => {
        props.setProductList([...props.productList, {value:"",quantity:0,metric:""}]);
        
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
            value={x.value}
            onChange={e => handleValueChange(e,i)}
            inputProps={{
                name: 'value',
                id: 'value',
            }}
            >
            <option aria-label="None" value="" />
            {products.map(elem => 
                <option key={elem.value} value={elem.value}>{elem.value}</option>
                )}
                </Select>
                </div>  
                
                <div className={classes.inputDiv}>
                <InputLabel style={{marginLeft:10}} htmlFor="value">Количество</InputLabel>
                <input style={{width:100}} className={classes.input} type="number"
                onChange={e => handleQuantityChange(e,i)}
                />
                </div>
                
                
                {x.value !== "" ? 
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
                {products.find(e => e.value === x.value)?.metric.map(elem =>
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
                    
                    {props.productList.length - 1 === i && <button className={classes.addButton} onClick={handleAddClick}>Добави продукт</button>}
                    </div>
                    )}
                    </>
                    );
                }