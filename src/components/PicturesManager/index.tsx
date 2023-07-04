/**
 * Component PicturesManager
 **/

import { Divider, Grid, Typography } from "@mui/material"

import PicturesDisplay from "../PicturesDisplay"
import FileUploadInput from "../FileUploadInput"

type Props = {
    orderData: any,
}

/**
 * Gestion et affichage des photos liées aux commandes 
 * @param {object} orderData - Données de la commande
 */
export default function PicturesManager({ orderData }: Props) {

    return (
        <Grid>
            {/* Photos de début */}

            <Grid>
                <Typography
                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                    fontWeight={500}
                >
                    Photos de début de projet
                </Typography>


                <PicturesDisplay
                    orderData={orderData}
                    category="start"
                />
                <FileUploadInput
                    orderDataId={orderData && orderData._id}
                    category="start"
                />
            </Grid>

            <Divider sx={{ my: 1 }} />

            {/* Photos du produit fini */}
            <Grid>
                <Typography
                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                    fontWeight={500}
                >
                    Photos finales
                </Typography>


                <PicturesDisplay
                    orderData={orderData}
                    category="end"
                />
                <FileUploadInput
                    orderDataId={orderData && orderData._id}
                    category="end"
                />
            </Grid>
        </Grid>
    )
}