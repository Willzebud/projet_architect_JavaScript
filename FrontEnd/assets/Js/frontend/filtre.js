<<<<<<< HEAD
// Fonction pour récupérer les catégories des travaux de l'architecte
async function recupererCategories() {
    try {
      // Attente de la réponse de l'API
      const response = await fetch('http://localhost:5678/api/categories');
      // Attente de la conversion de la réponse en JSON
      const data = await response.json();
      const categories = new Set(data.map(categorie => categorie.name));
      creerMenuFiltres(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  }

// Tableau de données utilisé pour afficher les catégories des travaux de l'architecte
=======
function recupererCategories() {
    fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      // Supposons que l'API renvoie un tableau d'objets catégorie, où chaque catégorie a une propriété 'name'
      const categories = new Set(data.map(categorie => categorie.name));
      // Ajoute "Tous" comme option de filtrage
      categories.add("Tous");
      creerMenuFiltres(categories);
    })
    .catch(error => console.error('Erreur lors de la récupération des catégories:', error));
}

>>>>>>> 55deb0c8e4b3083efd0b5bc58ef5b913256d11d9
const projetsFiltres = [
    { id: "1", name: "Objets" },
    { id: "2", name: "Appartements" },
    { id: "3", name: "Hotels & restaurants" },
    ];

<<<<<<< HEAD
// Fonction pour céer les boutons filtres
function creerMenuFiltres(categories) {
  const menuFiltres = document.getElementById('menu-filtres');

  const boutonTous = document.createElement('button');
  boutonTous.innerText = "Tous";
  boutonTous.classList.add('style-menue', 'bouton-filtre');
  boutonTous.addEventListener('click', (event) => filtrerProjetsParCategorie("Tous", event));
  menuFiltres.appendChild(boutonTous);
=======
function creerMenuFiltres(categories) {
  const menuFiltres = document.getElementById('menu-filtres'); // Assure-toi d'avoir cet élément dans ton HTML
>>>>>>> 55deb0c8e4b3083efd0b5bc58ef5b913256d11d9

  categories.forEach(categorie => {
    const bouton = document.createElement('button');
    bouton.innerText = categorie;
<<<<<<< HEAD
    bouton.classList.add('style-menue', 'bouton-filtre');
    bouton.addEventListener('click', (event) => filtrerProjetsParCategorie(categorie, event));
=======
    bouton.addEventListener('click', () => filtrerProjetsParCategorie(categorie));
>>>>>>> 55deb0c8e4b3083efd0b5bc58ef5b913256d11d9
    menuFiltres.appendChild(bouton);
  });
}

<<<<<<< HEAD
function filtrerProjetsParCategorie(categorieSelectionnee, event) {
    
    ajouterTravauxALaGalerie(travaux.filter(travail => {
      return categorieSelectionnee === "Tous" || travail.categorie === categorieSelectionnee;
    }));
  
    
    document.querySelectorAll('.bouton-filtre').forEach(bouton => {
      bouton.classList.remove('bouton-filtre-actif');
    });
    event.currentTarget.classList.add('bouton-filtre-actif');
}
=======
function filtrerProjetsParCategorie(categorieSelectionnee) {
    const projetsFiltres = travaux.filter(travail => {
      return categorieSelectionnee === "Tous" || travail.categorie === categorieSelectionnee;
    });
    ajouterTravauxALaGalerie(projetsFiltres);
  }
>>>>>>> 55deb0c8e4b3083efd0b5bc58ef5b913256d11d9

recupererCategories();

