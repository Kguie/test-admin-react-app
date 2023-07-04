/**
 * Gestion du Component OrderGeneralTab
 **/

import { useState } from 'react';
import { Typography, Grid, Button, Tooltip, Divider, MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { UseGetLogInData } from '../../utils/hooks';
import { getFullName, updateData, deleteData } from '../../utils/api';
import { formatFullDate } from '../../utils/utils';
import CustomerChoiceAutocomplete from '../CustomerChoiceAutocomplete';
import { selectUserInfo } from '../../utils/selectors';
import ContactWayTextField from '../ContactWayTextField';
import EventTextField from '../EventTextField';
import CommentsTextField from '../CommentsTextField';
import EvaluationTextField from '../EvaluationTextField';
import EvaluationWayTextField from '../EvaluationWayTextField';
import UpdateButton from '../UpdateButton';
import DeleteButton from '../DeleteButton';
import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';
import { error, reset } from '../../features/alertSnackbar';

type Props = {
    data: any,
    isLoading: boolean
}

type orderProps = {
    orderData: any
}

/**
 * Affiche Component OrderGeneralTab qui permet le fonctionnement du tab général dans l'affichage d'une commande
 * @param {object} orderData - Données de la commande
 */
export default function OrderGeneralTab({ orderData }: orderProps) {
    const navigate: NavigateFunction = useNavigate()
    const dispatch: Dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State de mise à jour du client
    const [customerOnUpdate, setCustomerOnUpdate] = useState<boolean>(false);

    //State de mise à jour des autres données
    const [onUpdate, setOnUpdate] = useState<boolean>(false);

    //State du client pour le changement de client de la commande
    const [customer, setCustomer] = useState<any>(null)

    //State du nom de l'auteur de la commande
    const [authorName, setAuthorName] = useState<string | null>(null);

    //State du nom de l'auteur de la mise à jour
    const [updateAuthorName, setUpdateAuthorName] = useState<string | null>(null);

    //State du dialogue de confirmation pour valider le changement de client
    const [openCustomerConfirmationDialog, setOpenCustomerConfirmationDialog] = useState<boolean>(false);

    //State du dialogue de confirmation pour valider la suppression de la commande
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);

    //State du status de la commande
    const [orderStatus, setOrderStatus] = useState<string>("devis demandé");

    //Récupération des clients
    const { data, isLoading }: Props = UseGetLogInData(`${process.env.REACT_APP_API_ORDERS_URL}/customers`, userInfo)

    //Récupération du nom de l'utilisateur qui a créé la commande
    const urlAuthor = orderData.data && orderData.data.contact && `${process.env.REACT_APP_API_ORDERS_URL}/users/name/${orderData.data.contact.userId}`
    getFullName(urlAuthor, userInfo, setAuthorName, dispatch)

    //Récupération du nom de l'utilisateur qui a mis à jour la commande
    const urlUpdateAuthor = orderData.data && orderData.data.contact && `${process.env.REACT_APP_API_ORDERS_URL}/users/name/${orderData.data.contact.userId}`
    getFullName(urlUpdateAuthor, userInfo, setUpdateAuthorName, dispatch)

    //Ouverture de l'alerte de confirmation pour le changement de client    
    const handleClickOpenCustomerDialog = () => {
        setOpenCustomerConfirmationDialog(true);
        setOpenDeleteConfirmationDialog(false)
    };

    //Fermeture de l'alerte de confirmation pour le changement de client   
    const handleCloseCustomerDialog = () => {
        setOpenCustomerConfirmationDialog(false);
        setCustomerOnUpdate(false)
    };

    //Ouverture de l'alerte de confirmation pour la suppression de la commande    
    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteConfirmationDialog(true);
        setOpenCustomerConfirmationDialog(false);
    };

    //Fermeture de l'alerte de confirmation pour la suppression de la commande   
    const handleCloseDeleteDialog = () => {
        setOpenDeleteConfirmationDialog(false);
    };

    /**
     * Constitue l'objet de l'update à partir du formulaire présent et après vérifications
     * @params {Event}
     */
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(reset())

        const data = new FormData(event.currentTarget)

        const contactWay: any = data.get('contactWay');
        const eventName: any = data.get('event');

        //Optionnels
        const comments: any = data.get('comments');
        const evaluation: any = data.get('evaluation');
        const evaluationWay: any = data.get('evaluationWay');

        if (!contactWay || !eventName) {
            dispatch(error("Tous les champs doivent être complétés afin de finaliser la mise à jour"))
            return
        }
        const formData: any = {
            customer: {
                id: orderData.customer.id,
                name: orderData.customer.name,
                request: orderData.customer.request,
                contactUsed: (contactWay.toString()).trim(),
                event: (eventName.toString()).trim(),
            },
            orderStatus: orderStatus ? orderStatus : orderData.orderStatus,
            comments: comments ? (comments.toString()).trim() : null,
            evaluation: {
                quote: evaluation ? (evaluation.toString()).trim() : null,
                way: evaluationWay ? (evaluationWay.toString()).trim() : null,
            }
        }

        //Tests        
        if (!comments || (comments.length > 0 && comments.length < 500)) {
            if (!evaluation || (evaluation.length > 0 && evaluation.length < 500)) {
                if (!evaluationWay || (evaluationWay.length > 0 && evaluationWay.length < 50)) {
                    if (contactWay.length > 0 && contactWay.length < 50) {
                        if (eventName.length > 0 && eventName.length < 50) {
                            const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
                            updateData(formData, url, userInfo, dispatch, navigate)
                        } else {
                            dispatch(error("Veuillez entrer un évènement de moins de 50 caractères"))
                            return
                        }

                    } else {
                        dispatch(error("Veuillez entrer un moyen de contact de moins de 50 caractères"))
                        return
                    }
                } else {
                    dispatch(error("Veuillez entrer une localisation d'évaluation de moins de 50 caractères"))
                    return
                }
            } else {
                dispatch(error('Veuillez entrer une évaluation de moins de 500 caractères'))
                return
            }
        } else {
            dispatch(error('Veuillez entrer un commentaire de moins de 500 caractères'))
            return
        }
    }

    return (

        <Grid component={'form'} container display={"flex"} sx={{ gap: { xs: 2, md: 0 } }} gap={'15px'} flexDirection={'column'} onSubmit={handleSubmit}>

            {/* Section Choix du client */}
            {!onUpdate && <Grid item xs={12} md={8}    >
                {!customerOnUpdate && <Grid display={'flex'} alignItems={'center'} sx={{ justifyContent: { xs: 'right', md: 'left' } }}>
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                        fontWeight={500}
                    >
                        Client
                    </Typography>

                    {/* Bouton pour ouvrir la fenêtre de modification du client */}
                    <Tooltip title="Modifier le client " placement="right">
                        <Button
                            size='large'
                            onClick={() => setCustomerOnUpdate(true)}
                        >
                            <ChangeCircleIcon fontSize='large' color='info' />
                        </Button>
                    </Tooltip></Grid>}
                {customerOnUpdate && <Grid justifyContent={'space-between'} display={'flex'} alignItems={'center'} >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                        fontWeight={500}
                    >
                        Client
                    </Typography>
                    {/* Boutons de modification du client */}
                    <Grid>
                        <Tooltip title="Annuler " placement="bottom">
                            <Button
                                size='large'
                                onClick={() => setCustomerOnUpdate(false)}
                            >
                                <CancelIcon fontSize='large' color='error' />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Valider la modification " placement="bottom">
                            <Button
                                size='large'
                                onClick={() => {
                                    dispatch(reset());
                                    if (!customer) {
                                        dispatch(error("Veuillez d'abord choisir un client"));
                                        return
                                    } else {
                                        handleClickOpenCustomerDialog();
                                        return
                                    }
                                }}
                            >
                                <CheckCircleOutlineIcon fontSize='large' color='success' />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>}
            </Grid>}

            {/* Update du client */}
            {!onUpdate && <Grid item xs={12} sm={6}>
                {!customerOnUpdate ?
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.customer && orderData.customer.name}
                    </Typography>
                    : <Grid>
                        <CustomerChoiceAutocomplete
                            customer={customer}
                            setCustomer={setCustomer}
                            data={data}
                            isLoading={isLoading}
                        />
                        <Grid>
                        </Grid>
                    </Grid>}
            </Grid>}

            {/* Nombre de requêtes */}
            {!onUpdate && !customerOnUpdate &&
                <Grid item xs={12}>
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                        color={"text.secondary"}
                    >
                        {orderData.customer &&
                            orderData.customer.request &&
                            orderData.customer.request.length === 1 ? "Cette commande est constituée d'une requête" :
                            `Cette commande est constituée de ${orderData.customer.request.length} requêtes`}
                    </Typography>
                </Grid>}

            {/* Données sur les horaires de création et de modification */}
            {!onUpdate && !customerOnUpdate &&
                <Grid>
                    <Divider sx={{ my: 1 }} />
                    <Grid item xs={12} md={6} >
                        <Typography
                            sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                            fontWeight={500}
                        >
                            Horaire de commande
                        </Typography>
                    </Grid>

                    <Grid item xs={12} >
                        <Typography
                            marginTop={"10px"}
                            color={"text.secondary"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}
                        >
                            {orderData.data && orderData.data.contact && "Commande crée le " + formatFullDate(orderData.data.contact.time) + "   par   " + authorName}
                        </Typography>
                        {orderData.data && orderData.data.update && <Typography
                            color={"text.secondary"}
                            marginTop={"10px"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}
                        >
                            {"Commande mise à jour le " + formatFullDate(orderData.data.update.time) + "   par   " + updateAuthorName}
                        </Typography>}
                    </Grid>
                </Grid>}

            {!onUpdate && !customerOnUpdate && <Divider sx={{ my: 1 }} />}

            {/* Status de la commande avec les remboursements */}
            {!customerOnUpdate && <Grid item xs={12} md={6} >
                <Typography
                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                    fontWeight={500}
                >
                    Status de la commande
                </Typography>
            </Grid>}

            {!customerOnUpdate &&
                <Grid item xs={12} display={'flex'} flexDirection={'column'} gap={'10px'}>
                    {!onUpdate && <Typography
                        color={orderData.orderStatus === "contacter client!" ? 'error' : "text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.orderStatus}
                    </Typography>}
                    {!onUpdate && orderData.paymentInfo && orderData.paymentInfo.payback && orderData.paymentInfo.payback.wanted && <Typography
                        color={'error'}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        Un remboursement a été demandé!
                    </Typography>
                    }
                    {onUpdate &&
                        // Choix du status de la commande
                        <Select
                            id="order-status-select"
                            sx={{ width: { xs: "100%", md: "60%" } }}
                            defaultValue={orderData.orderStatus}
                            value={orderStatus && orderStatus}
                            label="Status de la commande"
                            onChange={(event: any) => {
                                setOrderStatus(event.target.value);
                            }}
                        >
                            {/* Étapes de sélection du status de la commande */}
                            <MenuItem value={'devis demandé'}>1-Devis demandé</MenuItem>
                            <MenuItem value={'devis envoyé'}>2-Devis envoyé</MenuItem>
                            <MenuItem value={'devis validé'}>3-Devis validé</MenuItem>
                            <MenuItem value={'livré'}>4-Commande livrée</MenuItem>
                            <MenuItem value={'annulé'}>Commande annulée</MenuItem>
                            <MenuItem value={'contacter client!'}>Contacter le client!</MenuItem>
                        </Select>
                    }
                </Grid>}

            {!customerOnUpdate && <Divider sx={{ my: 1 }} />}

            {/* Moyen de contact */}
            {!customerOnUpdate &&
                <Grid>
                    {!onUpdate ?
                        <Grid>
                            <Grid item xs={12} md={6} >
                                <Typography
                                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                                    fontWeight={500}
                                >
                                    Moyen de contact
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    marginTop={"10px"}
                                    color={"text.secondary"}
                                    sx={{ fontSize: { xs: 17, md: 20 } }}
                                >
                                    {orderData.customer && "Contacté par  " + orderData.customer.contactUsed}
                                </Typography>
                            </Grid>
                        </Grid> :
                        <Grid item xs={12} md={6}>
                            <ContactWayTextField
                                contactWay={orderData.customer && orderData.customer.contactUsed}
                                setContactWay={null}
                            />
                        </Grid>}
                </Grid>}
            {!customerOnUpdate && <Divider sx={{ my: 1 }} />}

            {/* Évènement */}
            {!customerOnUpdate && !onUpdate &&
                <Grid item xs={12} md={6} >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Évènement
                    </Typography>
                </Grid>}
            {!customerOnUpdate && <Grid item xs={12} md={6}>
                {!onUpdate ? <Typography
                    marginTop={"10px"}
                    color={"text.secondary"}
                    sx={{ fontSize: { xs: 17, md: 20 } }}
                >
                    {orderData.customer && orderData.customer.event}
                </Typography> :
                    <EventTextField
                        event={orderData.customer && orderData.customer.event}
                        setEvent={null}
                    />
                }
            </Grid>}

            {!customerOnUpdate && <Divider sx={{ my: 1 }} />}

            {/* Commentaires */}
            {orderData.comments && !customerOnUpdate &&
                <Grid item xs={12} md={6} >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Commentaires généraux
                    </Typography>
                </Grid>
            }
            {!customerOnUpdate &&
                <Grid item xs={12} md={6}>
                    {!onUpdate && orderData.comments && <Typography
                        marginTop={"10px"}
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {orderData.comments}
                    </Typography>}
                    {onUpdate &&
                        <CommentsTextField
                            comments={orderData.comments}
                            setComments={null}
                            category={null}
                        />}
                </Grid>
            }
            {!customerOnUpdate && (orderData.comments || onUpdate) && <Divider sx={{ my: 1 }} />}

            {orderData.evaluation && !customerOnUpdate &&
                <Grid item xs={12} md={6} >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Évaluation du client
                    </Typography>
                </Grid>
            }
            {!customerOnUpdate &&
                //  (orderData.orderStatus === 'devis validé' || orderData.orderStatus === 'livré' || orderData.orderStatus === 'annulé') &&
                <Grid item xs={12} md={6} gap={"10px"} display={"flex"} flexDirection={"column"}>
                    {orderData.evaluation && orderData.evaluation.quote && !onUpdate &&
                        <Typography
                            marginTop={"10px"}
                            color={"text.secondary"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}
                        >
                            {orderData.evaluation.quote}
                        </Typography>}
                    {onUpdate && (orderData.orderStatus === 'devis validé' || orderData.orderStatus === 'livré' || orderData.orderStatus === 'annulé') &&
                        <EvaluationTextField
                            evaluation={(orderData.evaluation && orderData.evaluation.quote) ? orderData.evaluation.quote : null}
                            setEvaluation={null}
                        />
                    }
                    {orderData.evaluation && orderData.evaluation.way && !onUpdate &&
                        <Typography
                            marginTop={"10px"}
                            color={"text.secondary"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}
                        >
                            {orderData.evaluation.way && `Laissé sur ` + orderData.evaluation.way}
                        </Typography>}
                    {onUpdate && (orderData.orderStatus === 'devis validé' || orderData.orderStatus === 'livré' || orderData.orderStatus === 'annulé') &&
                        <EvaluationWayTextField
                            evaluationWay={(orderData.evaluation && orderData.evaluation.way) ? orderData.evaluation.way : null}
                            setEvaluationWay={null}
                        />
                    }
                </Grid>
            }
            {!customerOnUpdate && ((orderData.evaluation && (orderData.evaluation.quote || orderData.evaluation.way)) || onUpdate) &&
                <Divider sx={{ my: 1 }} />}

            {/* Boutons de mise à jour */}
            {
                !customerOnUpdate && <Grid item xs={12} display={'flex'} justifyContent={'space-around'} marginBottom={"20px"} marginTop={'10px'}>
                    {!onUpdate &&
                        <Grid display={'flex'} sx={{ gap: { xs: '20px', md: '45px' } }}>
                            <UpdateButton
                                handleUpdate={() => { setOnUpdate(true) }}
                            />
                            <DeleteButton
                                handleDelete={handleClickOpenDeleteDialog}
                            />
                        </Grid>}
                    {onUpdate && <Grid display={'flex'} sx={{ gap: { xs: '20px', md: '45px' } }}>
                        <CancelButton
                            handleCancel={() => setOnUpdate(false)}
                        />
                        <SubmitButton
                            disabled={false}
                            handleClick={null}
                        />
                    </Grid>}
                </Grid>
            }

            {/* Alerte de confirmation */}
            <Dialog
                open={openCustomerConfirmationDialog || openDeleteConfirmationDialog}
                onClose={() => {
                    if (openCustomerConfirmationDialog) {
                        setOpenCustomerConfirmationDialog(false)
                    } if (openDeleteConfirmationDialog) {
                        setOpenDeleteConfirmationDialog(false)
                    }
                }}
                aria-labelledby={openCustomerConfirmationDialog ? "Alerte de changement de client" : "Alerte de suppression de la commande"}
                aria-describedby={openCustomerConfirmationDialog ? "Permet de valider le nouveau client sélectionné " : "Permet de valider la suppression de la commande"}
            >
                <DialogTitle id="alert-dialog-title-confirmation">
                    Confirmation du de suppression
                </DialogTitle>
                <DialogContent>
                    {openCustomerConfirmationDialog ? <DialogContentText id="alert-dialog-description-customer-confirmation">
                        Vous avez choisi {customer && customer.name && customer.name.lastName + " " + customer.name.firstName}, veuillez confirmer celui-ci.
                    </DialogContentText> :
                        <DialogContentText id="alert-dialog-description-delete-confirmation">
                            Cette commande va être définitivement supprimée! Veuillez confirmer votre choix
                        </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ fontSize: { xs: '12px', sm: '16px' } }}
                        onClick={() => {
                            if (openCustomerConfirmationDialog) {
                                handleCloseCustomerDialog()
                                return
                            } if (openDeleteConfirmationDialog) {
                                handleCloseDeleteDialog()
                                return
                            }
                        }}
                    >
                        Annuler</Button>
                    <Button
                        sx={{ fontSize: { xs: '12px', sm: '16px' } }}
                        onClick={() => {
                            dispatch(reset());
                            if (openCustomerConfirmationDialog) {
                                const updateObject = { customer: { id: customer._id } }
                                const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}/customer`
                                updateData(updateObject, url, userInfo, dispatch, navigate)
                                return
                            }
                            if (openDeleteConfirmationDialog) {
                                const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}`
                                deleteData(url, userInfo, dispatch, navigate)
                                return
                            }
                        }}
                        autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}