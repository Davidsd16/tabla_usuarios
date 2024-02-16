// Obtener referencias a los elementos del DOM
var btn_cargar_usuarios = document.getElementById('btn_cargar_usuarios'); // Botón para cargar usuarios
var error_box = document.getElementById('error_box'); // Contenedor de mensajes de error
var tabla = document.getElementById('tabla'); // Tabla donde se mostrarán los usuarios
var loader = document.getElementById('loader'); // Elemento de carga

// Variables para almacenar datos de usuario (no se usan actualmente en este fragmento de código)
var usuario_nombre;
var usuario_edad;
var usuario_pais;
var usuario_correo;

// Función para cargar usuarios
function cargarUsuarios(){
    // Limpiar el contenido de la tabla
    tabla.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Pais</th><th>Correo</th></tr>';

    // Crear una nueva solicitud XMLHttpRequest
    var peticion = new XMLHttpRequest();
    
    // Configurar la solicitud para obtener los usuarios de la base de datos
    peticion.open('GET', 'php/usuarios_bd.php');

    // Agregar la clase 'active' al loader para mostrar la animación de carga
    loader.classList.add('active');

// Esta función se ejecuta cuando la petición se completa correctamente
peticion.onload = function() {
    // Analizar la respuesta JSON recibida
    var datos = JSON.parse(peticion.responseText);
    
    // Verificar si hay un error en los datos recibidos
    if (datos.error) {
        // Si hay un error, agregar la clase 'active' al elemento 'error_box'
        error_box.classList.add('active');
    } else {
        // Iterar sobre los datos recibidos para cada usuario
        for(var i = 0; i < datos.length; i++){
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
    }
}

    // Definir el evento para manejar la respuesta de la solicitud
    peticion.onreadystatechange = function(){
		// Verificar si la solicitud ha sido completada y la respuesta está lista
		if(peticion.readyState == 4 && peticion.status == 200){
			// Remover la clase 'active' del loader para ocultar la animación de carga
			loader.classList.remove('active');
		}
	}
    
    // Enviar la solicitud
    peticion.send();
}

// Agregar un evento de escucha al botón para cargar usuarios cuando se haga clic
btn_cargar_usuarios.addEventListener('click', function() {
    cargarUsuarios(); // Llamar a la función para cargar usuarios
})
