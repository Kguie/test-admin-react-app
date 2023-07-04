/**
 * Gestion du component l'entrée de la localisation
**/
import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    location: string | null,
    setLocation: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour la localisation avec une version contrôlée
 * @param {string|null} location State qui définit l'adresse si il y en a une
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setLocation State action pour définir location
 */
export default function LocationTextField({ location, setLocation }: Props) {
    //State du status de l'erreur sur la localisation
    const [locationErrorStatus, setLocationErrorStatus] = useState<boolean>(false)

    return (
        setLocation ?
            <TextField
                autoComplete="location"
                value={location ? location : ''}
                name="location"
                fullWidth
                id="location"
                label="Adresse"
                multiline
                maxRows={4}
                autoFocus
                error={locationErrorStatus}
                helperText={locationErrorStatus && "Veuillez entrer une adresse valide"}
                onChange={(event) => {
                    const location = event.target.value
                    const test = location.trim().length;
                    setLocationErrorStatus(false)
                    if (test > 500) {
                        setLocationErrorStatus(true);
                        return
                    } else {
                        setLocation(location)
                        setLocationErrorStatus(false);
                        return
                    }
                }}
            /> :
            <TextField
                autoComplete="location"
                defaultValue={location}
                name="location"
                fullWidth
                id="location"
                label="Adresse"
                multiline
                maxRows={4}
                autoFocus
                error={locationErrorStatus}
                helperText={locationErrorStatus && "Veuillez entrer une adresse valide"}
                onChange={(event) => {
                    const location = event.target.value.trim()
                    const test = location.length;
                    setLocationErrorStatus(false)
                    if (test === 0 || test > 500) {
                        setLocationErrorStatus(true);
                        return
                    }
                }}
            />
    )
}