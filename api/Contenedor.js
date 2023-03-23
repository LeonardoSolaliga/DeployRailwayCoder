import fs from "fs"

class Contenedor{
    constructor(ruta){
        this.ruta=ruta;
    }

    async save(objeto){

        const productos=await this.getAll();
        objeto.id = productos.length === 0 ? 1 : objeto.id = productos[productos.length - 1].id + 1//ingreso al ultimo item del array y le sumo 1 a su id al nuevo objeto, para que nunca se repita
        //objeto.id=productos.length===0 ? 0:(productos.length); en esta linea si borraba un item luego los numeros se terminaban repitiendo el id
        productos.push(objeto);
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(productos, null, 2))
            console.log("se ha guardado");

        }catch(error){

            console.log(error);

        }
    }

    async getById(id){
        const productos=await this.getAll();
        if(productos.length!=null){
            let producto=productos.filter(elem=>elem.id===id)
            return producto ? producto:producto=null;
        }
    }
    async getAll(){
        try{
            let contenido=await fs.promises.readFile(this.ruta,'utf-8');
            return JSON.parse(contenido);

        }
        catch(error){
            console.log("productos.txt vacio");
            return []
        }   

    }
    async deleteById(id){
        const productos=await this.getAll();
        let arrproductos=[];
        if(productos.length!=null){
            arrproductos=productos.filter(elem=>elem.id!=id)
            
        }
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrproductos, null, 2))
        }catch(error){
            console.log(error);
            console.log("error en eliminar")
        }
    }
    async deleteAll(){

        try{
            await fs.promises.writeFile(this.ruta, "");
            console.log("se ha eliminado el txt");

        }catch(error){

            console.log(error);

        }

    }
    async actualizar(producto){
        let productos = await this.getAll();
        productos.map(function(item){
            if(item.id === producto.id){
                item.title = producto.title,
                item.price = producto.price,
                item.thumbnail = producto.thumbnail
            }
        })
        await fs.promises.writeFile(this.ruta,JSON.stringify(productos,null,2))
        return productos;
    }

}

export default Contenedor;
