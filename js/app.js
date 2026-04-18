// Configuración de Tailwind (necesaria para los colores personalizados)
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "rick-blue": "#A1D5E3",
                "on-tertiary-container": "#5f5600",
                "inverse-surface": "#fcf8ff",
                "secondary-container": "#006876",
                "on-tertiary-fixed-variant": "#6a6000",
                "tertiary-fixed": "#ffeb3b",
                "inverse-primary": "#426a00",
                "surface-container-low": "#13131c",
                "error-container": "#b92902",
                "on-secondary-fixed-variant": "#005b68",
                "surface-container-lowest": "#000000",
                "surface": "#0d0d16",
                "primary-dim": "#b2eb65",
                "surface-container": "#191923",
                "surface-dim": "#0d0d16",
                "tertiary-fixed-dim": "#f0dc2b",
                "on-primary-container": "#162700",
                "on-secondary-container": "#e9fbff",
                "primary-fixed": "#c0fa72",
                "on-tertiary": "#685e00",
                "on-secondary-fixed": "#003c45",
                "surface-tint": "#c0fa72",
                "on-secondary": "#00515c",
                "background": "#0d0d16",
                "primary-container": "#7bb031",
                "on-primary-fixed": "#2e4b00",
                "secondary-dim": "#4cd8ef",
                "secondary": "#5ee6fe",
                "surface-bright": "#2b2b38",
                "on-background": "#f2effb",
                "on-surface-variant": "#acaab5",
                "on-primary-fixed-variant": "#436a00",
                "secondary-fixed": "#5ee6fe",
                "on-error": "#450900",
                "error-dim": "#d53d18",
                "inverse-on-surface": "#55545e",
                "tertiary-dim": "#f0dc2b",
                "primary": "#c0fa72",
                "surface-container-high": "#1f1f2a",
                "on-surface": "#f2effb",
                "error": "#ff7351",
                "secondary-fixed-dim": "#4cd8ef",
                "surface-container-highest": "#252531",
                "primary-fixed-dim": "#b2eb65",
                "surface-variant": "#252531",
                "on-primary": "#3b5f00",
                "tertiary": "#fff7d0",
                "on-error-container": "#ffd2c8",
                "tertiary-container": "#ffeb3b",
                "on-tertiary-fixed": "#4b4400",
                "outline-variant": "#484751",
                "outline": "#76747f"
            },
            "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            "fontFamily": {
                "headline": ["Space Grotesk"],
                "body": ["Manrope"],
                "label": ["Plus Jakarta Sans"]
            }
        },
    },
};

// Aquí puedes añadir tu lógica para consumir la API de Rick and Morty después
console.log("Portal cargado...");