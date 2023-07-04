/**
 * Gestion de la page Login
 **/

import { Alert, Skeleton, Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { emailIsValid } from "../../utils/utils"
import { logIn, logOut } from "../../features/userInfo";
import { reset } from '../../features/forcedLogOut';
import { selectLogOutStatus, selectLogOutMessage, selectLeftMenuState } from '../../utils/selectors';
import { setMenu } from '../../features/leftMenuState';
import { resetPassword } from '../../utils/api';
import EmailTextField from '../../components/EmailTextField';
import PasswordInput from '../../components/PasswordInput';
import { useGetData } from '../../utils/hooks';

type Props = {
    email: string,
    password: string
}

type DataProps = {
    data: any,
    isLoading: boolean
}

/**
 * Affichage de la page de connexion avec possibilité de se connecter et de demander la réinitialisation de son mot de passe
 */
export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Status général à l'ouverture d'une session
    const leftMenuIsOpened = useSelector(selectLeftMenuState)
    const isLogOut = useSelector(selectLogOutStatus)
    const logOutMessage = useSelector(selectLogOutMessage)

    //State du mail pour la récupération du mot de passe
    const [mailValue, setMailValue] = useState<string | null>(null)

    //State du mot de passe
    const [passwordValue, setPasswordValue] = useState<string | null>(null)

    //State du status d'erreur
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    //State du message d'erreur
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    //State du status de succès 
    const [successStatus, setSuccessStatus] = useState<boolean>(false)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/first-user`

    //Utilisation du hook pour la vérification de l'existence d'un utilisateur
    const { data, isLoading }: DataProps = useGetData(url);


    /**
     * Fonction qui permet l'envoi du mail et du passeport à l'API
     * @param {Object} body - Objet contenant l'émail et let mot de passe
     * @returns {Object} Objet contenant la réponse à la demande de connection ,et les informations d'utilisateur si elle est réussie
     */
    async function postLogin(body: Props) {
        //Permet d'être sûr d'avoir seulement les données d'utilisateur récupérées lors de cette connexion
        dispatch(logOut())
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/login`
        try {
            const response: any = await axios.post(url, body);
            if (response.status === 200) {
                //Connexion réussie
                //Conservation de la réponse avec les info d'utilisateur               
                dispatch(logIn(response.data))
                //Si le menu est ouvert dans le store,il le ferme à la connexion
                if (leftMenuIsOpened === true) {
                    dispatch(setMenu())
                }
                navigate("/home")
                return
            }
            if (response.status === 201) {
                //Connexion réussie mais lé vérification de l'émail n'a pas encore été réalisée
                setSuccessStatus(true)
                return
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
     * Gère l'envoie du mail pour la récupération du mot de passe après vérification 
     * @param {string} mail - émail entré par l'utilisateur
     */
    const handleResetMail = async (mail: string) => {
        setErrorStatus(false)
        setSuccessStatus(false)
        const formData = {
            email: mail.trim()
        }

        const mailTest: any = formData.email && emailIsValid(formData.email);
        if (mailTest === true) {
            setErrorMessage("");
            setErrorStatus(false);
            const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/reset-password`
            resetPassword(formData, url, setSuccessStatus, setErrorStatus, setErrorMessage)
            return
        }
        else {
            setErrorMessage(mailTest);
            setErrorStatus(true);
            return
        }
    };

    /**
     * Gère l'envoi des données de connexion de l'utilisateur vers l'api 
     */
    const handleSubmit = () => {
        setSuccessStatus(false)
        setErrorStatus(false)

        //Vérification
        if (!mailValue || !passwordValue) {
            setErrorMessage("Veuillez rentrer une adresse émail et un mot de passe valide")
            setErrorStatus(true)
            return
        } else {

            const email = mailValue
            const password = passwordValue

            const formData = {
                email: (email.toString()).trim(),
                password: (password.toString()).trim(),
            }
            const mailTest: any = emailIsValid(formData.email);
            if (mailTest === true) {
                setErrorMessage("");
                setErrorStatus(false);
                //Vérification que l'on a bien rentrer un mdp
                if (formData.password === "") {
                    setErrorStatus(true)
                    setErrorMessage("Veuillez entrer votre mot de passe");//Message d'erreur d'oubli de mdp pour entrer
                    return
                }
                postLogin(formData)
                return
            }
            else {
                setErrorMessage(mailTest);
                setErrorStatus(true);
                return
            }
        }
    }

    //Titre de la page
    useEffect(() => {
        document.title = ' GC-Se connecter';
        //Si aucun utilisateur n'a été créé , on bascule sur la page d'ajout du premier utilisateur
        if (!isLoading && data.data === true) {
            navigate('/add-first-user');
        }
    }, [data.data, isLoading, navigate])

    return (
        <Container maxWidth="xs" sx={{ minHeight: "90vh" }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: "50px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Alerte de déconnexion */}
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={isLogOut ? true : false}
                    onClose={() => dispatch(reset())}
                    autoHideDuration={6000}
                >
                    <Alert onClose={() => dispatch(reset())} severity='error'>{logOutMessage}</Alert>
                </Snackbar>

                <Typography fontStyle={"lemonada"} textTransform={"uppercase"} marginBottom={2} textAlign={"center"} fontSize={"1.2rem"} fontWeight={400}>
                    Bienvenue sur notre application de gestion
                </Typography>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography fontSize={"1.5rem"} fontWeight={400}>
                    Se connecter...
                </Typography>
                {isLoading ?
                    <Skeleton variant='rectangular' width={'100%'} height={'30vh'} /> :
                    <Box sx={{ mt: 1, width: "100%" }} >
                        {errorStatus === true && <Alert data-testid='alert' severity="error">{errorMessage}</Alert>}
                        {successStatus === true && <Alert data-testid='success' severity="success">Un émail de vérification a été envoyé à l'adresse indiquée</Alert>}
                        <Grid marginTop={'10px'}>
                            <EmailTextField
                                email={mailValue}
                                setEmail={setMailValue}
                                required={true}
                            />
                            <PasswordInput
                                password={passwordValue}
                                setPassword={setPasswordValue}
                                type={'login'}
                            />
                        </Grid>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs display={'flex'} flexDirection={'column'} alignItems={"center"} gap={"15px"}>

                                {/* Demande de réinitialisation du mot de passe */}
                                <Button
                                    onClick={() => {
                                        if (!mailValue) {
                                            setErrorMessage("Vous n'avez pas entré d'adresse mail");
                                            setErrorStatus(true);
                                            return
                                        }
                                        mailValue && handleResetMail(mailValue)
                                    }}
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Vous avez oublié votre mot de passe?
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>}
            </Box>
        </Container>

    );
}