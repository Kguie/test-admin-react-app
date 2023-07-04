/**
 * Gestion de la page Users
 **/
import { useEffect } from 'react';
import { Box, IconButton, Tooltip, } from '@mui/material';
import { useSelector } from 'react-redux';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

import { formatDate, onRowClickNavigate } from '../../utils/utils';
import DataTable from '../../components/DataTable';
import { selectUserInfo } from '../../utils/selectors';
import { UseGetLogInData } from '../../utils/hooks';
import { colors } from '../../utils/style/variables';

type Props = {
    data: any,
    isLoading: boolean
}

//Type des données utilisées dans le tableau
export type FormattedUserData = {
    lastName: string,
    firstName: string,
    email: string,
    joinDate: string,
    lastConnect: string,
    category: string,
    id: string
}


/**
 * Extrait les données des utilisateurs nécessaires à la création du tableau Users
 * @param {Object} data récupéré par api
 * @returns {Object} data formaté de type userData
 */
function createUsersDataArray(data: any) {
    const dataArray: any = []

    for (let i = 0; i < data.length; i++) {
        const userData: GridRowModel = {
            lastName: data[i].name && data[i].name.lastName,
            firstName: data[i].name && data[i].name.firstName,
            email: data[i].email,
            joinDate: data[i].data && data[i].data.joinDate && formatDate(data[i].data.joinDate),
            lastConnect: data[i].lastConnect && formatDate(data[i].lastConnect),
            category: data[i].category,
            id: data[i]._id
        }
        dataArray.push(userData)
    }
    return dataArray
}

//Entêtes des cellules du tableau
const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Nom', flex: 1, minWidth: 100, },
    { field: 'firstName', headerName: 'Prénom', flex: 1, minWidth: 100 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'category', headerName: 'Catégorie', flex: 1, minWidth: 100 },
    { field: 'joinDate', headerName: "Date d'enregistrement", flex: 1, minWidth: 100 },
    { field: 'lastConnect', headerName: 'Dernière connexion', flex: 1, minWidth: 100 },
]

/**
 * Affiche tous les utilisateurs inscrits dans un tableau de donné
 */
export default function Users() {
    const navigate = useNavigate()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/`

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //Titre de la page
    useEffect(() => {
        document.title = " GC-Utilisateurs"
    }, [])

    return (
        <Box paddingBottom={"200px"}>
            <Box position={"relative"} >
                <DataTable
                    onRowClickSet={onRowClickNavigate}
                    title={"Utilisateurs"}
                    subTitle='Liste des utilisateurs enregistrés'
                    columns={columns}
                    rows={createUsersDataArray(data)}
                    isLoading={isLoading}
                />
                <Tooltip title="Ajouter un utilisateur" placement="left">
                    <IconButton
                        size='large'
                        aria-label="Ajouter un utilisateur"
                        component="label"
                        onClick={() => navigate("new")}
                        sx={{ position: 'absolute', bottom: -70, right: 10, backgroundColor: colors.primary, "&:hover": { backgroundColor: colors.darkBlue }, color: "#ffffff" }}
                    >
                        <PersonAddIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

