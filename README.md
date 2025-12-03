# FrWA Conception - Site Web

Système de site statique avec navigation automatique pour GitHub Pages.

## 🚀 Fonctionnalités

- **Navigation automatique** : Le menu latéral se construit automatiquement
- **Chargement dynamique** : Les pages se chargent sans rechargement
- **Responsive** : Adapté mobile et desktop
- **Modulaire** : Code séparé en fichiers unitaires
- **GitHub Pages Ready** : Fonctionne directement sur GitHub Pages

## 📁 Structure

```
website/
├── index.html              # Page principale
├── navigation.json         # Configuration du menu
├── README.md               # Ce fichier
│
├── src/                    # Code source du système
│   ├── js/
│   │   ├── config/         # Configuration
│   │   ├── utils/          # Utilitaires
│   │   ├── navigation/     # Gestion du menu
│   │   ├── core/           # Logique principale
│   │   ├── ui/             # Interface utilisateur
│   │   └── app.js          # Point d'entrée
│   │
│   ├── styles/
│   │   ├── base/           # Variables, reset, typo
│   │   ├── layout/         # Mise en page
│   │   ├── components/     # Composants
│   │   └── theme/          # Thème et animations
│   │
│   └── assets/
│       └── images/         # Logo et mascotte
│
└── pages/                  # VOS PAGES ICI
    ├── accueil/
    ├── documentation/
    └── projets/
```

## 📝 Ajouter une page

1. **Créez votre fichier HTML** dans le dossier `pages/`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma Page - FrWA</title>
</head>
<body>
    <div class="page-content">
        <h1>Titre de ma page</h1>
        <p>Mon contenu...</p>
    </div>
</body>
</html>
```

2. **Ajoutez l'entrée** dans `navigation.json`

```json
{
    "name": "ma-page",
    "displayName": "Ma Page",
    "path": "pages/ma-page.html",
    "icon": "📄",
    "type": "file"
}
```

3. **Commit et push** - C'est tout !

## 🎨 Personnalisation

### Couleurs

Modifiez les variables dans `src/styles/base/variables.css` :

```css
:root {
    --color-primary: #2d5a5a;
    --color-accent: #e67e22;
    --text-accent: #4ecdc4;
    /* ... */
}
```

### Logo et Mascotte

Placez vos images dans `src/assets/images/` :
- `logo.png` - Logo du site
- `mascot.png` - Mascotte (pixel art recommandé)

## 🌐 Déploiement GitHub Pages

1. Allez dans **Settings** > **Pages**
2. Sélectionnez la branche `main` et le dossier `/ (root)`
3. Cliquez sur **Save**
4. Votre site sera disponible à `https://username.github.io/repo/`

## 📦 Classes CSS disponibles

### Texte
- `.lead` - Paragraphe d'introduction
- `.text-accent` - Texte coloré
- `.text-muted` - Texte grisé
- `.text-center` - Texte centré

### Composants
- `.card` - Carte
- `.btn`, `.btn-primary`, `.btn-secondary` - Boutons
- `.card-alert.info|success|warning|error` - Alertes
- `.feature-grid` + `.feature-card` - Grille de fonctionnalités
- `.badge` - Badges

### Layout
- `.grid`, `.grid-2`, `.grid-3`, `.grid-4` - Grilles
- `.divider` - Séparateur

### Animations
- `.hover-lift` - Soulève au survol
- `.hover-glow` - Effet lumineux au survol
- `.fade-in`, `.slide-in-up` - Animations d'entrée

## 📄 Licence

MIT - Libre d'utilisation et de modification.

---

**FrWA Conception** ❄️ 2024
