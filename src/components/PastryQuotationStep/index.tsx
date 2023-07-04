/**
 * Gestion du component pour l'étape de la composition de patisserie pour le devis
 **/

import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import React from "react"

import PastryDescriptionTextField from "../PastryDescriptionTextField"
import SizeTextField from "../SizeTextField"
import QuantityTextField from "../QuantityTextField"
import ServicesTextField from "../ServicesTextField"
import PriceTextField from "../PriceTextField"
import { nameIsValid } from '../../utils/utils'
import NameTextField from "../NameTextField"
import { error, reset } from "../../features/alertSnackbar"

type Props = {
    requestList: Array<any>,
    step: number,
    pastryList: Array<any>,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    setPastryList: React.Dispatch<React.SetStateAction<Array<any>>>,
}

/**
 * Affiche l'étape d'ajout de patisserie au devis
 * @param {Array<any>} requestList - Liste de requêtes
 * @param {Number} step - numéro de l'étape active
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep - State action pour désigner la valeur de step,
 * @param {Array<any>} pastryList - Liste des patisseries en réponse aux requêtes 
 * @param {React.Dispatch<React.SetStateAction<Array<any>>>} setPastryList - State action pour désigner le contenu de pastryList,
 */
export default function PastryQuotationStep({ requestList, step, setStep, pastryList, setPastryList, }: Props) {
    //nom
    const [name, setName] = React.useState<string | null>((pastryList.length > step && pastryList[step] && pastryList[step].pastryName) ? pastryList[step].pastryName : null)
    //Description
    const [pastryDescription, setPastryDescription] = React.useState<string | null>((pastryList.length > step && pastryList[step] && pastryList[step].description) ? pastryList[step].description : null)
    //services
    const [pastryServices, setPastryServices] = React.useState<string | null>((pastryList.length > step && pastryList[step] && pastryList[step].services) ? pastryList[step].services : null)
    //Taille
    const [pastrySize, setPastrySize] = React.useState<number | null>((pastryList.length > step && pastryList[step] && pastryList[step].size) ? pastryList[step].size : requestList[step].size)
    //Quantité
    const [pastryQuantity, setPastryQuantity] = React.useState<number | null>((pastryList.length > step && pastryList[step] && pastryList[step].quantity) ? pastryList[step].quantity : requestList[step].quantity)
    //Prix
    const [pastryPrice, setPastryPrice] = React.useState<number | null>((pastryList.length > step && pastryList[step] && pastryList[step].price) ? pastryList[step].price : requestList[step].price)

    const dispatch: Dispatch = useDispatch()

    /**
    * Permet l'enregistrement des données après vérification du contenu pour l'ajout d'une patisserie à la pastryList      
    */
    function handleSubmit() {
        dispatch(reset());

        //Vérification que toutes les entrées sont complétées
        if (!name || (!pastryPrice || pastryPrice === 0) || (!pastryQuantity || pastryQuantity === 0) || (!pastrySize || pastrySize === 0)) {
            dispatch(error("Tous les champs requis* doivent être complétés "))
            return
        }

        const pastryData: any = {
            pastryName: name.trim(),
            description: pastryDescription ? pastryDescription.trim() : null,
            size: pastrySize,
            quantity: pastryQuantity,
            price: pastryPrice,
            services: pastryServices ? pastryServices.trim() : null,
        }

        //Tests et mis à jour de l'array
        //Tests regex
        const pastryNameTest: any = pastryData.pastryName && nameIsValid(pastryData.pastryName);
        //Test du prix
        if (parseFloat(pastryData.price) > 0) {
            //Tests du nombre de parts
            if (pastryData.size && pastryData.size > 0) {
                //Test de la quantité
                if (pastryData.quantity && pastryData.quantity > 0) {
                    //Test du nom de la patisserie
                    if (pastryNameTest) {
                        //Cas où l'élément existe dans la pastryList et on veut le modifier
                        if (pastryList && pastryList[step]) {
                            let list = [...pastryList];
                            list[step] = pastryData
                            setPastryList(list)
                        }
                        //Cas d'un nouvel ajout
                        else {
                            setPastryList((oldList: any) => [...oldList, pastryData]);
                        }
                        //Mise à jour des states pour la requête suivante si elle existe
                        if (step + 1 < requestList.length) {
                            setName(((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].pastryName) ? pastryList[step + 1].pastryName : null))
                            setPastryDescription((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].description) ? pastryList[step + 1].description : null)
                            setPastryServices((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].services) ? pastryList[step + 1].services : null)
                            setPastrySize((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].size) ? pastryList[step + 1].size : requestList[step + 1].size)
                            setPastryQuantity((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].quantity) ? pastryList[step + 1].quantity : requestList[step + 1].quantity)
                            setPastryPrice((pastryList.length > step + 1 && pastryList[step + 1] && pastryList[step + 1].price) ? pastryList[step + 1].price : requestList[step + 1].price)
                        }
                        //Changement de page
                        setStep(step + 1);
                    } else {
                        dispatch(error(pastryNameTest))
                        return
                    }
                } else {
                    dispatch(error('Veuillez entrer un nombre non nul'))
                    return
                }
            } else {
                dispatch(error('Veuillez entrer un nombre non nul'))
                return
            }
        } else {
            dispatch(error('Veuillez entrer un nombre non nul'))
            return
        }
    }

    return (
        <React.Fragment>
            <Grid container display={'flex'} flexDirection={'column'} gap={"20px"}>

                {/* Requête du client */}
                <Typography fontWeight={900}>Requête du client </Typography>
                <Grid item>
                    <Typography fontWeight={900}>Demande :</Typography>
                    <Typography color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}>
                        {requestList[step].pastryDescription}
                    </Typography>
                </Grid>
                {requestList[step].services &&
                    <Grid display={'flex'} flexDirection={'row'} gap={'10px'} sx={{ fontSize: { xs: 17, md: 20 } }} item>
                        <Typography fontWeight={900}>Services :</Typography>
                        <Typography color={"text.secondary"}>{requestList[step].services}</Typography>
                    </Grid>}
                <Grid container display={'flex'} gap={"5px"} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Grid item xs={6} display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                        <Typography fontWeight={900}>Parts :</Typography>
                        <Typography color={"text.secondary"}>{requestList[step].size}</Typography>
                    </Grid>
                    <Grid display={'flex'} item xs={6} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                        <Typography fontWeight={900}>Quantité :</Typography>
                        <Typography color={"text.secondary"}>{requestList[step].quantity}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 1, maxWidth: "100%" }} />

                {/* Inputs de patisserie détaillée en réponse à la requête */}
                <Grid display={"flex"} flexDirection={'column'} rowGap={'20px'}>
                    <Typography fontWeight={600}>Sélectionnez une patisserie pour répondre à la requête </Typography>
                    <Grid item xs={12} sm={6}>
                        <NameTextField
                            name={name}
                            setName={setName}
                            type={'pastry'}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <PastryDescriptionTextField
                            pastryDescription={pastryDescription}
                            setPastryDescription={setPastryDescription}
                            setChanged={null}
                            required={false}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <ServicesTextField
                            services={pastryServices}
                            setServices={setPastryServices}
                            setChanged={null}
                            index={null}
                        />
                    </Grid>
                    <Grid display={'flex'} justifyContent={'space-between'} columnGap={'10px'} rowGap={'20px'} flexWrap={'wrap'} xs={12} md={8} item >
                        <Grid item width={'150px'} >
                            <SizeTextField
                                size={pastrySize}
                                setSize={setPastrySize}
                                setChanged={null}
                            />
                        </Grid>
                        <Grid item width={'150px'} >
                            <QuantityTextField
                                quantity={pastryQuantity}
                                setQuantity={setPastryQuantity}
                                setChanged={null}
                            />
                        </Grid>
                        <Grid item width={'150px'} >
                            <PriceTextField
                                price={pastryPrice}
                                setPrice={setPastryPrice}
                                setChanged={null}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2, maxWidth: "100%" }} />

                    {/* Boutons de navigation */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {step !== 0 && (
                            <Button
                                type="button"
                                onClick={() => {
                                    //Mise à jour des states
                                    setName(pastryList[step - 1].pastryName)
                                    setPastryDescription(pastryList[step - 1].description ? pastryList[step - 1].description : null)
                                    setPastryServices(pastryList[step - 1].services ? pastryList[step - 1].services : null)
                                    setPastrySize(pastryList[step - 1].size)
                                    setPastryQuantity(pastryList[step - 1].quantity)
                                    setPastryPrice(pastryList[step - 1].price)

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
                            onClick={() => {
                                handleSubmit();

                            }}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Suivant
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}