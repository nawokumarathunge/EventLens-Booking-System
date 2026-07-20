let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "../pages/login.html";
}

// Customer only
if (user.role !== "CUSTOMER") {
    alert("Access Denied!");
    window.location.href = "provider_dashboard.html";
}


function loadProfile() {

    document.getElementById("customerName").innerText =
        user.name;

    document.getElementById("customerRole").innerText =
        user.role;

    document.getElementById("customerEmail").innerText =
        user.email;

    document.getElementById("customerPhone").innerText =
        user.phone || "Not Available";

    document.getElementById("customerLocation").innerText =
        user.location || "Not Available";

    document.getElementById("customerAbout").innerText =
        user.about || "No description added.";

}

loadProfile();

function openEditProfile() {

    document.getElementById("editName").value =
        user.name;

    document.getElementById("editPhone").value =
        user.phone || "";

    document.getElementById("editLocation").value =
        user.location || "";

    document.getElementById("editAbout").value =
        user.about || "";

    const modal = new bootstrap.Modal(
        document.getElementById("editProfileModal")
    );

    modal.show();

}

function updateProfile() {

    const data = {

        id: user.id,

        name: document.getElementById("editName").value,

        email: user.email,

        password: user.password,

        role: user.role,

        phone: document.getElementById("editPhone").value,

        location: document.getElementById("editLocation").value,

        experience: user.experience || "",

        about: document.getElementById("editAbout").value

    };

    fetch("http://localhost:8080/api/users/" + user.id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Update Failed");
            }

            return response.json();

        })

        .then(updatedUser => {

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            user = updatedUser;

            loadProfile();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("editProfileModal")
            );

            if (modal) {
                modal.hide();
            }

            alert("Profile Updated Successfully!");

        })

        .catch(error => {

            console.error(error);

            alert("Failed to update profile.");

        });

}


function logout() {

    localStorage.removeItem("user");

    window.location.href = "../index.html";

}