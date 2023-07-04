/**
 * Component RequestList 
 **/

import { Grid, List, ListItem, Paper, Typography } from "@mui/material"

type Props = {
    requestList: Array<any>,
    setPastryObject: React.Dispatch<React.SetStateAction<any>>,
    setOpenDialogModifyRequest: React.Dispatch<React.SetStateAction<boolean>>,
}

/**
 * Affiche les requêtes présentes dans l'array sous forme de liste
 * @param {Array<any>} requestList - State de l'Array de requêtes
 * @param {React.Dispatch<React.SetStateAction<Object|null>>} setPastryObject - State Action pour définir l'objet pastryObject
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialogModifyRequest - State Action pour définir le status du dialogue openDialogModifyRequest
 */
export default function RequestList({ requestList, setPastryObject, setOpenDialogModifyRequest }: Props) {
    return (
        <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', gap: "15px", display: 'flex', flexDirection: 'column' }}>
            {
                requestList.map((request: any, index: number) => (
                    <Paper
                        key={"request" + index}
                        elevation={3}

                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItem
                            key={"request" + index}
                            onClick={() => {
                                const pastry = {
                                    key: "request" + index,
                                    description: request.pastryDescription,
                                    size: request.size,
                                    quantity: request.quantity,
                                    services: request.services
                                }
                                setPastryObject(pastry)
                                setOpenDialogModifyRequest(true)
                            }}
                        >
                            <Grid container display={'flex'} flexDirection={'column'} gap={"10px"}>
                                <Grid item>
                                    <Typography color={"text.secondary"}
                                        sx={{ fontSize: { xs: 17, md: 20 } }}>
                                        {request.pastryDescription}
                                    </Typography>
                                </Grid>
                                {request.services &&
                                    <Grid display={'flex'} flexWrap={'wrap'} flexDirection={'row'} gap={'10px'} sx={{ fontSize: { xs: 17, md: 20 } }} item>
                                        <Typography fontWeight={900}>Services :</Typography>
                                        <Typography color={"text.secondary"}>{request.services}</Typography>
                                    </Grid>}
                                <Grid container display={'flex'} gap={"5px"} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <Grid item xs={5} display={'flex'} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                                        <Typography fontWeight={900}>Parts :</Typography>
                                        <Typography color={"text.secondary"}>{request.size}</Typography>
                                    </Grid>
                                    <Grid display={'flex'} item xs={5} flexDirection={'row'} sx={{ fontSize: { xs: 17, md: 20 } }}>
                                        <Typography fontWeight={900}>Quantité :</Typography>
                                        <Typography color={"text.secondary"}>{request.quantity}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Paper>
                ))
            }
        </List>
    )
}