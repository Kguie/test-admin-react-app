/**
 * Gestion de la page AddFirstUser
 **/

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Alert, Skeleton } from '@mui/material';
import axios from 'axios';

import { emailIsValid, nameIsValid, passwordIsValid } from "../../utils/utils";
import NameTextField from '../../components/NameTextField';
import EmailTextField from '../../components/EmailTextField';
import PasswordInput from '../../components/PasswordInput';
import { useGetData } from '../../utils/hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type NewUserProps = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type Props = {
    data: any,
    isLoading: boolean
}


/**
 * Affichage de la page de création d'un nouvel utilisateur, seulement pur l'ajout du premier utilisateur! Sinon redirection vers la page Error
 */
export default function AddFirstUser() {

    const navigate: NavigateFunction = useNavigate();

    //State du status de l'erreur
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    //State du message de l'erreur
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //State du status du succès
    const [successStatus, setSuccessStatus] = useState<boolean>(false);

    //State de la valeur du mot de passe
    const [passwordValue, setPasswordValue] = useState<string | null>(null);

    //State de la valeur du mot de passe de vérification
    const [verifyPasswordValue, setVerifyPasswordValue] = useState<string | null>(null);

    //Utilisation du hook pour la vérification de l'existence d'un utilisateur
    const { data, isLoading }: Props = useGetData(`${process.env.REACT_APP_API_ORDERS_URL}/users/first-user`);

    /**
    * Fonction qui permet l'envoi du formulaire afin de créer un utilisateur
    * @param {Object}
    * @returns {Response}
    */
    async function postNewUser(body: NewUserProps) {
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/signup`;

        try {
            const response: any = await axios.post(url, body);
            if (response.status === 201 || 202) {
                setSuccessStatus(true);
                return
            }

        } catch (error: any) {
            if (error.response.status === 403) {
                setErrorStatus(true);
                setErrorMessage("Opération impossible, un premier utilisateur a déjà été créé");
                return
            } else {
                setErrorStatus(true);
                setErrorMessage("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste");
                return
            }
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccessStatus(false);
        setErrorStatus(false);
        setErrorMessage(null);

        const data = new FormData(event.currentTarget);
        const email: any = data.get('email');
        const firstName: any = data.get('firstName');
        const lastName: any = data.get('lastName');
        const password: any = passwordValue;
        const verifiedPassword: any = verifyPasswordValue;

        if (!firstName || !lastName || !password || !verifiedPassword || !email) {
            setErrorStatus(true);
            setErrorMessage("Tous les champs doivent être complétés afin de finaliser la création du compte");
            return
        }

        if (password !== verifiedPassword || !password || !verifiedPassword) {
            setErrorStatus(true);
            setErrorMessage("Les deux mots de passes doivent être entrés et identiques");
            return
        }
        const formData: any = {
            firstName: (firstName.toString()).trim(),
            lastName: (lastName.toString()).trim(),
            email: (email.toString()).trim(),
            password: (password.toString()).trim(),
        }

        //Tests regex
        const mailTest: any = formData.email && emailIsValid(formData.email);
        const firstNameTest: any = formData.firstName && nameIsValid(formData.firstName);
        const lastNameTest: any = formData.lastName && nameIsValid(formData.lastName);
        const passwordTest: any = formData.password && passwordIsValid(formData.password);

        if (mailTest === true) {
            if (firstNameTest === true) {
                if (lastNameTest === true) {
                    //Vérification du mot de passe
                    if (passwordTest === 'weak') {
                        return
                    }
                    if (passwordTest === 'strong' || 'medium') {
                        postNewUser(formData);
                        return
                    }
                    else {
                        setErrorStatus(true);
                        setErrorMessage(passwordTest);
                        return
                    }
                } else {
                    setErrorStatus(true);
                    setErrorMessage(lastNameTest);
                    return
                }
            } else {
                setErrorStatus(true);
                setErrorMessage(firstNameTest);
                return
            }
        }
        else {
            setErrorStatus(true);
            setErrorMessage(mailTest);
            return
        }
    };

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Premier utilisateur'

        //Si il y a déjà au moins un utilisateur , on bascule sur la page login
        if (!isLoading && data.data === false) {
            navigate('/');
        }
    }, [data.data, isLoading, navigate])

    return (

        <Container component="main" sx={{ maxWidth: { xs: "sm", md: "md" }, paddingBottom: "50px", minHeight: "95vh" }} >

            <CssBaseline />
            <Box
                sx={{
                    marginTop: "30px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: "250px"

                }}
            >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h1' fontSize={"25px"} textAlign={"center"}>
                    Enregistrer votre premier utilisateur, il sera en charge de la gestion du site.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid marginBottom="20px">
                        {errorStatus === true && <Alert data-testid='alert' severity="error">{errorMessage}</Alert>}
                        {successStatus === true && <Alert data-testid='success' severity="success">Un mail de vérification a été envoyé à l'adresse indiqué</Alert>}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {!isLoading ? <NameTextField
                                name={null}
                                setName={null}
                                type={'first'}
                            /> :
                                <Skeleton variant={"rectangular"} width={"100%"} height={"30px"} />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {isLoading ? <Skeleton variant={"rectangular"} width={"100%"} height={"30px"} /> :
                                <NameTextField
                                    name={null}
                                    setName={null}
                                    type={'last'}
                                />}
                        </Grid>
                        <Grid item xs={12} >
                            {isLoading ? <Skeleton variant={"rectangular"} width={"100%"} height={"30px"} /> :
                                <EmailTextField
                                    email={null}
                                    setEmail={null}
                                    required={true}
                                />}
                        </Grid>
                        <Grid item xs={12}>
                            {isLoading ? <Skeleton variant={"rectangular"} width={"100%"} height={"30px"} /> :
                                <PasswordInput
                                    password={passwordValue}
                                    setPassword={setPasswordValue}
                                    type={'newPassword'}
                                />}
                        </Grid>
                        <Grid item xs={12}>
                            {isLoading ? <Skeleton variant={"rectangular"} width={"100%"} height={"30px"} /> :
                                <PasswordInput
                                    password={verifyPasswordValue}
                                    setPassword={setVerifyPasswordValue}
                                    type='verificationPassword'
                                />
                            }
                        </Grid>
                    </Grid>
                    {!isLoading && < Grid display={"flex"} justifyContent={"center"}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, maxWidth: "300px" }}
                            size='large'
                        >
                            Enregistrer
                        </Button>
                    </Grid>}
                    <Grid container display='flex' justifyContent='center' marginTop='20px'>
                        <Grid item >
                            <Link href="/" variant="body2">
                                Revenir à la page de connexion...
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container >

    );
}


//Tests
//à changer quand on pourra acceder aux mots de passes pour les tests