document.addEventListener("DOMContentLoaded", function() {
    let estConnecte = localStorage.getItem("estConnecte");
    let lienLogout = document.querySelector("nav ul li a[href='login.html']");

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
    // Gestion de l'affichage de la banner
    let banner = document.getElementById("banner");
    if (banner) {
        banner.style.display = estConnecte === "true" ? "block" : "none";
    }

    // Gestion de l'affichage de editModeInline
    let editModeInline = document.querySelector(".edit-mode-inline");
    if (editModeInline) {
        editModeInline.style.display = estConnecte === "true" ? "inline" : "none";
    }

    // Recherche du formulaire de connexion et ajout de l'écouteur d'événements si le formulaire existe
    let loginForm = document.querySelector("#login form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("Tentative de connexion");
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            login(email, password); // Appel de la fonction de connexion
        });
    } else {
        console.log("Le formulaire de connexion n'existe pas sur cette page.");
    }
});

// Check email is valide
// Check password not empty

// Tentative de connexion .addEventlistener.... if (CheckEmail is valid && CheckPassword is not empty)
//  ... soumission du formulaire

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

        // localStorage.remove("token");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert(error.message);
    });
}



/*

Récupérer l'email et le mot de passe
Vérifier avant la soumission que l'utilisateur saisie un email valide ...@.... . ( Regex ) regextest.com

function validateEmail(email) {
  // Expression régulière pour vérifier le format de l'adresse e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

Vérifier que l'utilisateur à saisie un mot de passe (si le champs est vide pas de soumission)

Si l'email et le mot de passe sont valides alors on soumet le formulaire
*/