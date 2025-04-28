document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const formCrearCuenta = document.querySelector("#formCrearCuenta");

    //Eventos
    formCrearCuenta.addEventListener("click", submitFormularioCrearCuenta);

    //Funciones
    function submitFormularioCrearCuenta(e){
        const bodyUsuario = {
            nombre: "Alan",
            email: "alan@gmail.com"
        };

        fetch("auth/crear-cuenta", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bodyUsuario)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
});