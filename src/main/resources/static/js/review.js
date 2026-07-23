const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");
const ratingText = document.getElementById("ratingText");

let bookingId = null;

const params = new URLSearchParams(window.location.search);

bookingId = params.get("bookingId");

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}
fetch("http://localhost:8080/api/bookings/" + bookingId)
    .then(res => res.json())
    .then(booking => {

        document.getElementById("providerName").value =
            booking.serviceProvider.name;

    });
// Star Rating
stars.forEach(star => {

    star.addEventListener("click", function () {

        const rating = this.dataset.value;

        ratingInput.value = rating;

        stars.forEach((s, index) => {

            if (index < rating) {

                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
                s.classList.add("active");

            } else {

                s.classList.remove("fa-solid");
                s.classList.remove("active");
                s.classList.add("fa-regular");

            }

        });

        ratingText.innerHTML = "You selected " + rating + " Star(s)";

    });

});

function submitReview() {

    if (ratingInput.value == 0) {

        alert("Please select a rating.");
        return;

    }

    const review = {

        bookingId: bookingId,
        rating: parseInt(ratingInput.value),
        comment: document.getElementById("comment").value

    };

    fetch("http://localhost:8080/api/reviews", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(review)

    })

        .then(res => {

            if (!res.ok)
                throw new Error("Failed");

            return res.json();

        })

        .then(() => {

            alert("Review Submitted Successfully!");

            window.location.href = "customer_dashboard.html";

        })

        .catch(err => {

            console.log(err);

            alert("Failed to submit review.");

        });

}