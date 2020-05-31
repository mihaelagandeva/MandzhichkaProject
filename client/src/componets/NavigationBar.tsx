import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MainPage from './MainPage';
import TopAppBar from './TopAppBar';
import picture from '../assets/main.jpg'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#FFEEDF'
    },
    search: {
        float: 'left',
        width: '50%'
    },
    tabs: {
        width: '50%',
        float: 'left'
    },
    bar: {
        display: 'table'
    }
}));

const NavigationBar = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [searchString, setSearchString] = useState('')

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const onSearchBtnClick = async () => {
        //implement search function
    }

    return (
        <div className={classes.root}>
            <div className="topAppBar">
                <TopAppBar />
            </div>
            <div className="topImage">
                <img src={picture} height='10%' width='100%' alt='img' />
            </div>
            <AppBar className={classes.bar} position="static">
                <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Рецепти" component={Link} to={`/main/recipes`} />
                    <Tab label="Ресторанти" {...a11yProps(1)} />
                    <Tab label="Събития" {...a11yProps(2)} />
                </Tabs>
                <div className={classes.search}>
                    <SearchBar

                        key="SearchBar"
                        onType={text => {
                            setSearchString(text);
                        }}
                        onSearch={onSearchBtnClick}
                    />
                </div>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MainPage />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
      </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
      </TabPanel>
        </div>
    );
}

export default NavigationBar;