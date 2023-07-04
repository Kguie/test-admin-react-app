/**
 * Gestion du component de l'entrée du nombre de parts
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    size: number | null,
    setSize: React.Dispatch<React.SetStateAction<number | null>> | null,
    setChanged: React.Dispatch<React.SetStateAction<boolean>> | null
}

/**
 * Gestion de l'input pour l'ajout de la taille avec une version contrôlée et l'autre non
 * @param {number | null} Size State du nombre de parts de la patisserie, peut être nul
 * @param {React.Dispatch<React.SetStateAction<number|null>>|null} setSize State action pour désigner la valeur de Size,peut être nul 
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setChanged State action pour désigner le status de changed 
 */
export default function SizeTextField({ size, setSize, setChanged }: Props) {
    //State du status de l'erreur sur la taille
    const [sizeErrorStatus, setSizeErrorStatus] = useState<boolean>(false)

    return (
        <Grid>
            {setSize ?
                <TextField
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    value={size ? size : 0}
                    id="add-outlined-number-size"
                    label="Nombre de parts"
                    name="size"
                    error={sizeErrorStatus}
                    helperText={sizeErrorStatus && "Veuillez entrer un nombre non nul"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        setSizeErrorStatus(false)
                        const test = parseInt(event.target.value)
                        if (!test || test <= 0) {
                            setSizeErrorStatus(true)
                            return
                        } else {
                            setSize(test)
                            return
                        }
                    }}
                /> :
                <TextField
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    fullWidth
                    defaultValue={size}
                    id="add-outlined-number-size"
                    label="Nombre de parts"
                    name="size"
                    error={sizeErrorStatus}
                    helperText={sizeErrorStatus && "Veuillez entrer un nombre non nul"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        setSizeErrorStatus(false)
                        const test = parseInt(event.target.value)
                        if (!test || test <= 0) {
                            setSizeErrorStatus(true)
                            return
                        } else {
                            return
                        }
                    }}
                />}
        </Grid>)
}