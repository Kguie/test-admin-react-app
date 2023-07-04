/**
 * Gestion du contexte MUI 
 **/
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { frFR } from '@mui/material/locale';

import { textStyle } from '../../utils/style/variables';
import { colors } from '../style/variables'

export const MuiThemeProvider = ({ children }: any) => {
    /* Crée un lien utilisable avec react-router-dom*/
    const LinkBehavior = React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
    >((props, ref) => {
        const { href, ...other } = props;
        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    });

    const theme = createTheme({
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehavior,
                } as LinkProps,
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                },
            },
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        borderRadius: "50px",

                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        borderRadius: "10px",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                    },
                },
            }
        },
        typography: {
            h3: {
                fontSize: '2em',
                '@media (min-width:600px)': {
                    fontSize: '2.5em',
                }
            },
            h4: {
                fontSize: '1.6rem',
                '@media (min-width:600px)': {
                    fontSize: '2em',
                }
            },
            fontFamily: [
                textStyle.font,
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        palette: {
            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.darkBrown,
            }
        },

    }, frFR,
    );
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}


















// //Contexte pour la gestion du thème entre sombre et lumière
// export const ThemeContext = createContext()

// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState('light')
//     const toggleTheme = () => {
//         setTheme(theme === 'light' ? 'dark' : 'light')
//     }

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

// //Contexte pour répondre aux questions de la partie test
// export const SurveyContext = createContext()

// export const SurveyProvider = ({ children }) => {
//     const [answers, setAnswers] = useState({})
//     const saveAnswers = (newAnswers) => {
//         setAnswers({ ...answers, ...newAnswers })
//     }

//     return (
//         <SurveyContext.Provider value={{ answers, saveAnswers }}>
//             {children}
//         </SurveyContext.Provider>
//     )
// }

// //Contexte pour la gestion des favoris
// export const FavsContext = createContext()

// export const FavsProvider = ({ children }) => {
//     const [favs, setFavs] = useState([])

//     /**
//      * Ajoute ou enlève l'id du freelancer de la liste des favoris
//      * @param {number} id
//      */
//     const toggleFavs = (id) => {
//         const favFound = favs.find((favId) => favId === id);
//         if (favFound) {
//             const filteredFavs = favs.filter((element) => id !== element)
//             setFavs(filteredFavs)
//         }
//         else {
//             setFavs([...favs, id])
//         }
//     }
//     return (
//         <FavsContext.Provider value={{ favs, toggleFavs }}>
//             {children}
//         </FavsContext.Provider>
//     )
// }