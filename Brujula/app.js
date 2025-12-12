// --- 1. Brújula (Device Orientation) ---
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        // El ángulo alfa representa la dirección de la brújula (0° = Norte)
        let alpha = event.alpha; 
        let compassHeading = Math.round(360 - alpha); // Usamos 360 - alpha si 0 es Norte

        document.getElementById('compass-display').textContent = 
            compassHeading + '° ' + getCardinalDirection(compassHeading);
        
        // Gira la "aguja" de la brújula con CSS
        document.getElementById('compass-needle').style.transform = 
            'rotate(' + compassHeading + 'deg)';

    }, true);
} else {
    document.getElementById('compass-display').textContent = 'El dispositivo no soporta Device Orientation.';
}

// Función auxiliar para obtener la dirección cardinal
function getCardinalDirection(angle) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
}


// --- 2. Rastreador de Recorrido (Geolocation) ---
let path = []; // Almacenará los puntos del recorrido

if (navigator.geolocation) {
    // Monitorea la posición del dispositivo
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            document.getElementById('latitude').textContent = lat.toFixed(6);
            document.getElementById('longitude').textContent = lon.toFixed(6);

            // Guarda el punto en el arreglo del recorrido
            path.push({lat: lat, lon: lon, timestamp: new Date()});
            
            // Aquí se actualizaría la visualización del recorrido en un mapa.

            // Por ejemplo, para ver el historial en la consola:
            console.log("Recorrido actual:", path);
        },
        (error) => {
            console.error('Error de Geolocalización:', error);
            alert('Error al acceder al GPS: ' + error.message);
        },
        // Opciones de configuración
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
    // Para detener la vigilancia del GPS: navigator.geolocation.clearWatch(watchId);

} else {
    document.getElementById('latitude').textContent = 'La Geolocalización no está soportada.';
    document.getElementById('longitude').textContent = 'La Geolocalización no está soportada.';
}