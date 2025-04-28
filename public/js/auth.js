document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const formCrearCuenta = document.querySelector("#formCrearCuenta");

    //Eventos
    formCrearCuenta.addEventListener("submit", submitFormularioCrearCuenta);

    //Funciones
    function submitFormularioCrearCuenta(e){
        e.preventDefault();
        const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

        const inputEmail = document.querySelector("#email").value;
        const inputNombre = document.querySelector("#nombre").value;
        const inputPassword = document.querySelector("#password").value;
        const inputPasswordDos = document.querySelector("#confirmarPassword").value;

        const bodyData = {
            email: inputEmail,
            nombre: inputNombre,
            password: inputPassword,
            confirmar: inputPasswordDos
        };

        fetch("/auth/crear-cuenta", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "csrf-token": csrf
            },
            body: JSON.stringify(bodyData)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            alertas("divAlertas", "success", "Usuario creado. Confirma tu Cuenta en tu Email");
        }).catch((error) => {
            console.log(error);
        });
    }

    function alertas(lugar, tipo, msg) {
        if (lugar === "divAlertas") {
            const divAlertas = document.querySelector("#divAlertas");
            if (tipo === "success") {
                const divAlerta = document.createElement("div");
                divAlerta.textContent = msg;
                divAlerta.classList.add("bg-success", "px-3", "py-2", "text-white", "text-center", "fw-semibold", "mb-4", "rounded", "text-uppercase");
                divAlertas.appendChild(divAlerta);
            }
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 4000);
        }
    }
});