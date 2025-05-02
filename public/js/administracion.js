document.addEventListener("DOMContentLoaded", () => {
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
            console.log(data)
        }).catch((error) => {
            console.log(e.message);
        })
    }
})