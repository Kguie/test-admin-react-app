/**
 * Gestion du component pour la requête du client
 **/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import RequestDialog from '../RequestDialog';
import ContactWayTextField from '../ContactWayTextField';
import EventTextField from '../EventTextField';
import RequestList from '../RequestList';

type Props = {
    requestList: Array<any>,
    setRequestList: any,
    contactWay: string | null,
    setContactWay: React.Dispatch<React.SetStateAction<string | null>>,
    event: string | null,
    setEvent: React.Dispatch<React.SetStateAction<string | null>>,
}

/**
 * Component permettant l'ajout du contenu de la commande du client au formulaire de type checkout
 * @param {Array<any>} requestList State de la liste de requêtes
 * @param {React.Dispatch<React.SetStateAction<Array<any | null>>>|null} setRequestList State action pour définir la liste de requêtes
 * @param {string|null} contactWay State du moyen de contact utilisé
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setContactWay State action pour définir contactWay
 * @param {string|null} event State de l'évènement
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setEvent State action pour définir event 
 */
export default function CustomerRequestStep({ requestList, setRequestList, contactWay, setContactWay, event, setEvent }: Props) {

    //State de l'ouverture du choix de patisserie à ajouter à la requête
    const [openDialogAddRequest, setOpenDialogAddRequest] = useState<boolean>(false);

    //State de modification de la requête
    const [openDialogModifyRequest, setOpenDialogModifyRequest] = useState<boolean>(false);

    //State de l'objet pastry à modifier
    const [pastryObject, setPastryObject] = useState<any>(null)

    /**
     * Permet l'ouverture du component mui dialog afin d'ajouter une patisserie
     */
    function handleOpenDialogAddRequest() {
        setPastryObject(null)
        setOpenDialogAddRequest(true)
    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Requête du client
            </Typography>
            <Grid container gap={'20px'} >
                {/* Demandes */}
                <Grid item xs={12} marginTop={'10px'} >
                    <Grid>{requestList.length === 0 ? <Typography>Veuillez ajouter au moins un article dans le panier</Typography> :
                        <RequestList
                            requestList={requestList}
                            setPastryObject={setPastryObject}
                            setOpenDialogModifyRequest={setOpenDialogModifyRequest}
                        />
                    }
                    </Grid>
                    <Button
                        size='small'
                        onClick={() => {
                            handleOpenDialogAddRequest()
                        }}
                        sx={{ marginTop: '20px' }}
                        variant="contained"
                    >
                        Ajouter nouvelle patisserie
                    </Button>

                    {/* Fenêtre d'ajout et modification de requête pour une nouvelle commande */}
                    <RequestDialog
                        newOrder={true}
                        orderData={null}
                        userInfo={null}
                        setOpenDialogAddRequest={setOpenDialogAddRequest}
                        openDialogAddRequest={openDialogAddRequest}
                        setOpenDialogModifyRequest={setOpenDialogModifyRequest}
                        openDialogModifyRequest={openDialogModifyRequest}
                        pastryObject={pastryObject}
                        setPastryObject={setPastryObject}
                        requestArray={requestList}
                        setRequestArray={setRequestList}
                    />

                </Grid>
                <Grid item xs={12} md={7} >
                    <ContactWayTextField
                        contactWay={contactWay}
                        setContactWay={setContactWay}
                    />
                </Grid>
                <Grid item xs={12} md={7} >
                    <EventTextField
                        event={event}
                        setEvent={setEvent}
                    />
                </Grid>
            </Grid>
        </React.Fragment >
    );
}