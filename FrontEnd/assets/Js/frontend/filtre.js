// Fonction asynchrone pour récupérer les catégories des travaux de l'architecte depuis une API
async function recupererCategories() {
    try {
        // Envoie une requête GET à l'API pour obtenir les catégories
        const response = await fetch('http://localhost:5678/api/categories');
        // Convertit la réponse en JSON
        const data = await response.json();
        // Crée un ensemble unique de noms de catégories pour éviter les doublons
        const categories = new Set(data.map(categorie => categorie.name));
        // Appelle la fonction pour créer un menu de filtres avec ces catégories
        creerMenuFiltres(categories);
    } catch (error) {
        // Affiche une erreur dans la console si la requête ou le traitement échoue
        console.error('Erreur lors de la récupération des catégories:', error);
    }
}

// Tableau de données utilisé pour afficher les catégories des travaux de l'architecte
// (Non utilisé directement dans les fonctions ci-dessus, pourrait servir dans d'autres parties du code)
const projetsFiltres = [
    { id: "1", name: "Objets" },
    { id: "2", name: "Appartements" },
    { id: "3", name: "Hotels & restaurants" },
];

// Fonction pour créer le menu de filtres basé sur les catégories récupérées
function creerMenuFiltres(categories) {
    // Sélectionne l'élément HTML qui contiendra le menu de filtres
    const menuFiltres = document.getElementById('menu-filtres');

    // Crée un bouton "Tous" pour afficher tous les projets
    const boutonTous = document.createElement('button');
    boutonTous.innerText = "Tous";
    boutonTous.classList.add('style-menue', 'bouton-filtre');
    // Ajoute un écouteur d'événement pour filtrer les projets par catégorie lors du clic
    boutonTous.addEventListener('click', (event) => filtrerProjetsParCategorie("Tous", event));
    // Ajoute le bouton au menu de filtres
    menuFiltres.appendChild(boutonTous);

    // Crée un bouton pour chaque catégorie unique et l'ajoute au menu de filtres
    categories.forEach(categorie => {
        const bouton = document.createElement('button');
        bouton.innerText = categorie;
        bouton.classList.add('style-menue', 'bouton-filtre');
        bouton.addEventListener('click', (event) => filtrerProjetsParCategorie(categorie, event));
        menuFiltres.appendChild(bouton);
    });
}

// Fonction pour filtrer les projets par catégorie et mettre à jour l'affichage en conséquence
function filtrerProjetsParCategorie(categorieSelectionnee, event) {
    // Filtrage des projets selon la catégorie sélectionnée et mise à jour de l'affichage
    ajouterTravauxALaGalerie(travaux.filter(travail => {
        return categorieSelectionnee === "Tous" || travail.categorie === categorieSelectionnee;
    }));

    // Met à jour le style des boutons pour indiquer la catégorie actuellement sélectionnée
    document.querySelectorAll('.bouton-filtre').forEach(bouton => {
        bouton.classList.remove('bouton-filtre-actif');
    });
    event.currentTarget.classList.add('bouton-filtre-actif');
}

// Déclenche la récupération des catégories et la création du menu de filtres au chargement
recupererCategories();