/**
 * Theme Manager
 * Gestion du thème (optionnel pour futur dark/light mode)
 */

const ThemeManager = {
    /**
     * Thème actuel
     */
    currentTheme: 'dark',

    /**
     * Thèmes disponibles
     */
    themes: ['dark', 'light'],

    /**
     * Initialise le theme manager
     */
    init() {
        // Charge le thème sauvegardé
        this.loadTheme();
        
        // Applique le thème
        this.applyTheme(this.currentTheme);
    },

    /**
     * Change de thème
     */
    toggle() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    },

    /**
     * Définit un thème
     */
    setTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn('Unknown theme:', theme);
            return;
        }
        
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
    },

    /**
     * Applique un thème
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Déclenche un événement
        const event = new CustomEvent('themeChange', {
            detail: { theme: theme }
        });
        document.dispatchEvent(event);
    },

    /**
     * Sauvegarde le thème
     */
    saveTheme(theme) {
        try {
            localStorage.setItem(SiteConfig.storageKeys.theme, theme);
        } catch (e) {
            // Ignore storage errors
        }
    },

    /**
     * Charge le thème sauvegardé
     */
    loadTheme() {
        try {
            const saved = localStorage.getItem(SiteConfig.storageKeys.theme);
            if (saved && this.themes.includes(saved)) {
                this.currentTheme = saved;
            }
        } catch (e) {
            // Use default theme
        }
        
        // Vérifie la préférence système
        if (window.matchMedia) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (!localStorage.getItem(SiteConfig.storageKeys.theme)) {
                this.currentTheme = prefersDark.matches ? 'dark' : 'light';
            }
            
            // Écoute les changements de préférence
            prefersDark.addEventListener('change', (e) => {
                if (!localStorage.getItem(SiteConfig.storageKeys.theme)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    },

    /**
     * Obtient le thème actuel
     */
    getTheme() {
        return this.currentTheme;
    },

    /**
     * Vérifie si le thème est dark
     */
    isDark() {
        return this.currentTheme === 'dark';
    }
};

// Export for use in other modules
window.ThemeManager = ThemeManager;
