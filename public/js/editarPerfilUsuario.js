document.addEventListener("DOMContentLoaded", ()=>{
    //Selectores
    const formEditarPerfil = document.querySelector("#formEditarPerfil");

    //Eventos
    formEditarPerfil.addEventListener("submit", peticionEditado);

    //Funciones
    function peticionEditado(e){
        e.preventDefault();
        const inputNombre = document.querySelector("#nombre").value;
        const inputDescripcion = document.querySelector("#x").value;
        const inputEmail = document.querySelector("#email").value;
        const inputPassword = document.querySelector("#password").value;
        const inputPasswordVieja = document.querySelector("#passwordVieja").value;
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        const requestBody = {
            nombre: inputNombre,
            descripcion: inputDescripcion,
            antiguaPassword: inputPasswordVieja,
            email: inputEmail,
            password: inputPassword
        }

        fetch("/administracion/update-perfil", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify(requestBody)
        }).then((response) =>  {
            return response.json();
        }).then((data) => {
            if (data.msg === "Usuario actualizado!"){
                Swal.fire({
                    title: "¡Usuario Actualizado!",
                    text: "Datos de usuario actualizados correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
            }else if(data.msg === "Password antigua erronea"){
                Swal.fire({
                    title: "¡ERROR!",
                    text: "La password antigua es incorrecta",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            } else{
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Error en actualizacion. Revisa los errores en la parte superior",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                mostrarAlertas(data);
            }
        }).catch((error) => {
            console.log("Error en peticion de actualizacion de perfil");
            console.log(error.message);
        })
    }

    function mostrarAlertas(errores){
        const divErrores = document.querySelector("#errores");
        divErrores.innerHTML = "";
        const erroresArray = Object.values(errores)[0];

        erroresArray.forEach((error) => {
            const parrafoError = document.createElement("p");
            parrafoError.classList.add("bg-danger", "text-center", "fw-semibold", "text-uppercase", "text-white", "px-3", "py-1", "rounded", "fs-5");
            parrafoError.textContent = error.msg;
            divErrores.appendChild(parrafoError);
        });
        setTimeout(() => {
            divErrores.innerHTML = "";
        }, 7000);
    }
})