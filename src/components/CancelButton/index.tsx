/**
 * Gestion du component CancelButton
 **/

import { Button, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    handleCancel: Function
}

/**
 * Component qui permet l'annulation de l'opération en cours
 * @param {Function}
 */
export default function CancelButton({ handleCancel }: Props) {
    return (
        <Grid>
            <Button
                type="button"
                variant="contained"
                color='warning'
                onClick={() => {
                    handleCancel()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'none', sm: 'flex' } }}
                endIcon={<CancelIcon />}
            >
                Annuler
            </Button>
            <Button
                type="button"
                variant="contained"
                color='warning'
                onClick={() => {
                    handleCancel()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'flex', sm: 'none' } }}
            >
                <CancelIcon />
            </Button>
        </Grid>
    )
}