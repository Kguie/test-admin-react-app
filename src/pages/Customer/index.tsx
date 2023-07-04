/**
 * Gestion du component Customer
 **/
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Typography, Grid, Box, Divider, Container, Skeleton, Paper,
    FormControl, Switch, Link,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { UseGetLogInData } from '../../utils/hooks';
import { error } from '../../features/alertSnackbar';
import { selectUserInfo } from '../../utils/selectors';
import { emailIsValid, nameIsValid, formatFullDate } from '../../utils/utils';
import { updateData, getFullName, deleteData } from '../../utils/api';
import NameTextField from '../../components/NameTextField';
import PhoneNumberTextField from '../../components/PhoneNumberTextField';
import EmailTextField from '../../components/EmailTextField';
import LocationTextField from '../../components/LocationTextField';
import CommentsTextField from '../../components/CommentsTextField';
import UpdateButton from '../../components/UpdateButton';
import DeleteButton from '../../components/DeleteButton';
import CancelButton from '../../components/CancelButton';
import SubmitButton from '../../components/SubmitButton';
import OrdersTable from '../../components/OrdersTable';
import EncounterWayFormControl from '../../components/EncounterWayFormControl';
import SocialNetworksFormControl from '../../components/SocialNetworksFormControl';
import UpdatableTextField from '../../components/UpdatableTextField';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';

type Props = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche le composant Customer présentant les données d'un client et permettant la modification de ses dernières
 */
export default function Customer() {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    //State pour whatsapp
    const [isWhatsapp, setIsWhatsapp] = useState<boolean>(false)

    //State pour instagram
    const [isInstagram, setIsInstagram] = useState<boolean>(false)

    //State pour la permission de recevoir des publications
    const [publications, setPublications] = useState<boolean>(false)

    //State de l'ouverture du dialog de confirmation de suppression de compte
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);

    //State de l'ouverture du dialog des commandes
    const [openDialogOrders, setOpenDialogOrders] = useState<boolean>(false);

    //Status de la mise à jour des données
    const [onUpdate, setOnUpdate] = useState<boolean>(false)

    //State de la division avec les informations sur la création du compte
    const [dataAuthorName, setDataAuthorName] = useState<string | null>(null)
    //State de la division avec les informations sur les mises à jour
    const [dataUpdateAuthorName, setDataUpdateAuthorName] = useState<string | null>(null)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/customers/${id}`
    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)
    //Attribution des states au chargement de data
    useEffect(() => {
        data.contact && data.contact.instagram && setIsInstagram(data.contact.instagram)
        data.contact && data.contact.whatsapp && setIsWhatsapp(data.contact.whatsapp)
        data.publications && setPublications(data.publications)


    }, [data])

    //Récupération du nom de l'utilisateur créateur compte client une fois que data est chargé
    if (data.data && data.data.joining && data.data.joining.userId && !isLoading) {
        const urlJoining = `${process.env.REACT_APP_API_ORDERS_URL}/users/name/${data.data.joining.userId}`
        getFullName(urlJoining, userInfo, setDataAuthorName, dispatch)
    }

    //Récupération du nom de l'utilisateur auteur de l'update une fois que data est chargé
    if (data.data && data.data.update && data.data.update.userId && !isLoading) {
        const urlUpdate = `${process.env.REACT_APP_API_ORDERS_URL}/users/name/${data.data.update.userId}`
        getFullName(urlUpdate, userInfo, setDataUpdateAuthorName, dispatch)
    }


    /**
     * Gère la constitution et validation du formulaire pour la mise à jour des données avant leur envoi à l'api
     * @param {event} 
     */
    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            dispatch(error("Tous les champs requis* doivent être complétés"))
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

                if (!formData.contact.secondPhoneNumber || (formData.contact.secondPhoneNumber && formData.contact.secondPhoneNumber.length >= 10 && formData.contact.secondPhoneNumber.length < 17)) {
                    if (!formData.comments || (formData.comments && formData.comments.length < 200)) {
                        //Tests pours les inputs obligatoires
                        if (firstNameTest === true) {
                            if (lastNameTest === true) {
                                if (formData.contact && formData.contact.phoneNumber && formData.contact.phoneNumber.length >= 10 && formData.contact.phoneNumber.length <= 16) {
                                    //Vérification du numéro de téléphone
                                    const url = `${process.env.REACT_APP_API_ORDERS_URL}/customers/${id}`
                                    updateData(formData, url, userInfo, dispatch, navigate)

                                }
                                else {
                                    dispatch(error("Le numéro de téléphone doit contenir entre 10 et 16 caractères"))
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
                        dispatch(error("Votre commentaires doit faire au maximum 200 caractères"))
                    }
                } else {
                    dispatch(error("Les numéros de téléphones doivent comporter entre 10 et 16 caractères "))
                }
            } else {
                dispatch(error("L'adresse entrée doit faire moins de 200 caractères"));
                return
            }

        } if (mailTest !== true && formData.email) {
            dispatch(error(mailTest));
            return
        }
    }

    //Titre de la page
    useEffect(() => {
        document.title = ' GC-Fiche Client'
    }, [])

    return (
        <Container component="form" onSubmit={handleUpdate} maxWidth={"md"}>
            <Paper sx={{ marginBottom: { xs: "200px", md: 0 } }} >
                <Grid container display='flex' justifyContent='center' padding="20px" flexDirection={"column"}   >
                    <Typography textTransform={"uppercase"} fontFamily={"lemonade"} component='h2' variant='h2' fontSize={22} fontWeight={800} marginTop={1}>
                        Fiche Client:
                    </Typography>
                    {isLoading ? <Skeleton variant="rectangular" width={"100%"} height={"30vh"} /> :
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
                                title={'Numéro de téléphone'}
                                value={data.contact && data.contact.phoneNumber}
                                onUpdate={onUpdate}
                            >
                                <PhoneNumberTextField
                                    phoneNumber={data.contact && data.contact.phoneNumber}
                                    setPhoneNumber={null}
                                    index={0}
                                    required={true}
                                />
                            </UpdatableTextField>

                            <Divider sx={{ my: 2 }} />

                            <UpdatableTextField
                                title={'Numéro de téléphone'}
                                value={data.contact && data.contact.phoneNumber}
                                onUpdate={onUpdate}
                            >
                                <PhoneNumberTextField
                                    phoneNumber={data.contact && data.contact.phoneNumber}
                                    setPhoneNumber={null}
                                    index={0}
                                    required={true}
                                />
                            </UpdatableTextField>

                            <Divider sx={{ my: 2 }} />

                            {((data.contact && data.contact.email) || onUpdate) &&
                                <UpdatableTextField
                                    title={'Émail'}
                                    value={data.contact && data.contact.email}
                                    onUpdate={onUpdate}
                                >
                                    <EmailTextField
                                        email={data.contact && data.contact.email}
                                        setEmail={null}
                                        required={false} />
                                </UpdatableTextField>}

                            {((data.contact && data.contact.email) || onUpdate) && <Divider sx={{ my: 2 }} />}

                            {((data.contact && data.contact.secondPhoneNumber) || onUpdate) &&
                                <UpdatableTextField
                                    title={'Numéro de téléphone secondaire'}
                                    value={data.contact && data.contact.secondPhoneNumber}
                                    onUpdate={onUpdate}
                                >
                                    <PhoneNumberTextField
                                        phoneNumber={data.contact && data.contact.secondPhoneNumber}
                                        setPhoneNumber={null}
                                        required={false}
                                        index={1} />
                                </UpdatableTextField>}

                            {((data.contact && data.contact.secondPhoneNumber) || onUpdate) && <Divider sx={{ my: 2 }} />}

                            {((data.contact && data.contact.address) || onUpdate) &&
                                <UpdatableTextField
                                    title={'Adresse'}
                                    value={data.contact && data.contact.address}
                                    onUpdate={onUpdate}
                                >
                                    <LocationTextField
                                        location={data.contact.address}
                                        setLocation={null} />
                                </UpdatableTextField>}

                            {((data.contact && data.contact.address) || onUpdate) && <Divider sx={{ my: 2 }} />}

                            {(data.comments || onUpdate) &&
                                <UpdatableTextField
                                    title={'Commentaires'}
                                    value={data.comments}
                                    onUpdate={onUpdate}
                                >
                                    <CommentsTextField
                                        comments={data.comments}
                                        setComments={null}
                                        category={null} />
                                </UpdatableTextField>}

                            {(data.comments || onUpdate) && <Divider sx={{ my: 2 }} />}

                            {(data.contact && ((data.contact.instagram || data.contact.whatsapp) || onUpdate)) &&
                                <UpdatableTextField
                                    title={'Réseaux sociaux utilisés'}
                                    value={(data.contact.instagram && data.contact.whatsapp) ? "Whatsapp et instagram" :
                                        (data.contact.instagram ? "Instagram" : "Whatsapp")}
                                    onUpdate={onUpdate}
                                >
                                    <SocialNetworksFormControl
                                        isInstagram={isInstagram}
                                        isWhatsapp={isWhatsapp}
                                        setIsInstagram={setIsInstagram}
                                        setIsWhatsapp={setIsWhatsapp}
                                    />
                                </UpdatableTextField>}

                            {((data.contact && (data.contact.instagram || data.contact.whatsapp)) || onUpdate) && <Divider sx={{ my: 2 }} />}

                            {((data.contact && data.contact.encounterWay) || onUpdate) &&
                                <UpdatableTextField
                                    title={'Comment avez vous entendu parler de nous?'}
                                    value={(data.contact.encounterWay)}
                                    onUpdate={onUpdate}
                                >
                                    <EncounterWayFormControl
                                        encounterWay={data.contact.encounterWay}
                                        setEncounterWay={null} />
                                </UpdatableTextField>}

                            {((data.contact && data.contact.encounterWay) || onUpdate) && <Divider sx={{ my: 2 }} />}

                            <UpdatableTextField
                                title={'Autorisation de recevoir des publications'}
                                value={data.publications === true ? "Accordée" : "Non accordée"}
                                onUpdate={onUpdate}
                            >
                                <FormControl >
                                    <Switch checked={publications === true} onChange={() => setPublications(!publications)} name="publications" />
                                </FormControl>
                            </UpdatableTextField>

                            <Divider sx={{ my: 2 }} />

                            {!onUpdate &&
                                <UpdatableTextField
                                    title={'Client depuis'}
                                    value={data.data && data.data.joining && ("Le " + formatFullDate(data.data.joining.time) + " par " + dataAuthorName)}
                                    onUpdate={false}
                                    children={null}
                                />}

                            {!onUpdate && <Divider sx={{ my: 2 }} />}

                            {data.data && data.data.update && !onUpdate &&
                                <UpdatableTextField
                                    title={'Update'}
                                    value={data.data && data.data.update && ("Le " + formatFullDate(data.data.update.time) + " par " + dataUpdateAuthorName)}
                                    onUpdate={false}
                                    children={null}
                                />
                            }

                            {data.data && data.data.update && !onUpdate && < Divider sx={{ my: 2 }} />}

                            {/* Commandes */}
                            {data.orders && data.orders.length > 0 &&
                                <Grid container display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 0 } }} maxWidth={'sm'}>
                                    <Grid item xs={12} md={6} >
                                        <Typography
                                            sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                                            fontWeight={500}
                                        >
                                            Nombre total de commandes
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} marginY={2} display={"flex"} flexDirection={"column"} >
                                        <Typography
                                            color={"text.secondary"}
                                            sx={{ fontSize: { xs: 17, md: 20 } }}
                                            fontWeight={900}
                                            display={"block"}
                                        >
                                            {data.orders.length}
                                        </Typography>


                                        {/* Bouton pour voir les commandes */}
                                        <Typography
                                            marginTop={2}
                                            width={"100%"}
                                            color={"text.secondary"}
                                            sx={{ fontSize: { xs: 17, md: 20 } }}
                                            display={"block"}
                                        >
                                            Pour les voir, <Link onClick={() => setOpenDialogOrders(true)} sx={{ fontSize: { xs: 17, md: 20 } }} href={'#'} variant="body2" >cliquer ici</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>}
                        </Box>}

                    {/* Boutons */}
                    <Grid item xs={12} marginBottom={"20px"} marginTop={'20px'}>
                        {!onUpdate ?
                            <Grid display={'flex'} sx={{ justifyContent: 'space-around' }}>
                                <UpdateButton
                                    handleUpdate={() => setOnUpdate(true)}
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
                            <Grid display={'flex'} sx={{ justifyContent: 'space-around' }}>
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

                {/* Dialogue de confirmation de suppression de compte */}
                <ConfirmDeleteDialog
                    label={'du client'}
                    handleDelete={() => {
                        const url = `${process.env.REACT_APP_API_ORDERS_URL}/customers/${id}`
                        deleteData(url, userInfo, dispatch, navigate)
                        setOpenDialogDelete(false)
                    }}
                    openDialogDelete={openDialogDelete}
                    setOpenDialogDelete={setOpenDialogDelete} />

                {/* Dialog du tableau des commandes */}
                <OrdersTable
                    customerId={data._id}
                    customerName={data.name && (data.name.lastName + " " + data.name.firstName)}
                    openDialog={openDialogOrders}
                    setOpenDialog={setOpenDialogOrders}
                />
            </Paper>
        </Container >
    )
}