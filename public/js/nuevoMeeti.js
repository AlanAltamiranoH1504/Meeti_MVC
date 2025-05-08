document.addEventListener("DOMContentLoaded", () => {
    //Selectores
    const selectGrupos = document.querySelector("#selectGrupos");

    //Llamado de funciones
    llenadoSelectGrupos();

    //Funciones
    function llenadoSelectGrupos(){
        fetch("/administracion/grupos", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
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
            }
        }
    }
})