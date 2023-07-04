/**
 * Gestion du component de l'entrée de la quantité
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    quantity: number | null,
    setQuantity: React.Dispatch<React.SetStateAction<number | null>> | null,
    setChanged: React.Dispatch<React.SetStateAction<boolean>> | null
}

/**
 * Gestion de l'input pour l'ajout de la quantité avec une version contrôlée et l'autre non
 * @param {number | null} quantity Valeur du nombre de patisserie désiré
 * @param {React.Dispatch<React.SetStateAction<number|null>>|null} setPastrySize State action pour désigner la valeur de pastrySize,peut être nul 
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setChanged State action pour désigner le status de changed 
 */
export default function QuantityTextField({ quantity, setQuantity, setChanged }: Props) {
    //State du status de l'erreur sur la quantité
    const [quantityErrorStatus, setQuantityErrorStatus] = useState<boolean>(false)

    return (
        <Grid>
            {setQuantity ?
                <TextField
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    value={quantity ? quantity : 0}
                    id="add-outlined-number-quantity"
                    label="Quantité"
                    name="quantity"
                    error={quantityErrorStatus}
                    helperText={quantityErrorStatus && "Veuillez entrer un nombre non nul"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        setQuantityErrorStatus(false)
                        const test = parseInt(event.target.value)
                        if (!test || test <= 0) {
                            setQuantityErrorStatus(true)
                            return
                        }
                        setQuantity(test)
                        return
                    }}
                /> :
                <TextField
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    defaultValue={quantity}
                    id="add-outlined-number-quantity"
                    label="Quantité"
                    name="quantity"
                    error={quantityErrorStatus}
                    helperText={quantityErrorStatus && "Veuillez entrer un nombre non nul"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        setQuantityErrorStatus(false)
                        const test = parseInt(event.target.value)
                        if (!test || test <= 0) {
                            setQuantityErrorStatus(true)
                            return
                        }
                        return
                    }}
                />}
        </Grid>)
}