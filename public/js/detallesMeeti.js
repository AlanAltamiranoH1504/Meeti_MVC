document.addEventListener("DOMContentLoaded", () => {
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
            }).catch((error) => {
                console.log("ERROR EN PETICION AL BACKEND");
            });
        }

    }else{
        console.log("NO EXISTE EL FORM")
    }
})