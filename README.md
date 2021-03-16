# Base de datos

## Tabla "categorias"
---------------------

|    nombre        |               categoria_id                |
| ---------------- | ------------------------------------------|
| varchar(50) único| int(11) (auto) primary key     |

## Tabla "libros"
---------------------

|         libro_id             |        nombre              |   descripcion   | categoria_id |persona_id |
| ---------------------------  | -------------------------- | --------------- | ------------ |---------- |
| int(11) auto   primary key   |       varchar(60)   unico  |  varchar(60)    |    int(11)   | int(11)   |

## Tabla "personas"
---------------------

|           persona_id          |         nombre        |     apellido    |       email          |   alias      |
| ----------------------------  | --------------------- | --------------- | ---------------------| ------------ |
| int(11)  (auto primary key)   |       varchar(50)     |    varchar(50)  |  varchar(50) (unico) | varchar(50)  |





# RUTAS API
----------------
## CATEGORIA

* `POST '/categoria'` recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"

   - JSON: {nombre: string,
       id: numerico,
	   }
	   
	   -- SI ESTA OK: retorna: status: 200
	   -- SI NO ESTA OK: {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"



* `GET '/categoria'` retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
 
   - JSON: [{id:numerico, nombre:string}] --> TABLA COMPLETA DE CATEGORIA

* `GET '/categoria/:id'` retorna: status 200 y {id: numerico, nombre:string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"

    - JSON: {id: numerico, nombre:string}

* `DELETE '/categoria/:id'` retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"

    - SI BORRO BIEN: status 200
    - SI NO PUDO BORRAR: STATUS 413 -->"error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"

No se debe implementar el PUT


## PERSONA 

* `POST '/persona'` recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"

    - JSON:{nombre: string, apellido: string, alias: string, email: string}

    - SI PUDO CREAR LA NUEVA PERSONA: STATUS 200 Y TODOS LOS CAMPOS QUE CARGO.

    - SI NO: status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"


* `GET '/persona'` retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []

    - ARRAY DE JSON: [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] status 200

    - SI NO HAY DATOS: status 413 y [](ARRAY VACIO)


* `GET '/persona/:id'` retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

   - JSON: {id: numerico, nombre: string, apellido: string, alias: string, email; string} 
   - SI OK: STATUS 200
   - SI NO: STATUS 413 --> {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"
 

* `PUT '/persona/:id'`  (PARA MODIFICAR PERSONA)

    - recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413,
    - SI NO SE PUEDE  {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"


* `DELETE '/persona/:id' `

   - retorna: 200 y {mensaje: "se borro correctamente"} o
   - SI NO SE PUEDE: STATUS 413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

## LIBROS

- METODO POST `localhost:3000/libro/{libro_id}`   CREA UN NUEVO LIBRO CON LOS DATOS ENVIADO EN EL JSON DEL BODY. EL CAMPO NOMBRE Y CATEGORIA SON OBLIGATORIOS.
Ej: recibe 
```
{
 "nombre": "El gaucho Martín Fierro",
 "descripcion":" Es un poema narrativo escrito en verso y una obra literaria considerada ejemplar del género gauchesco",
 "categoria_id": 5
}
```
- METODO GET `localhost:3000/libro`   DEVUELVE UN ARRAY DE JSON CON TODOS LOS LIBROS EN LA DB
   * Ej: `localhost:3000/libro` devuelve:
```
[ {
        "libro_id": 1,
        "nombre": "1984",
        "descripcion": "EN UN FUTURO DISTOPICO..",
        "categoria_id": 4,
        "persona_id": 6
    },
    {
        "libro_id": 2,
        "nombre": "EL ALEPH",
        "descripcion": "UNA COLECCIÓN DE CUENTOS DE JORGE LUIS BORGES",
        "categoria_id": 5,
        "persona_id": 6
    }
]
```
- METODO GET `localhost:3000/libro/{libro_id}`   DEVUELVE LOS DATOS DEL LIBRO {LIBRO_ID}
   * Ej: `localhost:3000/libro/2` devuelve:
```
{
    "libro_id": 2,
    "nombre": "EL ALEPH",
    "descripcion": "UNA COLECCIÓN DE CUENTOS DE JORGE LUIS BORGES",
    "categoria_id": 5,
    "persona_id": 6
}
```

- METODO PUT `localhost:3000/libro/{libro_id}`  MODIFICA LA DESCRIPCION DEL LIBRO {LIBRO_ID} CON LA NUEVA DESCRIPCION ENVIADA EN EL JSON DEL BODY
   * EJ modifica descripcion de un libro en la DB:`localhost:3000/libro/2` 
    body:
```  
    {"descripcion":"Uno de los libros mas reconocidos del autor Jorge Luis Borges."}
```

- METODO PUT `localhost:3000/libro/prestar/{libro_id}` MODIFICA EL CAMPO PERSONA_ID CON LA PERSONA A LA QUE SE LE PRESTO EL LIBRO. SI ESTA PRESTADO DEVUELVE ERROR.
    * Recibe 
    ```
    {"persona_id":7}
    ```

- METODO PUT `localhost:3000/libro/devolver/{libro_id}` DEVUELVE EL LIBRO {LIBRO_ID}

- METODO DELETE `localhost:3000/libro/{libro_id}` BORRA EL LIBRO  {LIBRO_ID}