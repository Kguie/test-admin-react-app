/**
 * Gestion du component de l'entrée de l'émail
 **/

import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { emailIsValid } from "../../utils/utils";
import { reset } from "../../features/alertSnackbar";



type Props = {
    email: string | null
    setEmail: React.Dispatch<React.SetStateAction<string | null>> | null,
    required: boolean
}

/**
 * Gestion de l'input pour l'ajout de l'émail avec une version contrôlée et l'autre non
 * @param {string | null} email - Valeur de l'émail
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setEmail - State action pour désigner la valeur de email,peut être nul
 * @param {boolean} required - Indique si le champ est obligatoire ou non
 */
export default function EmailTextField({ email, setEmail, required }: Props) {
    const dispatch = useDispatch()

    //State du status de l'erreur sur le nom 
    const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false)

    //State du status de l'erreur sur le nom 
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null)

    return (
        //Input contrôlé
        <Grid>
            {setEmail ?
                <TextField
                    autoComplete={"email"}
                    name={"email"}
                    value={email ? email : ""}
                    required={required}
                    fullWidth
                    id={'email'}
                    label={'Adresse électronique'}
                    autoFocus
                    error={emailErrorStatus}
                    helperText={emailErrorMessage}
                    onChange={(event) => {
                        dispatch(reset)
                        const test = emailIsValid(event.target.value.trim());
                        setEmailErrorMessage(null);
                        setEmailErrorStatus(false)
                        setEmail(event.target.value)
                        if (test === true) {
                            setEmailErrorMessage(null);
                            setEmailErrorStatus(false);
                        } else {
                            setEmailErrorMessage(test);
                            setEmailErrorStatus(true);

                        }
                    }}
                /> :
                <TextField
                    autoComplete={"email"}
                    name={"email"}
                    defaultValue={email}
                    required={required}
                    fullWidth
                    id={'email'}
                    label={'Adresse électronique'}
                    autoFocus
                    error={emailErrorStatus}
                    helperText={emailErrorMessage}
                    onChange={(event) => {
                        dispatch(reset)
                        const test = emailIsValid(event.target.value.trim());
                        setEmailErrorMessage(null);
                        setEmailErrorStatus(false)
                        if (test === true) {
                            setEmailErrorMessage(null);
                            setEmailErrorStatus(false);

                        } else {
                            setEmailErrorMessage(test);
                            setEmailErrorStatus(true);

                        }
                    }}
                />}
        </Grid>
    )
}