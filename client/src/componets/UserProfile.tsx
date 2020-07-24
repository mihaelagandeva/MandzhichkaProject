import React, { useState } from "react"
import { makeStyles, GridList, TextField, Button } from '@material-ui/core'
import TopAppBar from "./TopAppBar"
import picture from '../assets/main.jpg'
import classes from "*.module.css"


const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFEEDF',
    },
    user: {
        position: 'absolute',
        width: '40%',
        height: '50%',
        left: '30%',
        top: '50%',
    },
    container: {
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column'
    },
    inputField: {
        flex: 1,
        minWidth: 300,
        marginTop: 10,
        alignSelf: 'center'
    },
    button: {
        maxWidth: 200,
        marginTop: 10,
        alignSelf: 'center',
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "arial, sans-serif"
    },
    row: {
        border: "1px solid #dddddd",
        padding: 8,
        textAlign: "left"
    }
})


const UserProfile = () => {
    const ach: { name: string, description: string }[] = [{ name: "no sleep", description: ";-;" }, { name: "happy 10", description: "10 rec created" }]
    const user = { username: "someuser", password: "123", achievments: ach}
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const [wrongPassError, setWrongPassError] = useState(false);
    const styles = useStyles();
    
    const changePasswordAction = () => {
        if (user.password !== oldPassword) {
            setWrongPassError(true)
        }
        else {
            //put query here
            setChangePassword(false)
        }
    }
    
    return (
        <div className={styles.root}>
        <TopAppBar />
        <div className="topImage">
        <img src={picture} height='10%' width='100%' alt='img' />
        </div>
        <div className={styles.user}>
        <h1 style={{float: "left"}}>Здравей {user.username}!</h1>
        {changePassword ? 
            <div style={{clear: "both"}} className={styles.container}>
            <TextField
            className={styles.inputField}
            id="oldPassword"
            name="oldPassword"
            label="Стара парола"
            type="password"
            onChange={e => {
                setOldPassword(e.target.value)
                setWrongPassError(false)
            }}
            onBlur={e => setOldPassword(e.target.value)}
            error={wrongPassError}
            helperText={wrongPassError? "Старата парола е грешна" : ""}
            />
            <TextField
            className={styles.inputField}
            id="newPassword"
            name="newPassword"
            label="Нова парола"
            type="password"
            onChange={e => setNewPassword(e.target.value)}
            onBlur={e => setNewPassword(e.target.value)}
            />
            <Button
            className={styles.button}
            color="primary"
            variant="outlined"
            type="submit"
            onClick={changePasswordAction}
            >
            Смени паролата
            </Button>
            </div>
            :
            <Button
            style={{ float: "left", marginLeft: 40, marginTop: 20 }}
            className={styles.button}
            color="primary"
            variant="outlined"
            type="submit"
            onClick={() => setChangePassword(true)}
            >
            Смени паролата
            </Button>
        }
        <h2 style={{clear: "both"}}>Постижения: </h2>
        
        {user.achievments.length > 0 ?
            <table className={styles.table}>
            <tr className={styles.row}>
            <th className={styles.row}>Име</th>
            <th className={styles.row}>Описание</th>
            </tr>
            {user.achievments.map(achievment => <tr className={styles.row}>
                <th className={styles.row}>{achievment.name}</th>
                <th className={styles.row}>{achievment.description}</th>
                </tr>)}
                </table>
                : "Нямате никакви постижения за момента :("
            }
            
            </div>
            </div>
            )
        }
        
        export default UserProfile;