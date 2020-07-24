import React, { useState, useEffect } from "react"
import { makeStyles, TextField, Button } from '@material-ui/core'
import TopAppBar from "./TopAppBar"
import picture from '../assets/main.jpg'
import { environment } from '../environments/environment.json';
import axios, { AxiosError, AxiosResponse } from "axios"
import { User } from '../model/User'
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
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
    const [user, setUser] = useState<User>();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const [wrongPassError, setWrongPassError] = useState(false);
    
    const getUser = () => {
        axios.get(`${environment.apiUrl}/api/profile`, { withCredentials: true }).then((result: AxiosResponse<User>) => {
            const response = result.data;
            console.log(response)
            setUser(response);
        }).catch((error: AxiosError<string>) => {
            const message = error.message;
        })
    }

    useEffect(() => {
        getUser()
    },[])

    const styles = useStyles();
    
    const changePasswordAction = () => {
        if (user) {
            const body = { password: newPassword }
            axios.put(`${environment.apiUrl}/api/profile`, body, { withCredentials: true })
            setChangePassword(false)
        }
    }
    
    return (
        <>
            {user ?
                <div>
                    <TopAppBar />
                    <div className="topImage">
                        <img src={picture} height='10%' width='100%' alt='img' />
                    </div>
                    <div className={styles.user}>
                        <h1 style={{ float: "left" }}>Здравей {user.username}!</h1>
                        {changePassword ?
                            <div style={{ clear: "both" }} className={styles.container}>
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
                                    helperText={wrongPassError ? "Старата парола е грешна" : ""}
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
                        <h2 style={{ clear: "both" }}>Постижения: </h2>
        
                        {user.achievments ?
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
                :
                ""}
            </>
            )
        }
        
        export default UserProfile;