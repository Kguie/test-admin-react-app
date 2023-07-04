/**
 * Gestion du component User
 **/
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Typography, Grid, Box, Divider, Container, Button, Skeleton, Paper, Dialog,
    DialogTitle, List, ListItemButton, ListItemText, ListItemIcon,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import { emailIsValid, formatDate, nameIsValid, formatFullDate } from '../../utils/utils';
import { updateData, getFullName, deleteData } from '../../utils/api';
import NameTextField from '../../components/NameTextField';
import EmailTextField from '../../components/EmailTextField';
import UpdatableTextField from '../../components/UpdatableTextField';
import UpdateButton from '../../components/UpdateButton';
import DeleteButton from '../../components/DeleteButton';
import CancelButton from '../../components/CancelButton';
import SubmitButton from '../../components/SubmitButton';
import { error } from "../../features/alertSnackbar"
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';

type Props = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche le composant User présentant les données d'un utilisateur et permettant la modification de ses dernières
 */
export default function User() {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/${id}`

    //State de l'ouverture du choix de catégorie lors du changement de catégorie
    const [openDialogCategory, setOpenDialogCategory] = useState<boolean>(false);

    //State de l'ouverture du dialog de confirmation de suppression de compte
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);

    //Status de la mise à jour des données
    const [onUpdate, setOnUpdate] = useState<boolean>(false)

    //State de la division avec les informations sur l'auteur de la dernière mise à jour
    const [dataAuthorName, setDataAuthorName] = useState<string | null>(null)

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)

    //Récupération du nom de l'auteur de l'update après le chargement des données data
    if (data && data.data && data.data.update && data.data.update.userId && !isLoading) {
        const urlUpdate = `${process.env.REACT_APP_API_ORDERS_URL}/users/name/${data.data.update.userId}`
        getFullName(urlUpdate, userInfo, setDataAuthorName, dispatch)
    }

    /**
     * Permet l'ouverture du component mui dialog afin de choisir la catégorie
     */
    function handleOpenDialogCategory() {
        setOpenDialogCategory(true)
    }

    /**
     * Permet l'ouverture du component mui dialog afin de choisir la catégorie
     */
    function handleCloseDialogCategory() {
        setOpenDialogCategory(false)
    }

    /**
     * Permet l'update de la nouvelle catégorie à l'API
     * @param {string} category 
     */
    function handleChangeCategory(category: string) {
        const categoryObject = { category: category }
        //Url pour l'update de catégorie
        const urlCategory = `${process.env.REACT_APP_API_ORDERS_URL}/users/category/${data._id}`
        updateData(categoryObject, urlCategory, userInfo, dispatch, navigate)
        handleCloseDialogCategory()
    }

    /**
     * Gère la constitution et validation du formulaire pour la mise à jour des données avant leur envoi à l'api
     * @param {React.FormEvent<HTMLFormElement>} event - Envoie du formulaire
     */
    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newData = new FormData(event.currentTarget);
        const email: any = newData.get('email');
        const firstName: any = newData.get('firstName');
        const lastName: any = newData.get('lastName');

        if (!firstName || !lastName || !email) {
            dispatch(error("Tous les champs doivent être complétés "))
            return
        }

        const formData: any = {
            name: {
                firstName: firstName.toString().trim(),
                lastName: lastName.toString().trim()
            },
            email: email.toString().trim()
        }

        //Tests regex
        const mailTest: any = formData.email && emailIsValid(formData.email);
        const firstNameTest: any = formData.name && formData.name.firstName && nameIsValid(formData.name.firstName);
        const lastNameTest: any = formData.name && formData.name.lastName && nameIsValid(formData.name.lastName);

        if (mailTest === true) {
            if (firstNameTest === true) {
                if (lastNameTest === true) {
                    const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/${data._id}`
                    updateData(formData, url, userInfo, dispatch, navigate)
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
    }

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Fiche utilisateur'
    }, [])

    return (
        <Container component="form" onSubmit={handleUpdate} maxWidth={"md"}>
            <Paper sx={{ marginBottom: { xs: "200px", md: 0 } }}>
                <Grid container display='flex' justifyContent='center' padding="20px" flexDirection={"column"}   >
                    {isLoading ? <Skeleton data-testid="skeleton" variant="text" width={"30ch"} sx={{ fontSize: '30px' }} /> :
                        <Typography textTransform={"uppercase"} fontFamily={"lemonade"} component='h2' variant='h2' fontSize={22} fontWeight={800} marginTop={1}>
                            Fiche utilisateur:
                        </Typography>}

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

                        {onUpdate &&
                            <Button
                                onClick={() => {
                                    handleOpenDialogCategory()
                                }}
                                disabled={!data.verified ? true : (data.email === process.env.REACT_APP_CHIEF_ADMIN_EMAIL ? true : false)}
                            >
                                Changer la catégorie
                            </Button>}

                        <Divider sx={{ my: 2 }} />

                        <UpdatableTextField
                            title={"Membre depuis"}
                            value={data.data && data.data.joinDate && formatDate(data.data.joinDate)}
                            onUpdate={false} children={null} />

                        <Divider sx={{ my: 2 }} />

                        {data.lastConnect &&
                            <UpdatableTextField
                                title={"Dernière connexion"}
                                value={data.lastConnect && formatDate(data.lastConnect)}
                                onUpdate={false} children={null} />
                        }


                        {data.lastConnect && <Divider sx={{ my: 2 }} />}


                        {data.data && data.data.update &&
                            <UpdatableTextField
                                title={"Update"}
                                value={data.data && data.data.update && ("Mis à jour le " + formatFullDate(data.data.update.time) + " par " + (data.data.update.userId === data._id ? "l'utilisateur" : dataAuthorName))}
                                onUpdate={false} children={null} />
                        }

                        {data.data && data.data.update && < Divider sx={{ my: 2 }} />}

                        <UpdatableTextField
                            title={"Compte vérifié"}
                            value={data.verified ? "Oui" : "Non"}
                            onUpdate={false} children={null} />


                        <Divider sx={{ my: 2 }} />
                    </Box>

                    {/* Boutons */}

                    <Grid item xs={12} marginBottom={"20px"} marginTop={'20px'}>
                        {!onUpdate ?
                            <Grid display={'flex'} justifyContent={'space-around'}>
                                <UpdateButton
                                    handleUpdate={() => {
                                        if (data.verified) {
                                            setOnUpdate(true)
                                            return
                                        }
                                        dispatch(error("Le compte n'a pas encore été vérifié"))
                                    }}
                                />
                                <DeleteButton
                                    handleDelete={() => {
                                        if (data.email === process.env.REACT_APP_CHIEF_ADMIN_EMAIL || data.category === "superAdmin") {
                                            dispatch(error("Ce compte ne peut pas être supprimé"))
                                            return
                                        }
                                        setOpenDialogDelete(true)
                                    }}
                                />
                            </Grid> :
                            <Grid display={'flex'} justifyContent={'space-around'}>
                                <CancelButton
                                    handleCancel={() => setOnUpdate(false)}
                                />
                                <SubmitButton
                                    disabled={false}
                                    handleClick={null}
                                />
                            </Grid>}
                    </Grid>
                </Grid>

                {/* Dialog de confirmation de suppression d'utilisateur */}
                <ConfirmDeleteDialog
                    label="de l'utilisateur"
                    handleDelete={() => {
                        const url = `${process.env.REACT_APP_API_ORDERS_URL}/users/${data._id}`
                        deleteData(url, userInfo, dispatch, navigate)
                        setOpenDialogDelete(false)
                    }}
                    openDialogDelete={openDialogDelete}
                    setOpenDialogDelete={setOpenDialogDelete}
                />

                {/* Dialog pour changer de catégorie */}
                <Dialog onClose={() => handleCloseDialogCategory()} open={openDialogCategory}>
                    <DialogTitle fontWeight={"bold"}>Choisissez la nouvelle catégorie</DialogTitle>
                    <List sx={{ pt: 0 }}>
                        <ListItemButton
                            sx={{ width: "85%", margin: "auto" }}
                            autoFocus
                            onClick={() => handleChangeCategory("superAdmin")}
                        >
                            <ListItemText primary={"Admin supérieur"} />
                            <ListItemIcon>
                                <StarIcon color='primary' />
                                <StarIcon color='primary' />
                                <StarIcon color='primary' />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            sx={{ width: "85%", margin: "auto" }}
                            autoFocus
                            onClick={() => handleChangeCategory("admin")}
                        >
                            <ListItemText primary={"Admin"} />
                            <ListItemIcon sx={{ display: 'flex', justifyContent: "end" }}>
                                <StarIcon color='primary' />
                                <StarIcon color='primary' />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            sx={{ width: "85%", margin: "auto" }}
                            autoFocus
                            onClick={() => handleChangeCategory("user")}
                        >
                            <ListItemText primary={"Utilisateur"} />
                            <ListItemIcon sx={{ display: 'flex', justifyContent: "end" }}>
                                <StarIcon color='primary' />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Dialog>
            </Paper>
        </Container >
    )
}



