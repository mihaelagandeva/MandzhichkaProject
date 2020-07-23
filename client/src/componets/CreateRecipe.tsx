import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { RecipeFormValue } from "../model/recipeForm";
import { useFormik } from 'formik';
import { TextField, Button } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { InputTags } from './InputTags'
import { FileUpload } from './FileUpload'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '40%',
        height: '50%',
        left: '25%',
        top: '10%'
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
        alignSelf: 'center',
        margin: 10
    },
    steps: {
        alignSelf: 'center',
        marginTop: 10,
    },
    stepsInputField: {
        flex: 1,
        float: 'left',
        minWidth: 400,
        alignSelf: 'center',
    },
    stepNumbers: {
        float: "left",
        paddingRight: 10,
        fontSize: 16
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
    upload: {
        marginTop: 10,
        float: 'left',
        marginRight: 15
    }
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
    const [stepsList, setStepsList] = useState([""]);
    const [tags, setTags] = useState<string[]>([]);
    const [initialTags, setInitialTags] = useState<string[]>([]);
    const selectedTags = (t: string[]) => {
        setTags(t);
    };
    
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
    
    const handleInputChange = (e:any, index:number) => {
        const { value } = e.target;
        const list = [...stepsList];
        list[index] = value;
        setStepsList(list);
    };
    
    const handleRemoveClick = (index:number) => {
        const list = [...stepsList];
        list.splice(index, 1);
        setStepsList(list);
    };
    
    const handleAddClick = () => {
        setStepsList([...stepsList, ""]);
    };
    
    const styles = useStyles();
    
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Нова Рецепта</h1>
            <div className={styles.upload}>
                <FileUpload />
            </div>
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div style={{float:"left"}}>
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
        <div className={styles.steps}>
        <p>Стъпки: </p>
        {stepsList.map((x, i) => {
            return (
                <>
                <div style={{clear: 'both'}}>
                <p className={styles.stepNumbers}>{i+1}.</p>
                <TextField
                className={styles.stepsInputField}
                placeholder="Добавете стъпка"
                value={x.valueOf()}
                onChange={e => handleInputChange(e, i)}
                />
                
                {stepsList.length !== 1 && <Button
                    className={styles.removeButton}
                    onClick={() => handleRemoveClick(i)}><CancelIcon/></Button>}
                    </div>
                    {stepsList.length - 1 === i && <button className={styles.addButton} onClick={handleAddClick}>Добави стъпка</button>}
                    
                    </>
                    );
                })}
                </div>
                <div className={styles.steps}>
                <InputTags selectedTags={selectedTags} initialTags={initialTags} />
                    </div>
                </div>
                </form>
                </div>
    )}
            
export default CreateRecipe;