import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        button: {
            color: '#FFFFFF'
        }
        
    }),
);

const TopAppBar = () =>  {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Манджичка
                     </Typography>
                    <Link href="/">
                        <Button >
                            <p className={classes.button}> Влез </p>
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button >
                            <p className={classes.button}>Регистрирай се</p>
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TopAppBar;