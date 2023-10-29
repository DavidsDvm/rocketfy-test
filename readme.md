### Rocketfy Test

Este repositorio contiene el proyecto desarrollado en respuesta a las condiciones presentadas en el test. A continuación, se proporciona una guía detallada para configurar y ejecutar la aplicación.

#### Demostración

![Demo de la Aplicación](./app_show.gif)

#### Requisitos del Sistema

Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalados los siguientes componentes:

- Node.js
- Angular
- Python

#### Configuración del Proyecto

##### Aviso Importante

Si no estás utilizando un sistema Linux, sigue estos pasos para configurar el proyecto correctamente:

1. Abre el archivo `/backend/api/services/sensor.service.js`.
2. En la línea 156, asegúrate de modificar la ruta para que el backend pueda acceder a Python según tu configuración del sistema.

##### Configuración del Archivo .env

Para que el proyecto funcione correctamente, debes crear un archivo `.env` en la carpeta del backend y configurarlo con los datos necesarios para la conexión a la base de datos. Puedes utilizar el archivo de ejemplo llamado `.env.example` como referencia.

#### Iniciar el Servidor

Una vez que hayas realizado la configuración, puedes ejecutar el proyecto de la siguiente manera:

##### Backend

Abre una terminal y ejecuta el siguiente comando en la carpeta del backend:

_npm i_ <br>
_npm run dev_

##### Frontend

Abre una terminal y ejecuta el siguiente comando en la carpeta del frontend:

_npm i_ <br>
_ng serve_


#### Creación de Datos de Sensores

Puedes crear datos de sensores a través de la siguiente URL: [http://localhost:3000/api/v1/sensor/create](http://localhost:3000/api/v1/sensor/create).

Aquí tienes un ejemplo de datos de prueba que puedes utilizar:

```json
{
    "sensor_name": "Sensor Ambiental",
    "sensor_image": "URL de la imagen",
    "data": [
        {
            "timestamp": {{$timestamp}},
            "noise_level": 40.5,
            "air_quality": "Buena"
        },
        // Agrega más datos aquí
    ]
}
```

#### Creación de Usuarios

Para crear un usuario, puedes utilizar la siguiente URL: http://localhost:3000/api/v1/users/create.

Aquí tienes un ejemplo de datos de prueba para la creación de un usuario:

```json
{
    "name": "David",
    "email": "davids.dvm@gmail.com",
    "password": "12345"
}
```

También puedes crear un usuario a través de la interfaz de usuario en http://localhost:4200/register.
Autenticación

El proyecto utiliza la autenticación JWT para el inicio de sesión. Una vez que te hayas autenticado, podrás disfrutar de la prueba.

¡Disfruta del proyecto!

Cualquier duda contactarme: davids.dvm@gmail.com
