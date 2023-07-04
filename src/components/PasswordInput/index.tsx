/**
 * Gestion du component de l'entrée du nom 
 **/

import { Visibility } from "@mui/icons-material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

import { passwordIsValid } from "../../utils/utils";

type Props = {
    password: string | null,
    setPassword: React.Dispatch<React.SetStateAction<string | null>>,
    type: string,
}

/**
 * Gestion de l'input de manière contrôlée pour l'ajout du mot de passe 
 * @param {string | null} password - Valeur du mot de passe
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setPassword - State action pour désigner la valeur du mot de passe,peut être nul
 * @param {string} type - Indique quel type d'entrée est utilisé,peut être un mot de passe de connection, de vérification ou de création de nouvel utilisateur
 */
export default function PasswordInput({ password, setPassword, type }: Props) {
    //State du texte d'information du mot de passe
    const [passwordInfo, setPasswordInfo] = useState<string | null>(null)

    //State de l'affichage du mot de passe
    const [showPassword, setShowPassword] = useState<boolean>(false)

    //State du status d'erreur
    const [errorStatus, setErrorStatus] = useState<boolean>(false)

    /***
     * Fonction qui permet de définir les caractéristiques de l'input
     * @return {object} Retourne un objet avec l'id,le nom, le label et la valeur autocomplete en fonction du type choisi
     */
    function selectType(passwordType: string) {
        if (passwordType === 'newPassword') {
            return ({ id: 'password', name: 'password', label: 'Mot de passe', autoComplete: 'new-password' })
        }
        if (passwordType === 'verificationPassword') {
            return ({ id: 'verification-password', name: 'VerificationPassword', label: 'Confirmer votre mot de passe', autoComplete: 'verification-password' })
        }
        else {
            return ({ id: 'password', name: 'password', label: 'Mot de passe', autoComplete: 'current-password' })
        }
    }



    return (

        <Grid>
            {type === "verificationPassword" && <Typography>Veuillez confirmer votre mot de passe:</Typography>}

            <FormControl margin='normal' fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mot de passe*</InputLabel>
                <OutlinedInput
                    id={selectType(type).id}
                    data-testid="password-input"
                    name={selectType(type).name}
                    value={password ? password : ""}
                    fullWidth
                    label={selectType(type).label}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={selectType(type).autoComplete}
                    onChange={(event) => {
                        if (type === "newPassword") {
                            const test = passwordIsValid(event.target.value);
                            setPasswordInfo(null)
                            setErrorStatus(false)
                            setPassword(event.target.value)
                            if (test === "weak") {
                                setPasswordInfo("Le mot de passe utilisé est trop faible,Veuillez privilégier un mot de passe avec au moins une majuscule, une minuscule ,un caractère spécial et une longueur de 8 à 30 caractères");
                                setErrorStatus(true);
                            }
                            if (test === "medium") {
                                setPasswordInfo("Mot de passe moyen")
                                setErrorStatus(false);
                            }
                            if (test === "strong") {
                                setPasswordInfo("Mot de passe fort")
                                setErrorStatus(false);
                            }
                            else {
                                setPasswordInfo(test);
                                setErrorStatus(true);
                            }
                        } else {
                            setPassword(event.target.value)
                        }
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffIcon /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            {/* Section d'affichage du message d'information pour l'entrée d'un nouveau mot de passe */}
            {passwordInfo && type === "newPassword" &&
                <Grid marginTop="10px">
                    {passwordInfo === "Mot de passe fort" &&
                        <Alert data-testid='green-info' severity="success">
                            {passwordInfo}
                        </Alert>
                    }
                    {passwordInfo === "medium" &&
                        <Alert data-testid='yellow-info' severity="warning">
                            Mot de passe moyen ,veuillez privilégier un mot de passe avec au moins une majuscule, une minuscule ,un caractère spécial et une longueur de 8 à 30 caractères<br />Exemple: monMotDePasse!01
                        </Alert>
                    }
                    {errorStatus && !(passwordInfo === "strong" || passwordInfo === "medium") &&
                        <Alert data-testid='red-info' severity="error">
                            {passwordInfo === "weak" ? (
                                "Mot de passe faible ,veuillez privilégier un mot de passe avec au moins une majuscule, une minuscule ,un caractère spécial et une longueur de 8 à 30 caractères Exemple: monMotDePasse!01") :
                                passwordInfo}
                        </Alert>
                    }
                </Grid>}
        </Grid>
    )
}