/***
 * Gestion du component BasicAccordion
 **/

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid } from '@mui/material';

type Props = {
    name: string,
    list: Array<any>
}

/**
 * Affiche un accordion simple
 * @param {string} name - Intitulé de l'accordion
 * @param {Array<any>} list - Array contenant les éléments développés dans l'accordion 
 */
export default function BasicAccordion({ name, list }: Props) {
    return (
        <Grid>
            {list.map((listElement: any, index: number) =>
                <Accordion key={name + index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={name + index + "-content"}
                        id={name + index + "-header"}
                    >
                        <Typography>{listElement.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Divider sx={{ my: 1 }} />
                        <Typography>
                            {listElement.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </Grid>
    );
}