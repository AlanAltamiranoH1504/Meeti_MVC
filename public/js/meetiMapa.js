document.addEventListener("DOMContentLoaded", () =>{
    if (document.querySelector("#ubicacionMeeti")){
        mostrarMapa();
    }
});

function mostrarMapa(){
    const lat = document.querySelector("#lat").value;
    const lng = document.querySelector("#lng").value;
    const direccion = document.querySelector("#direccion").value;
    const map = L.map('ubicacionMeeti').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(direccion)
        .openPopup();
}