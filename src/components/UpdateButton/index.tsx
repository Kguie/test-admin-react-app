/**
 * Gestion du component UpdateButton
 **/

import { Button, Grid } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

type Props = {
    handleUpdate: Function
}

/**
 * Component qui permet la gestion du bouton de mise à jour
 * @param {Function}
 */
export default function UpdateButton({ handleUpdate }: Props) {
    return (
        <Grid>
            <Button
                type="button"
                variant="contained"
                color='info'
                onClick={() => {
                    handleUpdate()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'none', sm: 'flex' } }}
                endIcon={<ChangeCircleIcon />}
            >
                Mettre à jour
            </Button>
            <Button
                type="button"
                variant="contained"
                color='info'
                onClick={() => {
                    handleUpdate()
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'flex', sm: 'none' } }}
            >
                <ChangeCircleIcon />
            </Button>
        </Grid>
    )
}