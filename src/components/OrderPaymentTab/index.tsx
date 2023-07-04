/**
 * Gestion du Component OrderPaymentTab
 **/

import { useState } from 'react';
import { Typography, Grid, Button, Divider, Tooltip, } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Dispatch } from '@reduxjs/toolkit';

import { selectUserInfo } from '../../utils/selectors';
import { formatPrice } from '../../utils/utils';
import PriceTextField from '../PriceTextField';
import PaymentMethodSelect from '../PaymentMethodSelect';
import { colors } from '../../utils/style/variables';
import PayBackStatusSelect from '../PayBackStatusSelect';
import CommentsTextField from '../CommentsTextField';
import SubmitButton from '../SubmitButton';
import CancelButton from '../CancelButton';
import { updateData } from '../../utils/api';
import PaymentMethodTextField from '../PaymentMethodTextField';
import { error, reset } from '../../features/alertSnackbar';
import BillManagementDialog from '../BillManagementDialog';
type orderProps = {
    orderData: any,
}

/**
 * Affiche Component OrderPaymentTab qui permet le fonctionnement du tab paiement dans l'affichage d'une commande
 * @param {object} orderData - Données de la commande
 */
export default function OrderPaymentTab({ orderData }: orderProps) {
    const navigate: NavigateFunction = useNavigate()
    const dispatch: Dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State de mise à jour du paiement
    const [onPaymentUpdate, setOnPaymentUpdate] = useState<boolean>(false)

    //State de la mise à jour du remboursement
    const [onPayBackUpdate, setOnPayBackUpdate] = useState<boolean>(false)

    //State de la valeur de paiement corrigée
    const [payed, setPayed] = useState<number | null>(null)

    //State de la mise à jour de la valeur de paiement corrigée
    const [payedOnUpdate, setPayedOnUpdate] = useState<boolean>(false)

    //State de la somme versée par le client lors du paiement à l'origine de cette modification
    const [onPayment, setOnPayment] = useState<number | null>(0)
    //State de la méthode de paiement utilisée
    const [paymentMethod, setPaymentMethod] = useState<string>('')

    //State de la correction de la liste de la méthode de paiement sous forme de string
    const [paymentMethodStringList, setPaymentMethodStringList] = useState<string | null>(orderData && orderData.paymentInfo && orderData.paymentInfo.method ? orderData.paymentInfo.method : '')

    //States du remboursement
    // State du status
    const [paybackStatus, setPaybackStatus] = useState<string>(orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.status ? orderData.paymentInfo.payback.status : 'non demandé')
    //Raison
    const [paybackReason, setPaybackReason] = useState<string | null>(orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.reason ? orderData.paymentInfo.payback.reason : null)
    //Montant du remboursement
    const [paybackAmount, setPaybackAmount] = useState<number | null>(orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.amount ? orderData.paymentInfo.payback.amount : null)

    //State du status d'ouverture du dialog de la facture
    const [openBillDialog, setOpenBillDialog] = useState<boolean>(false)

    /**
     * Permet l'envoie des données de mise à jour des information de paiement
     */
    function handlePaymentUpdate() {
        dispatch(reset())

        //Pas de correction de la valeur de la somme payée par le client
        if (onPaymentUpdate) {
            //Vérifications
            if ((!onPayment || onPayment === 0) || paymentMethod === '') {
                dispatch(error('Veuillez rentrer un prix et une méthode de paiement valide'))
                return
            }

            if (orderData && orderData.paymentInfo && !orderData.paymentInfo.totalToPay) {
                dispatch(error("Veuillez d'abord valider un devis"))
                return
            }


            if (orderData && orderData.paymentInfo && (orderData.paymentInfo.payed ? orderData.paymentInfo.payed : 0 + onPayment) > orderData.paymentInfo.left) {
                dispatch(error("Le prix entré est supérieur au reste à payer"))
                return
            }

            //Ajustement de la liste sous forme de string pour la méthode de paiement
            const getPaymentMethodList = () => {
                let paymentMethodList: string = orderData && orderData.paymentInfo && orderData.paymentInfo.method ? orderData.paymentInfo.method : ""

                if (paymentMethodList.includes(paymentMethod)) {
                    return paymentMethodList
                } else {
                    paymentMethodList = paymentMethodList + (paymentMethodList === "" ? paymentMethod : (", " + paymentMethod))
                    return paymentMethodList
                }
            }

            //Constitution de l'objet
            const paymentObject = {
                payed: orderData && orderData.paymentInfo && (orderData.paymentInfo.payed ? orderData.paymentInfo.payed : 0 + onPayment),
                method: getPaymentMethodList()
            }

            // Update
            const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
            updateData(paymentObject, url, userInfo, dispatch, navigate)

            setOnPayment(null)
            setPaymentMethod('')

            //Correction de la somme payée et(ou) des méthode de paiement utilisée
        } if (payedOnUpdate) {
            //Vérifications
            if (orderData.paymentInfo.payed === 0) {
                dispatch(error("Aucun paiement n'a encore été effectuée"))
                return
            }
            //Constitution de l'objet
            const paymentObject = {
                payed: onPayment,
                method: paymentMethodStringList
            }

            //Update
            const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
            updateData(paymentObject, url, userInfo, dispatch, navigate)
            setPayed(null)
        }
        setOnPaymentUpdate(false)
    }

    /**
     * Permet l'envoie des données de mise à jour des information de remboursement
     */
    function handlePayBackUpdate() {
        dispatch(reset())

        //Vérifications
        if (!orderData.paymentInfo.payed || orderData.paymentInfo.payed === 0) {
            dispatch(error("Aucune somme n'a été versée par le client"))
            return
        }
        if (!(paybackStatus === 'non demandé' || paybackStatus === 'demandé' || paybackStatus === 'accepté' || paybackStatus === 'refusé' || paybackStatus === 'annulé')) {
            dispatch(error("Veuillez sélectionner un status valide"))
        }

        if (paybackStatus !== "accepté" && (paybackAmount && paybackAmount > 0)) {
            dispatch(error("Le remboursement doit d'abord être accepté"))
            return
        }

        //Constitution de l'objet
        const paybackObject = {
            wanted: (paybackStatus === 'non demandé' || paybackStatus === 'annulé') ? false : true,
            status: paybackStatus,
            reason: paybackReason ? paybackReason : null,
            amount: (paybackStatus === 'accepté' && paybackAmount) ? paybackAmount : null,
        }
        //Update
        const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
        updateData(paybackObject, url, userInfo, dispatch, navigate)
        setOnPayBackUpdate(false)
    }

    return (
        < Grid
            container
            display={"flex"}
            sx={{ gap: { xs: 2, md: 0 } }}
            flexDirection={'column'}
        >
            {/* Informations de paiement */}

            <Grid>
                <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Status du paiement
                    </Typography>
                    <Typography color={'text.secondary'} textTransform={'capitalize'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                        {orderData && orderData.paymentInfo && orderData.paymentInfo.status}
                    </Typography>
                </Grid>
                <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                    <Typography sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }} fontWeight={500}>
                        Somme totale due :
                    </Typography>
                    <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                        {orderData && orderData.paymentInfo && orderData.paymentInfo.totalToPay ? formatPrice(orderData.paymentInfo.totalToPay) : "Aucun devis n'a été validé pour cette commande"}
                    </Typography>
                </Grid>

                {/* Section montant payé par le client */}
                <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                    <Grid display={'flex'} alignItems={'center'} sx={{ justifyContent: { xs: 'right', md: 'left' } }}>
                        {/* Bouton pour ouvrir la fenêtre de modification de la somme payée par le client, à utiliser en cas d'erreur */}
                        {onPaymentUpdate && !onPayBackUpdate && !payedOnUpdate && orderData.paymentInfo.payed > 0 &&
                            <Tooltip title="Corriger la somme payée par le client et la méthode de paiement " placement="right">
                                <Button
                                    size='large'
                                    onClick={() => {
                                        orderData && orderData.paymentInfo && orderData.paymentInfo.payed && setPayed(orderData.paymentInfo.payed)
                                        setPayedOnUpdate(true)
                                        setOnPaymentUpdate(false)
                                    }}
                                >
                                    <ChangeCircleIcon fontSize='large' color='info' />
                                </Button>
                            </Tooltip>
                        }
                        <Typography sx={{ fontSize: { xs: 17, md: 20 } }} fontWeight={500}>
                            Montant payé par le client :
                        </Typography>
                    </Grid>
                    {!payedOnUpdate ?
                        <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                            {orderData && orderData.paymentInfo && orderData.paymentInfo.payed ? formatPrice(orderData.paymentInfo.payed) : (0 + '€')}
                        </Typography> :
                        <Grid display={'flex'} flexDirection={'column'} gap={'10px'} >
                            <Typography color={colors.primary} sx={{ fontSize: { xs: 14, md: 16 } }}>
                                Veuillez entrer la somme corrigée
                            </Typography>
                            <Grid display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                                <PriceTextField
                                    price={payed}
                                    setPrice={setPayed}
                                    setChanged={null}
                                />
                            </Grid>
                        </Grid>}


                </Grid>
                {orderData && orderData.paymentInfo && orderData.paymentInfo.totalToPay &&
                    <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                        <Typography sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }} fontWeight={500}>
                            Reste à payer :
                        </Typography>
                        <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                            {orderData && orderData.paymentInfo && orderData.paymentInfo.left && formatPrice(orderData.paymentInfo.left)}
                        </Typography>
                    </Grid>}
                {orderData && orderData.paymentInfo && orderData.paymentInfo.method && orderData.paymentInfo.method.length > 0 && <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                    <Typography sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }} fontWeight={500}>
                        Moyen de paiement :
                    </Typography>
                    {!payedOnUpdate ? <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                        {orderData && orderData.paymentInfo && orderData.paymentInfo.method}
                    </Typography> :
                        <PaymentMethodTextField
                            paymentMethod={paymentMethodStringList}
                            setPaymentMethod={setPaymentMethodStringList}
                        />}

                </Grid>}
            </Grid>

            {onPaymentUpdate &&
                // Update du paiement
                <Grid margin={'15px'} display={'flex'} flexDirection={'column'} gap={'10px'}>
                    <Typography color={colors.primary} sx={{ fontSize: { xs: 16, md: 18 }, textAlign: { xs: "center", md: "left" } }} fontWeight={500}>
                        Veuillez sélectionner la somme versée par le client ainsi que la méthode de paiement utilisée
                    </Typography>
                    <Grid rowGap={'15px'} justifyContent={'space-around'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Grid item xs={3} maxWidth={'sm'}>
                            <PriceTextField
                                price={onPayment}
                                setPrice={setOnPayment}
                                setChanged={null}
                            />
                        </Grid>
                        <Grid item xs={8} maxWidth={'sm'}>
                            <PaymentMethodSelect
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                            />
                        </Grid>
                    </Grid>
                </Grid>}
            <Divider sx={{ my: 1 }} />

            {/* Section Remboursement */}
            {!onPaymentUpdate &&
                <Grid display={"flex"} flexDirection={'column'}>
                    {orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.wanted &&
                        <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                            <Typography
                                sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                                fontWeight={500}
                            >
                                Remboursement
                            </Typography>
                            <Typography color={'error'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                Un remboursement a été demandé
                            </Typography>
                            <Grid display={'flex'} gap={'10px'} flexWrap={'wrap'}>
                                <Typography fontWeight={900} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                    Status :
                                </Typography>
                                <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                    {orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.status}
                                </Typography>
                            </Grid>
                            <Grid display={'flex'} gap={'10px'} flexWrap={'wrap'}>
                                <Typography fontWeight={900} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                    Raison :
                                </Typography>
                                <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                    {orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.reason}
                                </Typography>
                            </Grid>
                            {orderData && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.status === 'accepté' &&
                                <Grid display={'flex'} gap={'10px'} flexWrap={'wrap'}>
                                    <Typography fontWeight={900} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                        Montant remboursé :
                                    </Typography>
                                    <Typography color={'text.secondary'} sx={{ fontSize: { xs: 16, md: 18 } }}>
                                        {orderData.paymentInfo.payback.amount ? formatPrice(orderData.payback.amount) : "0 €"}
                                    </Typography>
                                </Grid>}
                        </Grid>}

                    {/* Update du remboursement */}
                    {onPayBackUpdate && <Grid item xs={12} marginTop={'25px'} display={'flex'} gap={'10px'} flexDirection={'column'}  >
                        <Typography color={colors.primary} sx={{ fontSize: { xs: 16, md: 18 }, textAlign: { xs: "center", md: "left" } }} fontWeight={500}>
                            Veuillez expliquer en quelques lignes la raison de cette demande, choisir le status du remboursement,et si cette demande est acceptée ,indiquer la somme remboursée
                        </Typography>
                        <CommentsTextField
                            comments={paybackReason}
                            setComments={setPaybackReason}
                            category={null}
                        />
                        <Grid rowGap={'15px'} justifyContent={'space-around'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Grid item xs={8} maxWidth={'sm'}>
                                <PayBackStatusSelect
                                    paybackStatus={paybackStatus}
                                    setPaybackStatus={setPaybackStatus}
                                />
                            </Grid>
                            {paybackStatus === 'accepté' && <Grid item xs={3} maxWidth={'sm'}>
                                <PriceTextField
                                    price={paybackAmount}
                                    setPrice={setPaybackAmount}
                                    setChanged={null}
                                />
                            </Grid>}
                        </Grid>
                    </Grid>}
                </Grid >}
            {/* Section boutons */}
            <Grid>
                {!onPaymentUpdate && !onPayBackUpdate && !payedOnUpdate &&
                    <Grid display={'flex'} justifyContent={'space-around'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'}>
                        <Button
                            sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                            variant="contained"
                            color='info'
                            onClick={() => setOnPaymentUpdate(true)}
                        >
                            Mettre à jour paiement
                        </Button>
                        <Button
                            sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                            variant="contained"
                            color='info'
                            onClick={() => setOpenBillDialog(true)}
                        >
                            Facture
                        </Button>
                        <Button
                            sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                            variant="contained"
                            color='error'
                            onClick={() => {
                                dispatch(reset())
                                if (!orderData.paymentInfo.payed || orderData.paymentInfo.payed === 0) {
                                    dispatch(error("Aucune somme n'a été versée par le client"))
                                    return
                                }
                                setOnPayBackUpdate(true)
                            }}
                        >
                            Demander remboursement
                        </Button>
                    </Grid>}
                {(onPaymentUpdate || onPayBackUpdate || payedOnUpdate) &&
                    <Grid display={'flex'} justifyContent={'space-around'} >
                        <CancelButton
                            handleCancel={() => {
                                if (onPaymentUpdate) {
                                    setOnPaymentUpdate(false)
                                    setOnPayment(null)
                                    setPaymentMethod('')
                                } if (onPayBackUpdate) {
                                    setOnPayBackUpdate(false)
                                }
                                if (payedOnUpdate) {
                                    setPayed(null)
                                    setPaymentMethodStringList(orderData && orderData.paymentInfo && orderData.paymentInfo.method ? orderData.paymentInfo.method : '')
                                    setPayedOnUpdate(false)
                                }
                            }}
                        />
                        <SubmitButton
                            disabled={false}
                            handleClick={() => {
                                if (onPaymentUpdate) {
                                    handlePaymentUpdate()
                                    return

                                } if (onPayBackUpdate) {
                                    handlePayBackUpdate()
                                    return
                                }
                                if (payedOnUpdate) {
                                    if (!payed) {
                                        setPayed(0)
                                    }
                                    handlePaymentUpdate()
                                    return
                                }
                            }}
                        />
                    </Grid>}

                {/* Dialog facture */}
                <BillManagementDialog
                    openBillDialog={openBillDialog}
                    setOpenBillDialog={setOpenBillDialog}
                    orderData={orderData}
                />
            </Grid>
        </Grid >
    )
}