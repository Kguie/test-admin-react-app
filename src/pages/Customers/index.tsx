/**
 * Gestion de la page Customers
 **/
import { Box, Tooltip, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';

import { selectUserInfo } from '../../utils/selectors';
import { UseGetLogInData } from '../../utils/hooks';
import DataTable from '../../components/DataTable';
import { formatDate, onRowClickNavigate } from '../../utils/utils';
import { colors } from '../../utils/style/variables';
import { PersonAddAlt } from '@mui/icons-material';

type Props = {
    data: any,
    isLoading: boolean
}
//Type des données utilisées dans le tableau
export type FormattedUserData = {
    lastName: string,
    firstName: string,
    phoneNumber: string,
    joinDate: string,
    id: string
}

/**
 * Extrait les données des clients nécessaires à la création du tableau Customers
 * @param {Object} data récupéré par api
 * @returns {Object} data formaté de type userData
 */
function createCustomersDataArray(data: any) {
    const dataArray: any = []

    for (let i = 0; i < data.length; i++) {
        const customerData: GridRowModel = {
            lastName: data[i].name && data[i].name.lastName,
            firstName: data[i].name && data[i].name.firstName,
            phoneNumber: data[i].contact && data[i].contact.phoneNumber,
            joinDate: data[i].data && data[i].data.joining && data[i].data.joining.time && formatDate(data[i].data.joining.time),
            id: data[i]._id
        }
        dataArray.push(customerData)
    }
    return dataArray
}

//Entêtes des cellules du tableau
const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Nom', flex: 1, minWidth: 100, },
    { field: 'firstName', headerName: 'Prénom', flex: 1, minWidth: 100 },
    { field: 'phoneNumber', headerName: 'Téléphone', flex: 1, minWidth: 100 },
    { field: 'joinDate', headerName: "Date d'enregistrement", flex: 1, minWidth: 100 }
]

/**
 * Affiche le Customers qui permet l'affichage des clients
 */
export default function Customers() {
    const navigate = useNavigate()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/customers/`

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //Titre de la page
    useEffect(() => {
        document.title = " GCM-Clients"
    }, [])

    return (
        <Box paddingBottom={"200px"}>
            <Box position={"relative"} >
                <DataTable onRowClickSet={onRowClickNavigate} title={"Clients"} subTitle='Liste des clients enregistrés' columns={columns} rows={createCustomersDataArray(data)} isLoading={isLoading} />
                <Tooltip title="Ajouter un client" placement="left">
                    <IconButton
                        size='large'
                        aria-label="Ajouter un client"
                        component="label"
                        onClick={() => navigate("new")}
                        sx={{ position: 'absolute', bottom: -70, right: 10, backgroundColor: colors.primary, "&:hover": { backgroundColor: colors.darkBlue }, color: "#ffffff" }}
                    >
                        <PersonAddAlt />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

