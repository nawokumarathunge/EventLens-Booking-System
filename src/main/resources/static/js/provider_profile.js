let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "../pages/login.html";
}


function loadProfile() {

    document.getElementById("providerName").innerText =
        user.name;

    document.getElementById("providerRole").innerText =
        user.role;

    document.getElementById("providerEmail").innerText =
        user.email;

    document.getElementById("providerPhone").innerText =
        user.phone || "Not Available";

    document.getElementById("providerLocation").innerText =
        user.location || "Not Available";

    document.getElementById("providerExperience").innerText =
        user.experience || "Not Added";

    document.getElementById("providerAbout").innerText =
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

    document.getElementById("editExperience").value =
        user.experience || "";

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

        experience: document.getElementById("editExperience").value,

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
                throw new Error("Update failed");
            }

            return response.json();

        })

        .then(updatedUser => {

            // Update local variable
            user = updatedUser;

            // Save latest user
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // Refresh profile
            loadProfile();

            // Close modal
            const modal =
                bootstrap.Modal.getInstance(
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

function loadPortfolio() {

    fetch("http://localhost:8080/api/portfolio/provider/" + user.id)

        .then(res => res.json())

        .then(data => {

            let html = "";

            data.forEach(img => {

                html += `
                <div class="col-md-4">

                    <div class="card shadow border-0">

                        <img src="http://localhost:8080${img.imageUrl}"
                             class="card-img-top"
                             style="height:250px;object-fit:cover;">

                        <div class="card-body text-center">

                            <button class="btn btn-danger btn-sm"
                                    onclick="deletePortfolio(${img.id})">
                                <i class="fa fa-trash"></i> Delete
                            </button>

                        </div>

                    </div>

                </div>
                `;

            });

            document.getElementById("portfolioGallery").innerHTML = html;

        });

}

