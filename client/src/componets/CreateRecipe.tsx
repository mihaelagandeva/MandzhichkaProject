import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { InputTags } from './InputTags'
import { FileUpload } from './FileUpload'
import { ProductSelect } from './ProductSelect'
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '60%',
        height: '50%',
        left: '15%',
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
        marginBottom: 10,
        marginTop: 10,
        marginLeft: '20%'
    },
    steps: {
        clear: "both",
        marginTop: 20,
    },
    stepsInputField: {
        flex: 1,
        float: 'left',
        minWidth: 600,
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
    },
    button: {
        marginTop: 10,
        float: "right"
    }
});

function valuetext(value: number) {
    return `${value}мин.`;
}

const CreateRecipe = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [picturePath, setPicturePath] = useState("");
    const [stepsList, setStepsList] = useState([""]);
    const [productList, setProductList] = useState([{name:"", quantity: 0, metric:""}]);
    const [tags, setTags] = useState<string[]>([]);
    const [initialTags, setInitialTags] = useState<string[]>([]);
    const selectedTags = (t: string[]) => {
        setTags(t);
    };
    
    const handleInputChange = (e: any, index: number, valuesList: any, setValuesList: (v: any) => void) => {
        const { value } = e.target;
        const list = [...valuesList];
        list[index] = value;
        setValuesList(list);
    };
    
    const handleRemoveClick = (index: number, valuesList: any, setValuesList: (v:any) => void) => {
        const list = [...valuesList];
        list.splice(index, 1);
        setValuesList(list);
    };
    
    const handleAddClick = (valuesList:any, initialValue: any, setValuesList: (v: any) => void) => {
        setValuesList([...valuesList, initialValue]);
    };
    
    const Submit = () => {
        alert(`${title}, ${summary}, ${prepTime},${stepsList}, ${picturePath}, ${JSON.stringify(productList)}` )
    }
    
    const styles = useStyles();
    
    return (
        <div className={styles.root}>
        <h1 className={styles.title}>Нова Рецепта</h1>
        <div className={styles.upload}>
        <FileUpload setPicturePath={setPicturePath} />
        </div>
        <form className={styles.formContainer}>
        <div style={{float:"left"}}>
        <TextField
        className={styles.inputField}
        id="title"
        name="title"
        label="Заглавие"
        onChange={e => setTitle(e.target.value)}
        onBlur={e => setTitle(e.target.value)}
        
        />
        <TextField
        className={styles.inputField}
        id="summary"
        name="summary"
        label="Описание"
        multiline
        rowsMax='4'
        onChange={e => setSummary(e.target.value)}
        onBlur={e => setSummary(e.target.value)}
        />
        <Typography style={{marginTop: 20}} id="discrete-slider" gutterBottom>
        Време за приготвяне
        </Typography>
        <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        id="prepTime"
        name="prepTime"
        onChange={(e, val) => {
            if(!Array.isArray(val))
            setPrepTime(val)
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={180}
        />
        <div>
        <p>Продукти: </p>
        {productList.map((x, i) => {
            
        })}
        <ProductSelect productList={productList} setProductList={setProductList}/>
        </div>
        <div className={styles.steps}>
        <br />
        <p style={{marginTop: 20}}>Стъпки: </p>
        {stepsList.map((x, i) => {
            return (
                <>
                <div style={{clear: 'both'}}>
                <p className={styles.stepNumbers}>{i+1}.</p>
                <TextField
                className={styles.stepsInputField}
                multiline
                placeholder="Добавете стъпка"
                value={x.valueOf()}
                onChange={e => handleInputChange(e, i,stepsList,setStepsList)}
                />
                
                {stepsList.length !== 1 && <Button
                    className={styles.removeButton}
                    onClick={() => handleRemoveClick(i,stepsList,setStepsList)}><CancelIcon/></Button>}
                    </div>
                    {stepsList.length - 1 === i && <button className={styles.addButton} onClick={() => handleAddClick(stepsList,"",setStepsList)}>Добави стъпка</button>}
                    
                    </>
                    );
                })}
                </div>
                <div className={styles.steps}>
                <InputTags selectedTags={selectedTags} initialTags={initialTags} />
                </div>
                <div>
                <Button onClick={Submit} className={styles.button} variant="outlined">Публикувай</Button>
                </div>
                </div>
                </form>
                </div>
                )}
                
                export default CreateRecipe;