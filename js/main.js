// Seleccionar el elemento  por su ID y almacenarlo en la variable
var btn = document.getElementById('btn_cargar_usuarios');
var loader = document.getElementById('loader');

// Agregar un evento de escucha al botón "cargar usuarios" que se activa al hacer clic
btn.addEventListener('click', function () {
    // Crear una nueva instancia de XMLHttpRequest para hacer una solicitud HTTP
    var peticion = new XMLHttpRequest();
    
    // Abrir una solicitud GET para obtener datos de la URL proporcionada
    peticion.open('GET', 'https://api.npoint.io/fc342c1204d57e77de96');

    // Agregar una clase 'active' al elemento loader para mostrar un indicador de carga
    loader.classList.add('active');

    // Función de devolución de llamada que se activa cada vez que el estado de la solicitud cambia
    peticion.onreadystatechange = function(){
        // Comprobar si la solicitud se ha completado y el estado es 'OK' (200)
        if(peticion.readyState == 4 && peticion.status == 200){
            // Eliminar la clase 'active' del elemento loader para ocultar el indicador de carga
            loader.classList.remove('active');
        }
    }

    // Enviar la solicitud al servidor
    peticion.send();
})
