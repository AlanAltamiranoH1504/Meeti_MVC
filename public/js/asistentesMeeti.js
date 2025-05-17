document.addEventListener("DOMContentLoaded", () => {
    const pathParts = window.location.pathname.split("/");
    const idMeeti = pathParts[3];

    verificacion(idMeeti);

    function verificacion(id) {
        const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        fetch("/meetis/verificacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify({id})
        }).then((response) => {
            if (response.status === 403) {
                window.location.href = "/";
                return;
            }
            return response.json();
        }).then((data) => {
            llenadoAsistentes(data.asistentes);
        }).catch((error) => {
            console.log(error)
        })
    }

    function llenadoAsistentes(asistentes) {
        const listadoAsistentes = document.querySelector("#listadoAsistentes");
        if (asistentes.length >= 1){
            asistentes.forEach((asistente) => {
                const liAsistente = document.createElement("li");
                liAsistente.innerHTML = `
                <div class="imagen">
                    <img src="/uploads/img_perfiles/${asistente.imagen ? asistente.imagen : "perfil_default.png"}" alt="img asistente">
                </div>
                <div class="texto">
                    ${asistente.nombre}
                    <div class="fw-semibold">${asistente.email}</div>
                </div>
            `;
                listadoAsistentes.appendChild(liAsistente);
            });
        }else{
            listadoAsistentes.textContent = "No hay asistentes";
            listadoAsistentes.classList.add("text-center", "fw-semibold")
        }
    }
});