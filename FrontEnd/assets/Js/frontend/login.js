document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.querySelector("#login form"); // Sélectionne le formulaire dans le div #login

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire

        console.log("Tentative de connexion"); // Pour vérifier que l'événement submit est bien capturé

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        getWorks(email, password); // Passe les valeurs email et password à la fonction
    });
});

function getWorks(email, password) {
    console.log("Envoi des données", email, password); // Pour vérifier que les données sont bien envoyées

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email, // Utilisez le paramètre email
            password: password // Utilisez le paramètre password
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erreur dans l\'identifiant ou le mot de passe.');
    })
    .then(data => {
        console.log("Connexion réussie", data); // Confirme la réussite de la connexion
        localStorage.setItem("token", data.token);
        window.location.href = "index.html"; // Redirige vers la page d'accueil si la connexion est réussie
    })
    .catch(error => {
        console.error("Error:", error);
        alert(error.message); // Affiche un message d'erreur
    });
}


