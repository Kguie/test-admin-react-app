/**
 * Gestion du component Dense table qui est un tableau dense
 **/

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../../utils/utils';

type Props = {
    type: string,
    rows: Array<any>,
    setRows: React.Dispatch<React.SetStateAction<Array<any>>> | null,
    setName: React.Dispatch<React.SetStateAction<string | null>> | null,
    setId: React.Dispatch<React.SetStateAction<string | null>> | null,
    setDescription: React.Dispatch<React.SetStateAction<string | null>> | null,
    setPrice: React.Dispatch<React.SetStateAction<number | null>> | null,
    rowSelected: any,
    setRowSelected: React.Dispatch<React.SetStateAction<any>> | null,
}

/**
 * Affiche un tableau dense pour la construction du devis
 * @param {string} type - Détermine le type de données dans le tableau ,peut être un tableau de services ou de pastries
 * @param {Array<any>} rows - Array avec les données de chaque élément du tableau
 * @param {React.Dispatch<React.SetStateAction<Array<any>>>|null} setRows - State action pour modifier le contenu de rows,si il est nul le tableau est non modifiable
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setName - State action pour modifier le contenu de l'objet name,si il est nul le tableau est non modifiable
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setId - State action pour modifier le contenu de l'objet Id,si il est nul le tableau est non modifiable
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setDescription - State action pour modifier le contenu de l'objet description,si il est nul le tableau est non modifiable
 * @param {React.Dispatch<React.SetStateAction<number|null>>} setPrice - State action pour modifier le contenu de l'objet price,si il est nul le tableau est non modifiable
 * @param {any} rowSelected - Définit si une ligne est sélectionné
 * @param {React.Dispatch<React.SetStateAction<any>>|null} setRowSelected - State action pour désigner le status de rowSelected,si il est nul le tableau est non modifiable
 */
export default function QuotationDenseTable({ type, rows, setRows, setName, setDescription, setPrice, setId, rowSelected, setRowSelected }: Props) {

    /**
     * Permet la suppression d'une ligne de tableau  en modifiant la liste rows
     */
    function handleDeleteRow() {
        if (!rowSelected) {
            return
        }
        //Le tableau est modifiable
        if (setRows) {
            const newList = rows.filter((row: any) => row !== rowSelected)
            setRows(newList)
            setRowSelected && setRowSelected(null)
            setName && setName(null)
            setDescription && setDescription(null)
            setPrice && setPrice(null)
            return
        }
    }

    /**
     * Renvoie le type et la clé selon la catégorie sélectionnée
     * @param {string} type Catégorie des données
     * @return {string} titre du tableau
     */
    function selectTitle(type: string) {
        if (type === 'pastry') {
            return 'Patisseries'
        } if (type === 'service') {
            return 'Services'
        }
        if (type === 'quotation') {
            return 'Devis'
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 'lg', margin: 'auto' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h4"
                        id="tableTitle"
                    >
                        {selectTitle(type)}
                    </Typography>
                    {type !== 'quotation' && rowSelected && rowSelected.name !== 'Livraison' &&
                        <IconButton onClick={handleDeleteRow} size='small'>
                            <DeleteIcon fontSize='small' />
                        </IconButton>}

                </Toolbar>
                <TableContainer >
                    <Table sx={{ padding: '5px' }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {(type === 'pastry' || type === 'service') && <TableCell >Nom</TableCell>}
                                {(type === 'pastry' || type === 'service') && <TableCell align="left">Description</TableCell>}
                                {type === 'quotation' && <TableCell align="left">id</TableCell>}
                                {type === 'quotation' && <TableCell align="left">Date de création</TableCell>}
                                {type === 'pastry' && <TableCell align="left">Options</TableCell>}
                                {type === 'pastry' && <TableCell align="left">Taille</TableCell>}
                                {type === 'pastry' && <TableCell align="left">Quantité</TableCell>}
                                {(type === 'pastry' || type === 'service' || type === 'quotation') && <TableCell align="left">Prix €</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any, index: number) => (
                                <TableRow
                                    onClick={() => {
                                        if (row === rowSelected) {
                                            setRowSelected && setRowSelected(null)
                                            setName && setName(null)
                                            setDescription && setDescription(null)
                                            setPrice && setPrice(null)
                                            setId && setId(null)
                                            return
                                        }
                                        else {
                                            setRowSelected && setRowSelected(row)
                                            setName && setName(row.name)
                                            setDescription && setDescription(row.description)
                                            setPrice && setPrice(row.price)
                                            setId && setId(row._id)
                                            return
                                        }
                                    }}
                                    key={type + index}
                                    sx={{ cursor: 'pointer', backgroundColor: (row === rowSelected) ? '#ffffcc' : '#ffffff', '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {(type === 'pastry' || type === 'service') && <TableCell scope="row">
                                        {type === 'service' ? row.name : row.pastryName}
                                    </TableCell>}
                                    {(type === 'pastry' || type === 'service') && <TableCell align="left">{row.description}</TableCell>}
                                    {type === 'quotation' && <TableCell sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: { xs: '70px', sm: '200px' } }} scope="row">{(row._id)}</TableCell>}
                                    {type === 'quotation' && <TableCell align="left">{row.data && row.data.time && formatDate(row.data.time)}</TableCell>}
                                    {type === 'pastry' && <TableCell align="left">{row.services}</TableCell>}
                                    {type === 'pastry' && <TableCell align="left">{row.size}</TableCell>}
                                    {type === 'pastry' && <TableCell align="left">{row.quantity}</TableCell>}
                                    {(type === 'pastry' || type === 'service' || type === 'quotation') && <TableCell align="left">{type === 'quotation' ? row.finalPrice : row.price}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            </Paper>
        </Box>
    );
}