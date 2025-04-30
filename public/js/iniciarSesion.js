document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const formIniciarSesion = document.querySelector("#formIniciarSesion");

    //Eventos
   formIniciarSesion.addEventListener("submit", peticionInicioDeSesion);

    //Funciones
    function peticionInicioDeSesion(e) {
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const inputEmail = document.querySelector("#email").value;
        const inputPassword = document.querySelector("#password").value;

        const requestBody = {
            email: inputEmail,
            password: inputPassword
        };

        fetch("/auth/iniciar-sesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            const {status} = data;
            if (status === 200){
                generadorAlertas("success", "Iniciando Sesion", null);
            } else {
                generadorAlertas("error", "Error en inicio de sesion", data);
            }
        }).catch((error) => {
            console.log("Error en peticion al backend");
            console.log(error.message);
        })
    }

    function generadorAlertas(tipo, msg, errores){
        const divAlertas = document.querySelector("#divAlertas");
        divAlertas.innerHTML = "";

        if (tipo === "success"){
            const parrafoAlerta = document.createElement("p");
            parrafoAlerta.textContent = msg;
            parrafoAlerta.classList.add("bg-success", "px-4", "py-2", "text-white", "text-center", "fw-semibold", "rounded", "text-uppercase", "fs-5");
            divAlertas.appendChild(parrafoAlerta);
            setTimeout(() => {
                divAlertas.innerHTML = "";
                window.location.href = "/panel-administracion";
            }, 1000);

        } else{
            const erroresArray = Object.values(errores);
            erroresArray.forEach((error) => {
                // console.log(error)
                const parrafoAlerta = document.createElement("p");
                parrafoAlerta.textContent = error.msg;
                parrafoAlerta.classList.add("bg-danger", "px-4", "py-2", "mb-3", "text-white", "text-center", "fw-semibold", "rounded", "text-uppercase", "fs-5");
                divAlertas.appendChild(parrafoAlerta);
            });
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 3500)
        }
    }
});