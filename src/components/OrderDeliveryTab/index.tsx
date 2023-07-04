/**
 * Gestion du Component OrderDeliveryTab
 **/

import { useState } from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { formatFullDate } from '../../utils/utils';
import DeliveryCalendarManager from '../DeliveryCalendarManager';
import UpdateButton from '../UpdateButton';
import SubmitButton from '../SubmitButton';
import CancelButton from '../CancelButton';
import { updateData } from '../../utils/api';
import { selectUserInfo } from '../../utils/selectors';
import PicturesManager from '../PicturesManager';
import { Dispatch } from '@reduxjs/toolkit';
import { error, reset } from '../../features/alertSnackbar';

type Props = {
    orderData: any,
}

/**
 * Affiche Component OrderDeliveryTab qui permet d'afficher les informations de livraison et les photos
 * @param {object} orderData - Données de la commande 
 */
export default function OrderDeliveryTab({ orderData }: Props) {
    const navigate: NavigateFunction = useNavigate()
    const dispatch: Dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State de mise à jour 
    const [onUpdate, setOnUpdate] = useState<boolean>(false)

    //State du status du service pour inclure la livraison
    const [deliveryService, setDeliveryService] = useState<boolean>(orderData && orderData.delivery && orderData.delivery.service)
    //State de lieu de livraison
    const [deliveryLocation, setDeliveryLocation] = useState<string | null>(orderData && orderData.delivery && orderData.delivery.location)
    //State de l'horaire de livraison
    const [deliveryTime, setDeliveryTime] = useState<Date | null>(orderData && orderData.delivery && orderData.delivery.time)
    //State pour les informations supplémentaires de livraison
    const [deliveryComments, setDeliveryComments] = useState<string | null>(orderData && orderData.delivery && orderData.delivery.comments)

    // //State pour savoir si l'heure a bien été choisie notamment lors des modifications
    // const [timeSelected, setTimeSelected] = useState<boolean>(true)

    /**
     * Fonction qui permet la mise à jour de la partie livraison de la commande dans la base de données
     */
    function handleUpdate() {
        dispatch(reset());

        //Vérifications
        if (!deliveryTime) {
            dispatch(error("Veuillez choisir la date et l'heure de récupération de la commande"))
            return
        }
        if (deliveryService && !deliveryLocation) {
            dispatch(error("La livraison ayant été choisie, veuillez entrer une adresse"))
            return
        }


        //Constitution de l'objet
        const orderObject = {
            delivery: {
                time: deliveryTime,
                service: deliveryService,
                location: (deliveryService && deliveryLocation) ? deliveryLocation.trim() : null,
                comments: deliveryComments ? deliveryComments.trim() : null,
            }
        }

        //Tests
        //Adresse
        if ((orderObject.delivery.location && (orderObject.delivery.location.length > 0 && orderObject.delivery.location.length < 500)) || !orderObject.delivery.location) {
            //Commentaires
            if ((orderObject.delivery.comments && (orderObject.delivery.comments.length > 0 && orderObject.delivery.comments.length < 1000)) || !orderObject.delivery.comments) {
                const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
                updateData(orderObject, url, userInfo, dispatch, navigate)
            } else {
                dispatch(error("Le commentaire doit comporter entre 1 et 1000 caractères"));
            }
        } else {
            dispatch(error("L'adresse doit comporter entre 1 et 500 caractères"));
            return
        }
    }
    return (
        < Grid
            container
            display={"flex"}
            sx={{ gap: { xs: 2, md: 0 } }}
            gap={'15px'}
            flexDirection={'column'}
        >
            {/* Section Boutons */}
            <Grid display={'flex'} justifyContent={'space-around'}>
                {!onUpdate && <UpdateButton
                    handleUpdate={() => setOnUpdate(true)}
                />}
                {onUpdate && <SubmitButton disabled={false} handleClick={handleUpdate} />}
                {onUpdate && <CancelButton handleCancel={() => setOnUpdate(false)} />}
            </Grid>
            {/* Delivery Section */}
            {!onUpdate ? <Grid>
                <Grid item xs={12}  >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Horaires
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        marginTop={"10px"}
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.delivery && orderData.delivery.time && "Commande passée pour le " + formatFullDate(orderData.delivery.time)}
                    </Typography>
                </Grid>

                <Divider sx={{ my: 1 }} />

                <Grid item xs={12}  >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Retrait
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        marginTop={"10px"}
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.delivery && orderData.delivery.service ? ("Livraison au " + orderData.delivery.location) : `A récupérer`}
                    </Typography>
                </Grid>



                {orderData.delivery && orderData.delivery.comments && <Grid item xs={12}  >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Commentaires sur le lieu de livraison
                    </Typography>
                </Grid>}

                {orderData.delivery && orderData.delivery.comments && <Grid item xs={12}>
                    <Typography
                        marginTop={"10px"}
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.delivery.comments}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                </Grid>}
            </Grid> :
                <DeliveryCalendarManager
                    deliveryService={deliveryService}
                    setDeliveryService={setDeliveryService}
                    deliveryLocation={deliveryLocation}
                    setDeliveryLocation={setDeliveryLocation}
                    deliveryComments={deliveryComments}
                    setDeliveryComments={setDeliveryComments}
                    deliveryTime={deliveryTime}
                    setDeliveryTime={setDeliveryTime}
                />
            }



            {/* Section Photos */}
            {!onUpdate && <PicturesManager
                orderData={orderData}
            />}
            <Divider sx={{ my: 1 }} />

        </Grid >)
}