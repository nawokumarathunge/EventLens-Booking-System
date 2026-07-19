    function loginUser(){

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };


    fetch("http://localhost:8080/api/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })

        .then(response => {

            if(!response.ok){
                throw new Error("Login failed");
            }

            return response.json();

        })

        .then(user=>{

            console.log(user);


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            if(user.role === "CUSTOMER"){

                window.location.href="customer_dashboard.html";

            }

            else if(
                user.role === "PHOTOGRAPHER" ||
                user.role === "VIDEOGRAPHER"
            ){

                window.location.href="provider_dashboard.html";

            }

        })

        .catch(error => {

            alert("Invalid Email or Password.");
            console.log(error);

        });



}
