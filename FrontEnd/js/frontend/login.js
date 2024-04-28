// Attache les écouteurs d'événements au chargement du contenu du DOM
document.addEventListener("DOMContentLoaded", function() {
    // Récupère l'état de connexion depuis le localStorage
    let estConnecte = localStorage.getItem("estConnecte");
     // Sélectionne le lien de connexion/déconnexion
    let lienLogout = document.querySelector("nav ul li a[href='login.html']");

     // Configure le texte et la gestion du localStorage selon l'état de connexion
    if (estConnecte === "true") {
        if (lienLogout) lienLogout.textContent = 'logout';
        lienLogout.setAttribute('href', '#');
        lienLogout.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem("estConnecte");
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    } else {
        if (lienLogout) lienLogout.textContent = 'login';
        lienLogout.setAttribute('href', 'login.html');
    }
    // Gestion de l'affichage de la bannière selon l'état de connexion
    let banner = document.getElementById("banner");
    if (banner) {
        banner.style.display = estConnecte === "true" ? "block" : "none";
    }
    // Gestion de l'affichage de l'icône édition selon l'état de connexion
    let editModeInline = document.querySelector(".edit-mode-inline");
    if (editModeInline) {
        editModeInline.style.display = estConnecte === "true" ? "inline" : "none";
    }
    // Ajoute un écouteur d'événement sur le formulaire de connexion pour gérer la soumission
    let loginForm = document.querySelector("#login form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("Tentative de connexion");
            // Récupère les valeurs des champs du formulaire de connexion 
            let email = document.getElementById("email");
            let password = document.getElementById("password");
            // Valide l'email et le mot de passe avant de tenter une connexion
            if (validateEmail(email.value) && validatePassword(password.value)) {
                login(email.value, password.value);
            } else {
                alert('Veuillez entrer une adresse mail ou un mot de passe valide.');
            }
        });
    }
});
// Fonction qui valide l'adresse email avec une expression régulière
function validateEmail(email) {
    let emailRegExp = /^[a-z._-]+@[a-z._-]+\.[a-z._-]+$/;
    let emailInput = document.getElementById("email");
    if (emailRegExp.test(email)) {
        emailInput.classList.remove("error");
        return true;
    } else {
        emailInput.classList.add("error");
        return false;
    }
}
// Fonction qui valide le mdp avec une expression régulière
function validatePassword(password) {
    let passwordRegExp = /^[A-Z][0-9][a-z]{4}$/;
    let passwordInput = document.getElementById("password");
    if (passwordRegExp.test(password)) {
        passwordInput.classList.remove("error");
        return true;
    } else {
        passwordInput.classList.add("error");
        return false;
    }
}
// Fonction pour connecter l'utilisateur en envoyant une requête POST à l'API + génération du Token D'authenfication stocké dans le localStorage
function login(email, password) {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erreur dans l\'identifiant ou le mot de passe.');
    })
    .then(data => {
        console.log("Connexion réussie", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("estConnecte", "true");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert(error.message);
    });
}