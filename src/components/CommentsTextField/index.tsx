/**
 * Gestion du component l'entrée des commentaires
**/
import { TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    comments: string | null,
    setComments: React.Dispatch<React.SetStateAction<string | null>> | null,
    category: string | null,
}

/**
 * Gestion de l'input pour les commentaires tout en ajoutant une catégorie à ceux ci avec une version contrôlée et l'autre non
 * @param {string|null} comments State qui affiche les commentaires
 * @param {React.Dispatch<React.SetStateAction<string | null>>|null} setComments State action pour définir comments
 * @param {category} category State qui définit la catégorie des commentaires si il y en a une
 */
export default function CommentsTextField({ comments, setComments, category }: Props) {
    //State du status de l'erreur
    const [commentsErrorStatus, setCommentsErrorStatus] = useState<boolean>(false)

    return (setComments ?
        <TextField
            name={category ? category + "Comments" : "comments"}
            value={comments ? comments : ''}
            fullWidth
            id={category ? category + "-comments" : "comments"}
            label={"Commentaires"}
            multiline
            maxRows={4}
            autoFocus
            error={commentsErrorStatus}
            helperText={commentsErrorStatus && "Veuillez entrer moins de 500 caractères"}
            onChange={(event) => {
                const comments = event.target.value
                const test = comments.trim().length;
                setCommentsErrorStatus(false)
                if (test > 500) {
                    setCommentsErrorStatus(true);
                    return
                } else {
                    setComments(comments)
                    return
                }
            }}
        /> :
        <TextField
            name={category ? category + "Comments" : "comments"}
            defaultValue={comments && comments}
            fullWidth
            id={category ? category + "-comments" : "comments"}
            label={"Commentaires"}
            multiline
            maxRows={4}
            autoFocus
            error={commentsErrorStatus}
            helperText={commentsErrorStatus && "Veuillez entrer moins de 500 caractères"}
            onChange={(event) => {
                const comments = event.target.value.trim()
                const test = comments.length;
                setCommentsErrorStatus(false)
                if (test > 500) {
                    setCommentsErrorStatus(true);
                    return
                }
            }}
        />
    )
}