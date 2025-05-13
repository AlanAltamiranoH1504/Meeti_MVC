document.addEventListener("DOMContentLoaded", () => {
    //Funciones base
    listadoGrupos();
    listadoMeetis();
    listadoMeetisCompletados();

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

    function listadoMeetis(){
        fetch("/administracion/findAllMeetis", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) =>{
            // console.log(data)
            if (data.meetis.length > 0){
                renderListadoMetis(data, "proximos", "ulMeetis");
            }else {
                alertas("divAlertasMeetis", "error", "No tienes Meeti's creados");
            }
        }).catch((error) =>{
            console.log("Error en peticion de listado de meetis proximos");
            console.log(error.message);
        })
    }

    function listadoMeetisCompletados(){
        fetch("/administracion/findAllMeetis-completed", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) =>{
            // console.log(data)
            renderListadoMetis(data, "pasados", "ulMeetisPasados");
        }).catch((error) =>{
            console.log("Error en peticion de listado de meetis completados");
            console.log(error.message);
        })
    }

    function renderListadoMetis(meetis, tipo, lugar){
        const ulMeetis = document.querySelector(`#${lugar}`);
        ulMeetis.innerHTML = ""
        const meetisArray = meetis.meetis;

        if (tipo === "proximos"){
            meetisArray.forEach((meeti) =>{
                const liMeeti = document.createElement("li");
                const fecha = new Date(meeti.fecha)
                const formatoFecha = fecha.toLocaleDateString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                liMeeti.innerHTML = `
                <div class="informacion-admin">
                    <p class="fecha">${formatoFecha}</p>
                    <h3>${meeti.titulo}</h3>
                    <small>${meeti.asitentes}</small>
                </div>
                <div class="acciones contenedor-botones">
                    <a href="/administracion/editar-meeti/${meeti.id}" id="btnEditarMeeti" data-id="${meeti.id}" class="btnCodigo btn-verde" style="text-decoration: none">Editar</a>
                    <a href="#" id="btnAsistenteMeeti" data-id="${meeti.id}"  class="btnCodigo btn-azul2" style="text-decoration: none">Asistentes</a>
                    <a href="#" id="btnEliminarMeeti" data-id="${meeti.id}" class="btnCodigo btn-rojo" style="text-decoration: none">Eliminar</a>
                </div>
            `;
                ulMeetis.appendChild(liMeeti);
            });
        }else {
            meetisArray.forEach((meeti) =>{
                const liMeeti = document.createElement("li");
                const fecha = new Date(meeti.fecha)
                const formatoFecha = fecha.toLocaleDateString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                liMeeti.innerHTML = `
                <div class="informacion-admin">
                    <p class="fecha">${formatoFecha}</p>
                    <h3>${meeti.titulo}</h3>
                </div>
                <div class="acciones contenedor-botones">
                    <a href="/administracion/editar-meeti/${meeti.id}" id="btnEditarMeetiPasado" data-id="${meeti.id}" class="btnCodigo btn-verde" style="text-decoration: none">Editar</a>
                    <a href="#" id="btnEliminarMeetiPasado" data-id="${meeti.id}" class="btnCodigo btn-rojo" style="text-decoration: none">Eliminar</a>
                </div>
            `;
                ulMeetis.appendChild(liMeeti);
            });
        }
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
    const listaMeetis = document.querySelector("#ulMeetis");
    const listaMeetiPasados = document.querySelector("#ulMeetisPasados");
    const formActualizacionGrupo = document.querySelector("#formActualizacionGrupo");

    //Eventos
    if (listaGrupos) {
        listaGrupos.addEventListener("click", identificadorBtn)
    }else{
        console.log("El btn no existe");
    }
    if (listaMeetis){
        listaMeetis.addEventListener("click", identificadorBtn);
    }

    if (listaMeetiPasados){
        listaMeetiPasados.addEventListener("click", identificadorBtn);
    }

    formActualizacionGrupo.addEventListener("submit", sendActualizacionGrupo);

    //Funciones
    function identificadorBtn(e){
        e.preventDefault();
        const tipoBtn = e.target.id;
        const btn = e.target;
        const id = btn.getAttribute("data-id");

        switch (tipoBtn){
            case "btnEliminar":
                peticionDelete(btn.getAttribute("data-id"), "grupo");
                break;
            case "btnEditar":
                mostrarModalEdicion(btn.getAttribute("data-id"));
                break;
            case "btnEditarMeeti":
                window.location.href = `/administracion/editar-meeti/${id}`;
                break;
            case "btnEditarMeetiPasado":
                window.location.href = `/administracion/editar-meeti/${id}`;
                break;
            case "btnEliminarMeeti":
                peticionDelete(btn.getAttribute("data-id"), "meeti");
                break;
            case "btnEliminarMeetiPasado":
                peticionDelete(btn.getAttribute("data-id"), "meeti");
                break;
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
            // document.getElementsByName("descripcion").value = data.descripcion;
            document.querySelector("#x").value = data.descripcion;
            document.querySelector("#sitio_web").value = data.url;
            modalEdicion.show();
        }).catch((error) => {
            console.log("Error en peticion de busqueda");
            console.log(error.message);
        })
    }

    function peticionDelete(id, modelo){
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const bodyRequest = {
            id
        }
        let endPoint;
        if (modelo === "grupo"){
            endPoint = "/administracion/eliminar"
        }else if (modelo === "meeti"){
            endPoint = "/administracion/delete-meeti";
        }
        fetch(`${endPoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                "csrf-token": token
            },
            body: JSON.stringify(bodyRequest)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (modelo === "grupo"){
                listadoGrupos()
            } else{
                listadoMeetis();
                listadoMeetisCompletados();
            }
            Swal.fire({
                title: "¡Exito!",
                text: "Eliminado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
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
            console.log(error.message);
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
        } else if (lugar === "divAlertasMeetis"){
            document.querySelector("#divAlertasMeetis").classList.remove("d-none");
        }
    }
})