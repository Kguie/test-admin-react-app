/**
 * Gestion de la page NewCustomer
 **/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Alert, Divider, FormControl, FormLabel, Paper, Switch, } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { emailIsValid, nameIsValid } from "../../utils/utils"
import { selectUserInfo } from '../../utils/selectors';
import NameTextField from '../../components/NameTextField';
import PhoneNumberTextField from '../../components/PhoneNumberTextField';
import EmailTextField from '../../components/EmailTextField';
import LocationTextField from '../../components/LocationTextField';
import CommentsTextField from '../../components/CommentsTextField';
import SocialNetworksFormControl from '../../components/SocialNetworksFormControl';
import EncounterWayFormControl from '../../components/EncounterWayFormControl';


/**
 * Affichage de la page de création d'un nouvel utilisateur
 */
export default function NewCustomer() {
    const navigate = useNavigate()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    //State pour whatsapp
    const [isWhatsapp, setIsWhatsapp] = useState<boolean>(false)

    //State pour instagram
    const [isInstagram, setIsInstagram] = useState<boolean>(false)

    //State pour l'autorisation de publications
    const [publications, setPublications] = useState<boolean>(false)

    //State du status d'erreur pour la tentative d'enregistrement
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    //State du message d'erreur pour ma tentative d'enregistrement
    const [errorMessage, setErrorMessage] = useState<string | null>(null)


    /**
    * Fonction qui permet l'envoi du formulaire afin de créer un utilisateur
    * @param {Object}
    * @returns {Response}
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
                navigate(-1)
            }
        } catch (error: any) {
            setErrorStatus(true)
            if (!error.response || error.response.status >= 500) {
                setErrorMessage("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste");
                return
            }
            if (!error.response.data.message) {
                setErrorMessage(error.response.data)
                return
            } else {
                setErrorMessage(error.response.data.message) //Message reçu en réponse
                return
            }
        }
    }

    /**
     * Permet l'envoie du formulaire après vérification du contenu
     * @param {event}     
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorStatus(false)
        const data = new FormData(event.currentTarget);

        const firstName: any = data.get('firstName');
        const lastName: any = data.get('lastName');
        const phoneNumber: any = data.get('phoneNumber');

        //Optionnel
        const email: any = data.get('email');
        const address: any = data.get('location');
        const secondPhoneNumber: any = data.get('phoneNumber-1');
        const comments: any = data.get('comments');
        const encounterWay: any = data.get('encounterWay');
        const instagram: any = data.get('instagram');
        const whatsapp: any = data.get('whatsapp');

        if (!firstName || !lastName || !phoneNumber) {
            setErrorStatus(true)
            setErrorMessage("Tous les champs requis* doivent être complétés ")
            return
        }


        const formData: any = {
            name: {
                firstName: (firstName.toString()).trim(),
                lastName: (lastName.toString()).trim()
            },
            contact: {
                phoneNumber: (phoneNumber.toString()).trim(),
                email: email ? (email.toString()).trim() : null,
                address: address ? (address.toString()).trim() : null,
                secondPhoneNumber: secondPhoneNumber ? (secondPhoneNumber.toString()).trim() : null,
                encounterWay: encounterWay ? encounterWay : null,
                whatsapp: whatsapp ? true : false,
                instagram: instagram ? true : false
            },
            comments: comments ? (comments.toString()).trim() : null,
            publications: publications === true ? true : false
        }

        //Tests regex
        const firstNameTest: any = formData.name && formData.name.firstName && nameIsValid(formData.name.firstName);
        const lastNameTest: any = formData.name && formData.name.lastName && nameIsValid(formData.name.lastName);
        const mailTest: any = formData.contact && formData.contact.email && emailIsValid(formData.contact.email);

        //D'abord les tests optionnels
        if (mailTest === true || mailTest === "Vous n'avez pas entré d'email" || !mailTest) {
            if (!formData.contact.address || (formData.contact.address && formData.contact.address.length < 150)) {

                if (!formData.contact.secondPhoneNumber || (formData.contact.secondPhoneNumber && formData.contact.secondPhoneNumber.length >= 10 && formData.contact.secondPhoneNumber.length <= 16)) {

                    if (!formData.comments || (formData.comments && formData.comments.length < 200)) {

                        //Tests pours les inputs obligatoires
                        if (firstNameTest === true) {
                            if (lastNameTest === true) {
                                if (formData.contact && formData.contact.phoneNumber && formData.contact.phoneNumber.length >= 10 && formData.contact.phoneNumber.length <= 16) {
                                    //Vérification du numéro de téléphone

                                    postNewCustomer(formData)
                                    return
                                }
                                else {
                                    setErrorStatus(true)
                                    setErrorMessage("Le numéro de téléphone doit contenir entre 10 et 16 caractères");
                                    return
                                }
                            } else {
                                setErrorStatus(true)
                                setErrorMessage(lastNameTest)
                                return
                            }
                        } else {
                            setErrorStatus(true)
                            setErrorMessage(firstNameTest)
                            return
                        }
                    }
                    else {
                        setErrorStatus(true)
                        setErrorMessage("Votre commentaires doit faire au maximum 200 caractères")
                    }
                } else {
                    setErrorStatus(true)
                    setErrorMessage("Les numéros de téléphones doivent comporter entre 10 et 16 caractères ")
                }
            } else {
                setErrorMessage("L'adresse entrée doit faire moins de 200 caractères");
                setErrorStatus(true);
                return
            }

        } if (mailTest !== true && formData.email) {
            setErrorMessage(mailTest);
            setErrorStatus(true);
            return
        }
    };


    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Nouveau client'
    }, [])

    return (
        <Container component="main" sx={{ maxWidth: { xs: "sm", md: "md" } }} >
            <Paper sx={{ marginBottom: '200px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: { xs: '100px', md: '200px' }
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enregistrer un nouveau client
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid marginBottom="20px">
                            {errorStatus === true && <Alert data-testid='alert' severity="error">{errorMessage}</Alert>}
                        </Grid>
                        <Grid container spacing={2}>
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
                                    phoneNumber={null}
                                    setPhoneNumber={null}
                                    index={0}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Divider textAlign="left" sx={{ mt: 3, mb: 2 }} >Informations optionnelles</Divider>
                                <EmailTextField
                                    email={null}
                                    setEmail={null}
                                    required={false} />
                            </Grid>
                            <Grid item xs={12} >
                                <PhoneNumberTextField
                                    phoneNumber={null}
                                    setPhoneNumber={null}
                                    required={false}
                                    index={1} />
                            </Grid>
                            <Grid item xs={12} >
                                <LocationTextField
                                    location={null}
                                    setLocation={null} />
                            </Grid>
                            <Grid item xs={12} >
                                <CommentsTextField
                                    comments={null}
                                    setComments={null}
                                    category={null} />
                            </Grid>

                            <Grid item xs={12} marginY={2} >
                                <SocialNetworksFormControl isWhatsapp={isWhatsapp} isInstagram={isInstagram} setIsWhatsapp={setIsWhatsapp} setIsInstagram={setIsInstagram} />
                            </Grid>

                            <Grid item xs={12} marginY={3} >
                                <EncounterWayFormControl
                                    encounterWay={null}
                                    setEncounterWay={null} />
                            </Grid>
                            <Grid item xs={12} marginY={2} >
                                <FormControl >
                                    <FormLabel component="legend">Autorisation de recevoir des publications de notre part</FormLabel>
                                    <Switch checked={publications} onChange={() => setPublications(!publications)} name="whatsapp" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid marginTop={5} display={"flex"} justifyContent={"center"}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, maxWidth: "300px" }}
                                size='large'

                            >
                                Enregistrer
                            </Button>
                        </Grid>
                        <Grid container display='flex' justifyContent='center' marginTop='20px'>
                            <Grid item >
                                <Link href="/home/customers" variant="body2">
                                    Revenir à la page clients...
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>

    );
}