/**
 * Component OrdersTable
 **/

import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { selectUserInfo } from "../../utils/selectors";
import { formatFullDate, formatPrice } from "../../utils/utils";
import { UseGetLogInData } from "../../utils/hooks";



type Props = {
    customerId: string,
    customerName: string,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
};

type OrderProps = {
    data: any,
    isLoading: boolean
};

/**
 * Tableau avec les commandes ,en cliquant sur une ligne on arrive à la page de la commande
 * @param {string} customerId - Id du client
 * @param {string} customerName - Nom du client
 * @param {boolean} openDialog - Définit si le dialog est ouvert
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialog - State action pour modifier l'état d'ouverture de la fenêtre Dialog 
 */
export default function OrdersTable({ customerId, customerName, openDialog, setOpenDialog }: Props) {
    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo);

    const navigate: NavigateFunction = useNavigate();

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/customer/${customerId}`;
    const { data, isLoading }: OrderProps = UseGetLogInData(url, userInfo);

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle fontWeight={"bold"}>
                Tableau des commandes de {customerName}
            </DialogTitle>

            {isLoading ? <Skeleton data-testid='skeleton' sx={{ margin: "20px auto" }} variant="rectangular" width={"98%"} height={"20vh"} />
                :
                <DialogContent>
                    {data && data.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="tableau de commandes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 100, flex: 1 }}>Date de commande</TableCell>
                                        <TableCell sx={{ minWidth: 100, flex: 1 }} >Date de livraison</TableCell>
                                        <TableCell sx={{ minWidth: 100, flex: 1 }} >Status de commande</TableCell>
                                        <TableCell sx={{ minWidth: 100, flex: 1 }} >Status de paiement</TableCell>
                                        <TableCell sx={{ minWidth: 80, flex: 1 }} >prix</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                            onClick={(event) => {
                                                const path = `/home/orders/${row._id}`
                                                navigate(`${path}`)
                                            }}
                                        >
                                            <TableCell sx={{ minWidth: 100, flex: 1 }} component="th" scope="row">
                                                {row.data && row.data.contact && row.data.contact.time && formatFullDate(row.data.contact.time)}
                                            </TableCell>
                                            <TableCell sx={{ minWidth: 100, flex: 1 }} >{row.delivery && row.delivery.time && formatFullDate(row.delivery.time)}</TableCell>
                                            <TableCell sx={{ minWidth: 100, flex: 1 }} >{row.orderStatus}</TableCell>
                                            <TableCell sx={{ minWidth: 100, flex: 1 }} >{row.paymentInfo && row.paymentInfo.status}</TableCell>
                                            <TableCell sx={{ minWidth: 80, flex: 1 }} >{row.paymentInfo && row.paymentInfo.totalToPay && formatPrice(row.paymentInfo.totalToPay)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <Typography>Pas de commandes à afficher</Typography>}
                </DialogContent>}
        </Dialog>
    )
}