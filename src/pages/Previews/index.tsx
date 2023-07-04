/**
 * Component qui présente un tableau de cartes pour avoir les informations importantes rapidement
 **/

import { Backdrop, Grid, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCardIcon from '@mui/icons-material/AddCard';
import { PersonAddAlt } from '@mui/icons-material';

import OrdersCard from "../../components/OrdersCard";
import { useNavigate } from "react-router-dom";

export default function Previews() {
    const navigate = useNavigate()

    //State de l'ouverture du backdrop et du speedDial
    const [openBackDrop, setOpenBackDrop] = useState(false);

    //Actions du speedDial    
    const actions = [
        { icon: <PersonAddIcon />, name: 'Ajouter un utilisateur', key: "addUser", onclick: () => navigate("users/new") },
        { icon: <PersonAddAlt />, name: 'Ajouter un client', key: "addCustomer", onclick: () => navigate("customers/new") },
        { icon: <AddCardIcon />, name: 'Ajouter une commande', key: "addOrder", onclick: () => navigate("orders/new") }
    ];

    return (
        <Grid sx={{ paddingBottom: { xs: "300px", md: "50px" } }}>
            <Grid container spacing={3} maxWidth={"lg"} position={"relative"} >
                {/* Orders */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '40vh',
                        }}
                    >
                        <OrdersCard />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12} minWidth={500} >
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: "15vh" }}>

                    </Paper>
                </Grid>
                <Backdrop open={openBackDrop} />
                <SpeedDial
                    ariaLabel="SpeedDial"
                    icon={<SpeedDialIcon />}
                    sx={{ position: 'absolute', bottom: -70, right: 10 }}
                    onClose={() => setOpenBackDrop(false)}
                    onOpen={() => setOpenBackDrop(true)}
                    open={openBackDrop}
                >{actions.map((action) => (
                    <SpeedDialAction
                        key={action.key}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onclick}
                    />
                ))}
                </SpeedDial>
            </Grid>
        </Grid>
    )
}