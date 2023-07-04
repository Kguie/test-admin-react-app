/**
 * Gestion  de la page Home
 **/

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import LeftMenu from '../../components/LeftMenu';
import { DashBoardRouter } from '../../utils/router';
import CustomizedSnackBar from '../../components/CustomizedSnackbar';

/**
 *Affiche la partie centrale de l'application avec le menu et qui permet l'affichage des autres components avec un router supplémentaire
 */
function Home() {

    return (
        <Box position="relative" sx={{ display: 'flex' }} minHeight={"95vh"} >
            <CssBaseline />
            <LeftMenu />
            <Box
                component="main"
                paddingTop={"50px"}
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    minHeight: "80vh",
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <DashBoardRouter />
                </Container>
            </Box>
            <CustomizedSnackBar />
        </Box>

    );
}

export default function Dashboard() {
    return <Home />;
}