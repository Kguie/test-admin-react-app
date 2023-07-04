/**
 * Gestion du menu gauche responsive et de la Appbar
 **/

import { styled, createTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
// import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from "react-redux";

import ListMenu from "../ListMenu";
import { colors } from '../../utils/style/variables';
import { setMenu } from "../../features/leftMenuState";
import { selectLeftMenuState } from '../../utils/selectors';
// import { Tooltip } from '@mui/material';

type Props = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


//Mise en place du style du drawer et de l'appBar
const drawerWidth: number = 240;
const mdTheme = createTheme();
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: colors.darkBlue,
    [theme.breakpoints.up('md')]: {
        zIndex: theme.zIndex.drawer + 1,
    },

    ...(open && {
        marginLeft: drawerWidth,
        width: '100%',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        //Ajout d'un mediaquery pour augmenter le coté responsive
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    }),
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


export default function LeftMenu(props: Props) {
    //Gestion de l'ouverture du StyledDrawer et du drawer normal pour les petits écran
    const { window } = props;
    const dispatch = useDispatch()
    // const [openMenu, setOpenMenu] = React.useState(true);
    const openMenu = useSelector(selectLeftMenuState)
    const toggleDrawer = () => {
        dispatch(setMenu());
    };
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={mdTheme}>
            <Box>
                {/* Barre de menu bleu */}
                <AppBar position="absolute" open={openMenu}>

                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(openMenu && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                            textTransform={"uppercase"}
                        >
                            Tableau de bord
                        </Typography>

                        {/* Icône de notification à rajouter plus tard */}
                        {/* <Tooltip title="Vous avez 4 notifications" placement="top-start">
                            <IconButton
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip> */}
                    </Toolbar>
                </AppBar>

                {/* Menu déroulant gauche permanent */}
                <StyledDrawer sx={{ display: { xs: 'none', md: 'block' } }}
                    variant="permanent" open={openMenu}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <ListMenu />
                </StyledDrawer>
                <Drawer container={container}
                    variant="temporary"
                    open={openMenu}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <ListMenu />
                </Drawer>
            </Box>
        </ThemeProvider >
    );
}
