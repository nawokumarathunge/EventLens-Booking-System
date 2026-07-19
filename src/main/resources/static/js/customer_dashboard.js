function hideAllSections() {

    document.getElementById("packagesSection").style.display = "none";
    document.getElementById("bookingsSection").style.display = "none";
    document.getElementById("notificationsSection").style.display = "none";
    document.getElementById("reviewsSection").style.display = "none";

}
function showPackages() {

    hideAllSections();

    document.getElementById("packagesSection").style.display = "block";

    loadPackages();

}
function showBookings(){

    hideAllSections();

    document.getElementById("bookingsSection").style.display = "block";

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    fetch("http://localhost:8080/api/bookings/customer/" + user.id)

        .catch(error=>{

            console.log(error);

            alert("Failed to load bookings");

        })

        .then(response => response.json())

        .then(bookings => {

            let body = document.getElementById("bookingTableBody");

            body.innerHTML = "";

            bookings.forEach(booking => {

                body.innerHTML += `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.serviceProvider.name}</td>
                    <td>${booking.eventType}</td>
                    <td>${booking.eventDate}</td>
                    <td>${booking.status}</td>
                </tr>
            `;

            });

        });

    document.getElementById("bookingsSection").scrollIntoView({
        behavior:"smooth"
    });

}

function showNotifications() {

    hideAllSections();

    document.getElementById("notificationsSection").style.display = "block";

}

function showReviews() {

    hideAllSections();

    document.getElementById("reviewsSection").style.display = "block";

}

let user = JSON.parse(
    localStorage.getItem("user")
);


if(user){

    document.getElementById("userName").innerHTML = user.name;

}
else{

    window.location.href="login.html";

}

function logout(){

    localStorage.removeItem("user");

    window.location.href="../index.html";

}

function loadPackages() {

    fetch("http://localhost:8080/api/packages")
        .then(response => response.json())
        .then(packages => {

            const container = document.getElementById("packagesContainer");

            container.innerHTML = "";

            packages.forEach(pkg => {

                container.innerHTML += `
                    <div class="col-lg-4">

                        <div class="card shadow h-100">

                            <div class="card-body text-center p-5">

                                <h3>${pkg.name}</h3>

                                <h2 class="text-warning fw-bold">
                                    Rs. ${pkg.price}
                                </h2>

                                <hr>

                                <p>${pkg.description}</p>

                                <button
                                    class="btn btn-warning"
                                    onclick="bookPackage(${pkg.id})">

                                    Book Now

                                </button>

                            </div>

                        </div>

                    </div>
                `;

            });

        })
        .catch(error => console.log(error));

}

function bookPackage(packageId){

    window.location.href =
        "../providers.html?packageId=" + packageId;

}

window.onload = function () {

    loadPackages();

};
