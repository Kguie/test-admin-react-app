/**
 * Gestion de du component QuotationManagement pour la gestion d'un devis
 **/


import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { colors } from '../../utils/style/variables';
import LogoDisplay from '../LogoDisplay';
import { calculatePriceAndQuantity, formatDate, formatFullDate, formatPrice } from '../../utils/utils';
import instaQr from '../../assets/smile.svg';

type Props = {
    orderData: any,
    quotationObject: any,
}

const StyledQrCode = styled.img({
    width: '150px'
});

/**
 * Affiche le devis à imprimer
 * @param {Object} orderData Données de la commande,
 * @param {Object} QuotationObject Données du devis, 
 */
export default function QuotationToPrint({ orderData, quotationObject, }: Props) {

    //Pourcentage de réduction
    const discount: number = quotationObject && quotationObject.reduction && quotationObject.reduction.amount && quotationObject.reduction.amount / 100

    return (<Grid pr={'4%'} pl={'4%'} container display={'flex'} flexDirection={'column'}   >
        <LogoDisplay />
        <Grid item width={'100%'} display={'flex'} justifyContent={'end'} >
            <Typography marginTop={'-50px'} fontSize={'18px'}>
                {orderData && orderData.customer && orderData.customer.name}
            </Typography>
        </Grid>
        <Grid item width={'70%'} display={'flex'} justifyContent={'space-between'}
            marginLeft={'30px'}
            marginTop={'20px'}
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <Typography >
                Date: {quotationObject && quotationObject.data && quotationObject.data.time && formatDate(quotationObject.data.time)}
            </Typography>
            <Typography  >
                N° de devis: {quotationObject && quotationObject._id}
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

                        {/* Ligne Acompte */}
                        <TableRow>
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottomColor: 'transparent', width: '10%' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000' }}>Acompte de 30%</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, borderBottom: '1px solid', borderColor: '#000000' }}></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 900, fontSize: '14px', borderBottom: '1px solid', borderColor: '#000000', width: '15%' }}>
                                {quotationObject && quotationObject.finalPrice && formatPrice(0.3 * quotationObject.finalPrice)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>



            <Grid item display={'flex'} gap={'10px'} marginTop={'35px'}>
                <Typography fontSize={'18px'} fontWeight={900}>Date de l'évènement :</Typography>
                <Typography fontSize={'18px'}>Le {quotationObject && quotationObject.deliveryDate && formatFullDate(quotationObject.deliveryDate)}</Typography>
                {orderData && orderData.delivery && !orderData.delivery.service && <Typography>à récupérer au magasin</Typography>}
            </Grid>
            <Grid item display={'flex'} gap={'10px'}>
                <Typography fontSize={'18px'} fontWeight={900}>Modalité de paiement :</Typography>
                <Typography fontSize={'18px'}>Acompte de 30% puis solde à la livraison</Typography>
            </Grid>
            <Grid marginTop={'20px'} item display={'flex'} gap={'10px'} flexDirection={'column'}>
                <Typography >Ce devis est valable 60 jours à compter de la réception par le client. Passé ce délais des modifications de tarifs sont possibles et donc un nouveau devis sera réalisé si besoin.</Typography>
                <Typography>La date de votre évènement sera bloquée dans l’agenda Test-admin après que vous ayez validé le devis et après versement de l’acompte de 30%. Si vous avez des questions sur les produits, si vous souhaitez discuter plus en détails de la prestation, n’hésitez pas à nous contacter par mail, téléphone ou dm instagram.</Typography>
            </Grid>

            {/* Partie Contact */}
            <Grid item marginTop={'20px'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                <StyledQrCode src={instaQr} alt='Qr code instagram' />
                <Grid display={'flex'} flexDirection={'column'} textAlign={'center'}>
                    <Typography fontWeight={900}>kguie.test@outlook.com</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>)
}