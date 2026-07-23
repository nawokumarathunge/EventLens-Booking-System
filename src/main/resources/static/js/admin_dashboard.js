function loadDashboardSummary() {

    fetch("http://localhost:8080/api/users/count/customers")
        .then(res => res.text())
        .then(count => {
            document.getElementById("totalCustomers").innerText = count;
        });

    fetch("http://localhost:8080/api/users/count/providers")
        .then(res => res.text())
        .then(count => {
            document.getElementById("totalProviders").innerText = count;
        });

    fetch("http://localhost:8080/api/bookings/count")
        .then(res => res.text())
        .then(count => {
            document.getElementById("totalBookings").innerText = count;
        });

    fetch("http://localhost:8080/api/reviews/count")
        .then(res => res.text())
        .then(count => {
            document.getElementById("totalReviews").innerText = count;
        });

    fetch("http://localhost:8080/api/payments/revenue")
        .then(res => res.text())
        .then(amount => {
            document.getElementById("totalRevenue").innerHTML =
                "Rs. " + (amount || "0.00");
        });

    fetch("http://localhost:8080/api/payments/revenue")
        .then(res => res.text())
        .then(amount => {
            document.getElementById("totalRevenue").innerText =
                "Rs. " + (amount || 0);
        });

}

function loadCustomers() {

    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(users => {

            const body = document.getElementById("customersBody");

            body.innerHTML = "";

            users
                .filter(u => u.role === "CUSTOMER")
                .forEach(u => {

                    body.innerHTML += `
                    <tr>
                        <td>${u.id}</td>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td>${u.phone ?? "-"}</td>
                        <td>
                            <span class="badge bg-success">
                                Active
                            </span>
                        </td>
                        <td>
    <button class="btn btn-warning btn-sm"
onclick="editUser(${u.id})">
    Edit
</button>

    <button class="btn btn-danger btn-sm"
onclick="deleteUser(${u.id})">
Delete
</button>
</td>
                    </tr>
                    `;
                });

        });

}

function loadProviders() {

    fetch("http://localhost:8080/api/users/providers")
        .then(res=>res.json())
        .then(data=>{

            let body=document.getElementById("providersBody");

            body.innerHTML="";

            data.forEach(p=>{

                body.innerHTML+=`
                <tr>

                    <td>${p.id}</td>

                    <td>${p.name}</td>

                    <td>${p.role}</td>

                    <td>-</td>

                    <td>
                        <span class="badge bg-success">
                            Verified
                        </span>
                    </td>

                    <td>

   <button class="btn btn-warning btn-sm"
onclick="editUser(${p.id})">
    Edit
</button>

    <button class="btn btn-danger btn-sm"
        onclick="deleteUser(${p.id})">
        Delete
    </button>

</td>

                </tr>
                `;

            });

        });

}

function loadBookings(){

    fetch("http://localhost:8080/api/bookings")
        .then(res=>res.json())
        .then(bookings=>{

            let body=document.getElementById("bookingsBody");

            body.innerHTML="";

            bookings.forEach(b=>{

                body.innerHTML+=`

                <tr>

                    <td>${b.id}</td>

                    <td>${b.customer.name}</td>

                    <td>${b.serviceProvider.name}</td>

                    <td>${b.eventDate}</td>

                    <td>${b.status}</td>

                    <td>
    <button class="btn btn-success btn-sm" onclick="confirmBooking(${b.id})">
        Accept
    </button>

    <button class="btn btn-danger btn-sm" onclick="rejectBooking(${b.id})">
        Reject
    </button>

    <button class="btn btn-primary btn-sm" onclick="completeBooking(${b.id})">
        Complete
    </button>
</td>

                </tr>

                `;

            });

        });

}

function loadPayments(){

    fetch("http://localhost:8080/api/payments")
        .then(res=>res.json())
        .then(payments=>{

            let body=document.getElementById("paymentsBody");

            body.innerHTML="";

            payments.forEach(p=>{

                body.innerHTML+=`

                <tr>

                    <td>${p.id}</td>

                    <td>${p.customer.name}</td>

                    <td>Rs.${p.amount}</td>

                    <td>${p.paymentMethod}</td>

                    <td>

        <span class="badge ${
                    p.status==="SUCCESS"
                        ? "bg-success"
                        : "bg-warning text-dark"
                }">

            ${p.status}

        </span>

    </td>

                    
                     <td>
        <button
            class="btn btn-primary btn-sm"
            onclick="viewPayment(${p.id})">
            View
        </button>
    </td>

                </tr>

                `;

            });

        });

}

function loadReviews(){

    fetch("http://localhost:8080/api/reviews")
        .then(res=>res.json())
        .then(reviews=>{
            console.log("Reviews:", reviews);
            console.log(document.getElementById("reviewsBody"));

            let body=document.getElementById("reviewsBody");

            body.innerHTML="";

            reviews.forEach(r=>{

                console.log(r);


                body.innerHTML+=`

                <tr>

                    <td>${r.customer ? r.customer.name : "-"}</td>
                    <td>${r.serviceProvider ? r.serviceProvider.name : "-"}</td>
                    <td>${r.rating} ⭐</td>
                    <td>${r.comment}</td>
                    <td>

                        <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteReview(${r.id})">

                        Delete

                        </button>

                    </td>

                </tr>

                `;

            });

        });

}

function loadDashboard(){

    fetch("http://localhost:8080/api/users")
        .then(r=>r.json())
        .then(users=>{

            document.getElementById("totalCustomers").innerText =
                users.filter(u=>u.role=="CUSTOMER").length;

            document.getElementById("totalProviders").innerText =
                users.filter(u=>
                    u.role=="PHOTOGRAPHER" ||
                    u.role=="VIDEOGRAPHER"
                ).length;

        });

    fetch("http://localhost:8080/api/bookings")
        .then(r=>r.json())
        .then(data=>{

            document.getElementById("totalBookings").innerText=data.length;

        });

    fetch("http://localhost:8080/api/reviews")
        .then(r=>r.json())
        .then(data=>{

            document.getElementById("totalReviews").innerText=data.length;

        });

    fetch("http://localhost:8080/api/payments")
        .then(r=>r.json())
        .then(data=>{

            document.getElementById("pendingPayments").innerText =
                data.filter(p=>p.status=="PENDING").length;

        });

}

function loadPackages(){

    fetch("http://localhost:8080/api/packages")
        .then(res=>res.json())
        .then(packages=>{

            console.log(packages);

            let body=document.getElementById("packagesBody");

            body.innerHTML="";

            packages.forEach(pkg=>{

                body.innerHTML+=`
            <tr>

                <td>${pkg.id}</td>

                <td>${pkg.name}</td>

                <td>${pkg.price}</td>

                <td>${pkg.hours} Hours</td>

                <td>
                    <td>
    <button class="btn btn-success btn-sm"
        onclick="editPackage(${pkg.id})">
        Edit
    </button>

    <button class="btn btn-danger btn-sm"
        onclick="deletePackage(${pkg.id})">
        Delete
    </button>
</td>
                </td>

            </tr>
            `;

            });

        });

}

window.onload=function(){

    loadDashboard();

    loadCustomers();

    loadProviders();

    loadPackages();

    loadBookings();

    loadPayments();

    loadReviews();

    loadDashboardSummary();


}

function deleteReview(id) {
    if (!confirm("Delete this review?")) return;

    fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) throw new Error("Delete failed");
            return res.text();
        })
        .then(() => {
            // Remove row instantly (no full reload)
            const row = document.querySelector(`button[onclick="deleteReview(${id})"]`).closest("tr");
            row.remove();

            // Update review count
            const countEl = document.getElementById("totalReviews");
            countEl.innerText = parseInt(countEl.innerText) - 1;
        })
        .catch(err => {
            console.error(err);
            alert("Error deleting review");
        });
}

function searchCustomer() {

    const keyword = document.getElementById("searchCustomer")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#customersBody tr");

    rows.forEach(row => {

        const id = row.cells[0].innerText.toLowerCase();
        const name = row.cells[1].innerText.toLowerCase();
        const email = row.cells[2].innerText.toLowerCase();
        const phone = row.cells[3].innerText.toLowerCase();

        if (
            id.includes(keyword) ||
            name.includes(keyword) ||
            email.includes(keyword) ||
            phone.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function searchProvider() {

    const keyword = document.getElementById("searchProvider")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#providersBody tr");

    rows.forEach(row => {

        const id = row.cells[0].innerText.toLowerCase();
        const name = row.cells[1].innerText.toLowerCase();
        const service = row.cells[2].innerText.toLowerCase();
        const rating = row.cells[3].innerText.toLowerCase();
        const status = row.cells[4].innerText.toLowerCase();

        if (
            id.includes(keyword) ||
            name.includes(keyword) ||
            service.includes(keyword) ||
            rating.includes(keyword) ||
            status.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function searchPackage() {

    const keyword = document.getElementById("searchPackage")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#packagesBody tr");

    rows.forEach(row => {

        const id = row.cells[0].innerText.toLowerCase();
        const name = row.cells[1].innerText.toLowerCase();
        const price = row.cells[2].innerText.toLowerCase();
        const duration = row.cells[3].innerText.toLowerCase();

        if (
            id.includes(keyword) ||
            name.includes(keyword) ||
            price.includes(keyword) ||
            duration.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function searchBooking() {

    const keyword = document.getElementById("searchBooking")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#bookingsBody tr");

    rows.forEach(row => {

        const bookingId = row.cells[0].innerText.toLowerCase();
        const customer = row.cells[1].innerText.toLowerCase();
        const provider = row.cells[2].innerText.toLowerCase();
        const date = row.cells[3].innerText.toLowerCase();
        const status = row.cells[4].innerText.toLowerCase();

        if (
            bookingId.includes(keyword) ||
            customer.includes(keyword) ||
            provider.includes(keyword) ||
            date.includes(keyword) ||
            status.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function searchPayment() {

    const keyword = document.getElementById("searchPayment")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#paymentsBody tr");

    rows.forEach(row => {

        const paymentId = row.cells[0].innerText.toLowerCase();
        const customer = row.cells[1].innerText.toLowerCase();
        const amount = row.cells[2].innerText.toLowerCase();
        const method = row.cells[3].innerText.toLowerCase();
        const status = row.cells[4].innerText.toLowerCase();

        if (
            paymentId.includes(keyword) ||
            customer.includes(keyword) ||
            amount.includes(keyword) ||
            method.includes(keyword) ||
            status.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function searchReview() {

    const keyword = document.getElementById("searchReview")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#reviewsBody tr");

    rows.forEach(row => {

        const customer = row.cells[0].innerText.toLowerCase();
        const provider = row.cells[1].innerText.toLowerCase();
        const rating = row.cells[2].innerText.toLowerCase();
        const review = row.cells[3].innerText.toLowerCase();

        if (
            customer.includes(keyword) ||
            provider.includes(keyword) ||
            rating.includes(keyword) ||
            review.includes(keyword)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

function editUser(id){

    fetch(`http://localhost:8080/api/users/${id}`)
        .then(res=>res.json())
        .then(user=>{

            document.getElementById("editUserId").value=user.id;
            document.getElementById("editName").value=user.name;
            document.getElementById("editEmail").value=user.email;
            document.getElementById("editPhone").value=user.phone || "";

            const modal =
                new bootstrap.Modal(document.getElementById("editUserModal"));

            modal.show();

        });

}

function updateUser(){

    const id=document.getElementById("editUserId").value;

    const user={

        name:document.getElementById("editName").value,

        email:document.getElementById("editEmail").value,

        phone:document.getElementById("editPhone").value

    };

    fetch(`http://localhost:8080/api/users/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    })

        .then(res=>{

            if(!res.ok)
                throw new Error("Update Failed");

            return res.json();

        })

        .then(()=>{

            alert("User Updated Successfully");

            bootstrap.Modal.getInstance(
                document.getElementById("editUserModal")
            ).hide();

            loadCustomers();
            loadProviders();

        })

        .catch(err=>{

            console.log(err);

            alert("Update Failed");

        });

}

function showAddCustomerModal(){

    document.getElementById("addUserTitle").innerText="Add Customer";

    document.getElementById("userRole").value="CUSTOMER";

    clearAddForm();

    new bootstrap.Modal(
        document.getElementById("addUserModal")
    ).show();

}

function showAddProviderModal(){

    document.getElementById("addUserTitle").innerText="Add Provider";

    document.getElementById("userRole").value="PHOTOGRAPHER";

    clearAddForm();

    new bootstrap.Modal(
        document.getElementById("addUserModal")
    ).show();

}

function clearAddForm(){

    document.getElementById("addName").value="";
    document.getElementById("addEmail").value="";
    document.getElementById("addPhone").value="";
    document.getElementById("addPassword").value="";

}

function saveUser(){

    const user={

        name:document.getElementById("addName").value,

        email:document.getElementById("addEmail").value,

        phone:document.getElementById("addPhone").value,

        password:document.getElementById("addPassword").value,

        role:document.getElementById("userRole").value

    };

    fetch("http://localhost:8080/api/users/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    })

        .then(res=>{

            if(!res.ok)
                throw new Error("Registration Failed");

            return res.text();

        })

        .then(()=>{

            alert("User Added Successfully");

            bootstrap.Modal.getInstance(
                document.getElementById("addUserModal")
            ).hide();

            loadCustomers();
            loadProviders();
            loadDashboardSummary();

        })

        .catch(err=>{

            console.log(err);

            alert("Error Adding User");

        });

}

function deleteUser(id) {

    if (!confirm("Delete this user?")) return;

    fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Delete failed");
            }
            return res.text();
        })
        .then(() => {

            alert("User deleted successfully");

            loadCustomers();
            loadProviders();
            loadDashboardSummary();

        })
        .catch(err => {
            console.error(err);
            alert("Error deleting user");
        });

}

function savePackage() {

    let id = document.getElementById("packageId").value;

    let pkg = {

        name: document.getElementById("packageName").value,
        price: document.getElementById("packagePrice").value,
        hours: document.getElementById("packageHours").value,
        description: ""

    };

    let method = id ? "PUT" : "POST";

    let url = id
        ? `http://localhost:8080/api/packages/${id}`
        : "http://localhost:8080/api/packages";

    fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(pkg)

    })
        .then(res => {

            if(!res.ok){
                throw new Error("Save failed");
            }

            return res.json();

        })
        .then(() => {

            bootstrap.Modal
                .getInstance(document.getElementById("packageModal"))
                .hide();

            loadPackages();

        })
        .catch(err => {

            console.error(err);

            alert("Error saving package");

        });

}

function editPackage(id){

    fetch(`http://localhost:8080/api/packages/${id}`)

        .then(res=>res.json())

        .then(pkg=>{

            document.getElementById("packageId").value = pkg.id;
            document.getElementById("packageName").value = pkg.name;
            document.getElementById("packagePrice").value = pkg.price;
            document.getElementById("packageHours").value = pkg.hours;

            new bootstrap.Modal(
                document.getElementById("packageModal")
            ).show();

        });

}

function deletePackage(id){

    if(!confirm("Delete this package?")) return;

    fetch(`http://localhost:8080/api/packages/${id}`,{

        method:"DELETE"

    })
        .then(res=>{

            if(!res.ok){
                throw new Error("Delete failed");
            }

            loadPackages();

        })
        .catch(err=>{

            console.error(err);

            alert("Error deleting package");

        });
}

async function confirmBooking(id){

    const response = await fetch(`http://localhost:8080/api/bookings/${id}/confirm`,{
        method:"PUT"
    });

    if(response.ok){
        alert("Booking confirmed");
        loadBookings();
    }else{
        alert("Failed");
    }

}

async function rejectBooking(id){

    const response = await fetch(`http://localhost:8080/api/bookings/${id}/reject`,{
        method:"PUT"
    });

    if(response.ok){
        alert("Booking rejected");
        loadBookings();
    }else{
        alert("Failed");
    }

}

async function completeBooking(id){

    const response = await fetch(`http://localhost:8080/api/bookings/${id}/complete`,{
        method:"PUT"
    });

    if(response.ok){
        alert("Booking completed");
        loadBookings();
    }else{
        alert("Failed");
    }

}

function viewPayment(id){

    fetch("http://localhost:8080/api/payments/"+id)

        .then(res=>res.json())

        .then(payment=>{

            document.getElementById("mPaymentId").innerText=payment.id;

            document.getElementById("mCustomer").innerText=
                payment.customer.name;

            document.getElementById("mBooking").innerText=
                payment.booking.id;

            document.getElementById("mAmount").innerText=
                "Rs."+payment.amount;

            document.getElementById("mMethod").innerText=
                payment.paymentMethod ?? "-";

            document.getElementById("mDate").innerText=
                payment.paymentDate ?? "-";

            let badge="";

            if(payment.status==="SUCCESS"){

                badge='<span class="badge bg-success">SUCCESS</span>';

            }
            else{

                badge='<span class="badge bg-warning text-dark">PENDING</span>';

            }

            document.getElementById("mStatus").innerHTML=badge;

            new bootstrap.Modal(
                document.getElementById("paymentModal")
            ).show();

        });

}