/**
 * Gestion de du component RequestDialog 
 **/

import {
    Dialog,
    DialogTitle,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { updateData } from "../../utils/api";
import PastryDescriptionTextField from "../PastryDescriptionTextField";
import SizeTextField from "../SizeTextField";
import QuantityTextField from "../QuantityTextField";
import ServicesTextField from "../ServicesTextField";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";
import DeleteButton from "../DeleteButton";
import { error, reset } from "../../features/alertSnackbar";

type Props = {
    orderData: any,
    userInfo: any,
    setOpenDialogAddRequest: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDialogModifyRequest: React.Dispatch<React.SetStateAction<boolean>>,
    setPastryObject: React.Dispatch<React.SetStateAction<any>>,
    setRequestArray: null | React.Dispatch<React.SetStateAction<Array<any>> | null>,
    openDialogAddRequest: boolean,
    openDialogModifyRequest: boolean,
    pastryObject: any,
    newOrder: boolean,
    requestArray: Array<any> | null
}

/**
 * Affiche le RequestDialog permettant l'ajout et la modification de requêtes
 * @param {Object|null} orderData - Données de la commande
 * @param {Object|null} userInfo - Données de l'utilisateur
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialogAddRequest - State action pour modifier l'état d'ouverture de la fenêtre Dialog pour ajouter une requête
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialogModifyRequest - State action pour modifier l'état d'ouverture de la fenêtre Dialog pour modifier une requête
 * @param {React.Dispatch<React.SetStateAction<Object|null>>} setPastryObject - State action pour modifier le contenu de l'objet pastryObject
 * @param {React.Dispatch<React.SetStateAction<Array<Object>|null>>|null} setRequestArray - State action pour modifier le contenu de la liste d'objets requestList ,est null en cas de modification de commande déjà créée
 * @param {boolean} openDialogAddRequest - State de l'ouverture de la fenêtre Dialog pour ajouter une requête
 * @param {boolean} openDialogModifyRequest - State de l'ouverture de la fenêtre Dialog pour modifier une requête
 * @param {Object|null} pastryObject - State de l'objet pastryObject
 * @param {boolean} newOrder - State qui indique si la commande avec laquelle on interagit est une nouvelle commande
 * @param {Array<Object>|null} requestArray - State de la liste de requêtes,est null en cas de modification de commande déjà créée
 */
export default function RequestDialog({
    orderData,
    userInfo,
    setOpenDialogAddRequest,
    setOpenDialogModifyRequest,
    setPastryObject,
    setRequestArray,
    openDialogModifyRequest,
    openDialogAddRequest,
    pastryObject,
    newOrder,
    requestArray
}: Props) {
    const navigate: NavigateFunction = useNavigate()
    const dispatch: Dispatch = useDispatch()

    //State pour indiquer si un changement pendant une update ou une nouvelle entrée
    const [changed, setChanged] = useState<boolean>(false)

    /**
    * Permet l'enregistrement du formulaire après vérification du contenu pour l'enregistrement d'une nouvelle requête
    * @param {event}     
    */
    const handleRequestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(reset());

        //Récupération du formulaire
        const data = new FormData(event.currentTarget);

        const pastry: any = data.get('pastryDescription');
        const size: any = data.get('size');
        const quantity: any = data.get('quantity');

        //Optionnel
        const services: any = data.get('services');


        //Récupération de liste de requête utilisée en cas de commande déjà crée
        let requestList = newOrder ? requestArray : (orderData.customer && orderData.customer.request)


        //Vérification que toutes les entrées sont complétées
        if (!pastry || !size || !quantity) {
            dispatch(error("Tous les champs requis* doivent être complétés "))
            return
        }

        const formData: any = {
            pastryDescription: (pastry.toString()).trim(),
            size: parseInt(size),
            quantity: parseInt(quantity),
            services: services ? (services.toString()).trim() : null
        }

        //Tests et mis à jour de l'array

        //Tests du nombre de parts
        if (formData.size && formData.size > 0) {
            //Test de la quantité
            if (formData.quantity && formData.quantity > 0) {
                //Cas de création d'une nouvelle commande
                if (newOrder) {
                    //Suppression  de l'ancienne requête avant sa modification si une modification est demandée
                    if (openDialogModifyRequest) {
                        const newRequestList = requestList.filter((request: any) => !(pastryObject.size === request.size && pastryObject.quantity === request.quantity && pastryObject.description === request.pastryDescription && pastryObject.services === request.services))
                        setRequestArray && setRequestArray(newRequestList)
                    }
                    setRequestArray && setRequestArray((oldList: any) => [...oldList, formData]);

                    //Fermeture de la fenêtre
                    if (openDialogAddRequest) {
                        handleCloseDialogAddRequest()
                        return
                    }
                    if (openDialogModifyRequest) {
                        handleCloseDialogModifyRequest()
                        return
                    }

                } else {
                    //Suppression  de l'ancienne requête avant sa modification si une modification est demandée
                    if (openDialogModifyRequest) {
                        const newRequestList = requestList.filter((request: any) => !(pastryObject.size === request.size && pastryObject.quantity === request.quantity && pastryObject.description === request.pastryDescription && pastryObject.services === request.services))
                        requestList = newRequestList
                    }

                    requestList.push(formData)
                    const orderObject = {
                        customer: {
                            id: orderData.customer.id,
                            name: orderData.customer.name,
                            request: requestList,
                            event: orderData.customer.event,
                            contactWay: orderData.contactWay
                        }
                    }
                    const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
                    if (openDialogAddRequest) {
                        handleCloseDialogAddRequest()
                    }
                    if (openDialogModifyRequest) {
                        handleCloseDialogModifyRequest()
                    }
                    updateData(orderObject, url, userInfo, dispatch, navigate)
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

    /**
    * Permet la suppression d'un élément de la liste des requêtes
    */
    function handleDeleteRequest() {
        let requestList = newOrder ? requestArray : (orderData.customer && orderData.customer.request)
        if (requestList && requestList.length === 1) {
            dispatch(error("La commande doit au moins avoir une requête "))
            return
        }

        const newRequestList = requestList.filter((request: any) => !(pastryObject.size === request.size && pastryObject.quantity === request.quantity && pastryObject.description === request.pastryDescription && pastryObject.services === request.services))

        //Dans le cas d'une nouvelle commande
        if (newOrder) {
            setRequestArray && setRequestArray(newRequestList)
        }
        else {
            const orderObject = {
                customer: {
                    id: orderData.customer.id,
                    name: orderData.customer.name,
                    request: newRequestList,
                    event: orderData.customer.event,
                    contactWay: orderData.contactWay
                }
            }
            const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
            updateData(orderObject, url, userInfo, dispatch, navigate)
        }
        handleCloseDialogModifyRequest()
        return
    }
    /**
     * Permet la fermeture de la fenêtre de dialogue utilisée sans enregistrement 
     */
    function handleCancel() {
        setChanged(false)
        if (openDialogAddRequest) {
            setOpenDialogAddRequest(false)
        } else {
            setOpenDialogModifyRequest(false)
        }
    }

    /**
     * Permet la fermeture du component mui dialog afin d'ajouter une patisserie
     */
    function handleCloseDialogAddRequest() {
        setOpenDialogAddRequest(false)
        setChanged(false)
    }

    /**
     * Permet la fermeture du component mui dialog afin de modifier une patisserie
     */
    function handleCloseDialogModifyRequest() {
        setOpenDialogModifyRequest(false)
        setChanged(false)
    }

    return (
        <Grid>
            <Dialog
                onClose={() => {
                    setChanged(false)
                    setPastryObject(null)
                    if (openDialogModifyRequest) {
                        setOpenDialogModifyRequest(false)
                    }
                    if (openDialogAddRequest) {
                        setOpenDialogAddRequest(false)
                    }
                    setChanged(false)
                }}
                open={openDialogAddRequest || openDialogModifyRequest}>
                <DialogTitle fontWeight={"bold"}>
                    {openDialogAddRequest ? "Ajout d'une patisserie" : "Modification de la patisserie"}
                </DialogTitle>

                {/* Formulaire des requêtes */}
                <Grid component="form"
                    container
                    spacing={2}
                    onSubmit={(event) => {
                        handleRequestSubmit(event)
                    }}
                >
                    <Grid item xs={12} >
                        <PastryDescriptionTextField
                            pastryDescription={pastryObject && pastryObject.description ? pastryObject.description : null}
                            setPastryDescription={null}
                            setChanged={setChanged}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <SizeTextField
                            size={pastryObject && pastryObject.size ? pastryObject.size : null}
                            setSize={null}
                            setChanged={setChanged}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <QuantityTextField
                            quantity={pastryObject && pastryObject.quantity ? pastryObject.quantity : null}
                            setQuantity={null}
                            setChanged={setChanged}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <ServicesTextField
                            services={pastryObject && pastryObject.services ? pastryObject.services : null}
                            setServices={null}
                            index={null}
                            setChanged={setChanged}
                        />
                    </Grid>

                    {/* Boutons */}
                    <Grid
                        item
                        xs={12}
                        marginTop={5}
                        display={"flex"}
                        justifyContent={'space-around'}
                        marginBottom={"20px"}
                    >
                        <CancelButton
                            handleCancel={handleCancel}
                        />
                        {<SubmitButton
                            disabled={!changed}
                            handleClick={null}
                        />}

                        {pastryObject &&
                            <DeleteButton
                                handleDelete={handleDeleteRequest}
                            />
                        }
                    </Grid>
                </Grid>
            </Dialog>

        </Grid>
    )
}