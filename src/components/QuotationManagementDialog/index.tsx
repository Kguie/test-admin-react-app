/**
 * Gestion de du component QuotationManagement pour la gestion d'un devis
 **/

import * as React from 'react';
import { Button, Dialog, Grid } from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';
import { Dispatch } from '@reduxjs/toolkit';


import QuotationToPrint from '../QuotationToPrint';
import DeleteButton from '../DeleteButton';
import { selectUserInfo } from '../../utils/selectors';
import { updateData } from '../../utils/api';
import { error, reset } from '../../features/alertSnackbar';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    openDialogManageQuotation: boolean,
    setOpenDialogManageQuotation: React.Dispatch<React.SetStateAction<boolean>>,
    orderData: any,
    quotationObject: any,
}

/**
 * Affiche la fenêtre de dialogue permettant d'afficher le devis,de le valider ou de le supprimer'
 * @param {Boolean} openDialogManageQuotation - State de l'état d'ouverture de la fenêtre
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialogManageQuotation - State action pour définir openDialogManageQuotation
 * @param {Object} orderData - Données de la commande,
 * @param {Object} QuotationObject - Données du devis,
 */
export default function QuotationManagementDialog({ openDialogManageQuotation, setOpenDialogManageQuotation, orderData, quotationObject, }: Props) {

    //id du Devis actif de la commande
    const chosenQuotation = orderData && orderData.chosenQuotation

    //Ref du component à imprimer
    const componentRef = React.useRef<HTMLDivElement>(null)

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const navigate: NavigateFunction = useNavigate()

    const dispatch: Dispatch = useDispatch()

    /**
     * Gestion de la suppression du devis de la base de données après vérifications
     */
    function handleDelete() {
        dispatch(reset())

        //Vérification que le devis sélectionné n'est pas celui que l'on veut supprimer
        if (chosenQuotation && chosenQuotation === quotationObject._id) {
            dispatch(error("Veuillez d'abord désélectionner ce devis avant de le supprimer"))
            return
        }

        const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData && orderData._id}/delete-quotation`
        const updateObject = { quotationId: quotationObject && quotationObject._id }

        updateData(updateObject, url, userInfo, dispatch, navigate)
    }

    /**
     * Gestion de la validation du devis dans la base de données après vérifications
     */
    function handleValidation() {
        dispatch(reset())
        const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}/valid-quotation`
        const updateObject = { quotationId: quotationObject && quotationObject._id }

        //Si le devis est déjà sélectionné il sera alors désélectionné

        updateData(updateObject, url, userInfo, dispatch, navigate)
    }

    /*Ferme la fenêtre de dialogue */
    const handleClose = () => {
        setOpenDialogManageQuotation(false);
    }

    return (
        <Dialog
            fullScreen
            open={openDialogManageQuotation}
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
            <Grid ref={componentRef}>
                <QuotationToPrint
                    orderData={orderData}
                    quotationObject={quotationObject}
                />
            </Grid>

            {/* Boutons */}
            <Grid marginTop={'30px'} display={'flex'} justifyContent={'space-around'}>
                <ReactToPrint
                    trigger={() => <Button
                        type="button"
                        variant="contained"
                        color='info'
                        sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                    >
                        <PrintIcon />
                    </Button>}
                    content={() => componentRef.current}
                    pageStyle="@page { size: auto; margin: 20mm; }"
                />

                {quotationObject && quotationObject._id && chosenQuotation && quotationObject._id === chosenQuotation ?
                    <Button
                        variant="contained"
                        color='warning'
                        onClick={handleValidation}
                        sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                    >Désélectionner le devis</Button> :

                    <Button
                        variant="contained"
                        color='success'
                        onClick={handleValidation}
                        sx={{ mt: 1, mb: 4, maxWidth: "300px" }}
                    >Valider le devis</Button>}

                {quotationObject && quotationObject._id && (!chosenQuotation || chosenQuotation !== quotationObject._id) && <DeleteButton handleDelete={handleDelete} />}
            </Grid>


        </Dialog>

    )
}