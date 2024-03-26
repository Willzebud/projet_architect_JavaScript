// Fonction pour récupérer les travaux de l'architecte depuis une API
async function recupererTravaux() {
  try {
    // Envoie une requête HTTP GET pour obtenir les données depuis l'URL spécifiée
    const response = await fetch('http://localhost:5678/api/works');
    // Vérifie si la réponse de l'API est positive (code de statut HTTP 200-299)
    if (!response.ok) {
      // Lance une exception si la réponse n'est pas OK, avec le statut de la réponse pour identifier le problème
      throw new Error('Problème lors de la récupération des travaux: ' + response.statusText);
    }
    // Convertit la réponse en format JSON pour obtenir les données des travaux
    const data = await response.json();
    // Appelle la fonction pour ajouter les travaux à la galerie HTML, en utilisant les données récupérées
    ajouterTravauxALaGalerie(data);
  } catch (error) {
    // Attrape et affiche l'erreur dans la console si un problème survient pendant la récupération ou le traitement des données
    console.error('Erreur lors de la récupération des travaux:', error);
  }
}

// Définition d'un tableau de données pour les travaux de l'architecte (utilisé pour l'affichage initial ou de test)
const travaux = [
  { imageUrl: "assets/images/abajour-tahina.png", title: "Abajour Tahina", categorie: "Objets" },
  { imageUrl: "assets/images/appartement-paris-v.png", title: "Appartement Paris V", categorie: "Appartements" },
  { imageUrl: "assets/images/restaurant-sushisen-londres.png", title: "Restaurant Sushisen - Londres", categorie: "Hotels & restaurants" },
  { imageUrl: "assets/images/la-balisiere.png", title: "La Balisiere” - Port Louis", categorie: "Appartements" },
  { imageUrl: "assets/images/structures-thermopolis.png", title: "Structures Thermopolis", categorie: "Objets" },
  { imageUrl: "assets/images/appartement-paris-x.png", title: "Appartement Paris X", categorie: "Appartements" },
  { imageUrl: "assets/images/le-coteau-cassis.png", title: "Pavillon “Le coteau” - Cassis", categorie: "Appartements" },
  { imageUrl: "assets/images/villa-ferneze.png", title: "Villa Ferneze - Isola d’Elba", categorie: "Appartements" },
  { imageUrl: "assets/images/appartement-paris-xviii.png", title: "Appartement Paris XVIII", categorie: "Appartements" },
  { imageUrl: "assets/images/bar-lullaby-paris.png", title: "Lullaby” - Paris", categorie: "Hotels & restaurants" },
  { imageUrl: "assets/images/hotel-first-arte-new-delhi.png", title: "Hotel First Arte - New Delhi", categorie: "Hotels & restaurants" },
];

// Fonction pour créer dynamiquement et ajouter les travaux de l'architecte à la galerie HTML
function ajouterTravauxALaGalerie(travaux) {
  // Sélectionne l'élément de la galerie dans le HTML par son ID
  const galerie = document.getElementById('gallery-container'); 
  let htmlGalerie = '';

  // Boucle à travers chaque travail dans le tableau de travaux
  travaux.forEach(travail => {
    // Crée le code HTML pour chaque travail, en utilisant ses données (image, titre)
    htmlGalerie += `
      <figure>
        <img src="${travail.imageUrl}" alt="${travail.title}">
        <figcaption>${travail.title}</figcaption>
      </figure>
    `;
  });

  // Insère le code HTML créé dans l'élément de la galerie, remplaçant tout contenu existant
  galerie.innerHTML = htmlGalerie;
}

// Appel initial de la fonction pour ajouter les travaux à la galerie avec les données du tableau de test
ajouterTravauxALaGalerie(travaux);