/**
 * Affichage et gestion du logo grand avec son texte
 **/
import { Grid, Typography } from "@mui/material";
import styled from '@emotion/styled';

import lightLogo from '../../assets/smile.svg'
import { headerTitleStyle, headerSubTitleStyle } from '../../utils/style/variables';
import { appName } from '../../data/data';

/**
 * Gestion de l'affichage du logo et de son texte 
 */
export default function LogoDisplay() {
    const StyledLightLogo = styled.img({
        width: '90px'
    });

    return (
        <Grid container width={'150px'} justifyContent='center' display='flex' flexDirection='column'>
            {/* Sépare le titre en 2 pour que le logo s'intègre au milieu */}
            <Grid display={'flex'} alignItems='center' >
                <Typography fontFamily={headerTitleStyle.font} color={headerTitleStyle.color} textTransform='uppercase'
                    fontSize={'22px'} >{(appName.split(/[ ]+/))[0]}</Typography>
                <StyledLightLogo src={lightLogo} alt={"logo de " + appName} />
                <Typography fontFamily={headerTitleStyle.font} color={headerTitleStyle.color} textTransform='uppercase'
                    fontSize={'22px'} >{(appName.split(/[ ]+/))[1]}</Typography>
            </Grid>

            {/* Sous-titre */}
            <Typography display={'inline'} fontFamily={headerSubTitleStyle.font} color={headerSubTitleStyle.color} textTransform='uppercase'
                fontSize={'10px'} marginTop="-10px" marginBottom='20px' textAlign={'center'} ><u>Créateur de gourmandises</u></Typography>
        </Grid>
    )
}
