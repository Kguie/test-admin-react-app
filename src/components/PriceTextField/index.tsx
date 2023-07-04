/**
 * Gestion du Component PriceTextField
 **/

import React from "react";
import { Grid, TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useState } from "react";

type Props = {
    price: number | null,
    setPrice: React.Dispatch<React.SetStateAction<number | null>> | null,
    setChanged: React.Dispatch<React.SetStateAction<boolean>> | null
}

type CustomProps = {
    onChange: (event: { target: { value: string } }) => void;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator={" "}
                valueIsNumericString
                prefix="€"
            />
        );
    },
);

/**
 * Gestion de l'input pour l'ajout de le prix ,avec une version contrôlée
 * @param {string | null} price Valeur du prix
 * @param {React.Dispatch<React.SetStateAction<string|null>>|null} setPrice State action pour désigner la valeur de price,peut être nul 
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setChanged State action pour désigner le status de changed 
 */
export default function PriceTextField({ price, setPrice, setChanged }: Props) {
    //State du status de l'erreur sur le prix
    const [priceErrorStatus, setPriceErrorStatus] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceErrorStatus(false)
        setChanged && setChanged(true)
        if (parseFloat(event.target.value) < 0) {
            setPriceErrorStatus(true)
        }
        setPrice && setPrice(parseFloat(event.target.value))
    };

    return (
        <Grid>
            {setPrice ?
                <TextField
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    value={price ? price : 0}
                    id="price"
                    label="Prix"
                    name="price"
                    error={priceErrorStatus}
                    helperText={priceErrorStatus && "Veuillez entrer un nombre non nul"}
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                    onChange={handleChange}
                /> :
                <TextField
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    defaultValue={price}
                    id="price"
                    label="Prix"
                    name="price"
                    error={priceErrorStatus}
                    helperText={priceErrorStatus && "Veuillez entrer un nombre non nul"}
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                    onChange={handleChange}
                />}
        </Grid>
    )
}