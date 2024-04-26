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

    let banner = document.getElementById("banner");
    if (banner) {
        banner.style.display = estConnecte === "true" ? "block" : "none";
    }

    let editModeInline = document.querySelector(".edit-mode-inline");
    if (editModeInline) {
        editModeInline.style.display = estConnecte === "true" ? "inline" : "none";
    }

    let loginForm = document.querySelector("#login form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("Tentative de connexion");

            let email = document.getElementById("email");
            let password = document.getElementById("password");

            if (validateEmail(email.value) && validatePassword(password.value)) {
                login(email.value, password.value);
            } else {
                alert('Veuillez entrer une adresse mail ou un mot de passe valide.');
            }
        });
    }
});

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