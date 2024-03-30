// Fonction pour récupérer les travaux de l'architecte depuis une API
async function recupererTravaux() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
      throw new Error('Problème lors de la récupération des travaux: ' + response.statusText);
    }
    const data = await response.json();
    ajouterTravauxALaGalerie(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux:', error);
  }
}

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

function ajouterTravauxALaGalerie(travaux) {
  const galerie = document.getElementById('gallery-container'); 
  let htmlGalerie = '';

  travaux.forEach(travail => {
    htmlGalerie += `
      <figure>
        <img src="${travail.imageUrl}" alt="${travail.title}">
        <figcaption>${travail.title}</figcaption>
      </figure>
    `;
  });

  galerie.innerHTML = htmlGalerie;
}

ajouterTravauxALaGalerie(travaux);