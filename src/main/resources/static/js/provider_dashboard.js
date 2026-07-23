let user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    window.location.href = "../pages/login.html";

}
if (
    user.role !== "PHOTOGRAPHER" &&
    user.role !== "VIDEOGRAPHER"
) {

    alert("Access Denied!");

    window.location.href = "customer_dashboard.html";

}


function logout(){

    localStorage.removeItem("user");

    window.location.href="../index.html";

}

loadBookings();

function loadBookings() {

    const provider = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8080/api/bookings/provider/" + provider.id)

        .then(response => response.json())

        .then(bookings => {

            let body = document.getElementById("bookingTableBody");

            body.innerHTML = "";

            bookings.forEach(booking => {

                let badge = "";

                if (booking.status === "PENDING")
                    badge = "bg-warning";

                else if (booking.status === "CONFIRMED")
                    badge = "bg-success";

                else if (booking.status === "REJECTED")
                    badge = "bg-danger";

                else
                    badge = "bg-secondary";

                body.innerHTML += `

<tr>

<td>${booking.customer.name}</td>

<td>${booking.bookingPackage.name}</td>

<td>${booking.eventType}</td>

<td>${booking.eventDate}</td>

<td>
<span class="badge ${badge}">
${booking.status}
</span>
</td>

<td>

<div class="d-flex flex-column gap-1">

<button class="btn btn-success btn-sm"
onclick="confirmBooking(${booking.id})">
<i class="fa fa-check"></i> Confirm
</button>

<button class="btn btn-danger btn-sm"
onclick="rejectBooking(${booking.id})">
<i class="fa fa-times"></i> Reject
</button>

<button class="btn btn-primary btn-sm"
onclick="completeBooking(${booking.id})">
<i class="fa fa-circle-check"></i> Complete
</button>

<button class="btn btn-info btn-sm"
onclick="viewBooking(${booking.id})">

<i class="fa fa-eye"></i>

</button>
</div>

</td>
</tr>

`;});
            document.getElementById("totalBookings").innerText = bookings.length;

            document.getElementById("completedBookings").innerText =
                bookings.filter(b => b.status === "COMPLETED").length;

            document.getElementById("pendingBookings").innerText =
                bookings.filter(b => b.status === "PENDING").length;

        });

}

function confirmBooking(id){

    fetch("http://localhost:8080/api/bookings/" + id + "/confirm",{

        method:"PUT"

    })

        .then(()=>{

            alert("Booking Confirmed");

            loadBookings();

        });

}


function rejectBooking(id){

    fetch("http://localhost:8080/api/bookings/" + id + "/reject",{

        method:"PUT"

    })

        .then(()=>{

            alert("Booking Rejected");

            loadBookings();

        });

}


function completeBooking(id){

    fetch("http://localhost:8080/api/bookings/" + id + "/complete",{

        method:"PUT"

    })

        .then(()=>{

            alert("Booking Completed");

            loadBookings();

        });

}

loadPackages();

function loadPackages() {

    fetch("http://localhost:8080/api/packages/provider/" + user.id)
        .then(res => res.json())
        .then(data => {

            let html = "";

            data.forEach(pkg => {

                html += `

<div class="col-md-4 mb-4">

    <div class="card shadow border-0 text-center h-100 p-4">

        <i class="fa-solid fa-camera text-warning fa-3x mb-3"></i>

        <h3 class="fw-bold">${pkg.name}</h3>

        <h2 class="text-warning fw-bold">
            Rs. ${pkg.price}
        </h2>

        <hr>

        <p>${pkg.description}</p>

        <p class="text-muted">
            <i class="fa-solid fa-clock"></i>
            ${pkg.hours} Hours
        </p>

        <div class="d-grid gap-2">

            <button class="btn btn-warning"
                    onclick="editPackage(${pkg.id})">
                <i class="fa-solid fa-pen"></i> Edit
            </button>

            <button class="btn btn-danger"
                    onclick="deletePackage(${pkg.id})">
                <i class="fa-solid fa-trash"></i> Delete
            </button>

        </div>

    </div>

</div>

`;

            });

            document.getElementById("packageList").innerHTML =
                `<div class="row">${html}</div>`;

            document.getElementById("totalPackages").innerText = data.length;

        });

}

function deletePackage(id){

    if(!confirm("Delete Package?")) return;

    fetch("http://localhost:8080/api/packages/"+id,{

        method:"DELETE"

    })

        .then(()=>{

            loadPackages();

        });

}

function showAddPackageForm(){

    new bootstrap.Modal(
        document.getElementById("packageModal")
    ).show();

}

function savePackage(){

    const provider = JSON.parse(localStorage.getItem("user"));

    const data = {
        name: document.getElementById("pkgName").value,
        price: document.getElementById("pkgPrice").value,
        hours: document.getElementById("pkgHours").value,
        description: document.getElementById("pkgDescription").value,
        serviceProvider: {
            id: provider.id
        }
    };

    fetch("http://localhost:8080/api/packages",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

        .then(() => {

            bootstrap.Modal.getInstance(
                document.getElementById("packageModal")
            ).hide();

            document.getElementById("pkgName").value = "";
            document.getElementById("pkgPrice").value = "";
            document.getElementById("pkgHours").value = "";
            document.getElementById("pkgDescription").value = "";

            loadPackages();

            showPackages();

            alert("Package Added Successfully!");

        });

}
function editPackage(id){

    fetch("http://localhost:8080/api/packages/" + id)
        .then(res => res.json())
        .then(pkg => {

            document.getElementById("editPkgId").value = pkg.id;
            document.getElementById("editPkgName").value = pkg.name;
            document.getElementById("editPkgPrice").value = pkg.price;
            document.getElementById("editPkgHours").value = pkg.hours;
            document.getElementById("editPkgDescription").value = pkg.description;

            new bootstrap.Modal(
                document.getElementById("editPackageModal")
            ).show();

        });

}


function updatePackage(){

    const id = document.getElementById("editPkgId").value;

    const data = {

        id: id,
        name: document.getElementById("editPkgName").value,
        price: document.getElementById("editPkgPrice").value,
        hours: document.getElementById("editPkgHours").value,
        description: document.getElementById("editPkgDescription").value,

        serviceProvider:{
            id:user.id
        }

    };

    fetch("http://localhost:8080/api/packages/" + id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

        .then(()=>{

            alert("Package Updated Successfully");

            bootstrap.Modal.getInstance(
                document.getElementById("editPackageModal")
            ).hide();

            loadPackages();

        });

}

function hideAllSections(){

    document.getElementById("profileSection").style.display="none";
    document.getElementById("packagesSection").style.display="none";
    document.getElementById("bookingsSection").style.display="none";
    document.getElementById("summarySection").style.display="none";
    document.getElementById("reviewsSection").style.display="none";

}

function showProfile(){
    hideAllSections();
    document.getElementById("profileSection").style.display="block";
}

function showPackages(){
    hideAllSections();
    document.getElementById("packagesSection").style.display="block";
    document.getElementById("packagesSection").scrollIntoView({
        behavior: "smooth"
    });
}

function showBookings(){
    hideAllSections();
    document.getElementById("bookingsSection").style.display="block";
    document.getElementById("bookingsSection").scrollIntoView({
        behavior: "smooth"
    });
}

function showSummary(){
    hideAllSections();
    document.getElementById("summarySection").style.display="block";
    document.getElementById("summarySection").scrollIntoView({
        behavior: "smooth"
    });
}

function showReviews() {

    console.log("reviewsBody =", document.getElementById("reviewsBody"));

    hideAllSections();

    document.getElementById("reviewsSection").style.display = "block";

    const provider = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8080/api/reviews/provider/" + provider.id)
        .then(res => res.json())
        .then(reviews => {

            const body = document.getElementById("reviewsBody");

            console.log(reviews);

            body.innerHTML = "";

            if (reviews.length === 0) {

                body.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center">
                            No Reviews Yet
                        </td>
                    </tr>
                `;
                return;
            }

            reviews.forEach(review => {

                console.log(review);

                const row = document.createElement("tr");

                row.innerHTML = `
        <td>${review.customer?.name}</td>
        <td>${review.rating} ⭐</td>
        <td>${review.comment}</td>
        <td>${review.booking?.eventType}</td>
    `;

                body.appendChild(row);

            });

        })
        .catch(err => {
            console.log(err);
            alert("Failed to load reviews");
        });

    document.getElementById("reviewsSection").scrollIntoView({
        behavior: "smooth"
    });

}


document.getElementById("navProviderName").innerText = user.name;

function loadNotifications() {

    const provider = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8080/api/notifications/user/" + provider.id)

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
                            No Notifications
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
     style="white-space:normal">

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

        .then(()=>{

            loadNotifications();

        });

}

loadNotifications();