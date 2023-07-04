/**
 * Gestion de la page NewUser
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
import { Paper } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { emailIsValid, nameIsValid, passwordIsValid } from "../../utils/utils"
import { success, error } from '../../features/alertSnackbar';
import { selectUserInfo } from '../../utils/selectors';
import NameTextField from '../../components/NameTextField';
import EmailTextField from '../../components/EmailTextField';
import PasswordInput from '../../components/PasswordInput';

type NewUserProps = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

/**
 * Affichage de la page de création d'un nouvel utilisateur
 */
export default function NewUser() {
    const dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    //State de la valeur du mot de passe
    const [passwordValue, setPasswordValue] = useState<string | null>(null)

    //State de la valeur du mot de passe de vérification
    const [verifyPasswordValue, setVerifyPasswordValue] = useState<string | null>(null)

    /**
    * Fonction qui permet l'envoi du formulaire afin de créer un utilisateur
    * @param {Object}
    * @returns {Response}
    */
    async function postNewUser(body: NewUserProps) {
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/add-user`
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
            if (response.status === 201 || 202) {
                // setSuccessStatus(true)
                dispatch(success("Un mail de vérification à été envoyé à l'adresse indiquée"))
            }

        } catch (error: any) {
            // setErrorStatus(true)
            // setErrorMessage("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste");
            dispatch(error('Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste'))
            return
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: any = data.get('email');
        const firstName: any = data.get('firstName');
        const lastName: any = data.get('lastName');
        const password: any = passwordValue;
        const verifiedPassword: any = verifyPasswordValue;

        if (!firstName || !lastName || !password || !verifiedPassword || !email) {
            // setErrorStatus(true)
            // setErrorMessage("Tous les champs doivent être complétés afin de finaliser la création du compte")
            dispatch(error("Tous les champs doivent être complétés afin de finaliser la création du compte"))
            return
        }

        if (password !== verifiedPassword || !password || !verifiedPassword) {
            // setErrorStatus(true)
            // setErrorMessage("Les deux mots de passes doivent être entrés et identiques")
            dispatch(error("Les deux mots de passes doivent être entrés et identiques"))
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
                        postNewUser(formData)
                        return
                    }
                    else {
                        dispatch(error(passwordTest))
                        return
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
        else {
            dispatch(error(mailTest));
            return
        }
    };

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Nouvel utilisateur'
    }, [])

    return (

        <Container component="main" sx={{ maxWidth: { xs: "sm", md: "md" } }}  >
            <Paper sx={{ marginBottom: "250px" }} >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography textAlign={'center'} component="h1" variant="h5">
                        Enregistrer un nouvel utilisateur
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {/* <Grid marginBottom="20px">
                            {errorStatus === true && <Alert data-testid='alert' severity="error">{errorMessage}</Alert>}
                            {successStatus === true && <Alert data-testid='success' severity="success">Un mail de vérification a été envoyé à l'adresse indiqué</Alert>}
                        </Grid> */}
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
                                <EmailTextField
                                    email={null}
                                    setEmail={null}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordInput
                                    password={passwordValue}
                                    setPassword={setPasswordValue}
                                    type={'newPassword'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordInput
                                    password={verifyPasswordValue}
                                    setPassword={setVerifyPasswordValue}
                                    type='verificationPassword'
                                />
                            </Grid>
                        </Grid>
                        <Grid display={"flex"} justifyContent={"center"}>
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
                                <Link href="/home/users" variant="body2">
                                    Revenir à la page utilisateurs...
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>

    );
}


//Tests
//à changer quand on pourra acceder aux mots de passes pour les tests