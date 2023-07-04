/**
 * Gestion du component QuotationReviewStep
 **/

import { Box, Button, Divider, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import Switch from '@mui/material/Switch'
import PercentIcon from '@mui/icons-material/Percent';
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

import QuotationDenseTable from "../QuotationDenseTable";
import SliderInputField from "../SliderInputField";
import { selectUserInfo } from "../../utils/selectors";
import { updateData } from "../../utils/api";
import { calculatePriceAndQuantity } from "../../utils/utils";
import { error, reset } from "../../features/alertSnackbar";



type Props = {
    step: number,
    servicesList: Array<any>,
    pastryList: Array<any>,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    orderId: string
}

/**
 * Affiche le récapitulatif du devis et permet l'ajout d'une réduction
 * @param {Number} step - numéro de l'étape active
 * @param {Array<any>} servicesList - State de la liste des services du devis
 * @param {Array<any>} pastryList - Liste des patisseries en réponse aux requêtes 
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep - State action pour désigner la valeur de step,
 * @param {string} orderId - Id de la commande liée au devis
 */
export default function QuotationReviewStep({ servicesList, pastryList, step, setStep, orderId }: Props) {

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const navigate: NavigateFunction = useNavigate()

    const dispatch: Dispatch = useDispatch()

    //State du status de la réduction
    const [discount, setDiscount] = useState<boolean>(false)

    //State du pourcentage de réduction    
    const [discountAmount, setDiscountAmount] = useState<number>(0)

    //State du motif de réduction
    const [discountReason, setDiscountReason] = useState<string>('')

    //State du status de l'erreur sur discountReason
    const [discountReasonErrorStatus, setDiscountReasonErrorStatus] = useState<boolean>(false)

    /**
     * Permet l'enregistrement du devis avec la fermeture du dialogue d'ajout
     */
    function handleQuotationSubmit() {
        dispatch(reset())

        //Vérifications
        if (!pastryList || pastryList.length === 0) {
            dispatch(error('Veuillez ajouter au moins une patisserie à la liste'))
            return
        }

        const orderObject = {
            quotation: {
                pastriesList: pastryList,
                servicesList: servicesList,
                reduction: {
                    reason: discountReason ? discountReason : null,
                    amount: discountAmount
                }
            }
        }

        const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderId}/add-quotation`

        updateData(orderObject, url, userInfo, dispatch, navigate)
    }

    //Déclaration du prix total des patisseries
    let pastrySum = pastryList && pastryList.length > 0 ? calculatePriceAndQuantity(pastryList).price : 0

    //Déclaration du prix total des options
    let servicesSum = servicesList && servicesList.length > 0 ? calculatePriceAndQuantity(servicesList).price : 0

    //Déclaration du prix total
    let globalSum = pastrySum + servicesSum

    //Déclaration du prix final après réduction
    let finalPrice = discountAmount === 0 ? globalSum : (globalSum - (globalSum * discountAmount / 100))


    return (
        <React.Fragment>
            <Grid container display={'flex'} flexDirection={'column'} gap={"20px"}>
                {/* Pastries section */}
                <QuotationDenseTable
                    type='pastry'
                    rows={pastryList}
                    rowSelected={null}
                    setRows={null}
                    setDescription={null}
                    setName={null}
                    setPrice={null}
                    setId={null}
                    setRowSelected={null}
                />
                <Grid marginRight={'20px'} marginTop={'10px'} justifyContent={'flex-end'} gap={'10px'} item display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                    <Typography fontWeight={900}>Total :</Typography>
                    <Typography color={"text.secondary"}>{pastrySum} €</Typography>
                </Grid>

                {/* Services section */}
                {servicesList && servicesList.length > 0 &&
                    <QuotationDenseTable
                        type='service'
                        rows={servicesList}
                        rowSelected={null}
                        setRows={null}
                        setDescription={null}
                        setName={null}
                        setId={null}
                        setPrice={null}
                        setRowSelected={null}
                    />}
                {servicesList && servicesList.length > 0 &&
                    <Grid marginRight={'20px'} marginTop={'10px'} justifyContent={'flex-end'} gap={'10px'} item display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                        <Typography fontWeight={900}>Total :</Typography>
                        <Typography color={"text.secondary"}>{servicesSum} €</Typography>
                    </Grid>}

                {/* Section des prix */}
                <Grid marginRight={'20px'} justifyContent={'flex-end'} gap={'10px'} item display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                    <Typography fontWeight={900}>Prix total :</Typography>
                    <Typography color={"text.secondary"}>{globalSum} €</Typography>
                </Grid>

                <Divider sx={{ my: 1, maxWidth: "100%" }} />

                <Grid marginRight={'20px'} gap={'20px'} >
                    <Grid marginLeft={'20px'} gap={'10px'} item display={'flex'} flexDirection={'column'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                        <FormControlLabel
                            control={<Switch checked={discount} onChange={() => setDiscount(!discount)} />}
                            label="Accorder une réduction"
                        />
                        {discount &&
                            <TextField
                                sx={{ maxWidth: '300px' }}
                                autoComplete="discountReason"
                                value={discountReason ? discountReason : ""}
                                name="discountReason"
                                fullWidth
                                id="discount-reason"
                                label="Motif de réduction"
                                autoFocus
                                error={discountReasonErrorStatus}
                                helperText={discountReasonErrorStatus && "Veuillez entrer un motif de moins de 50 caractères"}
                                onChange={(event) => {
                                    const test = (event.target.value.trim()).length;
                                    setDiscountReasonErrorStatus(false)
                                    if (test > 50) {
                                        setDiscountReasonErrorStatus(true);
                                        return
                                    } else {
                                        setDiscountReason((event.target.value).trim())
                                        setDiscountReasonErrorStatus(false);
                                        return
                                    }
                                }}
                            />}
                        {discount &&
                            <SliderInputField
                                title="Montant"
                                step={5}
                                icon={<PercentIcon />}
                                value={discountAmount}
                                setValue={setDiscountAmount}
                            />}

                        <Divider sx={{ my: 1, maxWidth: "100%" }} />

                        <Grid justifyContent={'flex-end'} gap={'10px'} item display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                            <Typography fontWeight={900}>Prix final :</Typography>
                            <Typography color={"text.secondary"}>{finalPrice} €</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Boutons de navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {step !== 0 && (
                        <Button
                            type="button"
                            onClick={() => {
                                //Changement de page
                                setStep(step - 1);
                            }}
                            sx={{ mt: 3, ml: 1 }}>
                            Retour
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        type="button"
                        onClick={handleQuotationSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Terminer
                    </Button>
                </Box>
            </Grid>
        </React.Fragment>
    )
}