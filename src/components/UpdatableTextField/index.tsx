/**
 * Component UpdatableTextField
 **/

import { Grid, Typography } from "@mui/material"

type Props = {
    children: any,
    title: string,
    value: any,
    onUpdate: boolean
}

/**
 * Permet d'afficher une section mise en page avec un titre des diviseurs et pouvant être mis à jour
 * @param {any} children - input pour pouvoir mettre à jour la section
 * @param {string} title - Titre de la section
 * @param {string} value - Valeur affichée de la section, pouvant être mis à jour
 * @param {boolean} onUpdate - Définit si la section est en train d'être mise à jour
 */
export default function UpdatableTextField({ children, title, value, onUpdate }: Props) {
    return (
        <Grid container display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 0 } }} maxWidth={'sm'}>
            <Grid item xs={12} md={6} >
                <Typography
                    sx={{ fontSize: { xs: 17, md: 20 }, textAlign: { xs: "right", md: "left" } }}
                    fontWeight={500}
                >
                    {title}
                </Typography>
            </Grid>
            {children ?
                <Grid item xs={11} md={6}>
                    {!onUpdate ? <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {value}
                    </Typography>
                        : children}
                </Grid> :
                <Grid item xs={11} md={6}>
                    <Typography
                        color={"text.secondary"}
                        sx={{ fontSize: { xs: 17, md: 20 } }}
                    >
                        {value}
                    </Typography>
                </Grid>}
        </Grid>
    )
}