let user = JSON.parse(
    localStorage.getItem("user")
);


if(user){

    document.getElementById("providerName").innerHTML = user.name;

    document.getElementById("providerRole").innerHTML = user.role;

    document.getElementById("providerEmail").innerHTML = user.email;

}
else{

    window.location.href="login.html";

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

<button class="btn btn-success btn-sm"
onclick="confirmBooking(${booking.id})">

Confirm

</button>

<button class="btn btn-danger btn-sm"
onclick="rejectBooking(${booking.id})">

Reject

</button>

<button class="btn btn-primary btn-sm"
onclick="completeBooking(${booking.id})">

Complete

</button>

</td>

</tr>

`;

            });

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

function loadPackages(){

    fetch("http://localhost:8080/api/packages/provider/" + user.id)
        .then(res=>res.json())

        .then(data=>{

            let html="";

            data.forEach(pkg=>{

                html += `

<div class="card mb-2">

<div class="card-body">

<h5>${pkg.name}</h5>

<p>Rs.${pkg.price}</p>

<p>${pkg.hours} Hours</p>

<p>${pkg.description}</p>

<button class="btn btn-warning btn-sm"
onclick="editPackage(${pkg.id})">

Edit

</button>

<button class="btn btn-danger btn-sm"
onclick="deletePackage(${pkg.id})">

Delete

</button>

</div>

</div>

`;

            });

            document.getElementById("packageList").innerHTML = html;

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

        .then(()=>{

            location.reload();

        });

}