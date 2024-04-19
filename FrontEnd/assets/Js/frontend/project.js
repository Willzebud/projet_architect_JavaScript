let worksArray = [];
const galleryContainer = document.getElementById('gallery-container');
const modalGalleryContainer = document.getElementById('modal-gallery-container');
const modal = document.getElementById('modal1');
const modalOverlay = document.getElementById('modal-overlay');
const openModalButtons = document.querySelectorAll('.edit-mode, .edit-mode-inline');
const modal2 = document.getElementById('modal2');
const addPhotoButton = document.querySelector('.add-photo-button');
const validateButton = document.querySelector('#modal2 .validate-add-photo');
const photoUploadInput = document.getElementById('photo-upload');
const photoTitleInput = document.getElementById('photo-title');
const photoCategorySelect = document.getElementById('photo-category');

document.addEventListener('DOMContentLoaded', function() {
    attachModalEventListeners();
    getWorksAndCategories();
});

function attachModalEventListeners() {
    openModalButtons.forEach(button => button.addEventListener('click', () => openModal(modal)));

    document.querySelector('#modal1 .close-modal').addEventListener('click', () => closeModal(modal));
    document.querySelector('#modal2 .close-modal').addEventListener('click', () => closeModal(modal2));
    document.querySelector('#modal2 .back-modal').addEventListener('click', returnToModal1);
}

function openModal(modal) {
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
}

function closeModal(modal) {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
  if (modal === modal2) { 
      modal1.style.display = 'none';
  }
}

function returnToModal1() {
  closeModal(modal2);
  openModal(modal1); 
}

addPhotoButton.addEventListener('click', function() {
  modal.style.display = 'none';
  openModal(modal2);
});

photoUploadInput.addEventListener('change', updateValidateButtonState);
photoTitleInput.addEventListener('input', updateValidateButtonState);
photoCategorySelect.addEventListener('change', updateValidateButtonState);

function updateValidateButtonState() {
  validateButton.disabled = !(photoUploadInput.files.length > 0 && photoTitleInput.value.trim() !== '' && photoCategorySelect.value.trim() !== '');
}

// Récupère les catégories depuis l'API et les ajoute au sélecteur de catégories
async function addCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    photoCategorySelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    photoCategorySelect.appendChild(defaultOption);
    
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      photoCategorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
}

addCategories();

// Fonction pour récupérer les oeuvres et les catégories depuis l'API
async function getWorksAndCategories() {
  try {
      const responseWorks = await fetch('http://localhost:5678/api/works');
      const works = await responseWorks.json();
      worksArray = works;

      displayWorksInGallery(worksArray, 'gallery-container');
      displayWorksInGallery(worksArray, 'modal-gallery-container');

      const responseCategories = await fetch('http://localhost:5678/api/categories');
      const categoriesData = await responseCategories.json();
      const categories = new Set(categoriesData.map(category => category.name));

      createFilterMenu(categories);
  } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
  }
}

// Fonction pour afficher les oeuvres dans une galerie donnée
function displayWorksInGallery(works, containerId) {
  const gallery = document.getElementById(containerId);
  gallery.innerHTML = '';

  works.forEach(work => {
    const figure = document.createElement('figure');
    figure.dataset.id = work.id;

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    if (containerId === 'modal-gallery-container') {
      const deleteIconContainer = document.createElement('div');
      deleteIconContainer.className = 'delete-icon-container';

      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fa-solid fa-trash-can';
      deleteIcon.addEventListener('click', function() { deleteWork(work.id, figure); });

      deleteIconContainer.appendChild(deleteIcon);
      figure.appendChild(deleteIconContainer);
    }

    gallery.appendChild(figure);
  });
}


async function deleteWork(workId, figureElement) {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error(`Erreur HTTP ! status : ${response.status}`);
      }
      if (response.status === 204) {
          console.log('Suppression réussie');
          figureElement.remove();
          worksArray = worksArray.filter(work => work.id !== workId);
          displayWorksInGallery(worksArray, 'gallery-container');
          displayWorksInGallery(worksArray, 'modal-gallery-container');
      } else {
          
          const responseData = await response.json();
          console.error('Erreur lors de la suppression:', responseData);
      }
  } catch (error) {
      console.error('Erreur lors de la suppression', error);
  }
}

// Fonction pour créer le menu de filtre
function createFilterMenu(categories) {
  const filterMenu = document.getElementById('menu-filtres');
  filterMenu.innerHTML = '';

  const boutonTous = document.createElement('button');
  boutonTous.innerText = "Tous";
  boutonTous.classList.add('style-menu', 'bouton-filtre');
  boutonTous.addEventListener('click', (event) => filterProjectsCategorie("Tous", event));
  filterMenu.appendChild(boutonTous);

  categories.forEach(category => {
    const bouton = document.createElement('button');
    bouton.innerText = category;
    bouton.classList.add('style-menu', 'bouton-filtre');
    bouton.addEventListener('click', (event) => filterProjectsCategorie(category, event));
    filterMenu.appendChild(bouton);
  });
}

// Fonction pour filtrer les projets par catégorie
function filterProjectsCategorie(selectedCategory, event) {
  const filteredWorks = worksArray.filter(work => {
    return selectedCategory === "Tous" || work.category.name === selectedCategory;
  });

  displayWorksInGallery(filteredWorks, 'gallery-container');
  displayWorksInGallery(filteredWorks, 'modal-gallery-container');
  document.querySelectorAll('.bouton-filtre').forEach(button => button.classList.remove('bouton-filtre-actif'));
  event.currentTarget.classList.add('bouton-filtre-actif');
}

getWorksAndCategories();
