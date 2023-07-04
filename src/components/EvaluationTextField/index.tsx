/**
 * Gestion du component l'entrée de l'évaluation du client
**/
import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    evaluation: string | null,
    setEvaluation: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour l'évaluation du client avec une version contrôlée et l'autre non
 * @param {string|null} evaluation State qui affiche l'évaluation
 * @param {React.Dispatch<React.SetStateAction<string | null>>|null} setEvaluation State action pour définir evaluation, si nul la version non contrôlée est utilisée 
 */
export default function EvaluationTextField({ evaluation, setEvaluation }: Props) {
    //State du status de l'erreur
    const [evaluationErrorStatus, setEvaluationErrorStatus] = useState<boolean>(false)

    return (setEvaluation ?
        <TextField
            name={"evaluation"}
            value={evaluation ? evaluation : ''}
            fullWidth
            id={"evaluation"}
            label={"Évaluation"}
            multiline
            maxRows={4}
            autoFocus
            error={evaluationErrorStatus}
            helperText={evaluationErrorStatus && "Veuillez entrer moins de 500 caractères"}
            onChange={(event) => {
                const evaluation = event.target.value
                const test = evaluation.trim().length;
                setEvaluationErrorStatus(false)
                if (test > 500) {
                    setEvaluationErrorStatus(true);
                    return
                } else {
                    setEvaluation(evaluation)
                    return
                }
            }}
        /> :
        <TextField
            name={"evaluation"}
            value={evaluation && evaluation}
            fullWidth
            id={"evaluation"}
            label={"Évaluation"}
            multiline
            maxRows={4}
            autoFocus
            error={evaluationErrorStatus}
            helperText={evaluationErrorStatus && "Veuillez entrer moins de 500 caractères"}
            onChange={(event) => {
                const evaluation = event.target.value.trim()
                const test = evaluation.length;
                setEvaluationErrorStatus(false)
                if (test > 500) {
                    setEvaluationErrorStatus(true);
                    return
                }
            }}
        />
    )
}