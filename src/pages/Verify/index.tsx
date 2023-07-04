/**
 * Gestion de la page Verify
 **/

import { Button, Container, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import Typography from '@mui/material/Typography/Typography'
import SendIcon from '@mui/icons-material/Send'
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useGetData } from '../../utils/hooks'
import successIcon from "../../assets/wedding-success.svg"
import failedIcon from "../../assets/warning-sign.svg"

type Props = {
    data: any,
    isLoading: boolean
}

const StyledIcon = styled.img({
    width: 100
});

/**
 * Affichage de la page de vérification de l'adresse électronique après la création du compte
 */
export default function Verify() {
    const navigate = useNavigate()

    //Récupération de l'id et du token   
    const { id } = useParams()
    const { token } = useParams()

    //Utilisation du hook pour la vérification avec récupération de la réponse
    const { data, isLoading }: Props = useGetData(`${process.env.REACT_APP_API_ORDERS_URL}/users/verify/${id}/${token}`)

    //Titre de la page
    useEffect(() => {
        document.title = " GC-Vérification de l'email"
    }, [])

    return (
        <section>
            <Container >
                <Grid sx={{ marginBottom: "200px" }} container display='flex' justifyContent="center" alignItems="center" flexDirection="column">
                    {isLoading ? (<Grid marginTop="40px ">
                        <CircularProgress data-testid='loader' size="100px" />
                    </Grid>) : (
                        <Grid>
                            {data.status === 200 ? (<Grid container marginTop="40px" justifyContent="center" alignItems="center" flexDirection="column" gap="10px">
                                <StyledIcon src={successIcon} alt='Gateau réussi' />
                                <Typography textAlign='center' fontSize="20px" fontWeight="bold">La création de votre compte a bien été finalisée 😁😁</Typography>
                                <Typography textAlign='center' fontSize="20px">Revenez à la page de connexion en cliquant sur le lien suivant</Typography>
                            </Grid>) :
                                (<Grid container marginTop="40px" marginBottom="30px" justifyContent="center" alignItems="center" flexDirection="column" gap="10px">
                                    <StyledIcon src={failedIcon} alt='Visage triste' />
                                    <Typography textAlign='center' fontSize="20px" fontWeight="bold">
                                        {data.status >= 500 ? <span>Une erreur s'est produite, veuillez réessayer ultérieurement, ou nous contacter si l'erreur persiste</span>
                                            : <span>Le lien utilisé n'était pas ou plus valide </span>}
                                    </Typography>
                                    <Typography textAlign='center' fontSize="20px">
                                        Vous pouvez revenir sur la page de connexion en cliquant sur le lien suivant pour pouvoir obtenir un nouveau lien de vérification</Typography>
                                </Grid>)}
                            <Grid marginTop="60px" display="flex" justifyContent='center'>
                                <Button
                                    onClick={() => navigate("/")}
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                >
                                    Page de connexion
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container >
        </section>
    )
}

//Page de test à faire