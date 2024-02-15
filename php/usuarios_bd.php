<?php

// Establece una conexión con la base de datos utilizando MySQLi
$conexion = new mysqli('localhost', 'root', '', 'tabla_usuarios');

// Verifica si hay un error al conectar con la base de datos
if ($conexion->connect_errno) {
    // Si hay un error, crea una respuesta con la indicación de error
    $respuesta = [
        'error' => true
    ];
} else {
    // Si la conexión es exitosa, establece el conjunto de caracteres a UTF-8
    $conexion->set_charset("utf8");

    // Prepara una consulta SQL para seleccionar todos los registros de la tabla 'usuarios'
    $statement = $conexion->prepare("SELECT * FROM usuarios");

    // Ejecuta la consulta preparada
    $statement->execute();

    // Obtiene los resultados de la consulta
    $resultados = $statement->get_result();

    // Inicializa un array vacío para almacenar la respuesta
    $respuesta = [];

    // Itera sobre los resultados de la consulta
    while ($fila = $resultados->fetch_assoc()) {
        // Crea un array asociativo para representar a cada usuario
        $usuario = [
            'id'     => $fila['id'],
            'nombre' => $fila['nombre'],
            'edad'   => $fila['edad'],
            'pais'   => $fila['pais'],
            'correo' => $fila['correo']
        ];

        // Agrega el array del usuario al array de respuesta
        $respuesta[] = $usuario;
    }
}

// Codifica el array de respuesta en formato JSON y lo imprime
echo json_encode($respuesta);
?>
