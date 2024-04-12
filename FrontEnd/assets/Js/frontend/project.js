let worksArray = [];

async function getWorksAndCategories() {
  try {
    const responseWorks = await fetch('http://localhost:5678/api/works');
    if (!responseWorks.ok) {
      throw new Error('Problème lors de la récupération des travaux: ' + responseWorks.statusText);
    }
    const works = await responseWorks.json();
    worksArray = works;
    ajouterWorksArray(works);

    const responseCategories = await fetch('http://localhost:5678/api/categories');
    const categoriesData = await responseCategories.json();
    const categories = new Set(categoriesData.map(categorie => categorie.name));
    creerFilterMenu(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

function ajouterWorksArray(works) {
  console.log(works);
  const galerie = document.getElementById('gallery-container'); 
  let htmlGalerie = '';

  works.forEach(work => {
    htmlGalerie += `
      <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
      </figure>
    `;
  });

  galerie.innerHTML = htmlGalerie;
}

function creerFilterMenu(categories) {
  const filterMenu = document.getElementById('menu-filtres');
  filterMenu.innerHTML = ''; // Efface les boutons précédents pour éviter les doublons

  const boutonTous = document.createElement('button');
  boutonTous.innerText = "Tous";
  boutonTous.classList.add('style-menu', 'bouton-filtre');
  boutonTous.addEventListener('click', (event) => filterProjectsCategorie("Tous", event));
  filterMenu.appendChild(boutonTous);

  categories.forEach(categorie => {
    const bouton = document.createElement('button');
    bouton.innerText = categorie;
    bouton.classList.add('style-menu', 'bouton-filtre');
    bouton.addEventListener('click', (event) => filterProjectsCategorie(categorie, event));
    filterMenu.appendChild(bouton);
  });
}

function filterProjectsCategorie(categorieSelectionnee, event) {
  const filteredWorks = worksArray.filter(work => {
    // Utilisation de work.category.name pour la correspondance
    return categorieSelectionnee === "Tous" || work.category.name === categorieSelectionnee;
  });

  ajouterWorksArray(filteredWorks);

  document.querySelectorAll('.bouton-filtre').forEach(bouton => {
    bouton.classList.remove('bouton-filtre-actif');
  });
  event.currentTarget.classList.add('bouton-filtre-actif');
}

getWorksAndCategories();