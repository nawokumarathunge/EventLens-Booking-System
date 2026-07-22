    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
    alert("Please login first!");
    window.location.href = "pages/login.html";
}

    if (user.role !== "CUSTOMER") {
    alert("Only customers can make bookings!");
    window.location.href = "index.html";
}

    const customerId = user.id;
    let providerId;


    const params = new URLSearchParams(window.location.search);

    providerId = params.get("providerId");

    if (!providerId) {
    alert("Invalid provider!");
    window.location.href = "providers.html";
}


    // Load provider name
    fetch(`http://localhost:8080/api/users/${providerId}`)
    .then(response => {
    if (!response.ok) {
    throw new Error("Provider not found");
}
    return response.json();
})
    .then(provider => {
    document.getElementById("providerName").value = provider.name;
})
    .catch(error => {
    alert("Provider not found!");
    window.location.href = "providers.html";
});

    fetch("http://localhost:8080/api/packages")
    .then(response => response.json())
    .then(packages => {


    let packageSelect = document.getElementById("package");

    packages.forEach(pkg => {

    packageSelect.innerHTML += `

        <option value="${pkg.id}">
            ${pkg.name} - Rs.${pkg.price}
        </option> `;
});
});

    function confirmBooking() {

        const bookingData = {

            customerId: customerId,
            serviceProviderId: providerId,
            packageId: Number(document.getElementById("package").value),
            eventType: document.getElementById("eventType").value,
            eventDate: document.getElementById("eventDate").value,
            eventTime: document.getElementById("eventTime").value,
            location: document.getElementById("location").value,
            specialRequest: document.getElementById("notes").value

        };

        console.log(bookingData);

        fetch("http://localhost:8080/api/bookings", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookingData)

        })

            .then(async response => {

                const text = await response.text();

                if(response.ok){

                    alert("Booking request sent successfully.\nPlease wait until the provider confirms your booking.");

                    window.location.href = "customer_dashboard.html";

                }else{

                    alert("Booking Failed : " + text);

                }

            })

            .catch(error => {

                console.log(error);

                alert("Booking Failed");

            });

    }
