document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.querySelector("#login form");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("Tentative de connexion");

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        getWorks(email, password);
    });
});

function getWorks(email, password) {
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


