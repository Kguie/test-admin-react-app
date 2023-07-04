/**
 * Gestion du component tableau de données
 **/
import {
    Typography,
    Skeleton,
    Box,
    Paper,
    Toolbar,
    TableContainer,
} from '@mui/material';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type Props = {
    title: string,
    subTitle: string,
    rows: [],
    columns: GridColDef[],
    isLoading: boolean,
    onRowClickSet: Function
}

/**
 * Affiche les tableau de données
 * @param {string} title - Titre du tableau
 * @param {string} subtitle - Sous-titre du tableau
 * @param {Array<any>} rows - Contenu dd'une ligne du tableau correspondant à un item
 * @param {GridColDef[]} columns - Catégories du tableau correspondant à une colonne
 * @param {boolean} isLoading - Détermine si le chargement est en cours ou non
 * @param {Function} onRowClickSet - Function qui va démarrer au clic sur une ligne du tableau  
 */
export default function DataTable({ title, subTitle, rows, columns, isLoading, onRowClickSet }: Props) {
    const navigate: NavigateFunction = useNavigate()
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 10, }} >

                {/* Titre du tableau */}
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        marginBottom: "30px"
                    }}
                >
                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box display={"flex"} flexDirection={"column"} >
                            {isLoading ? <Skeleton data-testid="skeleton" variant="text" width={"12ch"} sx={{ fontSize: '28px' }} />
                                : <Typography id="tableTitle" textTransform={"uppercase"} fontFamily={"lemonade"} component='h2' variant='h2' fontSize={22} fontWeight={800}   >
                                    {title} :
                                </Typography>}

                            {isLoading ? <Skeleton variant="text" width={"20ch"} sx={{ fontSize: '18px' }} />
                                : <Typography fontSize={14} fontStyle={"italic"}    >
                                    {subTitle}
                                </Typography>}
                        </Box>
                    </Box>
                </Toolbar>
                <TableContainer sx={{ height: "60vh" }} >
                    {isLoading ? <Skeleton sx={{ margin: "auto" }} variant="rectangular" width={"98%"} height={"40vh"} />
                        :
                        <DataGrid
                            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            isRowSelectable={() => false}
                            columns={columns}
                            onRowClick={(row) => {
                                // const id = row.id
                                // navigate(`${id}`)                               
                                onRowClickSet(row.row, navigate)
                            }}
                            autoPageSize={true}
                            sx={{ cursor: "pointer" }}
                        />}
                </TableContainer>
            </Paper>
        </Box >
    );
}