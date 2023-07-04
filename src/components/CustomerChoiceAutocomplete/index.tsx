/**
 * Gestion du component CustomerChoiceAutocomplete
 **/

import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";

type Props = {
    customer: any,
    setCustomer: React.Dispatch<React.SetStateAction<any>>,
    data: any,
    isLoading: boolean
}

/**
 * Component qui permet de choisir un client avec un input de type autocomplete
 * @param {Object | null} Customer Object avec les données du client quand un client est sélectionné
 * @param {React.Dispatch<React.SetStateAction<Object|null>>} SetCustomer State action pour définir l'objet Customer
 * @param {object} data Données de tous les clients
 *  @param {boolean} isLoading Affiche l'état du chargement
 */
export default function CustomerChoiceAutocomplete({ customer, setCustomer, data, isLoading }: Props) {

    return (<Grid>
        {isLoading ? <Skeleton data-testid='skeleton' variant='rectangular' width={"100%"} height={"20px"} /> :
            <Autocomplete
                blurOnSelect
                data-testid="customer-choice"
                value={customer}
                getOptionLabel={(option: any) => option.name && (option.name.lastName + " " + option.name.firstName)}
                options={data}
                onChange={(event: any, newValue: any) => {
                    setCustomer(newValue);
                }}
                sx={{ marginTop: '20px', marginBottom: '20px', }}
                renderInput={(params: any) => (
                    <TextField {...params} label="Veuillez sélectionner un client, ou le rajouter si il n'est pas présent sur la liste" variant="standard" required />
                )}
            />}
    </Grid>)
}