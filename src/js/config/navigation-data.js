/**
 * Navigation Data
 * Structure de navigation du site
 * Modifiez ce fichier pour ajouter/modifier les pages du menu
 */

const NavigationData = {
    children: [
        {
            name: "accueil",
            displayName: "Accueil",
            path: "pages/accueil/index.html",
            icon: "🏠",
            type: "file"
        },
        {
            name: "documentation",
            displayName: "Documentation",
            path: "pages/documentation",
            icon: "📚",
            type: "folder",
            children: [
                {
                    name: "demarrage",
                    displayName: "Démarrage rapide",
                    path: "pages/documentation/demarrage.html",
                    icon: "🚀",
                    type: "file"
                },
                {
                    name: "structure",
                    displayName: "Structure du projet",
                    path: "pages/documentation/structure.html",
                    icon: "📁",
                    type: "file"
                },
                {
                    name: "ajouter-pages",
                    displayName: "Ajouter des pages",
                    path: "pages/documentation/ajouter-pages.html",
                    icon: "➕",
                    type: "file"
                }
            ]
        },
        {
            name: "projets",
            displayName: "Projets",
            path: "pages/projets",
            icon: "💼",
            type: "folder",
            children: [
                {
                    name: "projet-exemple",
                    displayName: "Projet Exemple",
                    path: "pages/projets/projet-exemple",
                    icon: "📦",
                    type: "folder",
                    children: [
                        {
                            name: "index",
                            displayName: "Présentation",
                            path: "pages/projets/projet-exemple/index.html",
                            type: "file"
                        },
                        {
                            name: "details",
                            displayName: "Détails techniques",
                            path: "pages/projets/projet-exemple/details.html",
                            type: "file"
                        }
                    ]
                }
            ]
        },
        {
            name: "a-propos",
            displayName: "À Propos",
            path: "pages/a-propos.html",
            icon: "ℹ️",
            type: "file"
        }
    ]
};

// Freeze pour éviter les modifications accidentelles
Object.freeze(NavigationData);

// Export
window.NavigationData = NavigationData;
