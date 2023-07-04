/**
 * Gestion de la page UpdatePassword
 **/

import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios';

import { passwordIsValid } from "../../utils/utils"
import { useNavigate, useParams } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput';

type Props = {
    password: string
}

/**
 * Affichage de la page de création d'un nouvel utilisateur
 */
export default function UpdatePassword() {

    const navigate = useNavigate()

    //Récupération de l'id et du token   
    const { id } = useParams()
    const { token } = useParams()

    //State de la valeur du mot de passe
    const [passwordValue, setPasswordValue] = useState<string | null>(null)

    //State de la valeur du mot de passe de vérification
    const [verifyPasswordValue, setVerifyPasswordValue] = useState<string | null>(null)

    //State du status d'erreur pour la tentative d'enregistrement
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    //State du message d'erreur pour ma tentative d'enregistrement
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    //State du status de réussite pour la tentative d'enregistrement
    const [successStatus, setSuccessStatus] = useState<boolean>(false)

    /**
     * Fonction qui permet l'envoi des données afin de changer le mot de passe
     * @param {Object}
     * @returns {Response}
    */
    async function postNewPassword(body: Props) {
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/update-password/${id}/${token}`
        try {
            const response: any = await axios.put(url, body);
            console.log(response)
            if (response.status === 200) {
                setSuccessStatus(true)
                return
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                setErrorStatus(true)
                setErrorMessage("Désolé, ce lien n'est pas valide ou a expiré");
                return
            } else {
                setErrorStatus(true)
                setErrorMessage("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste");
                return
            }
        }
    }

    /**
     * Constitue l'objet d'envoie du mot de passe afin de le poster    
     */
    const handleSubmit = () => {
        setErrorMessage(null)
        setErrorStatus(false)
        setSuccessStatus(false)

        const password: any = passwordValue;
        const verifiedPassword: any = verifyPasswordValue;

        //Vérifications        

        if (password !== verifiedPassword || !password || !verifiedPassword) {
            setErrorStatus(true)
            setErrorMessage("Les deux mots de passes doivent être entrés et identiques")
            return
        }


        const formData: any = {
            password: (password.toString()).trim(),
        }

        //Tests regex
        const passwordTest: any = formData.password && passwordIsValid(formData.password);

        //Vérification du mot de passe
        if (passwordTest === 'weak') {
            setErrorStatus(true)
            setErrorMessage("Le mot de passe utilisé est trop faible,Veuillez privilégier un mot de passe avec au moins une majuscule, une minuscule ,un caractère spécial et une longueur de 8 à 30 caractères")
            return
        }
        else if (passwordTest === 'strong' || passwordTest === 'medium') {
            postNewPassword(formData)
            return
        }
        else {
            setErrorStatus(true)
            setErrorMessage(passwordTest)
            return
        }

    }

    //Titre de la page
    useEffect(() => {
        document.title = ' GC-Choisissez votre nouveau mot de passe'
    }, [])

    return (
        <section>
            <Container maxWidth="sm" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: "250px"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" textAlign={"center"}>
                        Entrez votre nouveau mot de passe
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid marginBottom="20px">
                            {errorStatus === true && <Alert data-testid='alert' severity="error">{errorMessage}</Alert>}
                            {successStatus === true && <Alert data-testid='success' severity="success">Votre mot de passe a bien été modifié, veuillez vous reconnecter en utilisant le lien ci-dessous</Alert>}
                        </Grid>
                        <Grid container spacing={2}>

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
                        <Grid display={'flex'} justifyContent={'space-around'}>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enregistrer
                            </Button>
                        </Grid>
                    </Box>
                    <Grid marginTop="60px" display="flex" justifyContent='center'>
                        <Button
                            onClick={() => navigate("/")}
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            Page de connexion
                        </Button>
                    </Grid>
                </Box>
            </Container>
        </section>
    );
}


//Tests
//Fonctions UpdatePassword similaires à celles d ela page Login, à changer quand on pourra acceder aux mots de passes pour les tests