// theme.js ou theme.ts
import { createTheme } from "@mui/material/styles";

// Créer ton thème personnalisé
const theme = createTheme({
    palette: {
        mode: "light", // ou "dark" si tu veux un mode sombre par défaut
        primary: {
            main: "#2d7f96", // Couleur principale pour les éléments comme les boutons
        },
        text: {
            primary: "#000",  // Couleur principale du texte
            secondary: "#FFF", // Couleur secondaire du texte
        },
    },
    typography: {
        // Définir les couleurs spécifiques des composants typographiques
        allVariants: {
            color: "#FFF",  // Couleur du texte pour tous les composants de texte
        },
    },
});

export default theme;
