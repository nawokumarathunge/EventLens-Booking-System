function hideAllSections() {

    document.getElementById("packagesSection").style.display = "none";
    document.getElementById("bookingsSection").style.display = "none";
    document.getElementById("reviewsSection").style.display = "none";
    document.getElementById("paymentsSection").style.display = "none";

}
function showPackages() {

    hideAllSections();

    document.getElementById("packagesSection").style.display = "block";

    loadPackages();

}
function showBookings(){

    hideAllSections();

    document.getElementById("bookingsSection").style.display = "block";

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        window.location.href = "login.html";

    }

    if (user.role !== "CUSTOMER") {

        alert("Access Denied!");

        window.location.href = "provider_dashboard.html";

    }
    function logout(){

        localStorage.removeItem("user");

        window.location.href = "../index.html";

    }

    document.getElementById("userName").innerHTML = user.name;

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

function showPayments() {

    hideAllSections();

    document.getElementById("paymentsSection").style.display = "block";

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8080/api/payments/customer/" + user.id)
        .then(res => res.json())
        .then(payments => {

            console.log(payments);

            const body = document.getElementById("paymentTableBody");

            body.innerHTML = "";

            if (payments.length === 0) {

                body.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">
                            No pending payments.
                        </td>
                    </tr>
                `;
                return;
            }

            payments.forEach(payment => {

                console.log(payment);

                if (payment.status === "PENDING") {

                    body.innerHTML += `
                        <tr>

                            <td>${payment.booking.id}</td>

                            <td>${payment.booking.serviceProvider.name}</td>

                            <td>${payment.booking.bookingPackage.name}</td>

                            <td>Rs. ${payment.amount}</td>

                            <td>
                                <button class="btn btn-success"
                                    onclick="goToPayment(${payment.id})">

                                    Pay Now

                                </button>
                            </td>

                        </tr>
                    `;
                }

            });

        })
        .catch(err => {

            console.log(err);

            alert("Failed to load payments.");

        });

}

function goToPayment(paymentId){

    window.location.href =
        "payment.html?paymentId=" + paymentId;

}
function loadNotifications() {

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8080/api/notifications/user/" + user.id)
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("notificationList");

            list.innerHTML =
                `<li><h6 class="dropdown-header">Notifications</h6></li>`;

            const unread = data.filter(n => !n.isRead).length;

            document.getElementById("notificationCount").innerText = unread;

            if (data.length === 0) {

                list.innerHTML += `
                    <li>
                        <span class="dropdown-item-text text-muted">
                            No notifications
                        </span>
                    </li>
                `;

                return;
            }

            data.forEach(n => {

                list.innerHTML += `

<li>

<a href="#"
   class="dropdown-item"
   onclick="markAsRead(${n.id})">

<div class="fw-bold">${n.title}</div>

<div class="small text-muted"
     style="white-space:normal;
            word-wrap:break-word;
            overflow-wrap:break-word;">

${n.message}

</div>

</a>

</li>

<li><hr class="dropdown-divider"></li>

`;

            });

        });

}

function markAsRead(id){

    fetch("http://localhost:8080/api/notifications/" + id + "/read",{
        method:"PUT"
    })
        .then(() => {
            loadNotifications();
        });

}

window.onload=function(){

    loadPackages();
    loadNotifications();

}
