/**
 * Gestion du component de l'entrée de l'évènement
 **/

import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    event: string | null
    setEvent: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour l'ajout de l'évènement
 * @param {string|null} event State de l'évènement
 * @param {React.Dispatch<React.SetStateAction<string | null>>|null} setEvent State action pour définir event,si nulle version non contrôlée
 */
export default function EventTextField({ event, setEvent }: Props) {
    //State du status de l'erreur sur l'évènement
    const [eventErrorStatus, setEventErrorStatus] = useState<boolean>(false)

    return (setEvent ? <TextField
        autoComplete="event"
        name="event"
        value={event ? event : ''}
        required
        fullWidth
        id="event"
        label="Évènement"
        autoFocus
        error={eventErrorStatus}
        helperText={eventErrorStatus && "Veuillez ne pas dépasser 50 caractères"}
        onChange={(event) => {
            const eventName = event.target.value
            const test = eventName.trim().length;
            setEventErrorStatus(false)
            if (test <= 50 && test > 0) {
                setEvent(eventName);
                return
            } else {
                setEventErrorStatus(true);
                return
            }
        }}
    /> :
        <TextField
            autoComplete="event"
            name="event"
            defaultValue={event && event}
            required
            fullWidth
            id="event"
            label="Évènement"
            autoFocus
            error={eventErrorStatus}
            helperText={eventErrorStatus && "Veuillez ne pas dépasser 50 caractères"}
            onChange={(event) => {
                const eventName = event.target.value.trim()
                const test = eventName.length;
                setEventErrorStatus(false)
                if (test > 50 && test === 0) {
                    setEventErrorStatus(true);
                    return
                }
            }}
        />
    )
}