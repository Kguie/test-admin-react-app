/**
 * Gestion du component de l'entrée du nom 
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

import { nameIsValid } from "../../utils/utils";

type Props = {
    name: string | null
    setName: React.Dispatch<React.SetStateAction<string | null>> | null
    type: string | null
}

/**
 * Gestion de l'input pour l'ajout du nom avec une version contrôlée et l'autre non
 * @param {string | null} name State du nom de patisserie
 * @param {string | null} type précise de quel type de nom ul s'agit
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setName State action pour désigner la valeur de name,peut être nul 
 */
export default function NameTextField({ name, setName, type }: Props) {
    //State du status de l'erreur sur le nom 
    const [nameErrorStatus, setNameErrorStatus] = useState<boolean>(false)
    //State du status de l'erreur sur le nom 
    const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null)

    /***
     * Retourne un objet avec le ,nom,l'id et le label du textfield en fonction du type choisi
     */
    function selectType() {
        if (type === 'service') {
            return ({ name: 'serviceName', label: 'Option', id: 'service-name' })
        }
        if (type === 'pastry') {
            return ({ name: 'pastryName', label: 'Nom de la patisserie', id: 'pastry-name' })
        }
        if (type === 'last') {
            return ({ name: 'lastName', label: 'Nom de famille', id: 'family-name' })
        }
        if (type === 'first') {
            return ({ name: 'firstName', label: 'Prénom', id: 'given-name' })
        } else {
            return ({ name: 'name', label: 'Nom', id: 'name' })
        }
    }

    return (
        //Input contrôlé
        <Grid>
            {setName ?
                <TextField
                    autoComplete={selectType().id}
                    name={selectType().name}
                    data-testid={selectType().name}
                    value={name ? name : ""}
                    required
                    fullWidth
                    id={selectType().id}
                    label={selectType().label}
                    autoFocus
                    error={nameErrorStatus}
                    helperText={nameErrorMessage}
                    onChange={(event) => {
                        const test = nameIsValid(event.target.value.trim());
                        setNameErrorStatus(false)
                        if (test === true) {
                            setNameErrorMessage(null);
                            setNameErrorStatus(false);
                            setName(event.target.value);
                            return
                        } else {
                            setNameErrorMessage(test);
                            setNameErrorStatus(true);
                            return
                        }
                    }}
                /> :
                <TextField
                    autoComplete={selectType().id}
                    name={selectType().name}
                    data-testid={selectType().name}
                    defaultValue={name}
                    required
                    fullWidth
                    id={selectType().id}
                    label={selectType().label}
                    autoFocus
                    error={nameErrorStatus}
                    helperText={nameErrorMessage}
                    onChange={(event) => {
                        const test = nameIsValid(event.target.value.trim());
                        setNameErrorStatus(false)
                        if (test === true) {
                            setNameErrorMessage(null);
                            setNameErrorStatus(false);
                            return
                        } else {
                            setNameErrorMessage(test);
                            setNameErrorStatus(true);
                            return
                        }
                    }}
                />}
        </Grid>
    )
}