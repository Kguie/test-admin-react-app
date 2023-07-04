/**
 * Gestion du component EncounterWayFormControl
 **/

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type Props = {
    encounterWay: string | null,
    setEncounterWay: React.Dispatch<React.SetStateAction<string | null>> | null
};

/**
 * Formulaire de type radio pour sélectionner la manière dont l'utilisateur a entendu parlé de nous,a vec une version contrôlée et l'autre non
 * @param {boolean} encounterWay - Définit la valeur sélectionnée, peut être nul
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setEncounterWay - State action pour définir encounterWay, est nul si input non contrôlé
 */
export default function EncounterWayFormControl({ encounterWay, setEncounterWay }: Props) {
    return (
        <FormControl fullWidth>
            <FormLabel id="encounterWay">Comment avez vous entendu parler de nous?</FormLabel>
            {setEncounterWay ?
                // Version contrôlée
                <RadioGroup
                    row
                    aria-labelledby="comment avez vous entendu parler de nous"
                    name="encounterWay"
                    sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" } }}
                    value={encounterWay}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEncounterWay(event.target.value)}
                >
                    <FormControlLabel value="instagram" control={<Radio />} label="Instagram" />
                    <FormControlLabel value="Bouche à oreille" control={<Radio />} label="Bouche à oreille" />
                    <FormControlLabel value="Un de nos clients" control={<Radio />} label="Un de nos clients" />
                    <FormControlLabel value="autre" control={<Radio />} label="autre" />
                </RadioGroup> :
                <RadioGroup
                    row
                    aria-labelledby="comment avez vous entendu parler de nous"
                    name="encounterWay"
                    sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" } }}
                    defaultValue={encounterWay}
                >
                    <FormControlLabel value="instagram" control={<Radio />} label="Instagram" />
                    <FormControlLabel value="Bouche à oreille" control={<Radio />} label="Bouche à oreille" />
                    <FormControlLabel value="Un de nos clients" control={<Radio />} label="Un de nos clients" />
                    <FormControlLabel value="autre" control={<Radio />} label="autre" />
                </RadioGroup>}
        </FormControl>
    )
}