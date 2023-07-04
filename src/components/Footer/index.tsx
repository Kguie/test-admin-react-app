/**
 * Gestion du component footer
 **/
import { Typography, Grid, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { appName } from '../../data/data';
import { colors } from '../../utils/style/variables';

/**
 * Affiche le footer avec le logo et le texte, et les liens vers la FAQ et le mail
 */
export default function Footer() {

    return (
        <Grid component={"footer"} marginTop={"20px"} position={"absolute"} bottom={0} width={"100%"} margin={"0 auto"} sx={{ backgroundColor: colors.darkBlue }}  >
            <Grid color={"#ffffff"} margin={"0 auto"} container maxWidth={"md"} display='flex' flexDirection={'column'} padding="40px"  >
                <Grid>
                    <Grid item display={"flex"} justifyContent={"space-around"} marginTop={"25px"} alignItems={"center"}>
                        <Link color={"#ffffff"} display={"flex"} gap={"5px"} alignItems={"center"} href='/helper'>
                            <HelpOutlineIcon sx={{ fontSize: { xs: "14px", md: "16px" } }} />
                            <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>Notre FAQ</Typography>
                        </Link>
                        <Link color={"#ffffff"} display={"flex"} gap={"5px"} alignItems={"center"} href='mailTo:gingercookies33971@gmail.com'>
                            <MailOutlineIcon sx={{ fontSize: { xs: "14px", md: "16px" } }} />
                            <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>Contactez nous</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item marginTop={"40px"}>
                    <Typography variant="body2" textAlign={"center"}   >
                        {'Copyright © '}{appName}{' '}{new Date().getFullYear()}{'.'}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

