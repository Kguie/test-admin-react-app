/**
 * Gestion du component PayBackStatusSelect
 **/
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    paybackStatus: string,
    setPaybackStatus: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Gestion du sélecteur du status du remboursement
 * @param {string} paybackStatus Affiche la valeur du status du remboursement
 * @param {React.Dispatch<React.SetStateAction<string>>} setPaybackStatus State action pour définir le status du remboursement
 */
export default function PayBackStatusSelect({ paybackStatus, setPaybackStatus }: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        setPaybackStatus(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="payback-status-select">Status du remboursement</InputLabel>
                <Select
                    labelId="payback-status-select"
                    id="payback-status-select"
                    value={paybackStatus}
                    label="Status du remboursement"
                    onChange={handleChange}
                    required
                >
                    <MenuItem value='non demandé'>Non demandé</MenuItem>
                    <MenuItem value='demandé'>Demandé</MenuItem>
                    <MenuItem value='accepté'>Accepté</MenuItem>
                    <MenuItem value='effectué'>Effectué</MenuItem>
                    <MenuItem value='refusé'>Refusé</MenuItem>
                    <MenuItem value='annulé'>Annulé</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}