/**
 * Gestion de la page Orders
 **/
import { Box, Tooltip, IconButton, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';

import { selectUserInfo } from '../../utils/selectors';
import { UseGetLogInData } from '../../utils/hooks';
import DataTable from '../../components/DataTable';
import { formatDate, formatPrice, onRowClickNavigate, sortOrders } from '../../utils/utils';
import { colors } from '../../utils/style/variables';

type Props = {
    data: any,
    isLoading: boolean
}

//Type des données utilisées dans le tableau
export type FormattedOrderData = {
    id: string,
    name: string,
    orderDate: string,
    orderAuthor: string,
    deliveryDate: string,
    orderStatus: string,
    payStatus: string,
    price: number,
}

/**
 * Extrait les données des commandes nécessaires à la création du tableau Orders
 * @param {Object} data récupéré par api
 * @returns {Object} data formaté de type orderData
 */
function createOrdersDataArray(data: any) {
    const dataArray: any = []

    for (let i = 0; i < data.length; i++) {
        const orderData: GridRowModel = {
            id: data[i]._id,
            customerName: data[i] && data[i].customer && data[i].customer.name,
            orderDate: data[i].data && data[i].data.contact && data[i].data.contact.time && formatDate(data[i].data.contact.time),
            orderAuthor: data[i].data && data[i].data.contact && data[i].data.contact.userId,
            deliveryDate: data[i].delivery && data[i].delivery.time && formatDate(data[i].delivery.time),
            orderStatus: data[i].orderStatus,
            payStatus: data[i].paymentInfo && data[i].paymentInfo.status,
            price: data[i].paymentInfo && data[i].paymentInfo.totalToPay && formatPrice(data[i].paymentInfo.totalToPay)
        }
        dataArray.push(orderData)
    }
    return dataArray
}

//Entêtes des cellules du tableau
const columns: GridColDef[] = [
    { field: 'deliveryDate', headerName: 'Date de livraison', flex: 1, minWidth: 100, },
    { field: 'orderDate', headerName: 'Date de commande', flex: 1, minWidth: 100 },
    { field: 'customerName', headerName: 'Client', flex: 1, minWidth: 150 },
    { field: 'orderStatus', headerName: "Status de la commande", flex: 1, minWidth: 100 },
    { field: 'payStatus', headerName: 'Status du paiement', flex: 1, minWidth: 100 },
    { field: 'price', headerName: 'Prix', flex: 1, minWidth: 80 },
]

/**
 * Affiche le Orders qui permet l'affichage des commandes
 */
export default function Orders() {
    const navigate = useNavigate()

    //State de la visibilité des commandes archivées
    const [showArchivedOrders, setShowArchivedOrders] = useState<boolean>(false)

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/`

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //Tri de data en fonction de la date de livraison
    const sortedOrders: Array<any> = (data && Array.isArray(data)) ? data.sort(sortOrders) : [];

    //Déclaration de la date du jour
    const today = new Date().toISOString()

    //Filtre des commandes pour masquer les commandes dont la date de livraison est déjà passée
    const filteredOrders: Array<any> = sortedOrders.filter((order: any) => (order.data && order.delivery && order.delivery.time && order.delivery.time) > today)

    //Titre de la page
    useEffect(() => {
        document.title = " GCM-Commandes"
    }, [])

    return (
        <Box paddingBottom={"200px"} >
            <Box position={"relative"}>
                {showArchivedOrders ? <DataTable onRowClickSet={onRowClickNavigate} title={"Commandes"} subTitle='Liste des commandes enregistrés avec les commandes archivées' columns={columns} rows={createOrdersDataArray(sortedOrders)} isLoading={isLoading} />
                    : <DataTable onRowClickSet={onRowClickNavigate} title={"Commandes"} subTitle='Liste des commandes enregistrés' columns={columns} rows={createOrdersDataArray(filteredOrders)} isLoading={isLoading} />
                }
                <FormControlLabel
                    control={<Switch
                        checked={showArchivedOrders}
                        onChange={() => setShowArchivedOrders(!showArchivedOrders)}
                        inputProps={{ 'aria-label': 'archived orders' }}
                    />}
                    sx={{ position: 'absolute', bottom: -60, left: 10, }}
                    label='Archivés'
                />
                <Tooltip title="Ajouter un commande" placement="left">
                    <IconButton
                        size='large'
                        aria-label="Ajouter un commande"
                        component="label"
                        onClick={() => navigate("new")}
                        sx={{ position: 'absolute', bottom: -70, right: 10, backgroundColor: colors.primary, "&:hover": { backgroundColor: colors.darkBlue }, color: "#ffffff" }}
                    >
                        <AddCardIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}



