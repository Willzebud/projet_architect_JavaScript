// Fonction asynchrone pour récupérer les catégories des travaux de l'architecte depuis une API
async function recupererCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const data = await response.json();
        const categories = new Set(data.map(categorie => categorie.name));
        creerMenuFiltres(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
    }
}


// Fonction pour créer le menu de filtres basé sur les catégories récupérées
function creerMenuFiltres(categories) {
    const menuFiltres = document.getElementById('menu-filtres');

    const boutonTous = document.createElement('button');
    boutonTous.innerText = "Tous";
    boutonTous.classList.add('style-menue', 'bouton-filtre');
    boutonTous.addEventListener('click', (event) => filtrerProjetsParCategorie("Tous", event));
    menuFiltres.appendChild(boutonTous);

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
    ajouterTravauxALaGalerie(travaux.filter(travail => {
        return categorieSelectionnee === "Tous" || travail.categorie === categorieSelectionnee;
    }));

    document.querySelectorAll('.bouton-filtre').forEach(bouton => {
        bouton.classList.remove('bouton-filtre-actif');
    });
    event.currentTarget.classList.add('bouton-filtre-actif');
}

recupererCategories();