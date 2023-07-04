/**
 * Gestion du component PaymentMethodSelect
 **/
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Props = {
    paymentMethod: string,
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Gestion du sélecteur de méthode de paiement 
 * @param {string} paymentMethod Affiche la valeur de la méthode de paiement
 * @param {React.Dispatch<React.SetStateAction<string>>} setPaymentMethod State action pour définir payment method 
 */
export default function PaymentMethodSelect({ paymentMethod, setPaymentMethod }: Props) {

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="payment-method-select">Méthode de paiement</InputLabel>
                <Select
                    labelId="payment-method-select"
                    id="payment-method-select"
                    value={paymentMethod}
                    label="Méthode de paiement"
                    required
                    onChange={(event) => {
                        setPaymentMethod(event.target.value)
                    }}
                >
                    <MenuItem value='Espèces'>Espèces</MenuItem>
                    <MenuItem value='Carte bancaire'>Carte bancaire</MenuItem>
                    <MenuItem value='Paylib'>Paylib</MenuItem>
                    <MenuItem value='Paypal'>Paypal</MenuItem>
                    <MenuItem value='Virement'>Virement</MenuItem>
                    <MenuItem value='Chèque'>Chèque</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}