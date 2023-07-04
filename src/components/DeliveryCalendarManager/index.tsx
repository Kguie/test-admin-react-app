/***
 * Gestion du component DeliveryCalendarManager
 **/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Button, Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { frFR } from '@mui/x-date-pickers/locales';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import LocationTextField from '../LocationTextField';
import CommentsTextField from '../CommentsTextField';
import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import { formatPrice, formatTime } from '../../utils/utils';

const frenchLocale = frFR.components.MuiLocalizationProvider.defaultProps.localeText;

type DeliveryProps = {
    deliveryService: boolean,
    setDeliveryService: React.Dispatch<React.SetStateAction<boolean>>,
    deliveryLocation: string | null,
    setDeliveryLocation: React.Dispatch<React.SetStateAction<string | null>>,
    deliveryComments: string | null,
    setDeliveryComments: React.Dispatch<React.SetStateAction<string | null>>,
    deliveryTime: Date | null,
    setDeliveryTime: React.Dispatch<React.SetStateAction<Date | null>>
}

type Props = {
    data: any,
    isLoading: boolean
}

/**
 * Affichage du composant permettant la gestion des informations de livraison avec le choix du status,du lieu et de l'horaire et avec un dialog de commandes quand une commande ou plus est disponible pour le jour choisi
 * @param {boolean} deliveryService - Définit si la livraison est sélectionnée
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setDeliveryService - State action pour définir le status de la livraison
 * @param {string|null} deliveryLocation - Définit le lieu de la livraison
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setDeliveryLocation - State action pour  définir le lieu de la livraison
 * @param {string|null}deliveryComments - Affiche les commentaires à propos de la livraison
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setDeliveryComments - State action pour définit les commentaires de livraison
 * @param {Date|null} deliveryTime - Date de livraison de la commande
 * @param {React.Dispatch<React.SetStateAction<Date|null>>} setDeliveryTime - State action pour définir la date de livraison de la commande
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setTimeSelected - State action pour définir si la date et l'heure ont été défini
 */
export default function DeliveryCalendarManager({ deliveryService, setDeliveryService, deliveryLocation, setDeliveryLocation, deliveryComments, setDeliveryComments, deliveryTime, setDeliveryTime }: DeliveryProps) {
    //State du choix de la date de livraison
    const [dateSelected, setDateSelected] = useState<string | null>(null)

    //State du nombre de commande
    const [ordersArray, setOrdersArray] = useState<Array<any> | null>(null)

    //State du dialog qui affiche les commandes
    const [openDialogShowOrders, setOpenDialogShowOrders] = useState<boolean>(false)

    //Récupération des commandes
    const userInfo = useSelector(selectUserInfo)
    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders`
    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)

    /**
     * Compare la date entrée à celle des commandes présentes dans la base de données et renvoie un array avec les commandes correspondantes
     *   @param {Array} data - Commandes présentes dans la base de données
     * @param {Date} date - Date 
     */
    function dateComparison(data: any, date: string | null) {
        const ordersList: any[] = []
        for (let i = 0; i < data.length; i++) {
            const orderDate = data[i].delivery.time
            const orderDateString = dayjs(orderDate).toISOString().split("T")[0]
            if (date === orderDateString) {
                ordersList.push(data[i])
            }
        }
        setOrdersArray(ordersList)
    }

    /**
     * Permet l'ouverture du component mui dialog afin d'ajouter une patisserie
     */
    function handleOpenDialogShowOrders() {
        setOpenDialogShowOrders(true)
    }

    /**
     * Permet la fermeture du component mui dialog afin d'ajouter une patisserie
     */
    function handleCloseDialogShowOrders() {
        setOpenDialogShowOrders(false)
    }

    return (
        <Grid component="form" container spacing={4} display={'flex'} flexDirection={'column'} >
            <Grid item xs={12} >
                <FormControlLabel sx={{ marginLeft: '20px', marginTop: '10px' }}
                    control=
                    {<Switch
                        checked={deliveryService}
                        onChange={() => setDeliveryService(!deliveryService)}
                    />}
                    label="Livraison incluse"
                />
                {
                    deliveryService && <Grid item xs={12} marginTop={'15px'}>
                        <LocationTextField
                            location={deliveryLocation}
                            setLocation={setDeliveryLocation}
                        />
                    </Grid>
                }
                <Grid item xs={12} marginTop={'15px'}>
                    <CommentsTextField
                        comments={deliveryComments}
                        setComments={setDeliveryComments}
                        category={"delivery"}
                    />
                </Grid>
                <Grid item xs={12} marginTop={'15px'}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="fr"
                    >
                        <Grid item xs={12} marginTop={"20px"} >
                            <DatePicker
                                sx={{ width: "100%" }}
                                defaultValue={deliveryTime ? dayjs(deliveryTime) : dayjs(Date.now())}
                                localeText={frenchLocale}
                                label={"Date de livraison"}
                                onChange={(value) => {
                                    if (value) {
                                        setDeliveryTime(null)
                                        //Récupération de la date
                                        const date = value.toISOString().split("T")[0]
                                        dateComparison(data, date)
                                        setDateSelected(date)
                                        return
                                    }
                                }}
                            />
                            {!isLoading && (dateSelected || deliveryTime) &&
                                <Grid>
                                    <Grid display={'flex'} gap={"15px"} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                                        <Typography marginTop={"20px"}>{ordersArray && ordersArray.length > 0 ? `Vous avez ${ordersArray && ordersArray.length} commande${ordersArray.length > 1 ? "s" : " "} prévue${ordersArray.length > 1 ? "s" : " "} à ce jour` : "Vous n'avez pas de commande prévue pour ce jour"}</Typography>
                                        {ordersArray && ordersArray.length > 0 && <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={handleOpenDialogShowOrders}
                                            sx={{ mt: 2, mb: 2, width: "70px" }}
                                            size='small'
                                        >
                                            Voir
                                        </Button>}
                                    </Grid>
                                    {dateSelected &&
                                        <TimePicker
                                            sx={{ width: "40%", marginTop: "20px" }}
                                            ampm={false}
                                            defaultValue={null}
                                            localeText={frenchLocale}
                                            label={"Horaire de livraison"}
                                            onChange={(event) => {
                                                if (event) {
                                                    //Récupération de l'heure
                                                    const time = event.toISOString().split("T")[1]
                                                    const fullDate = dateSelected + "T" + time
                                                    setDeliveryTime(dayjs(fullDate).toDate())
                                                }
                                            }}
                                        />}
                                    {!dateSelected &&
                                        <TimePicker
                                            sx={{ width: "40%", marginTop: "20px" }}
                                            ampm={false}
                                            defaultValue={dayjs(deliveryTime)}
                                            localeText={frenchLocale}
                                            label={"Horaire de livraison"}
                                            onChange={(event) => {
                                                if (event) {
                                                    setDeliveryTime(dayjs(event).toDate())
                                                }
                                            }}
                                        />}
                                </Grid>}
                        </Grid>
                    </LocalizationProvider>

                    {/* Dialog avec le tableau des commandes ayant la même date de livraison */}
                    <Dialog sx={{ padding: "20px" }} fullWidth onClose={() => handleCloseDialogShowOrders()} open={openDialogShowOrders}>
                        <DialogTitle fontWeight={"bold"}>Commandes du {dateSelected && dateSelected.split("-")[2] + "/" + dateSelected.split("-")[1] + "/" + dateSelected.split("-")[0]}</DialogTitle>
                        <TableContainer sx={{ marginBottom: "20px" }} component={Paper}>
                            <Table aria-label="simple table" size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">Date de commande</TableCell>
                                        <TableCell sx={{ flex: 1, minWidth: "80px" }} align="left">Heure de livraison</TableCell>
                                        <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">Status de la commande</TableCell>
                                        <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">Status du paiement</TableCell>
                                        <TableCell sx={{ flex: 1, minWidth: "80px" }} align="left">Prix</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ordersArray && ordersArray.map((row: any) => (
                                        <TableRow
                                            onClick={() => {
                                                const id = row._id
                                                window.open(`${window.location.origin}/home/orders/${id}`, '_blank')
                                            }}
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                        >
                                            <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">{row.customer && row.customer.name}</TableCell>
                                            <TableCell sx={{ flex: 1, minWidth: "80px" }} align="left">{row.delivery && row.delivery.time && formatTime(row.delivery.time)}</TableCell>
                                            <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">{row.orderStatus}</TableCell>
                                            <TableCell sx={{ flex: 1, minWidth: "100px" }} align="left">{row.paymentInfo && row.paymentInfo.status}</TableCell>
                                            <TableCell sx={{ flex: 1, minWidth: "80px" }} align="left">{row.paymentInfo && row.paymentInfo.totalToPay && formatPrice(row.paymentInfo.totalToPay)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Dialog>
                </Grid>
            </Grid>
        </Grid>)
}


