import { Archivo } from './archivo';
const express = require ('express')
const fs = require ('fs')
const app = express()
const port = 8080
var router = express.Router();


//middleware
app.use(express.urlencoded({extended:true}));

//uso del metodo get
app.get('/productos/',(req,res) =>{
    let archivo = new Archivo("productos.txt")
    let dato;
    let arr;
    let data = archivo.leer()
    dato = JSON.parse(data)
    arr = new Array()
    dato.forEach(element => {
        arr.push(element)
    });
    let response = { "items": arr, "cantidad":arr.length -1 }
    res.json(response)

   
} )

app.put('/productos/actualizar/:id',(req,res) =>{
    let id = parseInt(req.params.id);
    console.log(id)
    let archivo = new Archivo("productos.txt")
    let dato
    let id2
    let item
    let bandera = 1;
    let data = archivo.leer()
    console.log(data)
    dato = JSON.parse(data)
    dato.forEach(element => {
        id2 = element.id
    if(id == id2){
        dato[id].title = req.query.title;
        dato[id].Precio = req.query.price;
        dato[id].Tumbnail = req.query.thumbnail;
        item= dato[id]
        bandera = 0;
    }else if(bandera == 1) {
        item =  
           {
                "eror":"producto no encontrado"
           }
        
    }
    
    });
    archivo.escribir(dato)
    res.send(JSON.stringify(item))
   
} )
 app.put('/api/productos/borrar/:id',(req,res) =>{
    let id = parseInt(req.params.id);
    console.log(id)
    let archivo = new Archivo("productos.txt")
    let dato
    let id2
    let item
    let bandera = 1;
    let data = archivo.leer()
    dato = JSON.parse(data)
    dato.forEach(element => {
        id2 = element.id
    if(id == id2){
      dato.splice(id,1)
      item = dato[id]
    }else if(bandera == 1) {
        item =  
           {
                "eror":"producto no encontrado"
           }
        
    }s
    
    });
    let response = { "item borrado": item  }
    res.json(response)
} )



app.get('/productos/:id',(req,res) =>{
    let id = parseInt(req.params.id);
    let archivo = new Archivo("productos.txt")
    let dato
    let id2
    let item
    let data = archivo.leer()
    let bandera = 0
    dato = JSON.parse(data)

    dato.forEach(element => {
        id2 = element.id
    if(id == id2){
        bandera = 1;
        item = element
        console.log(item)
    }else if(bandera == 0)
        item =  
           {
                "eror":"producto no encontrado"
           }
        
    
    });
    console.log(item)
    res.send(JSON.stringify(item))
   
   
} )

app.post('/productos/guardar',(req,res) =>{
    let archivo = new Archivo("productos.txt")
    let datos = [] as any;
    let index = 0;
    let barrido;
    console.log(req.body)
    if(archivo.existe()){
        barrido = JSON.parse(fs.readFileSync(`./productos.txt`,'utf8'))
        barrido.push({
           'id': barrido.length +1 ,
          'title': req.query.title,
          "Precio": req.query.precio,
          "Tumbnail":req.query.thumbnail
        })
    }else{
        barrido = []
        barrido.push({
            'id': barrido.length +1 ,
           'title': req.query.title,
           "Precio": req.query.precio,
           "Tumbnail":req.query.thumbnail
         })
    }
 
  archivo.escribir(barrido)
  res.json(barrido[barrido.length -1])
} )

app.use('/api',router);
app.use(express.static('public'))

app.listen(port, () =>{
    console.log("Server levantado")
})

