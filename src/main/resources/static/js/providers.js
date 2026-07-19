fetch("http://localhost:8080/api/users/providers")
    .then(response => response.json())
    .then(data => {

        let container = document.getElementById("providersContainer");

        data.forEach(provider => {

            container.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card shadow">

                        <div class="card-body text-center">

                            <h5>${provider.name}</h5>

                            <p>${provider.role}</p>

                            <p>${provider.email}</p>

                            <a href="#"
   onclick="bookProvider(${provider.id})"
   class="btn btn-warning w-100">

    Book Now

</a>

                        </div>
                    </div>
                </div>
            `;

        });

    })
    .catch(error => console.log(error));

function bookProvider(providerId){

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        localStorage.setItem(
            "redirectAfterLogin",
            "pages/booking.html?providerId=" + providerId
        );

        alert("Please login first.");

        window.location.href = "pages/login.html";
        return;
    }

    if(user.role !== "CUSTOMER"){
        alert("Only customers can make bookings.");
        return;
    }

    window.location.href = "pages/booking.html?providerId=" + providerId;
}

