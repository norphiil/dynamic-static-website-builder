/**
 * Tree Builder
 * Construit l'arborescence de navigation depuis la structure des fichiers
 */

const TreeBuilder = {
    /**
     * Structure de données pour un nœud de l'arbre
     */
    createNode(name, path, type = 'file', level = 0) {
        return {
            name: name,
            displayName: PathUtils.pathToTitle(name),
            path: path,
            type: type, // 'file' ou 'folder'
            level: level,
            children: [],
            isOpen: false,
            id: PathUtils.pathToId(path)
        };
    },

    /**
     * Charge la structure depuis navigation.json ou NavigationData
     */
    async loadStructure() {
        // Essaie d'abord de charger navigation.json (généré par le script)
        try {
            const basePath = PathUtils.getBasePath();
            const url = basePath + 'navigation.json';
            console.log('Trying to load:', url);
            
            const response = await fetch(url, { cache: 'no-cache' });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Navigation loaded from JSON file');
                return this.buildTreeFromJson(data);
            }
        } catch (error) {
            console.log('Could not load navigation.json:', error.message);
        }
        
        // Fallback: utilise NavigationData si disponible
        if (typeof NavigationData !== 'undefined' && NavigationData.children) {
            console.log('Using NavigationData fallback');
            return this.buildTreeFromJson(NavigationData);
        }
        
        // Dernier recours: structure par défaut
        console.warn('Using default fallback structure');
        return this.getFallbackStructure();
    },

    /**
     * Construit l'arbre depuis les données JSON
     */
    buildTreeFromJson(data, level = 0) {
        const nodes = [];
        
        if (Array.isArray(data)) {
            data.forEach(item => {
                const node = this.processItem(item, level);
                if (node) nodes.push(node);
            });
        } else if (data.children) {
            data.children.forEach(item => {
                const node = this.processItem(item, level);
                if (node) nodes.push(node);
            });
        }
        
        return this.sortNodes(nodes);
    },

    /**
     * Traite un item du JSON
     */
    processItem(item, level) {
        // Vérifie si l'item doit être exclu
        if (PathUtils.shouldExclude(item.name || item.path)) {
            return null;
        }

        const isFolder = item.type === 'folder' || item.children;
        const node = this.createNode(
            item.name,
            item.path || item.name,
            isFolder ? 'folder' : 'file',
            level
        );

        // Surcharge du nom d'affichage si spécifié
        if (item.displayName) {
            node.displayName = item.displayName;
        }

        // Icône personnalisée
        if (item.icon) {
            node.icon = item.icon;
        }

        // Traite les enfants récursivement
        if (item.children && Array.isArray(item.children)) {
            node.children = this.buildTreeFromJson(item.children, level + 1);
        }

        return node;
    },

    /**
     * Trie les nœuds (dossiers d'abord, puis alphabétiquement)
     */
    sortNodes(nodes) {
        return nodes.sort((a, b) => {
            // Les dossiers en premier
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            
            // Index files en premier dans les fichiers
            const aIsIndex = SiteConfig.priorityFiles.includes(a.name);
            const bIsIndex = SiteConfig.priorityFiles.includes(b.name);
            if (aIsIndex && !bIsIndex) return -1;
            if (!aIsIndex && bIsIndex) return 1;
            
            // Puis alphabétiquement
            return a.displayName.localeCompare(b.displayName);
        });
    },

    /**
     * Structure de fallback si navigation.json n'existe pas
     */
    getFallbackStructure() {
        return [
            this.createNode('index.html', 'pages/index.html', 'file', 0)
        ];
    },

    /**
     * Trouve un nœud par son chemin
     */
    findNodeByPath(nodes, path) {
        for (const node of nodes) {
            if (node.path === path) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const found = this.findNodeByPath(node.children, path);
                if (found) return found;
            }
        }
        return null;
    },

    /**
     * Obtient tous les chemins des parents d'un nœud
     */
    getParentPaths(nodes, targetPath, currentPath = []) {
        for (const node of nodes) {
            if (node.path === targetPath) {
                return currentPath;
            }
            if (node.children && node.children.length > 0) {
                const result = this.getParentPaths(
                    node.children, 
                    targetPath, 
                    [...currentPath, node.path]
                );
                if (result) return result;
            }
        }
        return null;
    },

    /**
     * Aplatit l'arbre en liste
     */
    flatten(nodes, result = []) {
        nodes.forEach(node => {
            result.push(node);
            if (node.children && node.children.length > 0) {
                this.flatten(node.children, result);
            }
        });
        return result;
    }
};

// Export for use in other modules
window.TreeBuilder = TreeBuilder;
