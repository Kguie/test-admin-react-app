/**
 * Gestion du component SubmitButton
 **/

import { Button, Grid } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

type Props = {
    disabled: boolean,
    handleClick: Function | null
}

/**
 * Component qui permet l'envoie d'un formulaire grace au component button ou le lancement de la fonction de validation, et qui change en fonction de la taille de l'écran
 * @param {boolean} disabled Affiche le status de l'option disabled du bouton submit
 * @param {Function|null} handleClick Fonction de validation à lancer au clic,si nul le bouton est de type submit
 */
export default function SubmitButton({ disabled, handleClick }: Props) {
    return (
        <Grid>
            <Button
                type={handleClick ? "button" : "submit"}
                disabled={disabled}
                variant="contained"
                color='success'
                onClick={() => {
                    if (handleClick) {
                        handleClick();
                        return
                    }
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'none', sm: 'flex' } }}
                endIcon={<CheckIcon />}
            >
                Valider
            </Button>
            <Button
                type={handleClick ? "button" : "submit"}
                disabled={disabled}
                variant="contained"
                color='success'
                onClick={() => {
                    if (handleClick) {
                        handleClick()
                        return
                    }
                }}
                sx={{ mt: 1, mb: 4, maxWidth: "300px", display: { xs: 'flex', sm: 'none' } }}
            >
                <CheckIcon />
            </Button>
        </Grid>
    )
}