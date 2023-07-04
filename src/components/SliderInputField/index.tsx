import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

type Props = {
    title: string,
    icon: any,
    step: number,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Affiche le slider avec un input
 * @param {string} title Titre de l'input
 * @param {number} step Step de l'input
 * @param {any} icon Icône
 * @param {number} value Valeur sélectionnée
 * @param {React.Dispatch<React.SetStateAction<number>>} setValue State action pour définir value
 */
export default function InputSlider({ title, icon, step, value, setValue }: Props) {
    const handleSliderChange = (event: any) => {
        setValue(parseInt(event.target.value))
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box >
            <Typography id="input-slider" gutterBottom>
                {title}
            </Typography>
            <Grid container alignItems="center" item xs={12} md={6}>
                <Grid item xs={2}>
                    {icon}
                </Grid>
                <Grid item xs={8}>
                    <Slider

                        aria-label="Réduction"
                        value={value}
                        valueLabelDisplay="auto"
                        step={step}
                        marks
                        min={0}
                        max={100}
                        onChange={handleSliderChange}
                    />
                </Grid>
                <Grid item xs={2} justifyContent={'center'} alignItems={'flex-end'} display={'flex'}>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}