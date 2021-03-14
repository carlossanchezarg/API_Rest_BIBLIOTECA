const express=require('express');

const app=express();
const port= process.env.PORT?process.env.PORT:3000;

app.use(express.urlencoded());
app.use(express.json());/*Permite mapear las peticiones de json a javascript object*/

/******conexion con la DB*******/
const mysql=require('mysql');
const util=require('util');

const conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biblioteca',
});

conexion.connect((error)=>{
    if(error){
        console.log('ERROR:NO SE PUDO CONECTAR CON LA BASE DE DATOS.')
        throw error;
    }
    console.log('Conexion con la base de datos mysql establecida')
});

const qy=util.promisify(conexion.query).bind(conexion);

/*********************************/

/* Crear nueva categoria */
app.post('/categoria',async (req,res)=>{
    try{   
        if(!req.body.nombre){
            throw new Error("Faltan datos.");
        }

        const categoria=req.body.nombre;

        query='INSERT INTO categorias (nombre) VALUE (?)';
        respuesta=await qy(query,categoria);

        res.status(200).send(respuesta);
    }

    catch(e){
        res.status(413).send({message:e.message});
    }
});

/*  Hacerse socio de la Biblio */
app.post('/persona',async (req,res)=>{
    try{   
        if(!req.body.alias||!req.body.nombre||!req.body.apellido||!req.body.email){
            throw new Error("Debe llenar todos los campos obligatorios!");
        }

        const persona={
            alias:req.body.alias.toUpperCase(),
            nombre:req.body.nombre.toUpperCase(),
            apellido:req.body.apellido.toUpperCase(),
            email:req.body.email.toUpperCase()
        };

        query='INSERT INTO personas (alias,nombre,apellido,email) VALUE (?,?,?,?)';
        respuesta=await qy(query,[persona.alias,persona.nombre,persona.apellido,persona.email]);

        res.status(200).send(respuesta);
    }

    catch(e){
        res.status(413).send({message:e.message});
    }
});


/* Ingresar nuevo libro */
app.post('/libro',async (req, res)=>{
    try{   
        
        if(!req.body.nombre||!req.body.categoria_id){
            throw new Error("Nombre y Categoria son datos obligatorios.");
        }
        
        let descripcion=req.body.descripcion;
        if(!req.body.descripcion){
            descripcion="Sin descripción.";
        }

        let libro={
            nombre:req.body.nombre.toUpperCase(),
            descripcion:descripcion.toUpperCase(),
            categoria_id:req.body.categoria_id,
            persona_id:null
        };

        if(req.body.persona_id){
            libro.persona_id=req.body.persona_id;
        }
        
         
        const queryLibros='select * from libros where nombre=?';   
        const existeLibro=await qy(queryLibros,[libro.nombre]);
        
        const queryCategoria='select * from categorias where categoria_id=?';   
        const existeCategoria=await qy(queryCategoria,[libro.categoria_id]);

        const queryPersona='select * from personas where persona_id=?';   
        const existePersona=await qy(queryPersona,[libro.persona_id]);
        
        if(existeLibro.length>0){
            throw new Error("Ese libro ya existe.");
        }else if(existeCategoria.length==0){
            throw new Error("No existe la categoria indicada.");
        }else if(existePersona.length==0&&req.body.persona_id){
            throw new Error("No existe la persona indicada.");
        }else{   
            query='INSERT INTO libros (nombre,descripcion,categoria_id,persona_id) VALUE (?,?,?,?)';
            respuesta=await qy(query,[libro.nombre,libro.descripcion,libro.categoria_id,libro.persona_id]);

            const nuevolibro='select * from libros where nombre=?';   
            const muestroLibro=await qy(nuevolibro,[libro.nombre]);
            res.status(200).send(muestroLibro[0]);
        }
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});


/*consultar catalogo */
app.get('/libro',async (req, res)=>{
    try{
        query='select * from libros';   
        const todosLosLibros=await qy(query);
        res.send(todosLosLibros);     
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});


/*Consultar por un libro en particular usando su id numérica. */
app.get('/libro/:id',async (req, res)=>{
    try{
        query='select * from libros where libro_id=?';
        consultaLibro=await qy(query,req.params.id);

        if(consultaLibro.length==0){
            throw new Error("No se encuentra el libro solicitado.");
        }   

        res.status(200).send(consultaLibro[0]);     
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});



/*Modificar descripcion del libro */
app.put('/libro/:id',async (req, res)=>{
    try{   
        if(!req.body.descripcion){
            throw new Error("Solo se puede modificar la descripcion del libro.");
        }

        const nuevaDescripcion=req.body.descripcion.toUpperCase();
        const libro_id=req.params.id.toUpperCase();

        query='UPDATE libros SET descripcion=? WHERE libro_id = ?;';
        respuesta=await qy(query,[nuevaDescripcion,libro_id]);
        
        query='SELECT * FROM libros where libro_id=?';
        consultaLibro=await qy(query,libro_id);

        res.send(consultaLibro[0],"modificado");   
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});

/*Prestar libro */
app.put('/libro/prestar/:id',async (req, res)=>{
    try{ 
        query='SELECT persona_id FROM libros where libro_id=?';
        estaPrestado=await qy(query,req.params.id);
         
        if(estaPrestado[0].persona_id){
            throw new Error("el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva.");
        } 

        query='SELECT * FROM libros where libro_id=?';
        existeLibro=await qy(query,req.params.id);
        if(existeLibro.length==0){
            throw new Error("No se econtro el libro.");
        }
        query='SELECT * FROM personas where persona_id=?';
        existePersona=await qy(query,req.body.persona_id);
        if(existePersona.length==0){
            throw new Error("No se encontro la persona a la que se quiere prestar el libro.");
        }
       
        const persona=req.body.persona_id;
        const libro_id=req.params.id;

        query='UPDATE libros SET persona_id=? WHERE libro_id = ?;';
        respuesta=await qy(query,[persona,libro_id]);
        
        query='SELECT * FROM libros where libro_id=?';
        consultaLibro=await qy(query,libro_id);
        
        res.status(200).send({message:"El libro se presto correctamente."});
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});

/*Devolver libro */
app.put('/libro/devolver/:id',async (req, res)=>{
    try{ 
        query='SELECT persona_id FROM libros where libro_id=?';
        estaPrestado=await qy(query,req.params.id);
        if(!estaPrestado[0].persona_id){
            throw new Error("Ese libro no estaba prestado!");
        } 

        query='SELECT * FROM libros where libro_id=?';
        existeLibro=await qy(query,req.params.id);
        if(existeLibro.length==0){
            throw new Error("Ese libro no existe!");
        }
      
        query='UPDATE libros SET persona_id=NULL WHERE libro_id = ?;';
        respuesta=await qy(query,[req.params.id]);
        
        res.status(200).send({message:"Se realizó la devolución correctamente."});
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});

/*Borrar libro */
app.delete('/libro/:id',async (req, res)=>{
    try{ 
        query='SELECT * FROM libros where libro_id=?';
        existeLibro=await qy(query,req.params.id);
        if(existeLibro.length==0){
            throw new Error("No se encuentra ese libro.");
        } 

        query='SELECT persona_id FROM libros where libro_id=?';
        estaPrestado=await qy(query,req.params.id);
        if(estaPrestado[0].persona_id){
            throw new Error("Ese libro esta prestado, no se puede borrar!!");
        } 
      
        query='delete from libros WHERE libro_id = ?;';
        respuesta=await qy(query,[req.params.id]);
        
        res.status(200).send({message:"El libro fue borrado correctamente."});
    }
    catch(e){
        res.status(413).send({message:e.message});
    }
});

app.listen(port,()=>{
    console.log("Servidor escuchando en el puerto",port);
});

