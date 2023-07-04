/**
 * Gestion du component de l'entrée de la description de la pâtisserie
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    pastryDescription: string | null,
    setPastryDescription: React.Dispatch<React.SetStateAction<string | null>> | null
    setChanged: React.Dispatch<React.SetStateAction<boolean>> | null
    required: boolean
}

/**
 * Gestion de l'input pour l'ajout de la description de la patisserie
 * @param {string | null} pastryDescription Description de la patisserie ,peut être nulle
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setChanged State action pour désigner le status de changed,peut être nul
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setPastryDescription State action pour désigner la valeur de pastryDescription,peut être nul 
 * @param {boolean} required Définit si l'input est obligatoire
 */
export default function PastryDescriptionTextField({ pastryDescription, setPastryDescription, setChanged, required }: Props) {
    //State du status de l'erreur sur la description de la patisserie
    const [pastryDescriptionErrorStatus, setPastryDescriptionErrorStatus] = useState<boolean>(false)


    return (
        <Grid>
            {setPastryDescription ?
                <TextField
                    autoComplete="pastryDescription"
                    value={pastryDescription ? pastryDescription : ""}
                    name="pastryDescription"
                    required={required}
                    fullWidth
                    multiline
                    maxRows={5}
                    id="pastry-description"
                    label="Description de la patisserie"
                    autoFocus
                    error={pastryDescriptionErrorStatus}
                    helperText={pastryDescriptionErrorStatus && "Veuillez entrer une description"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        const test = event.target.value.trim().length;
                        setPastryDescriptionErrorStatus(false)
                        if (test === 0 && required) {
                            setPastryDescriptionErrorStatus(true);
                            return
                        } else {
                            setPastryDescription(event.target.value)
                            setPastryDescriptionErrorStatus(false);
                            return
                        }
                    }}
                /> :
                <TextField
                    autoComplete="pastryDescription"
                    defaultValue={pastryDescription}
                    name="pastryDescription"
                    required={required}
                    fullWidth
                    multiline
                    maxRows={5}
                    id="pastry-description"
                    label="Description de la patisserie"
                    autoFocus
                    error={pastryDescriptionErrorStatus}
                    helperText={pastryDescriptionErrorStatus && "Veuillez entrer une description"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        const test = event.target.value.length;
                        setPastryDescriptionErrorStatus(false)
                        if (test === 0 && required) {
                            setPastryDescriptionErrorStatus(true);
                            return
                        } else {
                            setPastryDescriptionErrorStatus(false);
                            return
                        }
                    }}
                />}

        </Grid>)
}