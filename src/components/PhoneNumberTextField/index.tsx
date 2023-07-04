/**
 * Gestion du component l'entrée du numéro de téléphone
**/
import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    phoneNumber: string | null,
    setPhoneNumber: React.Dispatch<React.SetStateAction<string | null>> | null
    index: number,
    required: boolean
}

/**
 * Gestion de l'input pour le numéro de téléphone avec une version contrôlée et l'autre non
 * @param {number} index - Indique si il s'agit du numéro principale(1) ou autre 
 * @param {string | null} phoneNumber - Affiche le numéro de téléphone 
 * @param {React.Dispatch<React.SetStateAction<string | null>> | null} setPhoneNumber - State action pour définir le numéro de téléphone,si nul la version non contrôlée est utilisée
 * @param {boolean} required - Indique si l'input est obligatoire
 */
export default function PhoneNumberTextField({ phoneNumber, setPhoneNumber, index, required }: Props) {
    //State du status de l'erreur sur le numéro de téléphone
    const [phoneErrorStatus, setPhoneErrorStatus] = useState<boolean>(false)
    //State du message de l'erreur sur le numéro de téléphone
    const [phoneErrorMessage, setPhoneErrorMessage] = useState<string | null>(null)

    return (
        setPhoneNumber ?
            <TextField
                fullWidth
                required={required}
                id={index === 0 ? "phone-number" : ("phone-number-" + index)}
                label={index === 0 ? "Numéro de téléphone" : ("Numéro de téléphone " + index)}
                name={index === 0 ? "phoneNumber" : ("phoneNumber-" + index)}
                autoComplete={index === 0 ? "phone-number" : ("phone-number-" + index)}
                value={phoneNumber ? phoneNumber : ''}
                error={phoneErrorStatus}
                helperText={phoneErrorMessage}
                onChange={(event) => {
                    const phoneNumber = event.target.value.trim();
                    setPhoneErrorStatus(false)
                    if (phoneNumber.length >= 10 && phoneNumber.length <= 16) {
                        setPhoneErrorMessage(null);
                        setPhoneErrorStatus(false);
                        setPhoneNumber(phoneNumber)
                        return
                    } else {
                        setPhoneErrorMessage("Le numéro de téléphone doit contenir entre 10 et 16 caractères");
                        setPhoneErrorStatus(true);
                        return
                    }
                }}
            /> :
            <TextField
                fullWidth
                required={required}
                id={index === 0 ? "phone-number" : ("phone-number-" + index)}
                label={index === 0 ? "Numéro de téléphone" : ("Numéro de téléphone " + index)}
                name={index === 0 ? "phoneNumber" : ("phoneNumber-" + index)}
                autoComplete={index === 0 ? "phone-number" : ("phone-number-" + index)}
                defaultValue={phoneNumber}
                error={phoneErrorStatus}
                helperText={phoneErrorMessage}
                onChange={(event) => {
                    const phoneNumber = event.target.value.trim();
                    setPhoneErrorStatus(false)
                    if (phoneNumber.length >= 10 && phoneNumber.length <= 16) {
                        setPhoneErrorMessage(null);
                        setPhoneErrorStatus(false);

                    } else {
                        setPhoneErrorMessage("Le numéro de téléphone doit contenir entre 10 et 16 caractères");
                        setPhoneErrorStatus(true);
                        return
                    }
                }}
            />
    )
}