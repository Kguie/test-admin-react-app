/**
 * Gestion du component SocialNetworksFormControl
 **/

import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";

type Props = {
    isWhatsapp: boolean,
    isInstagram: boolean,
    setIsWhatsapp: React.Dispatch<React.SetStateAction<boolean>>,
    setIsInstagram: React.Dispatch<React.SetStateAction<boolean>>
};

/**
 * Formulaire contrôlé avec des entrées de type switch pour sélectionner les réseaux sociaux utilisés
 * @param {boolean} isWhatsapp - Définit si le concerné utilise whatssapp ou non
 * @param {boolean} isInstagram - Définit si le concerné utilise instagram ou non
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsWhatsapp - State action pour définir isWhatssapp 
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsInstagram - State action pour définir isInstagram 
 */
export default function SocialNetworksFormControl({ isWhatsapp, isInstagram, setIsWhatsapp, setIsInstagram }: Props) {
    return (
        <FormControl component="fieldset" variant="standard" fullWidth>
            <FormLabel component="legend">Réseaux sociaux utilisés</FormLabel>
            <FormGroup
                row
                sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
            >
                <FormControlLabel
                    control={
                        <Switch checked={isWhatsapp} onChange={() => setIsWhatsapp(!isWhatsapp)} name="whatsapp" />
                    }
                    label="Whatsapp"
                />
                <FormControlLabel
                    control={
                        <Switch checked={isInstagram} onChange={() => setIsInstagram(!isInstagram)} name="instagram" />
                    }
                    label="Instagram"
                />
            </FormGroup>
        </FormControl>
    )
}