import fs from "fs"

class mensajes{
    constructor(route){
        this.route = route
    }
    async save(mensaje){
        const msj = await this.getAll()
        msj.push(mensaje)
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(msj, null, 2))
            return console.log('se ha guardado ')
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(){
        try {
            let mensaje = await fs.promises.readFile(this.route, 'utf-8')
            return JSON.parse(mensaje)
        } catch (error) {
            console.error('Error de lectura.')
            console.error(error)
            return []
        }
    }
}

export default mensajes;