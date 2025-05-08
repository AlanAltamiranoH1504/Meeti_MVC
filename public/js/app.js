import {OpenStreetMapProvider} from "leaflet-geosearch";

const lat = 19.2920813;
const lng = -99.0468341;
const map = L.map('mapa').setView([lat, lng], 15);
let marker;

document.addEventListener("DOMContentLoaded", () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Buscar la direccion
    const buscador = document.querySelector("#formbuscador");
    buscador.addEventListener("input", buscarDireccion);
});

function buscarDireccion(e) {
    if (e.target.value.length > 8) {
        //Utilizamos el provider
        const provider = new OpenStreetMapProvider();
        provider.search({query: e.target.value}).then((resultado) => {
            //Mostrar el mapa en la ubicacion ingresada
            map.setView(resultado[0].bounds[0], 15);

            //Agregamos pin de ubicacion ingresada
            marker = new L.marker(resultado[0].bounds[0], {
                draggable: true, //Movimiento del PIN
                autoPan: true
            })
                .addTo(map)
                .bindPopup(resultado[0].label)
                .openPopup();
        })
    }
}