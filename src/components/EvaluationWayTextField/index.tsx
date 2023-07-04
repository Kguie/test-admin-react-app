/**
 * Gestion du component l'entrée du moyen que le client a utilisé pour laisser son évaluation
**/
import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    evaluationWay: string | null,
    setEvaluationWay: React.Dispatch<React.SetStateAction<string | null>> | null
}

/**
 * Gestion de l'input pour l'évaluation du client avec une version contrôlée et l'autre non
 * @param {string|null} evaluationWay State qui affiche l'évaluation
 * @param {React.Dispatch<React.SetStateAction<string | null>>|null} setEvaluationWay State action pour définir evaluationWay, si nul la version non contrôlée est utilisée 
 */
export default function EvaluationWayTextField({ evaluationWay, setEvaluationWay }: Props) {
    //State du status de l'erreur
    const [evaluationWayErrorStatus, setEvaluationWayErrorStatus] = useState<boolean>(false)

    return (setEvaluationWay ?
        <TextField
            autoComplete="evaluation-way"
            name="evaluationWay"
            value={evaluationWay ? evaluationWay : ''}
            fullWidth
            id="evaluation-way"
            label="Moyen d'évaluation"
            autoFocus
            error={evaluationWayErrorStatus}
            helperText={evaluationWayErrorStatus && "Veuillez ne pas dépasser 50 caractères"}
            onChange={(event) => {
                const evaluation = event.target.value
                const test = evaluation.trim().length;
                setEvaluationWayErrorStatus(false)
                if (test > 50) {
                    setEvaluationWayErrorStatus(true);
                    return
                } else {
                    setEvaluationWay(evaluation)
                }
            }}
        /> :
        <TextField
            autoComplete="evaluation-way"
            name="evaluationWay"
            defaultValue={evaluationWay && evaluationWay}
            fullWidth
            id="evaluation-way"
            label="Moyen d'évaluation"
            autoFocus
            error={evaluationWayErrorStatus}
            helperText={evaluationWayErrorStatus && "Veuillez ne pas dépasser 50 caractères"}
            onChange={(event) => {
                const evaluation = event.target.value.trim()
                const test = evaluation.length;
                setEvaluationWayErrorStatus(false)
                if (test > 50) {
                    setEvaluationWayErrorStatus(true);
                    return
                }
            }}
        />
    )
}