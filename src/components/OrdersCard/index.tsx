/**
 * Component OrdersCard
 */

import { useSelector } from "react-redux";

import { selectUserInfo } from "../../utils/selectors";
import { UseGetLogInData } from "../../utils/hooks";
import { Grid, Typography } from "@mui/material";
import { filterOrdersByDeliveryDate } from "../../utils/utils";

type Props = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche un aperçu des commandes sous forme de carte pour le component Previews
 */
export default function OrdersCard() {
    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/`

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //Commandes pour la date du jour
    const todayOrders: Array<any> = (!isLoading && data && Array.isArray(data)) ? (filterOrdersByDeliveryDate(data, 0)) : [];

    //Commandes pour la semaine
    const oneWeekOrders: Array<any> = (!isLoading && data && Array.isArray(data)) ? (filterOrdersByDeliveryDate(data, 7)) : [];

    return (
        <Grid>
            {!isLoading &&
                <Grid>
                    <Typography>{todayOrders.length > 1 ? `Vous avez ${todayOrders.length} prévues pour ce jour` : (todayOrders.length === 1 ? "Vous avez une commande prévue aujourd'hui" : "Aucune commande prévue pour aujourd'hui")}</Typography>
                    <Typography>{oneWeekOrders.length > 1 ? `Vous avez ${oneWeekOrders.length} prévues pour cette semaine` : (oneWeekOrders.length === 1 ? "Vous avez une commande prévue cette semaine" : "Aucune commande prévue pour cette semaine")}</Typography>
                </Grid>
            }
        </Grid>
    )
}