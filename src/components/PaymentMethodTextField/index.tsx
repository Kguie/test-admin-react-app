/**
 * Gestion du component de l'entrée de la Méthode de paiement
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    paymentMethod: string | null,
    setPaymentMethod: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour l'ajout de la description de la patisserie
 * @param {string | null} paymentMethod Description de la patisserie ,peut être nulle
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setPaymentMethod State action pour désigner la valeur de paymentMethod,peut être nul 
 */
export default function PaymentMethodTextField({ paymentMethod, setPaymentMethod }: Props) {
    //State du status de l'erreur 
    const [paymentMethodErrorStatus, setPaymentMethodErrorStatus] = useState<boolean>(false)


    return (
        <Grid>
            {setPaymentMethod ?
                <TextField
                    autoComplete="payment-method"
                    value={paymentMethod ? paymentMethod : ""}
                    name="paymentMethod"
                    fullWidth
                    id="payment-method"
                    label="Correction de la méthode de paiement"
                    autoFocus
                    error={paymentMethodErrorStatus}
                    helperText={paymentMethodErrorStatus && "Veuillez entrer la liste des méthode de paiement utilisées"}
                    onChange={(event) => {
                        setPaymentMethod(event.target.value)
                    }}
                /> :
                <TextField
                    autoComplete="payment-method"
                    defaultValue={paymentMethod}
                    name="paymentMethod"
                    fullWidth
                    id="payment-method"
                    label="Correction de la méthode de paiement"
                    autoFocus
                    error={paymentMethodErrorStatus}
                    helperText={paymentMethodErrorStatus && "Veuillez entrer la liste des méthode de paiement utilisées"}
                    onChange={(event) => {
                        const test = event.target.value.trim().length;
                        setPaymentMethodErrorStatus(false)
                        if (test === 0) {
                            setPaymentMethodErrorStatus(true);
                            return
                        }
                    }}
                />}

        </Grid>)
}