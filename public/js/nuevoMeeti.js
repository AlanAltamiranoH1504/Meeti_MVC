document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const selectGrupos = document.querySelector("#selectGrupos");
    const formuNuevoMeeti = document.querySelector("#formuNuevoMeeti");

    //Eventos
    formuNuevoMeeti.addEventListener("submit", peticionNuevoMeeti);

    //Llamado de funciones
    llenadoSelectGrupos();

    //Funciones
    function llenadoSelectGrupos(){
        fetch("/administracion/grupos", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.length >= 1){
                llenadoGrupos(data);
            }else{
                console.log("Alerta de sin grupos")
                mostrarAlertas("error", "No tienes grupos creados", null);
            }
        }).catch((error) => {
            console.log("Error en llenado de grupos");
            console.log(error.message);
        })
    }

    function peticionNuevoMeeti(e){
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const selectGrupo = document.querySelector("#selectGrupos").value;
        const inputTitulo = document.querySelector("#titulo").value;
        const inputInvitado = document.querySelector("#invitado").value;
        const inputFecha = document.querySelector("#fecha").value;
        const inputHora = document.querySelector("#hora").value;
        const inputCupo = document.querySelector("#cupo").value;
        const inputDescripcion = document.querySelector("#x").value;
        const inputDireccion = document.querySelector("#direccion").value;
        const inputCiudad = document.querySelector("#ciudad").value;
        const inputEstado = document.querySelector("#estado").value;
        const inputPais = document.querySelector("#pais").value;
        const inputLat = document.querySelector("#lat").value;
        const inputLng = document.querySelector("#lng").value;

        const bodyRequest = {
            titulo: inputTitulo,
            grupo_id: selectGrupo,
            invitado: inputInvitado,
            fecha: inputFecha,
            hora: inputHora,
            cupo: inputCupo,
            descripcion: inputDescripcion,
            direccion: inputDireccion,
            ciudad: inputCiudad,
            estado: inputEstado,
            pais: inputPais,
            lat: inputLat,
            lng: inputLng
        }

        fetch("/administracion/nuevo-meeti", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify(bodyRequest)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.msg){
                Swal.fire({
                    title: "¡Exito!",
                    text: "Meeti Creado Correctamente",
                    icon: "success",
                    confirmButtonText: "Ok!"
                });
                // mostrarAlertas("success", "Meeti Creado Correctamente!", null);
            }else{
                Swal.fire({
                    title: "¡Error!",
                    text: "Error en la creacion de meti. Verifica el error en la parte superior",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
                mostrarAlertas("error", "Errores", data);
            }
        }).catch((error) => {
            console.log("Error en peticion al backend")
            console.log(error.message);
        })
    }

    function llenadoGrupos(grupos){
        grupos.forEach((grupo) => {
            const optionGrupo = document.createElement("option");
            optionGrupo.setAttribute("value", grupo.id);
            optionGrupo.textContent = grupo.nombre;
            selectGrupos.appendChild(optionGrupo);
        })
    }

    function mostrarAlertas(tipo, mensaje, errores){
        const divAlertas = document.querySelector("#alertas");
        if (tipo === "error"){
            if (mensaje === "No tienes grupos creados"){
                const parrafoAlerta = document.createElement("p");
                parrafoAlerta.classList.add("bg-danger", "text-center", "fw-semibold", "text-uppercase", "px-3", "py-2", "rounded", "fs-5", "text-white");
                parrafoAlerta.textContent = mensaje;
                divAlertas.appendChild(parrafoAlerta);
            }else{
                const erroresArray = errores.errores;
                const divAlerta = document.querySelector("#divAlertas");
                divAlerta.innerHTML = "";
                erroresArray.forEach((error) => {
                    const parrafoError = document.createElement("p");
                    parrafoError.classList.add("bg-danger", "text-center", "text-white", "fs-5", "fw-semibold", "px-3", "py-1", "rounded");
                    parrafoError.textContent = error.msg;

                    divAlerta.appendChild(parrafoError);
                });
                setTimeout(() => {
                    divAlerta.innerHTML = ""
                }, 7000);
            }
        }else{
            const divAlerta = document.querySelector("#divAlertas");
            const parrafoAlerta = document.createElement("p");
            parrafoAlerta.textContent = mensaje;
            parrafoAlerta.classList.add("bg-success", "text-center", "text-white", "fs-5", "fw-semibold", "px-3", "py-1", "rounded");
            divAlerta.appendChild(parrafoAlerta);
        }
    }
})