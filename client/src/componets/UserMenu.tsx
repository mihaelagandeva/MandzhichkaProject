import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from '@material-ui/core';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
    {...props}
    />
    ));
    
    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        },
    }))(MenuItem);
    
    export default function UserMenu() {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        
        const handleClose = () => {
            setAnchorEl(null);
        };
        
        return (
            <div>
            <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
            >
            Отвори меню
            </Button>
            <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <StyledMenuItem>
            <Link href="/">
            <ListItemIcon>
            <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Моя профил" />
            </Link>
            </StyledMenuItem>
            <StyledMenuItem>
            <Link href="/">
            <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Нова рецепта" />
            </Link>
            </StyledMenuItem>
            <StyledMenuItem>
            <Link href="/">
            <ListItemIcon>
            <CalendarTodayIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Шопинг лист" />
            </Link>
            </StyledMenuItem>
            <StyledMenuItem>
            <Link href="/recipes/favorites">
            <ListItemIcon>
            <StarBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Любими" />
            </Link>
            </StyledMenuItem>
            <StyledMenuItem>
                        <Link href="/recipes/my">
            <ListItemIcon>
            <CreateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mои рецепти" />
            </Link>
            </StyledMenuItem>
            <StyledMenuItem>
            <Link href="/">
            <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Изход" />
            </Link>
            </StyledMenuItem>
            </StyledMenu>
            </div>
            );
        }
        