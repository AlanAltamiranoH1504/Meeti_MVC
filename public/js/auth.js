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
            if (data.status === 400){
                alertas(data.status, "Errores", data.errores)
            } else if(data.status === 200) {
                alertas(data.status,"Usuario registrado correctamente. Confirma en tu email", data.errores)
            }
        }).catch((error) => {
            console.log(error)
            alertas("divAlertas", "error", error.message);
        });
    }

    function alertas(status, msg, errores) {
        const divAlertas = document.querySelector("#divAlertas");
        divAlertas.innerHTML = "";
        if (status === 400){
            errores.forEach((error) => {
                const divError = document.createElement("div");
                divError.textContent = error.msg;
                divError.classList.add("bg-danger", "px-3", "py-2", "text-white", "text-center", "fw-semibold", "my-2", "rounded", "text-uppercase");
                divAlertas.appendChild(divError);
            });
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 5000);
        } else {
            const divAlerta = document.createElement("div");
            divAlerta.textContent = msg;
            divAlerta.classList.add("bg-success", "px-3", "py-2", "text-white", "text-center", "fw-semibold", "mb-4", "rounded", "text-uppercase");
            divAlertas.appendChild(divAlerta);
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 4000);
        }
    }
});