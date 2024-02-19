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

// Esta función se llama cuando se intenta agregar un usuario
function agregarUsuarios(e) {
    // Prevenir el comportamiento predeterminado del evento (por ejemplo, el envío de un formulario)
    e.preventDefault();

    // Crear una nueva instancia de XMLHttpRequest para hacer una solicitud al servidor
    var peticion = new XMLHttpRequest();

    // Abrir una nueva solicitud POST al archivo insertar_usuarios.php en el servidor
    peticion.open('POST', 'php/insertar_usuarios.php');


    // Obtener los valores de los campos del formulario y limpiarlos
    usuario_nombre = formulario.nombre.value.trim();
    usuario_edad = parseInt(formulario.edad.value.trim());
    usuario_pais = formulario.pais.value.trim();
    usuario_correo = formulario.correo.value.trim();

    // Verificar si el formulario es válido llamando a la función formulario_valido
    // Si el formulario es válido, enviar los datos al servidor
if (formulario_valido()) {
    // Ocultar el contenedor de mensajes de error
    error_box.classList.remove('active');
    
    // Construir los parámetros a enviar al servidor en formato de cadena
    var parametros = 'nombre=' + usuario_nombre + '&edad=' + usuario_edad + '&pais=' + usuario_pais + '&correo=' + usuario_correo;

    // Establecer el tipo de contenido de la solicitud como application/x-www-form-urlencoded
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Mostrar el indicador de carga
    loader.classList.add('active');

    // Manejar la respuesta cuando la solicitud se completa exitosamente
    peticion.onload = function() {
        // Cargar los usuarios nuevamente para actualizar la tabla
        cargarUsuarios();
        
        // Limpiar los campos del formulario después de enviar los datos
        formulario.nombre.value = '';
        formulario.edad.value = '';
        formulario.correo.value = '';
        formulario.pais.value = '';
    }

    // Manejar cambios en el estado de la solicitud
    peticion.onreadystatechange = function(){
        // Verificar si la solicitud se ha completado y el estado de la respuesta
        if(peticion.readyState == 4 && peticion.status == 200){
            // Ocultar el indicador de carga cuando la respuesta se ha recibido completamente
            loader.classList.remove('active');
        }
    }

    // Enviar la solicitud al servidor con los parámetros construidos
    peticion.send(parametros);

} else {
    // Mostrar el contenedor de mensajes de error y establecer el mensaje de error
    error_box.classList.add('active');
    error_box.innerHTML = 'Por favor completa el formulario correctamente';
}



// Agregar un evento de escucha al botón para cargar usuarios cuando se haga clic
btn_cargar_usuarios.addEventListener('click', function() {
    cargarUsuarios(); // Llamar a la función para cargar usuarios
});

// Agregar un "escuchador de eventos" al formulario que se activará cuando se envíe el formulario
formulario.addEventListener('submit', function(e) {
    // Cuando se envíe el formulario, llamar a la función agregarUsuarios y pasar el evento como parámetro
    agregarUsuarios(e);
});


// Esta función verifica si los datos del formulario son válidos
function formulario_valido() {
    // Verificar si el nombre, la edad, el país y el correo electrónico no están vacíos
    // y la edad es un número válido
    return usuario_nombre !== '' && 
        !isNaN(usuario_edad) && 
        usuario_pais !== '' && 
        usuario_correo !== '';
}
