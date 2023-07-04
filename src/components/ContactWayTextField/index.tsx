/**
 * Gestion du component de l'entrée du moyen de contact
 **/

import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    contactWay: string | null
    setContactWay: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour l'ajout du moyen de contact avec une version contrôlée et l'autre non
 * @param {string|null} contactWay State du moyen de contact utilisé
 * @param {React.Dispatch<React.SetStateAction<string | null>>|null} setContactWay State action pour définir contactWay,si nul version non contrôlée
 */
export default function ContactWayTextField({ contactWay, setContactWay }: Props) {
    //State du status de l'erreur sur moyen de contact
    const [contactWayErrorStatus, setContactWayErrorStatus] = useState<boolean>(false)
    //State du message de l'erreur sur moyen de contact
    const [contactWayErrorMessage, setContactWayErrorMessage] = useState<string | null>(null)

    return (
        setContactWay ?
            <TextField
                autoComplete="contact-way"
                name="contactWay"
                value={contactWay ? contactWay : ''}
                required
                fullWidth
                id="contact-way"
                label="Moyen de contact utilisé"
                autoFocus
                error={contactWayErrorStatus}
                helperText={contactWayErrorMessage}
                onChange={(event) => {
                    const contactWay = event.target.value
                    const test = contactWay.trim().length;
                    setContactWayErrorStatus(false)
                    if (test === 0) {
                        setContactWayErrorStatus(true);
                        setContactWayErrorMessage("Veuillez entrer le moyen utilisé par le client pour passer sa commande")
                        return
                    }
                    if (test <= 40) {
                        setContactWay(contactWay)
                        return
                    }
                    else {
                        setContactWayErrorStatus(true);
                        setContactWayErrorMessage("Veuillez ne pas dépasser 40 caractères")
                        return
                    }
                }}
            /> :
            <TextField
                autoComplete="contact-way"
                name="contactWay"
                defaultValue={contactWay && contactWay}
                required
                fullWidth
                id="contact-way"
                label="Moyen de contact utilisé"
                autoFocus
                error={contactWayErrorStatus}
                helperText={contactWayErrorMessage}
                onChange={(event) => {
                    const contactWay = event.target.value.trim()
                    const test = contactWay.length;
                    setContactWayErrorStatus(false)
                    if (test === 0) {
                        setContactWayErrorStatus(true);
                        setContactWayErrorMessage("Veuillez entrer le moyen utilisé par le client pour passer sa commande")
                        return
                    }
                    if (test > 40) {
                        setContactWayErrorStatus(true);
                        setContactWayErrorMessage("Veuillez ne pas dépasser 40 caractères")
                        return
                    }
                }}
            />
    )
}