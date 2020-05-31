import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { RecipeFormValue } from "../model/recipeForm";
import { useFormik } from 'formik';
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '40%',
        height: '50%',
        left: '30%',
        top: '25%'
    },

    formContainer: {
        height: '100%',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column'
    },

    title: {
        flex: 1,
        textAlign: 'center',
    },

    inputField: {
        flex: 1,
        minWidth: 500,
        alignSelf: 'center'
    },

});

const validate = (values: RecipeFormValue): RecipeFormValue => {
    const errors: RecipeFormValue = {};

    if (!values.title) {
        errors.title = 'Полето е задължително'
    }
    if (!values.summary) {
        errors.summary = 'Полето е задължително'
    }
    if (values.summary!.length > 100) {
        errors.summary = 'Описанието е прекалено дълго'
    }
    if (values.products!.length < 1) {
        errors.products![0] = 'Полето е задължително!'
    }
    if (!values.steps) {
        errors.steps![0] = 'Полето е задължително!'
    }
    if (!values.picturePath) {
        errors.picturePath = 'Полето е задължително!'
    }
    
    return errors;
}

const CreateRecipe = () => {
    const [products, setProducts] = useState([""]);
    const formik = useFormik({
        initialValues: {
            title: '',
            summary: '',
            picturePath: '',
            products: [],
            tags: [],
            steps: []

        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 6));
        }
    });

    function addProduct() {
        let newProd = products;
        console.log(`new prod before ${newProd.length}`)
        newProd.push("")
        console.log(`new prod after ${newProd.length}`)
        setProducts(newProd)
    }

    const styles = useStyles();

    return (
        <div className={styles.root}>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <h1 className={styles.title}>Нова Рецепта</h1>
                <TextField
                    className={styles.inputField}
                    id="title"
                    name="title"
                    label="Заглавие"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.title && formik.touched.title}
                    helperText={formik.touched.title ? formik.errors.title : ''}
                />
                <TextField
                    className={styles.inputField}
                    id="summary"
                    name="summary"
                    label="Описание"
                    multiline
                    rowsMax='4'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.summary && formik.touched.summary}
                    helperText={formik.touched.summary ? formik.errors.summary : ''}
                />

                {products.map((product, index) => 
                    <div key={index}>
                        <input value={product} />
                    </div>
                )}
                <button onClick={addProduct} >Add Product</button>
            </form>
        </div>
    )
}

export default CreateRecipe;