/**
 * Gestion du component pour l'étape de la gestion des options pour le devis
 **/

import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { formatFullDate, nameIsValid } from "../../utils/utils";
import PriceTextField from "../PriceTextField";
import QuotationDenseTable from "../QuotationDenseTable";
import NameTextField from "../NameTextField";
import SubmitButton from "../SubmitButton";
import { error, reset } from "../../features/alertSnackbar";

type Props = {
    deliveryData: any,
    servicesList: Array<any>,
    setServicesList: React.Dispatch<React.SetStateAction<Array<any>>>,
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
}


/**
 * Component permettant la gestion de la liste de services
 * @param {Object} deliveryData - Objet constitué des données de livraison étant le status, l'heure de livraison,le lieu, les commentaires de livraison
 * @param {Number} step - numéro de l'étape active
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep - State action pour désigner la valeur de step,
 * @param {Array<any>} servicesList - State de la liste des services du devis
 * @param {React.Dispatch<React.SetStateAction<Array<any>>>} setServicesList - State action pour définir la liste servicesList 
 */
export default function ServicesStep({ deliveryData, step, setStep, servicesList, setServicesList }: Props) {
    const dispatch: Dispatch = useDispatch()

    //State de la ligne à modifier
    const [rowSelected, setRowSelected] = useState<any>(null)

    //State du nom
    const [serviceName, setServiceName] = useState<string | null>(null)

    //State du prix
    const [servicePrice, setServicePrice] = useState<number | null>(null)

    //State de la description du service
    const [serviceDescription, setServiceDescription] = useState<string | null>(null)

    //Recherche du service de livraison dans la serviceListe
    const delivery = servicesList.find((service: any) => service.name === 'Livraison')

    /**
    * Permet de la gestion de l'ajout et de la modification du service de livraison    
    */
    function handleDeliverySubmit() {
        dispatch(reset())
        //Vérification du prix
        if (!servicePrice) {
            dispatch(error("Veuillez sélectionner un tarif pour la livraison"))
            return
        }

        //Constitution de l'objet service
        const serviceData = {
            name: 'Livraison',
            description: `Livraison prévue pour le ${formatFullDate(deliveryData.time)} à l'adresse suivante: ${deliveryData.location}`,
            price: parseInt(servicePrice.toString())
        }

        //Test du prix
        if (serviceData.price >= 0) {
            //Recherche du service de livraison dans la liste 
            const foundService = servicesList.find((service: any) => service.name === serviceData.name)
            //Cas où l'objet avec le nom livraison est déjà présent
            if (foundService) {
                const newList = servicesList.filter((service: any) => service.name === !serviceData.name)
                newList.push(serviceData)
                setServicesList(newList)
            } else {
                setServicesList((oldList: any) => [...oldList, serviceData]);
            }
            setServiceName(null)
            setServicePrice(null)
            serviceDescription && setServiceDescription(null)
            rowSelected && setRowSelected(null)
        } else {
            dispatch(error("Veuillez sélectionner un tarif valable pour la livraison"))
        }
    }

    /**
   * Permet de la gestion de l'ajout et de la modification d'une option   
   */
    function handleServiceSubmit() {
        dispatch(reset())
        //Vérification du prix
        if (!servicePrice || !serviceName) {
            dispatch(error("Veuillez sélectionner un tarif et un nom"))
            return
        }

        //Constitution de l'objet service
        const serviceData = {
            name: serviceName.trim(),
            description: serviceDescription ? (serviceDescription.toString()).trim() : null,
            price: parseInt(servicePrice.toString())
        }

        //Tests regex
        const nameTest: any = serviceData.name && nameIsValid(serviceData.name);

        //Test du prix
        if (serviceData.price >= 0) {
            if (nameTest) {
                //Pas de service sélectionné à modifier
                if (!rowSelected) {
                    //Recherche si un service avec ce nom est déjà présent dans la liste
                    const serviceFound = servicesList.find((service: any) => service.name === serviceData.name)
                    if (!serviceFound) {
                        setServicesList((oldList: any) => [...oldList, serviceData]);
                    } else {
                        dispatch(error('Une option avec ce nom est déjà présente dans la liste'))
                        return
                    }
                }
                //Un service est sélectionné
                else {
                    const newList = servicesList.filter((service: any) => (service !== rowSelected))
                    newList.push(serviceData)
                    setServicesList(newList)
                }
                setServiceName(null)
                setServicePrice(null)
                serviceDescription && setServiceDescription(null)
                rowSelected && setRowSelected(null)
            } else {
                dispatch(error(nameTest))
                return
            }
        } else {
            dispatch(error("Veuillez sélectionner un tarif valable pour la livraison"))
            return
        }
    }

    return (
        <React.Fragment>
            {/* Liste des services sélectionnés */}
            <Grid container display={'flex'} flexDirection={'column'} gap={"20px"}>
                {servicesList.length === 0 ?
                    <Typography fontWeight={500}>Vous n'avez pas encore sélectionné d'option</Typography>
                    : <QuotationDenseTable
                        type={'service'}
                        rows={servicesList}
                        setRows={setServicesList}
                        setName={setServiceName}
                        setDescription={setServiceDescription}
                        setPrice={setServicePrice}
                        setId={null}
                        rowSelected={rowSelected}
                        setRowSelected={setRowSelected}
                    />}
            </Grid>

            <Divider sx={{ my: 2, maxWidth: "100%" }} />

            {/* Ajout de services */}

            <Grid container display={'flex'} flexDirection={'column'} gap={"20px"}>
                {/* Options de livraison */}
                {((deliveryData && deliveryData.service && !delivery) || (rowSelected && rowSelected.name === 'Livraison')) &&
                    <Grid
                        component={'form'}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={'20px'}
                    >
                        <Typography fontWeight={900}>Option de livraison </Typography>
                        <Typography color={"text.secondary"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}>
                            À livrer au {deliveryData.location} le {formatFullDate(deliveryData.time)}
                        </Typography>
                        <PriceTextField
                            price={servicePrice ? servicePrice : 0}
                            setPrice={setServicePrice}
                            setChanged={null}
                        />
                        <Grid alignSelf={'flex-end'}>
                            <SubmitButton disabled={false} handleClick={handleDeliverySubmit} />
                        </Grid>
                    </Grid>}

                {/* Option simple */}
                {(((deliveryData && !deliveryData.service) || (deliveryData && deliveryData.service && delivery)) && (!rowSelected || (rowSelected && rowSelected.name !== 'Livraison'))) && <Grid
                    component={'form'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'20px'}
                >
                    <Typography fontWeight={900}>Ajout d'une option</Typography>
                    <NameTextField
                        name={serviceName ? serviceName : ''}
                        setName={setServiceName}
                        type={'service'}
                    />
                    {/* Entrée de description */}
                    <TextField
                        autoComplete="serviceDescription"
                        value={serviceDescription ? serviceDescription : ''}
                        name="serviceDescription"
                        fullWidth
                        multiline
                        maxRows={5}
                        id="service-description"
                        label="Description"
                        autoFocus
                        onChange={(event) => setServiceDescription(event.target.value)}
                    />
                    <PriceTextField
                        price={servicePrice ? servicePrice : 0}
                        setPrice={setServicePrice}
                        setChanged={null}
                    />
                    <Grid alignSelf={'flex-end'}>
                        <SubmitButton disabled={false} handleClick={handleServiceSubmit} />
                    </Grid>
                </Grid>}

                {/* Boutons de navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button
                        type="button"
                        onClick={() => {
                            //Changement de page
                            setStep(step - 1);
                        }}
                        sx={{ mt: 3, ml: 1 }}>
                        Retour
                    </Button>

                    <Button
                        variant="contained"
                        type="button"
                        onClick={() => {
                            //Si l'option livraison est demandée dans la commande
                            if (deliveryData && deliveryData.service && !delivery) {
                                dispatch(error("Veuillez ajouter l'option de livraison au devis"))
                                return
                            }
                            setStep(step + 1)
                        }}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Suivant
                    </Button>
                </Box>
            </Grid>
        </React.Fragment>)
}