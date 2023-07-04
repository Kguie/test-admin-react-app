/**
 * Gestion de la page NewCustomer
 **/

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';

import { selectUserInfo } from '../../utils/selectors';
import CustomerChoice from '../../components/CustomerChoiceStep';
import CustomerRequest from '../../components/CustomerRequestStep';
import OrderDelivery from '../../components/OrderDeliveryStep';
import OrderReview from '../../components/OrderReviewStep';
import { error, reset } from '../../features/alertSnackbar';
import CustomizedSnackBar from '../../components/CustomizedSnackbar';

const steps = ['Choix du client', 'Requête du client', 'Livraison', 'Résumé de la commande'];

/**
 * Affichage de la page de création d'une nouvelle commande avec son stepper pour la navigation entre les différentes étapes
 */
export default function NewOrder() {
    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    //State de la page active
    const [activeStep, setActiveStep] = React.useState(0);

    //State de l'objet client de la première étape avec toutes ses infos
    const [customer, setCustomer] = useState<any>(null)

    //States de la seconde étape
    const [requestList, setRequestList] = useState<Array<any>>([])
    const [contactWay, setContactWay] = useState<string | null>(null)
    const [event, setEvent] = useState<string | null>(null)

    //State de la 3 ème étape pour les information de livraison
    //State du status du service pour inclure la livraison
    const [deliveryService, setDeliveryService] = useState<boolean>(false)
    //State de lieu de livraison
    const [deliveryLocation, setDeliveryLocation] = useState<string | null>(null)
    //State de l'horaire de livraison
    const [deliveryTime, setDeliveryTime] = useState<Date | null>(null)
    //State pour les informations supplémentaires de livraison
    const [deliveryComments, setDeliveryComments] = useState<string | null>(null)

    const handleNext = () => {
        dispatch(reset())
        if (activeStep === 0 && !customer) {
            dispatch(error("Veuillez sélectionner un client"))
            return
        }

        if (activeStep === 1) {
            if (requestList.length === 0) {
                dispatch(error("Veuillez ajouter au moins une requête"))
                return
            }
            if (!contactWay) {
                dispatch(error("Veuillez renseigner le moyen de contact utilisé par le client"))
                return
            }
            if (!event) {
                dispatch(error("Veuillez renseigner l'évènement du client"))
                return
            }
        }
        if (activeStep === 2) {
            if (deliveryService && !deliveryLocation) {
                dispatch(error("Veuillez rentrer le lieu de livraison"))
                return
            }
            if (!deliveryTime) {
                dispatch(error("Veuillez rentrer la date et l'heure de livraison"))
                return
            }
        };
        if (activeStep === 3) {
            postOrder()
            return
        }
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    /**
     * Gère l'envoie des données pour la création de la commande 
     */
    async function postOrder() {
        const orderObject = {
            customer: {
                id: customer._id,
                request: requestList,
                contactUsed: contactWay,
                event: event
            },
            delivery: {
                time: deliveryTime,
                service: deliveryService,
                location: deliveryLocation ? deliveryLocation : null,
                comments: deliveryComments ? deliveryComments : null
            }
        }
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/add-order`
        const token = userInfo.token

        //Définition du header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response: any = await axios.post(url, orderObject, config)
            if (response.status === 201) {
                navigate(-1)
            }
        } catch (error: any) {
            if (!error.response || error.response.status >= 500) {
                dispatch(error("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"));
                return
            }
            if (!error.response.data.message) {
                dispatch(error(error.response.data))
                return
            } else {
                dispatch(error(error.response.data.message))
                return
            }
        }
    }

    /**
     * Permet la navigation entre les différentes étapes du formulaire
     * @param {Number} numéro - numéro de l'étape     
     */
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CustomerChoice
                    customer={customer}
                    setCustomer={setCustomer}
                    setActiveStep={setActiveStep}
                />;
            case 1:
                return <CustomerRequest
                    requestList={requestList}
                    setRequestList={setRequestList}
                    event={event}
                    setEvent={setEvent}
                    contactWay={contactWay}
                    setContactWay={setContactWay}
                />

            case 2:
                return <OrderDelivery
                    deliveryService={deliveryService}
                    setDeliveryService={setDeliveryService}
                    deliveryLocation={deliveryLocation}
                    setDeliveryLocation={setDeliveryLocation}
                    deliveryTime={deliveryTime}
                    setDeliveryTime={setDeliveryTime}
                    deliveryComments={deliveryComments}
                    setDeliveryComments={setDeliveryComments}
                />;
            case 3:
                return <OrderReview
                    customer={customer}
                    requestList={requestList}
                    contactWay={contactWay}
                    event={event}
                    deliveryService={deliveryService}
                    deliveryComments={deliveryComments}
                    deliveryLocation={deliveryLocation}
                    deliveryTime={deliveryTime}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Nouvelle commande'
    }, [])

    return (
        <Container component="main" sx={{ maxWidth: { xs: "sm", md: "md" }, paddingBottom: { xs: "200px", md: 0 } }} >
            {/* Alerte d'erreur */}
            <CustomizedSnackBar />

            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h3" align="center">
                    Nouvelle commande
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'start', md: 'center' }, gap: { xs: '5px', md: 0 } }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                Retour
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            {activeStep === steps.length - 1 ? 'Valider la commande' : 'Suivant'}
                        </Button>
                    </Box>
                </React.Fragment>
            </Paper>
        </Container>
    );
}
