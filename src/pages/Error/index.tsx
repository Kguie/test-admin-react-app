/**
 * Gestion  de la page erreur
 **/
import { Grid, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect } from "react"
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import errorPicture from "../../assets/error.webp"


const StyledImage = styled.img({
    maxHeight: "60vh",
    minHeight: "30vh",
    width: "100%",
    minWidth: "250px",
})

/**
 * Affiche la page erreur pour chaque route inexistante, ou si une valeur présente dans l’URL ne fait pas partie des données renseignées
 */
function Error() {

    const navigate = useNavigate()

    //Titre de la page
    useEffect(() => {
        document.title = ' Erreur'
    }, [])

    return (
        <Container sx={{ minHeight: "90vh" }}>
            <Grid sx={{ marginBottom: { xs: '60px' } }} position="relative" container marginTop="20px" display="flex" flexDirection="column" alignItems="center">
                <Typography fontFamily={"lemonada"} textAlign="center" sx={{ fontSize: { xs: 20, md: 30 } }} fontWeight="900" color="#000000" textTransform="uppercase">Nous sommes désolés, aucune page n'a été trouvé</Typography>
                <StyledImage src={errorPicture} alt="Erreur 404" />
                <Typography textTransform="uppercase" textAlign="center" sx={{ fontSize: { xs: 12, md: 20 }, marginTop: { xs: 0, md: 5 } }} color="#000000" fontWeight="400">La page que vous recherchez a peut-être été supprimé, ou a eu son nom changé, ou est temporairement indisponible</Typography>
                <Button onClick={() => navigate("/")} sx={{ fontSize: { xs: 12, md: 16 }, marginTop: { xs: 5, lg: 3 } }} variant='contained'>Revenir à la page de connexion</Button>
            </Grid>
        </Container>
    )
}

export default Error