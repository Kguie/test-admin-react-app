/**
 * Gestion du component DeleteButton
 **/

import { Button, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    handleDelete: Function
}

/**
 * Component qui gère le bouton de suppression et qui change en fonction de la taille de l'écran
 * @param {Function}handleDelete fonction de suppression
 */
export default function DeleteButton({ handleDelete }: Props) {
    return (
        <Grid>
            <Button
                type="button"
                variant="contained"
                color='error'
                onClick={() => {
                    handleDelete()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'none', sm: 'flex' } }}
                endIcon={<DeleteIcon />}
            >
                Supprimer
            </Button>
            <Button
                type="button"
                variant="contained"
                color='error'
                onClick={() => {
                    handleDelete()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'flex', sm: 'none' } }}
            >
                <DeleteIcon />
            </Button>
        </Grid>
    )
}