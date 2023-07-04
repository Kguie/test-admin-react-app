/**
 * Gestion du component pour le résumé de la commande
 **/

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { formatFullDate } from '../../utils/utils';

type Props = {
    customer: any,
    requestList: Array<any>,
    contactWay: string | null,
    event: string | null,
    deliveryService: boolean,
    deliveryLocation: string | null,
    deliveryComments: string | null,
    deliveryTime: Date | null,
}

/**
 * Component permettant d'afficher le résumé de la commande
 * @param {Object | null} Customer - Object avec les données du client quand un client est sélectionné
 * @param {Array<any>} requestList - Liste de requêtes  
 * @param {string|null} contactWay - Moyen de contact utilisé 
 * @param {string|null} event - Évènement
 * @param {boolean} deliveryService - State qui définit si l'option livraison est activée  
 * @param {string|null} deliveryLocation - Lieu de livraison si il y en a un  
 * @param {string|null} deliveryComments - Commentaires de livraison 
 * @param {Date|null} deliveryTime - State qui affiche la date de livraison si il y en a une
 */
export default function OrderReviewStep({ customer, requestList, contactWay, event, deliveryService, deliveryLocation, deliveryComments, deliveryTime }: Props) {

    return (
        <React.Fragment>
            <Typography variant="h2" gutterBottom fontSize={"22px"}>
                Résumé de la commande
            </Typography>
            <Grid container gap={'20px'} marginTop={"10px"} display={"flex"} flexDirection={"column"}>
                <Divider sx={{ my: 2, maxWidth: "100%" }} />
                {/* Client */}
                <Grid item xs={12} gap={"5px"} >
                    <Typography
                        sx={{ fontSize: { xs: 16, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Client
                    </Typography>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {customer && customer.name && customer.name.lastName + " " + customer.name.firstName}
                    </Typography>
                </Grid>
                <Divider sx={{ my: 2, maxWidth: "100%" }} />

                {/* Demandes */}
                <Grid item xs={12}>
                    <Typography
                        sx={{ fontSize: { xs: 15, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500} marginBottom={"15px"}
                    >
                        Requêtes
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={"15px"} align="left">Parts</TableCell>
                                    <TableCell width={"15px"} align="left">Quantité</TableCell>
                                    <TableCell sx={{ minWidth: "25px" }} align="left">Patisseries</TableCell>
                                    <TableCell sx={{ minWidth: "25px" }} align="left">Services</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requestList.map((row: any, index: any) => (
                                    <TableRow
                                        key={row.size + row.quantity + index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    >
                                        <TableCell width={"15px"} align="left">{row.size}</TableCell>
                                        <TableCell width={"15px"} align="left">{row.quantity}</TableCell>
                                        <TableCell sx={{ minWidth: "25px" }} align="left" data-testid="cellRow">{row.pastryDescription}</TableCell>
                                        <TableCell sx={{ minWidth: "25px" }} align="left">{row.services}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Moyen de contact */}
                <Grid item >
                    <Typography
                        sx={{ fontSize: { xs: 15, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Moyen de contact utilisé
                    </Typography>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {contactWay && contactWay}
                    </Typography>
                </Grid>

                {/* Évènement */}
                <Grid item >
                    <Typography
                        sx={{ fontSize: { xs: 15, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Évènement
                    </Typography>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {event && event}
                    </Typography>
                </Grid>
                <Divider />
                {/* Livraison */}
                <Grid item >
                    <Typography
                        sx={{ fontSize: { xs: 15, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Livraison
                    </Typography>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {deliveryService ? "Livrer à " + deliveryLocation : "À retirer"}
                    </Typography>
                    {deliveryComments && <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {deliveryComments}
                    </Typography>}
                    <Typography
                        sx={{ fontSize: { xs: 15, md: 18 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Horaire
                    </Typography>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 15, md: 18 } }}
                    >
                        {deliveryTime && formatFullDate(deliveryTime)}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment >
    );
}