document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const formConfirmacionCuenta = document.querySelector("#formConfirmacionCuenta");

    //Eventos
    formConfirmacionCuenta.addEventListener("submit", submitConfirmacionCuenta);

    //Funciones
    function submitConfirmacionCuenta(e) {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        const tokenUsuario = document.querySelector("#tokenUsuario").value;

        const bodyRequest = {
            token: tokenUsuario
        }

        fetch("/auth/confirmacionBack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": csrfToken
            },
            body: JSON.stringify(bodyRequest)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            const {status} = data;
            if (status === 200){
                document.querySelector("#alertaSucces").classList.remove("d-none");
                setTimeout(() => {
                    window.location.href = "/auth/crear-cuenta";
                }, 4000);
            } else {
                document.querySelector("#alertaError").classList.remove("d-none");
                setTimeout(() => {
                    window.location.href = "/auth/crear-cuenta";
                }, 4000);
            }
        }).catch((error) => {
            console.log("Error en peticion");
            console.log(error.message);
        })
    }
});