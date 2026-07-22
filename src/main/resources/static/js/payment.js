const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "../pages/login.html";
}

if (user.role !== "CUSTOMER") {
    alert("Access Denied!");
    window.location.href = "provider_dashboard.html";
}

const params = new URLSearchParams(window.location.search);
const paymentId = params.get("paymentId");

if (!paymentId) {
    alert("Invalid Payment.");
    window.location.href = "customer_dashboard.html";
}

function loadPayment() {

    fetch("http://localhost:8080/api/payments/" + paymentId)

        .then(res => {

            if (!res.ok) {
                throw new Error("Payment not found");
            }

            return res.json();

        })

        .then(payment => {

            document.getElementById("providerName").innerText =
                payment.booking.serviceProvider.name;

            document.getElementById("packageName").innerText =
                payment.booking.bookingPackage.name;

            document.getElementById("eventType").innerText =
                payment.booking.eventType;

            document.getElementById("eventDate").innerText =
                payment.booking.eventDate;

            document.getElementById("eventTime").innerText =
                payment.booking.eventTime;

            document.getElementById("amount").innerText =
                "Rs. " + payment.amount;

        })

        .catch(error => {

            console.log(error);

            alert("Failed to load payment.");

            window.location.href = "customer_dashboard.html";

        });

}

loadPayment();

function confirmPayment() {

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const cardHolder =
        document.getElementById("cardHolder").value;

    const cardNumber =
        document.getElementById("cardNumber").value;

    const expiryDate =
        document.getElementById("expiryDate").value;

    const cvv =
        document.getElementById("cvv").value;

    const billingAddress =
        document.getElementById("billingAddress").value;

    const agree =
        document.getElementById("agree").checked;

    if (paymentMethod === "") {
        alert("Please select payment method.");
        return;
    }

    if (cardHolder === "" ||
        cardNumber === "" ||
        expiryDate === "" ||
        cvv === "" ||
        billingAddress === "") {

        alert("Please fill all payment details.");
        return;
    }

    if (!agree) {
        alert("Please accept Terms & Conditions.");
        return;
    }

    const paymentRequest = {

        paymentMethod: paymentMethod,
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        billingAddress: billingAddress

    };

    fetch("http://localhost:8080/api/payments/" + paymentId + "/pay", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(paymentRequest)

    })

        .then(res => {

            if (!res.ok) {
                throw new Error("Payment Failed");
            }

            return res.json();

        })

        .then(() => {

            alert("Payment Successful!");

            window.location.href = "customer_dashboard.html";

        })

        .catch(error => {

            console.log(error);

            alert("Payment Failed.");

        });

}

function logout() {

    localStorage.removeItem("user");

    window.location.href = "../index.html";

}