import React, { useState, FunctionComponent } from 'react';
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
import Restaurants from './Restaurants';
import Shops from './Shops';
import Events from './Events';

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

interface NavigationBarProps {
    tabNumber: number;
}

const NavigationBar: FunctionComponent<NavigationBarProps> = ({tabNumber}) => {
    const classes = useStyles();
    const [value, setValue] = useState(tabNumber);
    const [searchString, setSearchString] = useState('');
    const [searchUpdated, setSearchUpdated] = useState(true);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        setSearchString('');
    };

    const onSearchBtnClick = async () => {
        setSearchUpdated(true);
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
                <Tabs className={classes.tabs} value={value || 0} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Рецепти" component={Link} to={`/`} />
                    <Tab label="Ресторанти" component={Link} to={`/restaurants`} />
                    <Tab label="Магазини" component={Link} to={'/shops'} />
                    <Tab label="Събития" component={Link} to={'/events'} />
                    <Tab label="Курсове" {...a11yProps(4)} />
                    <Tab label="Постижения" {...a11yProps(4)} />
                </Tabs>
                <div className={classes.search}>
                    <SearchBar
                        key="SearchBar"
                        onType={text => {
                            setSearchUpdated(true);
                            setSearchString(text);
                        }}
                        onSearch={onSearchBtnClick}
                    />
                </div>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MainPage search={searchString} updated={searchUpdated} setUpdated={setSearchUpdated} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Restaurants search={searchString} updated={searchUpdated} setUpdated={setSearchUpdated} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Shops search={searchString} updated={searchUpdated} setUpdated={setSearchUpdated} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Events search={searchString} updated={searchUpdated} setUpdated={setSearchUpdated} />
            </TabPanel>
        </div>
    );
}

export default NavigationBar;