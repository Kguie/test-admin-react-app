/**
 * Gestion du component Header
 **/
import Container from '@mui/material/Container';
import { Typography, Divider, Grid } from '@mui/material';

import { headerTitleStyle } from '../../utils/style/variables';

/**
 * Affiche le header  
 */
function Header() {
    return (
        <header >
            <Container>
                <Grid container alignItems='center' justifyContent='center' display='flex' flexDirection='column'>


                    {/* Version admin-app, les parties commentées sont à utiliser potentiellement plus tard */}
                    <Grid display={"flex"} alignItems='center' >
                        <Typography sx={{ fontSize: { xs: "2rem", md: "3rem" } }} fontWeight={"600"} fontFamily={headerTitleStyle.font} color={headerTitleStyle.color} textTransform='uppercase'
                            fontSize={headerTitleStyle.size} >TEST - Admin App</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
        </header>
    )
}

export default Header