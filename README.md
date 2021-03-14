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



# Rutas API/ LIBROS

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

- METODO PUT `localhost:3000/libro/{libro_id}`  MODIFICA LA DESCRIPCION DEL LIBRO CON {LIBRO_ID} CON LA NUEVA DESCRIPCION ENVIADA EN EL JSON DEL BODY
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

- METODO PUT `localhost:3000/libro/devolver/{libro_id}` DEVUELVE EL LIBRO CON LA ID(NUMERICO)

- METODO DELETE `localhost:3000/libro/{libro_id}` BORRA EL LIBRO CON LA ID(NUMERICO)