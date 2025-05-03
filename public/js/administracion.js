document.addEventListener("DOMContentLoaded", () => {

    //Funciones base
    listadoGrupos();

    function listadoGrupos(){
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        fetch("/administracion/grupos", {
            method: "GET",
            headers: {
                "csrf-token": token
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            renderListadoDeGrupos(data);
        }).catch((error) =>{
            console.log("Error en peticion de listado")
            console.log(error.message);
        })
    }

    function renderListadoDeGrupos(grupos){
        const listaGrupos = document.querySelector("#listaGrupos");
        listaGrupos.innerHTML = "";
        if (grupos.length >= 1){
            grupos.forEach((grupo) => {
                const liGrupo = document.createElement("li");
                liGrupo.innerHTML = `
                    <div class="informacion-admin">
                        <h3>${grupo.nombre}</h3>
                    </div>
                    <div class="acciones contenedor-botones">
                        <a href="#" data-id="${grupo.id}" id="btnEditar" class="btnCodigo btn-verde">Editar</a>
                        <a href="" class="btnCodigo btn-azul2">Asistentes</a>
                        <button data-id="${grupo.id}" id="btnEliminar" class="btnCodigo btn-rojo">Eliminar</button>
                    </div>
                `;
                listaGrupos.appendChild(liGrupo);
            })
        }else{
            const divSinGrupos = document.createElement("div");
            divSinGrupos.classList.add("bg-danger", "text-center", "text-uppercase", "fw-semibold", "text-white", "fs-5", "rounded", "px-3", "py-2");
            divSinGrupos.textContent = "No tienes grupos registrados";
            listaGrupos.appendChild(divSinGrupos);
        }
    }

    //Selectores
    const listaGrupos = document.querySelector("#listaGrupos");
    const formActualizacionGrupo = document.querySelector("#formActualizacionGrupo");

    //Eventos
    if (listaGrupos) {
        listaGrupos.addEventListener("click", identificadorBtn)
    }else{
        console.log("El btn no existe");
    }
    formActualizacionGrupo.addEventListener("submit", sendActualizacionGrupo);

    //Funciones
    function identificadorBtn(e){
        e.preventDefault();
        const tipoBtn = e.target.id;
        const btn = e.target;
        if (tipoBtn === "btnEliminar"){
            peticionDelete(btn.getAttribute("data-id"));
        } else if(tipoBtn === "btnEditar"){
            mostrarModalEdicion(btn.getAttribute("data-id"));
        }
    }

    async function mostrarModalEdicion(id){
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        await fetch("/administracion/findById", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "csrf-token":token
            },
            body: JSON.stringify({id:id})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            const modalEdicion = new bootstrap.Modal(document.querySelector("#modalEdicionGrupo"));
            document.querySelector("#idGrupo").value = data.id;
            document.querySelector("#nombre").value = data.nombre;
            document.getElementsByName("descripcion").value = data.descripcion;
            document.querySelector("#sitio_web").value = data.url;
            modalEdicion.show();
        }).catch((error) => {
            console.log("Error en peticion de busqueda");
            console.log(error.message);
        })
    }

    function peticionDelete(id){
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const bodyRequest = {
            id
        }

        fetch("/administracion/eliminar", {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                "csrf-token": token
            },
            body: JSON.stringify(bodyRequest)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            listadoGrupos();
            console.log(data)
        }).catch((error) => {
            console.log(e.message);
        })
    }

    function sendActualizacionGrupo(e){
        e.preventDefault();
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const formActualzacionGrupo = document.querySelector("#formActualizacionGrupo");
        const formaData = new FormData(formActualzacionGrupo);

        fetch("/administracion/actualizacion", {
            method: "POST",
            headers: {
                "csrf-token": token
            },
            body: formaData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            listadoGrupos();
            alertas("formUpdateGrupo", "success", data.msg);
        }).catch((error)  => {
            console.log(e.message);
        })
    }

    function alertas(lugar, tipo, menssaje){
        if (lugar === "formUpdateGrupo"){
            const divAlertas = document.querySelector("#divAlertasUpdate");
            divAlertas.innerHTML = "";
            if (tipo === "success") {
                const parrafoAlerta = document.createElement("p");
                const modalEdicion = bootstrap.Modal.getInstance(document.querySelector("#modalEdicionGrupo"));
                parrafoAlerta.textContent = menssaje;
                parrafoAlerta.classList.add("bg-success", "text-white", "text-center", "text-uppercase", "fs-5", "fw-semibold", "px-3", "py-2", "rounded")
                divAlertas.appendChild(parrafoAlerta);
                setTimeout(() => {
                    divAlertas.innerHTML = ""
                    modalEdicion.hide();
                }, 2500);
            }
        }
    }
})