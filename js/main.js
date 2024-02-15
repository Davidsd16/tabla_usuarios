// Seleccionar el elemento  por su ID y almacenarlo en la variable
var btn = document.getElementById('btn_cargar_usuarios');
var loader = document.getElementById('loader');

// Agregar un evento de escucha al botón "cargar usuarios" que se activa al hacer clic
btn.addEventListener('click', function () {
    // Crear una nueva instancia de XMLHttpRequest para hacer una solicitud HTTP
    var peticion = new XMLHttpRequest();
    
    // Abrir una solicitud GET para obtener datos de la URL proporcionada
    //peticion.open('GET', 'https://api.npoint.io/fc342c1204d57e77de96');
    peticion.open('GET', 'php/usuarios.php');

    // Agregar una clase 'active' al elemento loader para mostrar un indicador de carga
    loader.classList.add('active');

    // Esta función se ejecuta cuando la petición AJAX ha sido completada
    peticion.onload = function() {
        // Se parsea la respuesta de la petición AJAX, asumiendo que es un JSON
        var datos = JSON.parse(peticion.responseText);

        // Se itera sobre los primeros 11 elementos del array de datos obtenidos
        for (let i = 0; i < 11; i++) {
            // Se crea un elemento <tr> para cada entrada de datos
            var elemento = document.createElement('tr');

            // Se añaden celdas <td> al elemento <tr> con información de cada usuario
            elemento.innerHTML += ('<td>' + datos[i].id + '</td>');
            elemento.innerHTML += ('<td>' + datos[i].nombre + '</td>');
            elemento.innerHTML += ('<td>' + datos[i].edad + '</td>');
            elemento.innerHTML += ('<td>' + datos[i].pais + '</td>');
            elemento.innerHTML += ('<td>' + datos[i].correo + '</td>');

            // Se añade el elemento <tr> al final de la tabla con el id "tabla"
            document.getElementById('tabla').appendChild(elemento);
        }
    };

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
