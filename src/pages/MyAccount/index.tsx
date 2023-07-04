/**
 * Gestion du component MyAccount
 **/
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Typography, Grid, Box, Divider, Container, Button, Snackbar, Alert, Skeleton, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import { formatDate, nameIsValid } from '../../utils/utils';
import { updateData, resetPassword } from '../../utils/api';
import NameTextField from '../../components/NameTextField';
import UpdatableTextField from '../../components/UpdatableTextField';
import EmailTextField from '../../components/EmailTextField';


type DataProps = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche le MyAccount qui permet la gestion du compte de l'utilisateur connecté
 */
export default function MyAccount() {
    const navigate = useNavigate()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    const dispatch = useDispatch()

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/${userInfo.userId}`

    //State du status d'erreur pour la tentative d'enregistrement
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    //State du message d'erreur pour ma tentative d'enregistrement
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    //State du status d'erreur pour la tentative d'enregistrement
    const [successStatus, setSuccessStatus] = useState<boolean>(false)

    //Status de la mise à jour des données
    const [onUpdate, setOnUpdate] = useState<boolean>(false)

    const { data, isLoading }: DataProps = UseGetLogInData(url, userInfo);

    /**
     * Gère l'envoie du mail pour la récupération du mot de passe 
     * @param {String} email - Émail
     */
    const handleResetMail = (email: string) => {
        setErrorStatus(false)
        setSuccessStatus(false)
        const formData = {
            email: email
        }
        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/reset-password`

        resetPassword(formData, url, setSuccessStatus, setErrorStatus, setErrorMessage)
        return
    }

    /**
     * Gère la constitution et validation du formulaire pour la mise à jour des données avant leur envoi à l'api
     * @param {React.FormEvent<HTMLFormElement>} event - Évènement de type envoie de formulaire  
     */
    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorStatus(false)
        const newData = new FormData(event.currentTarget);

        const firstName: any = newData.get('firstName');
        const lastName: any = newData.get('lastName');

        //Vérifications
        if (!firstName || !lastName) {
            setErrorStatus(true)
            setErrorMessage("Tous les champs doivent être complétés afin de finaliser la création du compte")
            return
        }
        const formattedFirstName: string = (firstName.toString()).trim() ? (firstName.toString()).trim() : data.name.firstName
        const formattedLastName: string = (lastName.toString()).trim() ? (lastName.toString()).trim() : data.name.lastName


        const formData: any = {
            name: {
                firstName: formattedFirstName,
                lastName: formattedLastName
            },

        }
        //Tests regex       
        const firstNameTest: any = formattedFirstName && nameIsValid(formattedFirstName);
        const lastNameTest: any = formattedLastName && nameIsValid(formattedLastName);

        if (firstNameTest === true) {
            if (lastNameTest === true) {

                const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/${data._id}`
                updateData(formData, url, userInfo, dispatch, navigate)
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

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Mon compte'
    }, [])

    return (
        <Container component="form" onSubmit={handleUpdate} maxWidth={"md"}>
            <Paper sx={{ marginBottom: "250px" }} >
                {/* Affichage d'erreur ou de succès dans le cas d'une demande de réinitialisation du mot de passe réussie */}
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={(errorStatus || successStatus) ? true : false}
                    onClose={() => {
                        setSuccessStatus(false)
                        setErrorStatus(false)
                    }}
                    autoHideDuration={6000}
                >
                    <Alert onClose={() => {
                        setSuccessStatus(false)
                        setErrorStatus(false)
                    }
                    } severity={errorStatus ? 'error' : 'success'}>{errorStatus ? errorMessage : "Un lien vous a été envoyé à l'adresse indiquée pour mettre à jour votre mot de passe"}</Alert>
                </Snackbar>

                <Grid container display='flex' justifyContent='center' padding="20px" flexDirection={"column"}   >

                    <Typography textTransform={"uppercase"} fontFamily={"lemonade"} component='h2' variant='h2' fontSize={22} fontWeight={800} marginTop={1}>
                        Votre compte:
                    </Typography>
                    {isLoading ? <Skeleton data-testid="skeleton" variant="rectangular" width={"100%"} height={"30vh"} /> :
                        <Box marginTop={5}>
                            <Divider sx={{ my: 2 }} />
                            <Grid display={"flex"} justifyContent={"space-between"} flexDirection={"column"}>
                                <UpdatableTextField
                                    title={'Nom'}
                                    value={data.name && data.name.lastName}
                                    onUpdate={onUpdate}
                                >
                                    <NameTextField
                                        name={data.name && data.name.lastName}
                                        setName={null}
                                        type={'last'}
                                    />
                                </UpdatableTextField>

                                <Divider sx={{ my: 2 }} />

                                <UpdatableTextField
                                    title={'Prénom'}
                                    value={data.name && data.name.firstName}
                                    onUpdate={onUpdate}
                                >
                                    <NameTextField
                                        name={data.name && data.name.firstName}
                                        setName={null}
                                        type={'first'}
                                    />
                                </UpdatableTextField>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <UpdatableTextField
                                title={'Émail'}
                                value={data.email}
                                onUpdate={onUpdate}
                            >
                                <EmailTextField
                                    email={data.email}
                                    setEmail={null}
                                    required={true}
                                />
                            </UpdatableTextField>

                            <Divider sx={{ my: 2 }} />

                            <UpdatableTextField
                                title={"Catégorie"}
                                value={data.category === "user" ? "Utilisateur" : (data.category === "admin" ? "Admin" : "Admin supérieur")}
                                onUpdate={false} children={null} />

                            <Divider sx={{ my: 2 }} />

                            <UpdatableTextField
                                title={"Membre depuis"}
                                value={data.data && data.data.joinDate && formatDate(data.data.joinDate)}
                                onUpdate={false} children={null} />

                            <Divider sx={{ my: 2 }} />

                        </Box>}

                    {/* Boutons de bas de page */}
                    <Grid container display={"flex"} flexDirection={"column"} gap={"30px"} alignItems={"center"} marginTop="25px">
                        {isLoading ? <Grid container display={"flex"} gap={"30px"} justifyContent={"center"} maxWidth={"sm"}  >
                            <Grid item xs={12} md={5}>
                                <Skeleton variant='rectangular' width={"100%"} height={"60px"} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Skeleton variant='rectangular' width={"100%"} height={"60px"} />
                            </Grid>
                        </Grid> :
                            <Grid container display={"flex"} gap={"30px"} justifyContent={"center"} maxWidth={"sm"}  >
                                <Grid item xs={12} md={!onUpdate ? 5 : 12}>
                                    {!onUpdate ?
                                        <Button onClick={() => setOnUpdate(true)} fullWidth variant="contained">Modifier ses informations</Button>
                                        : <Grid justifyContent={"center"} gap={"30px"} container display={"flex"} sx={{ flexDirection: { xs: "column-reverse", md: "row-reverse" } }}>
                                            <Grid item xs={12} md={5} >
                                                <Button type='submit' endIcon={<CheckIcon />} onClick={() => handleUpdate} color='success' fullWidth variant="contained">Valider les changements</Button>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <Button endIcon={<CancelIcon />} onClick={() => setOnUpdate(false)} color='warning' fullWidth variant="contained">Annuler les changements</Button>
                                            </Grid>
                                        </Grid>}
                                </Grid>
                                {!onUpdate && <Grid item xs={12} md={5}>
                                    <Button onClick={() => handleResetMail(data.email)} fullWidth variant="contained">Changer de mot de passe</Button>
                                </Grid>}
                            </Grid>}
                    </Grid>
                </Grid>
            </Paper>
        </Container >
    )
}

