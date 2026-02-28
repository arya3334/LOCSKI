// ---------------- LOGIN FUNCTION ----------------
function loginUser() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();
    const loginError = document.getElementById("loginError");

    if (!email || !password) {
        if (loginError) {
            loginError.textContent = "Please enter email and password.";
        }
        return;
    }

    if (loginError) {
        loginError.textContent = "";
    }

    // Redirect to profile page after login
    window.location.href = "profile.html";
}

// ---------------- LOGOUT FUNCTION ----------------
function logoutUser() {
    window.location.href = "index.html"; // Redirect to login page
}

// ---------------- PROFILE PAGE LOGIC ----------------
const haveSkills = document.getElementById("haveSkills");
if (haveSkills) {
    const offerSection = document.getElementById("offerSection");
    const needSection = document.getElementById("needSection");
    const error = document.getElementById("error");

    // Show/Hide sections based on Yes/No
    haveSkills.addEventListener("change", function () {
        if (this.value === "yes") {
            offerSection.style.display = "block";
            needSection.style.display = "block";
        } else if (this.value === "no") {
            offerSection.style.display = "none";
            needSection.style.display = "block";
        } else {
            offerSection.style.display = "none";
            needSection.style.display = "none";
        }
    });

    // CREATE PROFILE FUNCTION
    window.createProfile = function () {
        const name = document.getElementById("name").value.trim();
        const offerChecks = document.querySelectorAll("#offerSection input[type='checkbox']:checked");
        const needChecks = document.querySelectorAll("#needSection input[type='checkbox']:checked");

        if (name === "") {
            error.textContent = "Please enter your name.";
            return;
        }

        if (haveSkills.value === "") {
            error.textContent = "Please select Yes or No.";
            return;
        }

        if (offerChecks.length === 0 && needChecks.length === 0) {
            error.textContent = "Please select at least one skill.";
            return;
        }

        // Save data to localStorage
        const offeredSkills = Array.from(offerChecks).map(el => el.value);
        const neededSkills = Array.from(needChecks).map(el => el.value);

        const userData = {
            name: name,
            offeredSkills: offeredSkills,
            neededSkills: neededSkills
        };

        localStorage.setItem("locskiUser", JSON.stringify(userData));

        error.textContent = "";
        alert("Profile Created Successfully!");

        // Redirect to Home Page
        window.location.href = "home.html";
    };
}

// ---------------- HOME PAGE LOGIC ----------------
function showDashboard() {
    const welcome = document.getElementById("welcomeContainer");
    const dashboard = document.getElementById("dashboard");

    const userData = JSON.parse(localStorage.getItem("locskiUser"));

    if (!userData) {
        alert("No user data found. Please create a profile first.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("userName").textContent = userData.name;
    document.getElementById("userOffered").textContent = userData.offeredSkills.join(", ") || "None";
    document.getElementById("userNeeded").textContent = userData.neededSkills.join(", ") || "None";

    welcome.style.display = "none";
    dashboard.style.display = "block";
}