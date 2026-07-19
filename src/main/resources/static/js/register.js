function showForm() {
    let role = document.getElementById("roleSelect").value;

    document.getElementById("customerForm").classList.add("d-none");
    document.getElementById("providerForm").classList.add("d-none");

    if (role === "customer") {
        document.getElementById("customerForm").classList.remove("d-none");
    }

    if (role === "provider") {
        document.getElementById("providerForm").classList.remove("d-none");
    }
}
function registerUser(event){

    event.preventDefault();


    let role = document.getElementById("roleSelect").value;


    let data = {};


    if(role === "customer"){

        data = {

            name: document.getElementById("customerName").value,
            email: document.getElementById("customerEmail").value,
            password: document.getElementById("customerPassword").value,
            role: "CUSTOMER"

        };

    }


    else if(role === "provider"){

        data = {

            name: document.getElementById("providerName").value,
            email: document.getElementById("providerEmail").value,
            password: document.getElementById("providerPassword").value,
            role: document.getElementById("providerRole").value
        };

    }



    fetch("http://localhost:8080/api/users/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })


        .then(response=>{

            if(!response.ok){
                throw new Error("Registration failed");
            }

            return response.text();

        })


        .then(result=>{

            alert(result);

            window.location.href="login.html";

        })


        .catch(error=>{

            console.log(error);
            alert("Registration Failed!");

        });


}