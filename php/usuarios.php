<?php 

// Establece el encabezado HTTP para indicar que el contenido es JSON y utiliza UTF-8
header('Content-type: application/json; charset=utf-8');

// Define un array asociativo con la información de los usuarios
$respuesta = [
    [
        'id' => '65cbee6d416772f9ef3c9b44',
        'nombre' => 'Gallagher',
        'edad' => 37,
        'pais' =>'Venezuela',
        'correo' =>'mariannegallagher@golistic.com',
    ],

    [
        'id' => '65cbee6d38a7b74999789c4c',
        'nombre' => 'Gallagher',
        'edad' => 33,
        'pais' =>'Alemania',
        'correo' =>'marianneblevins@golistic.com',
    ],

    [
        'id' => '65cbee6d887157fac7111987',
        'nombre' => 'Shannon',
        'edad' => 25,
        'pais' =>'Ucrania',
        'correo' =>'marianneshannon@golistic.com',
    ]
];

// Convierte el array asociativo en formato JSON y lo imprime en la salida
echo json_encode($respuesta);
