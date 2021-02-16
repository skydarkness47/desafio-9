const fs = require ('fs')

export class Archivo {
    nombre:string;
    constructor(nombre:string){
        this.nombre = nombre;
    }


    escribir(datos) {
   
    fs.writeFile(`./${this.nombre}`, JSON.stringify(datos),(error) => {
        if(error)
        {
            console.log("error")
        }
    })         

    }

    leer(){
        if(fs.existsSync(this.nombre)){
        let resultado = fs.readFileSync(`./${this.nombre}`,'utf8')
        return resultado;
        }else{
            let resultado = {
                "ERROR": "PROCUTOS NO CARGADOS"
            }
            return resultado;
        }
            
    }

    existe(){
        if(fs.existsSync(this.nombre)){
            return true
        }else{
            return false
        }
    }
}

