/**
 * Gestion du component de l'entrée des services
 **/

import { Grid, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    services: string | null,
    setServices: React.Dispatch<React.SetStateAction<string | null>> | null,
    setChanged: React.Dispatch<React.SetStateAction<boolean>> | null,
    index: number | null,
}

/**
 * Gestion de l'input pour l'ajout de services
 * @param {string | null} services State de services 
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setValue State action pour désigner le status de services 
 * @param {React.Dispatch<React.SetStateAction<boolean>>|null} setChanged State action pour désigner le status de changed
 * @param {number|null} index affiche l'index du service si il y en a plusieurs 
 */
export default function ServicesTextField({ services, setServices, setChanged, index }: Props) {
    //State du status de l'erreur sur les services
    const [servicesErrorStatus, setServicesErrorStatus] = useState<boolean>(false)

    return (
        <Grid>
            {setServices ?
                <TextField
                    autoComplete="services"
                    name={index ? ("services" + index) : "services"}
                    fullWidth
                    value={services ? services : ""}
                    id={index ? ("add-services-" + index) : "add-services"}
                    label="Services"
                    autoFocus
                    error={servicesErrorStatus}
                    helperText={servicesErrorStatus && "Veuillez ne pas dépasser 1000 caractères"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        const test = event.target.value.trim().length;
                        setServicesErrorStatus(false)
                        if (test >= 1000) {
                            setServicesErrorStatus(true);
                            return
                        } else {
                            setServicesErrorStatus(false);
                            setServices(event.target.value)
                            return
                        }
                    }}
                /> :
                <TextField
                    autoComplete="services"
                    name={index ? ("services" + index) : "services"}
                    fullWidth
                    defaultValue={services ? services : null}
                    id={index ? ("add-services-" + index) : "add-services"}
                    label="Services"
                    autoFocus
                    error={servicesErrorStatus}
                    helperText={servicesErrorStatus && "Veuillez ne pas dépasser 1000 caractères"}
                    onChange={(event) => {
                        setChanged && setChanged(true)
                        const test = event.target.value.length;
                        setServicesErrorStatus(false)
                        if (test >= 1000) {
                            setServicesErrorStatus(true);
                            return
                        } else {
                            setServicesErrorStatus(false);
                            return
                        }
                    }}
                />}
        </Grid>)
}