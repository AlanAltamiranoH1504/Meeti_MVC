document.addEventListener("DOMContentLoaded", () => {

    if (document.querySelector("#comentarios")){
        const divComentarios = document.querySelector("#comentarios");
        divComentarios.addEventListener("click", (e) =>{
            verificadorBtn(e.target);
        })

        function verificadorBtn(btn){
            const id = btn.getAttribute("id");
            if (id === "btnsEliminacion"){
                const comentarioId = btn.getAttribute("data-comentario-id");
                const idCreadorComentario = btn.getAttribute("data-creador-id");
                peticionEliminarComentario(comentarioId, idCreadorComentario);
            }
        }

        function peticionEliminarComentario(comentarioId, idCreadorComentario){

            if (comentarioId.trim() === "" || idCreadorComentario.trim() === "" || comentarioId == null || idCreadorComentario == null){
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Error en la eliminiacion de comentario. Recarga la pagina.",
                    icon: "error",
                    timer: 3000
                });
                return;
            }

            const requestBody = {
                comentarioId,
                idCreadorComentario
            };

            fetch("/meetis/eliminar-comentario", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
                body: JSON.stringify(requestBody)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.msg === "Comentario Eliminado"){
                    Swal.fire({
                        title: data.msg,
                        text: "Se ha eliminado el comentario",
                        icon: "success",
                        timer: 3000
                    });
                    setTimeout(() => {window.location.reload();}, 3500)
                }else{
                    Swal.fire({
                        title: "Error en eliminiacion",
                        text: data.msg,
                        icon: "warning",
                        timer: 3000
                    });
                }
            }).catch((e) => {
                console.log("Error en eliminiacion de comentarip")
                console.log(e.message);
            })
        }
    }

    if (document.querySelector("#btnEliminarAllComentarios")){
        document.querySelector("#btnEliminarAllComentarios").addEventListener("click", (e) => {
            e.preventDefault();
            const btnEliminar = document.querySelector("#btnEliminarAllComentarios");
            const meetiId = btnEliminar.getAttribute("data-meeti-id");

            fetch("/meetis/eliminar-comentarios", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").getAttribute("content")
                },
                body: JSON.stringify({meetiId})
            }).then((response) => {
                if (response.status == 500){
                    return response.json().then((error) => {
                        Swal.fire({
                            title: "Error en eliminación de comentarios",
                            text: error.msg || "Ocurrió un error. Recarga la página.",
                            icon: "error",
                            timer: 3000
                        });
                        throw new Error(error.msg);
                    });
                }
                return response.json();
            }).then((data) => {
                Swal.fire({
                    title: data.msg,
                    text: "Se eliminaron todos los comentarios",
                    icon: "success",
                    timer: 3000
                });
                setTimeout(() => { window.location.reload()},  3000)
            }).catch((e) => {
                // console.log("Error en eliminiacion de todos los coemtarios");
                // console.log(e.message);
            })
        })
    }

    if (document.querySelector("#formComentarios")){
        const formComentarios = document.querySelector("#formComentarios");
        formComentarios.addEventListener("submit", peticionGuardarComentario);
        function peticionGuardarComentario(e){
            e.preventDefault();
            const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
            const inputMeetiId = document.querySelector("#meeti_id").value;
            const inputComentario = document.querySelector("#comentario").value;

            if (inputComentario.trim() === "" || inputComentario == null){
                Swal.fire({
                    title: "Error",
                    text: "El comentario debe tener un contenido",
                    icon: "warning",
                    timer: 3000
                });
                return;
            }

            const requestBody = {
                comentario: inputComentario,
                meeti_id: inputMeetiId
            }

            fetch("/meetis/guardar-cometario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify(requestBody)
            }).then((response) => {
                return response.json();
            }).then((data) =>{
                if (data.msg === "Comentario guardado"){
                    Swal.fire({
                        title: data.msg,
                        text: "Se ha agregado tu comentario al meeti",
                        icon: "success",
                        timer: 3000
                    });
                }else{
                    Swal.fire({
                        title: data.msg,
                        icon: "error",
                        text: data.error,
                        timer: 3000
                    });
                }
            }).catch((e) => {
                console.log("Error en guardado de cometario")
                console.log(e.message);
            });
        }
    }

    if (document.querySelector("#formConfirmarAsistencia")){
        //Selectores
        const formConfirmarAsistencia = document.querySelector("#formConfirmarAsistencia");

        //Eventos
        formConfirmarAsistencia.addEventListener("submit", peticionGuardarInteresado);

        //Funciones
        function peticionGuardarInteresado(e){
            e.preventDefault();
            const inputMeetiId =  document.querySelector("#meetiId").value;
            const inputUsuarioInteresado = document.querySelector("#usuarioEnSesion").value;
            const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

            const requestBody = {
                meetiId : inputMeetiId,
                usuarioId: inputUsuarioInteresado
            }

            fetch("/meetis/meeti/confirmacion-asistencia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify(requestBody)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                let title, text, icon = "";
                const timer = 3000;
                if (data.msg === "Ya habias confirmado tu asistencia"){
                    title = "¡Asistencia Ya Confirmada!";
                    text = data.msg;
                    icon = "info";
                } else{
                    title = "¡Asistencia Confirmada!";
                    text = data.msg;
                    icon = "success";
                }
                Swal.fire({
                    icon: icon,
                    title: title,
                    text: text,
                    timer: timer
                });
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)
            }).catch((error) => {
                console.log("ERROR EN PETICION AL BACKEND");
            });
        }

    }else if (document.querySelector("#formCancelarConfirmacion")){
        const formCancelarConfirmacion = document.querySelector("#formCancelarConfirmacion");
        formCancelarConfirmacion.addEventListener("submit", peticionCancelarConfirmacion);

        function peticionCancelarConfirmacion(e){
            e.preventDefault();
            const inputMeetiId =  document.querySelector("#meetiIdEliminar").value;
            const inputUsuarioInteresado = document.querySelector("#usuarioEnSesionEliminar").value;
            const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

            const requestBody = {
                meetiId : inputMeetiId,
                usuarioId: inputUsuarioInteresado
            }

            fetch("/meetis/meeti/cancelar-asistencia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify(requestBody)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                let title, text, icon = "";
                const timer = 3000
                if (data.msg === "Interesado eliminado"){
                    title = "Cancelación Correcta";
                    text = "Asistencia cancelada correctamente";
                    icon = "success"
                }else{
                    title = "Error en cancelación";
                    text = "Ocurrio un error en la cancelacion de asistencia";
                    icon = "error"
                }
                Swal.fire({
                    title,
                    text,
                    icon,
                    timer
                });
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)
            }).catch((error) => {
                console.log("Error en peticion al backend")
            })
        }
    }
})