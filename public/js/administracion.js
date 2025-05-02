document.addEventListener("DOMContentLoaded", () => {

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
                        <a href=#" class="btnCodigo btn-verde">Editar</a>
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


    const listaGrupos = document.querySelector("#listaGrupos");

    if (listaGrupos) {
        listaGrupos.addEventListener("click", identificadorBtn)
    }else{
        console.log("El btn no existe");
    }

    function identificadorBtn(e){
        e.preventDefault();
        const tipoBtn = e.target.id;
        const btn = e.target;
        if (tipoBtn === "btnEliminar"){
            peticionDelete(btn.getAttribute("data-id"));
        }
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
})