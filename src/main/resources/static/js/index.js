function goToBooking() {

    window.location.href = "providers.html";

}


let slides = document.querySelectorAll(".slide");

let current = 0;

function showNextSlide(){

    slides[current].classList.remove("active");

    current=(current+1)%slides.length;

    slides[current].classList.add("active");

}

setInterval(showNextSlide,4000);


    const sections = document.querySelectorAll("section, footer");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

    const sectionTop = section.offsetTop - 100;

    if(scrollY >= sectionTop){
    current = section.getAttribute("id");
}

});


    navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){

    link.classList.add("active");

}

});

});

const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("authButtons").innerHTML = `
        <span class="text-white me-3">
            Welcome, ${user.name}
        </span>

        <a href="${
        user.role === "CUSTOMER"
            ? "pages/customer_dashboard.html"
            : "pages/provider_dashboard.html"
    }" class="btn btn-warning me-2">
            Dashboard
        </a>

        <button class="btn btn-danger" onclick="logout()">
            Logout
        </button>
    `;
}

function logout(){

    localStorage.removeItem("user");

    window.location.href="index.html";

}