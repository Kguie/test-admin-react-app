/**
 * Gestion de du component QuotationConstructor
 **/

import * as React from 'react';
import { Dialog, Step, StepLabel, Stepper } from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import PastryQuotationStep from '../PastryQuotationStep';
import ServicesStep from '../ServicesStep';
import QuotationReviewStep from '../QuotationReviewStep';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    openDialogAddQuotation: boolean,
    setOpenDialogAddQuotation: React.Dispatch<React.SetStateAction<boolean>>,
    orderData: any,
}

/**
 * Affiche la fenêtre de dialogue permettant de constituer le devis à l'aide d'un stepper
 * @param {Boolean} openDialogAddQuotation State de l'état d'ouverture de la fenêtre
 * @param {React.Dispatch<React.SetStateAction<boolean>>} State action pour définir openDialogAddQuotation
 * @param {Object} orderData Données de la commande, 
 */
export default function QuotationConstructorDialog({ openDialogAddQuotation, setOpenDialogAddQuotation, orderData, }: Props) {

    //State de la page active
    const [activeStep, setActiveStep] = React.useState<number>(0);

    //State de la liste de d'objets patisseries
    const [pastryList, setPastryList] = React.useState<Array<any>>([])

    //State de la liste de services
    const [servicesList, setServicesList] = React.useState<Array<any>>([])

    //Liste de requêtes
    const requestList = orderData && orderData.customer && orderData.customer.request

    //Données de livraison
    const deliveryData = orderData && orderData.delivery

    /*Ferme la fenêtre de dialogue */
    const handleClose = () => {
        setOpenDialogAddQuotation(false);
    };

    /**
     * Permet de constituer une liste d'étapes avec ses labels
     * @return {Array<object>} Array constitué de chaque étape avec son label
     */
    function getSteps() {
        let stepsList = []
        for (let i = 0; i < requestList.length; i++) {
            const step = { label: "Patisserie N° " + (i + 1) }
            stepsList.push(step)
        }
        const services = { label: "Services" }
        const review = { label: "Récapitulatif du devis" }
        stepsList.push(services)
        stepsList.push(review)
        return stepsList
    }

    /**
     * Permet la navigation entre les différentes étapes du formulaire
     * @param {Number} numéro de l'étape
     * @returns {Object} retourne le formulaire de l'étape 
     */
    function getStepContent(step: number) {
        if (step < requestList.length) {
            return (
                <PastryQuotationStep
                    requestList={requestList}
                    step={activeStep}
                    setStep={setActiveStep}
                    pastryList={pastryList}
                    setPastryList={setPastryList}
                />)
        }
        if (step === requestList.length) {
            return (
                <ServicesStep
                    deliveryData={deliveryData}
                    servicesList={servicesList}
                    setServicesList={setServicesList}
                    step={activeStep}
                    setStep={setActiveStep}
                />
            )
        }
        if (step === requestList.length + 1) {
            return (
                <QuotationReviewStep
                    servicesList={servicesList}
                    pastryList={pastryList}
                    step={activeStep}
                    setStep={setActiveStep}
                    orderId={orderData && orderData._id}
                />
            )
        }
        else {
            throw new Error('Unknown step');
        }
    }

    return (
        <Dialog
            fullScreen
            open={openDialogAddQuotation}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                        Devis
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'start', md: 'center' }, gap: { xs: '5px', md: 0 } }}>
                {getSteps().map((step) => (
                    <Step key={step.label}>
                        <StepLabel >{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {getStepContent(activeStep)}
            </React.Fragment>
        </Dialog>

    )
}