/**
 * Gestion de du component BillManagement pour la gestion d'un devis
 **/

import * as React from 'react';
import { Button, Dialog, Grid, Skeleton } from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReactToPrint from "react-to-print";
import { useSelector } from 'react-redux';
import PrintIcon from '@mui/icons-material/Print';


import BillToPrint from '../BillToPrint';
import { selectUserInfo } from '../../utils/selectors';
import { UseGetLogInData } from '../../utils/hooks';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    openBillDialog: boolean,
    setOpenBillDialog: React.Dispatch<React.SetStateAction<boolean>>,
    orderData: any
}

type QuotationProps = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche la fenêtre de dialogue permettant d'afficher le devis,de le valider ou de le supprimer'
 * @param {Boolean} openDialogManageQuotation - State de l'état d'ouverture de la fenêtre
 * @param {React.Dispatch<React.SetStateAction<boolean>>} State - action pour définir openDialogManageQuotation
 * @param {Object} orderData - Données de la commande
 */
export default function QuotationManagementDialog({ openBillDialog, setOpenBillDialog, orderData, }: Props) {

    //id du Devis actif de la commande
    const chosenQuotation = orderData && orderData.chosenQuotation

    //Ref du component à imprimer
    const componentRef = React.useRef<HTMLDivElement>(null)

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/quotations/${chosenQuotation}`

    const { data, isLoading }: QuotationProps = UseGetLogInData(url, userInfo);



    /*Ferme la fenêtre de dialogue */
    const handleClose = () => {
        setOpenBillDialog(false);
    }

    return (
        <Dialog
            fullScreen
            open={openBillDialog}
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
                        Facture
                    </Typography>
                </Toolbar>
            </AppBar>
            {!isLoading ? <Grid ref={componentRef}>
                <BillToPrint
                    orderData={orderData}
                    quotationObject={data}
                />
            </Grid> :
                <Skeleton variant='rectangular' width={"98%"} height={"10vh"} />}

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
            </Grid>


        </Dialog>

    )
}