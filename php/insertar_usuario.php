<?php

error_reporting(0);
// Establecer el encabezado HTTP para indicar que el contenido es JSON y utiliza UTF-8
header('Content-type: application/json; charset=utf-8');

// Obtener datos del formulario y limpiarlos
$nombre = limpiarInput($_POST['nombre']);
$edad = limpiarInput($_POST['edad']);
$pais = limpiarInput($_POST['pais']);
$correo = filter_var(limpiarInput($_POST['correo']), FILTER_SANITIZE_EMAIL);

// Función para limpiar los datos de entrada
function limpiarInput($dato) {
    return isset($dato) ? trim($dato) : ''; // Trim elimina espacios en blanco al principio y al final
}

// Función para validar los datos de entrada
function validarDatos($nombre, $edad, $pais, $correo) {
    // Verificar que el nombre no esté vacío
    if ($nombre === '') {
        return 'El nombre es obligatorio.';
    }
    // Verificar que la edad no esté vacía y sea un número entero
    if ($edad === '' || !is_numeric($edad) || !is_int($edad + 0)) {
        return 'La edad debe ser un número entero.';
    }
    // Verificar que el país no esté vacío
    if ($pais === '') {
        return 'El país es obligatorio.';
    }
    // Verificar que el correo no esté vacío y sea un correo electrónico válido
    if ($correo === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        return 'El correo electrónico no es válido.';
    }
    // Si todas las condiciones anteriores se cumplen, los datos son válidos
    return '';
}


// Validar los datos de entrada
$mensajeError = validarDatos($nombre, $edad, $pais, $correo);

// Procesar los datos si no hay errores
if ($mensajeError === '') {
    // Conectar a la base de datos
    $conexion = new mysqli('localhost', 'root', '', 'tabla_usuarios');
    $conexion->set_charset("utf8");

    // Verificar la conexión
    if ($conexion->connect_errno) {
        $respuesta = ['error' => true, 'mensaje' => 'Error al conectar con la base de datos.'];
    } else {
        // Preparar la consulta SQL
        $statement = $conexion->prepare("INSERT INTO usuarios(nombre, edad, pais, correo) VALUES(?,?,?,?)");
        // Enlazar parámetros
        $statement->bind_param("siss", $nombre, $edad, $pais, $correo);
        // Ejecutar la consulta
        $statement->execute();

        // Verificar si se afectaron filas
        if ($conexion->affected_rows <= 0) {
            $respuesta = ['error' => true, 'mensaje' => 'Error al insertar los datos en la base de datos.'];
        } else {
            $respuesta = ['error' => false, 'mensaje' => 'Datos insertados correctamente.'];
        }

        $respuesta = [];
    }
} else {
    // Se encontraron errores en la validación de los datos
    $respuesta = ['error' => true, 'mensaje' => $mensajeError];
}

// Devolver respuesta en formato JSON
echo json_encode($respuesta);
?>
