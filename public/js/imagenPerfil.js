document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const formFotoPerfil = document.querySelector("#formFotoPerfil");

    //Eventos
    formFotoPerfil.addEventListener("submit", actualizarFotoPerfil);

    //Funciones
    function actualizarFotoPerfil(e) {
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const formFotoPerfil = document.querySelector("#formFotoPerfil");
        const formData = new FormData(formFotoPerfil);

        fetch("/administracion/imagen-perfil", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token
            },
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.msg){
                Swal.fire({
                    title: "¡Exito!",
                    text: "Foto de perfil actualizada correctamente",
                    icon: "success",
                    timer: 3000
                });
            }
            console.log(data)
        }).catch((error) =>{
            console.log("Error en actualizacion de foto");
            console.log(error.message);
        })
    }
});