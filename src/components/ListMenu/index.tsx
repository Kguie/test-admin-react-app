/**
 * Gestion de la composition des listes du menu
 **/

import { List, Divider, ListItemButton, ListItemIcon, ListItemText, Tooltip, Avatar, Skeleton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

import AccordionLists from "../AccordionLists"
import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import { logOut } from '../../features/userInfo';

type Props = {
    data: any,
    isLoading: boolean,
}

/**
 * Affichage des listes dans le menu gauche 
 */
export default function ListMenu() {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/${userInfo.userId}`

    //Récupération des données de l'utilisateur
    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)

    //Gestion de la catégorie
    const category: string = data.category

    /**
     * Retourne une couleur à partir d'un string rentré
     * @param {string} 
     * @returns {String}
     */
    function stringToColor(string: String) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    /**
     * Retourne les initiales à partir d'un nom
     * @param {Object} name} 
     * @returns
     */
    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <List component="nav">
            <Tooltip title="Gérer votre compte" placement="right" >
                <ListItemButton
                    onClick={() =>
                        navigate('/home/profile')
                    }
                >
                    <ListItemIcon>
                        {/* <AccountCircleIcon /> */}

                        {isLoading ? <Skeleton animation="wave" variant="circular" width={40} height={40} />
                            : <Avatar {...stringAvatar(`${data.name && data.name.firstName} ${data.name && data.name.lastName}`)} />}
                    </ListItemIcon>
                    {!isLoading && <ListItemText primary={`Bonjour ${data.name.firstName}`} />}
                </ListItemButton>
            </Tooltip>
            <Divider sx={{ my: 1 }} />

            {/* Constitution de la liste principale du menue qui sera toujours affichée */}
            <ListItemButton onClick={() => navigate("/home/")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Tableau de bord" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/home/orders")}>
                <ListItemIcon>
                    <ShoppingBagIcon data-testid='shopping-bag-icon' />
                </ListItemIcon>
                <ListItemText primary="Commandes" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/home/customers")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Clients" />
            </ListItemButton>

            {/* Ajout des listes secondaires */}
            <AccordionLists category={category} />


            {/* Bouton de déconnexion */}
            <ListItemButton onClick={() => {
                navigate("/")
                dispatch(logOut())
            }}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Se déconnecter" />
            </ListItemButton>
        </List >
    )
}