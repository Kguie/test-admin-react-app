/**
 * Gestion du component pour le choix du client 
 **/

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle } from '@mui/material';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Dispatch } from '@reduxjs/toolkit';

import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import { nameIsValid } from "../../utils/utils"
import CustomerChoiceAutocomplete from '../CustomerChoiceAutocomplete';
import PhoneNumberTextField from '../PhoneNumberTextField';
import SubmitButton from '../SubmitButton';
import CancelButton from '../CancelButton';
import NameTextField from '../NameTextField';
import { error, reset } from '../../features/alertSnackbar';

type Props = {
    data: any,
    isLoading: boolean
}

type CustomerChoiceProps = {
    customer: any,
    setCustomer: React.Dispatch<React.SetStateAction<any>>,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>,
}

/**
 * Component permettant l'ajout d'un nouveau client au formulaire de type checkout
 * @param {Object | null} Customer Object avec les données du client quand un client est sélectionné
 * @param {React.Dispatch<React.SetStateAction<Object|null>>} SetCustomer State action pour définir l'objet Customer
 * @param {React.Dispatch<React.SetStateAction<number>>} setActiveStep State action pour définir la page active pour le stepper 
 */
export default function CustomerChoiceStep({ customer, setCustomer, setActiveStep }: CustomerChoiceProps,) {
    const dispatch: Dispatch = useDispatch()

    //State de l'ouverture du choix du client
    const [openDialogCustomer, setOpenDialogCustomer] = useState<boolean>(false)

    //Récupération des données des clients
    const userInfo = useSelector(selectUserInfo)
    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/customers`
    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)

    /**
    * Fonction qui permet l'envoi du formulaire afin de créer un nouvel utilisateur
    * @param {Object} body Object avec les données nécessaires à la création d'un nouvel utilisateur    * 
    */
    async function postNewCustomer(body: any) {
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/customers/add-customer`
        const token = userInfo.token

        //Définition du header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response: any = await axios.post(url, body, config);
            console.log(response)
            if (response.status === 201) {
                setCustomer(response.data.customer)
                setActiveStep(1)
            }
        } catch (error: any) {
            if (!error.response || error.response.status >= 500) {
                dispatch(error("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"));
                return
            }
            if (!error.response.data.message) {
                dispatch(error(error.response.data));
                return
            } else {
                dispatch(error(error.response.data.message)); //Message reçu en réponse
                return
            }
        }
    }

    /**
     * Permet l'envoie du formulaire après vérification du contenu pour l'enregistrement rapide d'un nouveau client
     * @param {event} submit Envoie du formulaire   
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(reset())

        const data = new FormData(event.currentTarget);
        const firstName: any = data.get('firstName');
        const lastName: any = data.get('lastName');
        const phoneNumber: any = data.get('phoneNumber');

        if (!firstName || !lastName || !phoneNumber) {
            dispatch(error("Tous les champs requis* doivent être complétés "))
            return
        }
        const formData: any = {
            name: {
                firstName: (firstName.toString()).trim(),
                lastName: (lastName.toString()).trim()
            },
            contact: {
                phoneNumber: (phoneNumber.toString()).trim()
            }
        }

        //Tests regex
        const firstNameTest: any = formData.name && formData.name.firstName && nameIsValid(formData.name.firstName);
        const lastNameTest: any = formData.name && formData.name.lastName && nameIsValid(formData.name.lastName);

        //Tests pours les inputs obligatoires
        if (firstNameTest === true) {
            if (lastNameTest === true) {
                if (formData.contact && formData.contact.phoneNumber && formData.contact.phoneNumber.length >= 10 && formData.contact.phoneNumber.length <= 16) {
                    //Vérification du numéro de téléphone

                    postNewCustomer(formData)
                    return
                }
                else {
                    dispatch(error("Le numéro de téléphone doit contenir entre 10 et 16 caractères"))
                }
            } else {
                dispatch(error(lastNameTest))

                return
            }
        } else {
            dispatch(error(firstNameTest))
            return
        }
    }


    /**
     * Permet l'ouverture du component mui dialog afin d'enregistrer un nouveau client
     */
    function handleOpenDialogCustomer() {
        setOpenDialogCustomer(true)
    }

    /**
     * Permet l'ouverture du component mui dialog afin d'enregistrer un nouveau client
     */
    function handleCloseDialogCustomer() {
        setOpenDialogCustomer(false)
    }

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Sélection du client
            </Typography>
            <Grid container >
                <Grid item xs={12} sm={8}>
                    <CustomerChoiceAutocomplete
                        customer={customer}
                        setCustomer={setCustomer}
                        data={data}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Button
                        size='small'
                        onClick={() => {
                            handleOpenDialogCustomer()
                        }}
                        sx={{ marginTop: '20px' }}
                        variant="contained"
                        endIcon={<PersonAddIcon />}
                    >
                        Ajout express d'un client
                    </Button>

                    {/* Fenêtre de dialogue pour l'ajout rapide d'un nouveau client */}
                    <Dialog onClose={() => handleCloseDialogCustomer()} open={openDialogCustomer}>
                        <DialogTitle fontWeight={"bold"}>Enregistrement rapide du nouveau client</DialogTitle>
                        <Grid component="form" container spacing={2} onSubmit={handleSubmit}>
                            <Grid item xs={12} sm={6}>
                                <NameTextField
                                    name={null}
                                    setName={null}
                                    type={'first'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NameTextField
                                    name={null}
                                    setName={null}
                                    type={'last'}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <PhoneNumberTextField
                                    required={true}
                                    phoneNumber={null}
                                    setPhoneNumber={null}
                                    index={1}
                                />
                            </Grid>

                            {/* Boutons */}
                            <Grid item xs={12} marginTop={5} display={"flex"} justifyContent={"center"} gap={'20px'}>
                                <CancelButton handleCancel={handleCloseDialogCustomer} />
                                <SubmitButton
                                    disabled={false}
                                    handleClick={null}
                                />
                            </Grid>
                        </Grid>
                    </Dialog>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}