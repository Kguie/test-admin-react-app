/**
 * Gestion du Component OrderDetailsTab
 **/

import { useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    Divider,
    Skeleton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
}
    from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';

import { UseGetLogInData } from '../../utils/hooks';
import RequestDialog from '../RequestDialog';
import RequestList from '../RequestList';
import QuotationConstructorDialog from '../QuotationConstructorDialog';
import { selectUserInfo } from '../../utils/selectors';
import { formatDate } from '../../utils/utils';
import QuotationManagementDialog from '../QuotationManagementDialog';
import { colors } from '../../utils/style/variables';

type Props = {
    data: any,
    isLoading: boolean
}

type orderProps = {
    orderData: any,
}

/**
* @param {object} orderData - Données de la commande
* Affiche Component OrderDetailsTab qui permet le fonctionnement du tab détails affichant le contenu d'une commande et permettant de générer des devis et la facture
*/
export default function OrderDetailsTab({ orderData }: orderProps) {
    const { id } = useParams()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State de l'ouverture du choix de patisserie à ajouter à la requête
    const [openDialogAddRequest, setOpenDialogAddRequest] = useState<boolean>(false);

    //State de l'ouverture de modification du choix de patisserie 
    const [openDialogModifyRequest, setOpenDialogModifyRequest] = useState<boolean>(false);

    //State de l'ouverture du deu la fenêtre d'ajout de devis
    const [openDialogAddQuotation, setOpenDialogAddQuotation] = useState<boolean>(false);

    //State de l'ouverture de la fenêtre de gestion d'un devis
    const [openDialogManageQuotation, setOpenDialogManageQuotation] = useState<boolean>(false);

    //State de l'objet pastry à modifier
    const [pastryObject, setPastryObject] = useState<any>(null)

    //State de l'objet du devis sélectionné
    const [quotationObject, setQuotationObject] = useState<any>(null)

    //Récupération des devis liés à la commande  
    const { data, isLoading }: Props = UseGetLogInData(`${process.env.REACT_APP_API_ORDERS_URL}/quotations/order/${id}`, userInfo)


    /**
    * Permet l'ouverture du component mui dialog afin d'ajouter une patisserie
    */
    function handleOpenDialogAddRequest() {
        setPastryObject(null)
        setOpenDialogAddRequest(true)
    }
    return (
        < Grid
            container
            display={"flex"}
            sx={{ gap: { xs: 2, md: 0 } }}
            gap={'15px'}
            flexDirection={'column'}
        >

            <Grid item xs={12}  >
                <Typography
                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                    fontWeight={500}
                >
                    Requêtes
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <RequestList
                    requestList={orderData && orderData.customer && orderData.customer.request}
                    setPastryObject={setPastryObject}
                    setOpenDialogModifyRequest={setOpenDialogModifyRequest}
                />
                <Button
                    size='small'
                    onClick={() => {
                        handleOpenDialogAddRequest()
                    }}
                    sx={{ marginTop: '20px' }}
                    variant="contained"
                    disabled={orderData && orderData.chosenQuotation ? true : false}
                >
                    Ajouter nouvelle patisserie
                </Button>
                {orderData && orderData.chosenQuotation && <Typography margin={'10px'} fontSize={'10px'}>Veuillez désélectionner le devis si vous voulez modifier les requêtes</Typography>}
            </Grid>
            <Divider sx={{ my: 2 }} />

            {/* Section devis */}
            <Grid>
                <Grid item xs={12}  >
                    <Typography
                        sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                        fontWeight={500}
                    >
                        Devis
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    {isLoading ? <Skeleton variant="rectangular" width={"98%"} height={"15px"} /> :
                        <Typography
                            marginTop={"10px"}
                            color={"text.secondary"}
                            sx={{ fontSize: { xs: 17, md: 20 } }}
                        >
                            {data.length === 0
                                ? "Vous n'avez pas de devis disponible pour cette commande"
                                : (data.length === 1
                                    ? "Vous avez un devis disponible pour cette commande:"
                                    : ("Vous avez " + data.length + " disponibles pour cette commande:")
                                )}
                        </Typography>}
                </Grid>

                {/* Affichage des devis */}
                <Grid item xs={12}>

                    {data.length > 0 &&
                        <List dense={true}>
                            {data.map((quotation: any, index: number) => (
                                <ListItem
                                    key={'quotation' + index}
                                    onClick={() => {
                                        setQuotationObject(quotation)
                                        setOpenDialogManageQuotation(true)
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ color: (orderData.chosenQuotation && orderData.chosenQuotation === quotation._id) ? colors.darkBrown : '#ffffff' }}>
                                            {/* Changement de couleur si le devis est validé */}
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={'Créé le ' + (quotation.data && quotation.data.time && formatDate(quotation.data.time))}
                                        secondary={'Prix :' + quotation.finalPrice + ' €'}
                                    />
                                    {orderData.chosenQuotation && orderData.chosenQuotation === quotation._id && <Typography color={"text.secondary"}>Devis sélectionné</Typography>}
                                </ListItem>
                            ))}
                        </List>
                    }

                </Grid>
                <Button
                    size='small'
                    onClick={() => {
                        setOpenDialogAddQuotation(true)
                    }}
                    sx={{ marginTop: '20px' }}
                    variant="contained"
                >
                    Ajouter un devis
                </Button>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Fenêtre d'ajout ou modification de requête pour la commande déjà créée */}
            <RequestDialog
                orderData={orderData}
                userInfo={userInfo}
                setOpenDialogAddRequest={setOpenDialogAddRequest}
                openDialogAddRequest={openDialogAddRequest}
                setOpenDialogModifyRequest={setOpenDialogModifyRequest}
                openDialogModifyRequest={openDialogModifyRequest}
                pastryObject={pastryObject}
                setPastryObject={setPastryObject}
                newOrder={false}
                requestArray={null}
                setRequestArray={null}
            />

            {/* Fenêtre d'ajout de devis */}
            <QuotationConstructorDialog
                openDialogAddQuotation={openDialogAddQuotation}
                setOpenDialogAddQuotation={setOpenDialogAddQuotation}
                orderData={orderData && orderData}
            />

            {/* Fenêtre de gestion d'un devis */}
            <QuotationManagementDialog
                openDialogManageQuotation={openDialogManageQuotation}
                setOpenDialogManageQuotation={setOpenDialogManageQuotation}
                orderData={orderData}
                quotationObject={quotationObject}
            />
        </Grid >)
}