import React, { useState, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            display: 'flex',
            justifyContent: 'flex-end',
            gridTemplateColumns: '1fr max-content max-content',
            position: 'sticky',
        },
        btn: {
            marginLeft: '10px',
        },
        search: {
            position: 'relative',
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 'auto',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            transition: theme.transitions.create('width'),
            paddingLeft: theme.spacing(1),
            flexGrow: 3,
        },
    })
);
interface SearchBarProps {
    onSearch: () => void;
    onType: (text: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();
    const { onSearch, onType } = props;
    const submitSearchOnPressingEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };
    return (
        <>
            <Toolbar className={classes.toolbar}>
                <div className={classes.search}>
                    <InputBase
                        type="search"
                        placeholder="Търсене…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => {
                            onType(e.target.value);
                        }}
                        onKeyPress={event => submitSearchOnPressingEnter(event)}
                    />
                    <Button onClick={onSearch}>
                        <SearchIcon />
                    </Button>
                </div>
            </Toolbar>
        </>
    );
}

export default SearchBar;