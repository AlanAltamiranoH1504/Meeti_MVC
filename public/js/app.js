import {OpenStreetMapProvider} from "leaflet-geosearch";

// Obtencion de valores de la db


const lat = document.querySelector("#lat").value || 19.2920813;
const lng = document.querySelector("#lng").value || -99.0468341;
const direccion = document.querySelector("#direccion").value || "";
const map = L.map('mapa').setView([lat, lng], 15);
const geoCodeService = L.esri.Geocoding.geocodeService();
let markers = new L.FeatureGroup().addTo(map)
let marker;

//Set de pin para edicion de meeti
if (lat && lng){
    //Agregado de PIN al mapa
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
        .addTo(map)
        .bindPopup(direccion)
        .openPopup();

    markers.addLayer(marker);

    //Deteccion del PIN en el mapa
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
}

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

                //Seteo del PIN en el mapa
                map.setView(location, 15);
                marker = new L.marker(location, {
                    draggable: true,
                    autoPan: true
                })
                    .addTo(map)
                    .bindPopup(resultado[0].label)
                    .openPopup();
                markers.addLayer(marker);

                //Deteccion de movimiento del PIN
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