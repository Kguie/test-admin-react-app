/**
 * Gestion de du component BillToPrint pour l'impression de la facture
 **/


import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { colors } from '../../utils/style/variables';
import LogoDisplay from '../LogoDisplay';
import { calculatePriceAndQuantity, formatDate, formatFullDate, formatPrice } from '../../utils/utils';
import instaQr from '../../assets/smile.svg'

type Props = {
    orderData: any,
    quotationObject: any,
}

const StyledQrCode = styled.img({
    width: '150px'
});

/**
 * Affiche la facture à imprimer
 * @param {Object} orderData - Données de la commande,
 * @param {Object} quotationObject - Données du devis0, 
 */
export default function BillToPrint({ orderData, quotationObject, }: Props) {

    //Pourcentage de réduction
    const discount: number = quotationObject && quotationObject.reduction && quotationObject.reduction.amount && quotationObject.reduction.amount / 100

    return (<Grid pr={'4%'} pl={'4%'} container display={'flex'} flexDirection={'column'}   >
        <LogoDisplay />
        <Grid item width={'100%'} display={'flex'} justifyContent={'end'} >
            <Typography marginTop={'-50px'} fontSize={'18px'} fontWeight={900}>
                Client
            </Typography>
            <Typography marginTop={'-10px'} fontSize={'18px'}>
                {orderData && orderData.customer && orderData.customer.name}
            </Typography>
        </Grid>
        <Grid marginTop={"-30px"} display={'flex'} flexDirection={'column'}>
            <Typography>Test-admin</Typography>
            <Typography></Typography>
            <Typography> 97170 Petit-Bourg</Typography>
        </Grid>
        <Grid item display={'flex'} justifyContent={'flex-end'} gap={'40px'}
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <Typography >
                Date: {quotationObject && quotationObject.deliveryDate && formatDate(quotationObject.deliveryDate)}
            </Typography>
            <Typography  >
                N° de Facture: F{quotationObject && quotationObject._id}
            </Typography>
        </Grid>
        <Grid item marginTop={'40px'}>
            {/* Tableau des patisseries */}
            <TableContainer  >
                <Table size="small"  >
                    <TableHead sx={{ backgroundColor: colors.lightBrown }}>
                        <TableRow>
                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "27%" }}>Patisserie</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "32%" }}>Détails et options</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "4%" }}>Nombre</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "7%" }}>Prix unitaire</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "7%" }}>Prix total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quotationObject && quotationObject.pastriesList.map((pastry: any, index: number) =>
                            <TableRow key={'pastry' + index}>
                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "27%" }}>{pastry.pastryName}</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000', width: "32%" }}>{pastry.description}</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000', width: "4%" }}>{pastry.quantity}</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000', width: "7%" }}>{formatPrice(pastry.price)}</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000', width: "7%" }}>{formatPrice(pastry.quantity * pastry.price)}</TableCell>
                            </TableRow>
                        )}
                        <TableRow sx={{ alignItems: 'end' }}>
                            <TableCell align='center' sx={{ borderBottomColor: 'transparent' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>Nombre total</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>
                                {quotationObject && quotationObject.pastriesList && calculatePriceAndQuantity(quotationObject.pastriesList).quantity}
                            </TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' sx={{ borderBottomColor: 'transparent' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', width: "30%" }}>Sous-total</TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                            <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>
                                {quotationObject && quotationObject.pastriesList && formatPrice(calculatePriceAndQuantity(quotationObject.pastriesList).price)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Tableau des services */}
            {quotationObject && quotationObject.servicesList && quotationObject.servicesList.length > 0 &&
                <TableContainer sx={{ marginTop: '10px' }} >
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: colors.primary }}>
                            <TableRow>
                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "30%" }}>Service</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "58%" }}>Détails et options</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000', width: "10%" }}>Prix total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quotationObject && quotationObject.servicesList && quotationObject.servicesList.map((service: any, index: number) =>
                                <TableRow key={'service' + index}>
                                    <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 900, border: '1px solid', borderColor: '#000000' }}>{service.name}</TableCell>
                                    <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000' }}>{service.description}</TableCell>
                                    <TableCell align='center' sx={{ fontSize: '14px', border: '1px solid', borderColor: '#000000' }}>{formatPrice(service.price)}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell align='center' sx={{ borderBottomColor: 'transparent' }}></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>Sous-total</TableCell>
                                <TableCell align='center' sx={{ fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>
                                    {quotationObject && quotationObject.servicesList && formatPrice(calculatePriceAndQuantity(quotationObject.servicesList).price)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>}



            {/* Tableau final */}

            <TableContainer sx={{ marginTop: '25px' }} >
                <Table size="small"   >
                    <TableBody>
                        {/* Ligne prix total */}
                        <TableRow>
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottomColor: 'transparent', width: '10%' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', backgroundColor: colors.lightBrown }}>Total</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottom: '1px solid', borderColor: '#000000', backgroundColor: colors.lightBrown }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', width: '15%', backgroundColor: colors.lightBrown }}>
                                {quotationObject && quotationObject.reduction && quotationObject.reduction.amount && quotationObject.reduction.amount > 0 ? formatPrice(quotationObject.totalPrice) : formatPrice(quotationObject.finalPrice)}
                            </TableCell>
                        </TableRow>

                        {/* Ligne réduction */}

                        {quotationObject.reduction.amount > 0 && <TableRow>
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottomColor: 'transparent', width: '10%' }}></TableCell>
                            {quotationObject.reduction && quotationObject.reduction.reason ?
                                <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>
                                    Remise {quotationObject.reduction.reason} {quotationObject.reduction.amount}%
                                </TableCell> :
                                <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>
                                    Remise  {quotationObject.reduction.amount}
                                </TableCell>}
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', width: '15%' }}>
                                - {quotationObject && formatPrice(discount * quotationObject.totalPrice)}
                            </TableCell>
                        </TableRow>}

                        {/* Ligne total après réduction */}
                        {quotationObject.reduction.amount > 0 &&
                            <TableRow >
                                <TableCell align='center' sx={{ fontWeight: 900, borderBottomColor: 'transparent', width: '10%' }}></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', backgroundColor: colors.lightBrown }}>Total après réduction</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 900, borderBottom: '1px solid', borderColor: '#000000', backgroundColor: colors.lightBrown }}></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', width: '15%', backgroundColor: colors.lightBrown }}>
                                    {quotationObject && formatPrice(quotationObject.finalPrice)}
                                </TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>



            <Grid item display={'flex'} gap={'10px'} marginTop={'35px'}>
                <Typography fontSize={'18px'} fontWeight={900}>Date de l'évènement :</Typography>
                <Typography fontSize={'18px'}>Le {quotationObject && quotationObject.deliveryDate && formatFullDate(quotationObject.deliveryDate)}</Typography>
                {orderData && orderData.delivery && !orderData.delivery.service && <Typography>à récupérer à Petit-Bourg</Typography>}
            </Grid>

            {/* Partie Contact */}
            <Grid item marginTop={'20px'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                <StyledQrCode src={instaQr} alt='Qr code instagram' />
                <Grid display={'flex'} flexDirection={'column'} textAlign={'center'}>
                    <Typography fontWeight={900}>gingercookies33971@gmail.com</Typography>
                    <Typography fontWeight={900}>06 72 66 92 87</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}