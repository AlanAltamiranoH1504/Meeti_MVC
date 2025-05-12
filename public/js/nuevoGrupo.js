document.addEventListener("DOMContentLoaded", () => {
    const formNuevoGrupo = document.querySelector("#formNuevoGrupo");
    formNuevoGrupo.addEventListener("submit", peticionSaveNuevoGrupo);

    function peticionSaveNuevoGrupo(e) {
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const formNuevoGrupo = document.querySelector("#formNuevoGrupo");
        const formData = new FormData(formNuevoGrupo);

        fetch("/administracion/save-grupo", {
            method: "POST",
            headers: {
                "csrf-token": token
            },
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (Array.isArray(data)){
                Swal.fire({
                    title: "¡Error!",
                    text: "Error en la creacion de grupo. Verifica errores en la parte superior",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                mostrarAlertas("error", "bad request", data);
            } else{
                Swal.fire({
                    title: "¡Exito!",
                    text: "Grupo Creado Correctamente",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
                // mostrarAlertas("success", "Grupo Creado Correctamente", null);
            }
        }).catch((error) => {
            console.log("Error en peticion al backend");
            console.log(error.message);
        });
    }

    function mostrarAlertas(tipo, msg, errores) {
        // limpiarInputs();
        const divAlertas = document.querySelector("#divAlertas");
        divAlertas.innerHTML = "";

        if (tipo === "success") {
            const parrafoAlerta = document.createElement("p");
            parrafoAlerta.textContent = "Grupo creado correctamente";
            parrafoAlerta.classList.add("bg-success", "px-3", "py-2", "fw-semibold", "text-center", "rounded", "text-uppercase", "fs-5", "text-white");
            divAlertas.appendChild(parrafoAlerta);
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 3000);
        } else if (tipo === "error") {
            errores.forEach((error) => {
                const parrafoError = document.createElement("p");
                parrafoError.textContent = error.msg;
                parrafoError.classList.add("bg-danger", "px-3", "py-2", "fw-semibold", "text-center", "rounded", "text-uppercase", "fs-5", "text-white", "my-3");
                divAlertas.appendChild(parrafoError);
            });
            setTimeout(() => {
                divAlertas.innerHTML = "";
            }, 7000);
        }
    }

    function limpiarInputs() {
        document.querySelector("#nombre").value = "";
        document.querySelector("#x").value = "";
        document.querySelector("#categorias").value = "";
        document.querySelector("#sitio-web").value = "";
    }
});