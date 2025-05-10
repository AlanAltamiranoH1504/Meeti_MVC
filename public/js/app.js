import {OpenStreetMapProvider} from "leaflet-geosearch";

const lat = 19.2920813;
const lng = -99.0468341;
const map = L.map('mapa').setView([lat, lng], 15);
let markers = new L.FeatureGroup().addTo(map)
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
        //Limpieza de PIN anterior
        markers.clearLayers();

        //Utilizamos el provider y GeoCoder
        const geoCodeService = L.esri.Geocoding.geocodeService();
        const provider = new OpenStreetMapProvider();
        provider.search({query: e.target.value}).then((resultado) => {
            if (resultado.length === 0) {
                // alert("No se encontraron resultados para esa dirección");
                return;
            }

            const location = resultado[0].bounds[0];
            geoCodeService.reverse().latlng(location, 15).run(function (error, result){
                llenarInputs(result);
                if (error) {
                    console.error("Error en la geocodificación inversa:", error);
                    return;
                }

                map.setView(location, 15);
                marker = new L.marker(location, {
                    draggable: true,
                    autoPan: true
                })
                    .addTo(map)
                    .bindPopup(resultado[0].label)
                    .openPopup();

                markers.addLayer(marker);

                marker.on("moveend", function (e) {
                    marker = e.target;
                    const posicion = marker.getLatLng();
                    map.panTo(new L.LatLng(posicion.lat, posicion.lng));

                    //Reverse geocoding cuando el usuario reubica el pin
                    geoCodeService.reverse().latlng(posicion, 15).run(function (error, result){
                        //Asignancion de valores al PopUp del Marker
                        marker.bindPopup(result.address.LongLabel)
                        llenarInputs(result);
                    });
                });
            });
        });
    }
}

function llenarInputs(resultado){
    console.log(resultado);
    document.querySelector("#direccion").value = resultado.address.Address || "";
    document.querySelector("#ciudad").value = resultado.address.City || "";
    document.querySelector("#estado").value = resultado.address.Region || "";
    document.querySelector("#pais").value = resultado.address.CountryCode || "";
    document.querySelector("#lat").value = resultado.latlng.lat || "";
    document.querySelector("#lng").value = resultado.latlng.lng || "";
}