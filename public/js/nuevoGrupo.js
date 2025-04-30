document.addEventListener("DOMContentLoaded", () => {
    const formNuevoGrupo = document.querySelector("#formNuevoGrupo");
    formNuevoGrupo.addEventListener("submit", peticionSaveNuevoGrupo);

    function peticionSaveNuevoGrupo(e) {
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const inputNombre = document.querySelector("#nombre").value;
        const inputDescripcion = document.querySelector("#x").value;
        const inputCategorias = document.querySelector("#categorias").value;
        const inputSitioWeb = document.querySelector("#sitio-web").value;

        const bodyRequest = {
            nombre: inputNombre,
            descripcion: inputDescripcion,
            categoria: inputCategorias,
            url: inputSitioWeb,
        }
        fetch("/administracion/save-grupo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token
            },
            body: JSON.stringify(bodyRequest)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status === "200") {
                mostrarAlertas("success", data.msg, null);
            } else {
                mostrarAlertas("error", "bad request", data);
            }
        }).catch((error) => {
            console.log("Error en peticion al backend");
            console.log(error.message);
        });
    }

    function mostrarAlertas(tipo, msg, errores) {
        limpiarInputs();
        const divAlertas = document.querySelector("#divAlertas");
        divAlertas.innerHTML = "";
        if (tipo === "success") {
            const parrafoAlerta = document.createElement("p");
            parrafoAlerta.textContent = msg;
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
            }, 4000);
        }
    }

    function limpiarInputs() {
        document.querySelector("#nombre").value = "";
        document.querySelector("#x").value = "";
        document.querySelector("#categorias").value = "";
        document.querySelector("#sitio-web").value = "";
    }
});