/**
 * Gestion du component pour le choix de livraison de la commande
 **/

import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import DeliveryCalendarManager from '../DeliveryCalendarManager';

//A ajouter, une règle empêchant d'ajouter une date de livraison antérieure à la date du jour

type Props = {
    deliveryService: boolean,
    setDeliveryService: React.Dispatch<React.SetStateAction<boolean>>,
    deliveryLocation: string | null,
    setDeliveryLocation: React.Dispatch<React.SetStateAction<string | null>>,
    deliveryComments: string | null,
    setDeliveryComments: React.Dispatch<React.SetStateAction<string | null>>,
    deliveryTime: Date | null,
    setDeliveryTime: React.Dispatch<React.SetStateAction<Date | null>>
}

/**
 * Component permettant l'ajout des modalités de livraison de la commande
 * @param {boolean} deliveryService - Définit si l'option livraison est activée
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setDeliveryService - State action pour définir deliveryService
 * @param {string|null} deliveryLocation - Lieu de livraison si il y en aun
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setDeliveryLocation State action pour définir deliveryLocation
 * @param {string|null} deliveryComments - Commentaires de livraison
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setDeliveryComments - State action pour définir deliveryComments
 * @param {Date|null} deliveryTime - Date de livraison si il y en a une
 * @param {React.Dispatch<React.SetStateAction<Date | null>>} setDeliveryTime - State action pour définir deliveryTime
 */
export default function OrderDeliveryStep({ deliveryService, setDeliveryService, deliveryLocation, setDeliveryLocation, deliveryComments, setDeliveryComments, deliveryTime, setDeliveryTime }: Props) {

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Informations de livraison
            </Typography>
            <Grid container >
                <DeliveryCalendarManager
                    deliveryService={deliveryService}
                    setDeliveryService={setDeliveryService}
                    deliveryLocation={deliveryLocation}
                    setDeliveryLocation={setDeliveryLocation}
                    deliveryComments={deliveryComments}
                    setDeliveryComments={setDeliveryComments}
                    deliveryTime={deliveryTime}
                    setDeliveryTime={setDeliveryTime}
                />
            </Grid>
        </React.Fragment>
    );
}