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
        const inputPasswordDos = document.querySelector("#confirmar-password").value;

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
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
});