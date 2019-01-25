import DataService from "../services/data_service.js";

export default class Client{
    constructor(id, name, nit, size, sector, clintType){
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.size = size;
        this.sector = sector;
        this.clintType = clintType;
    }

    static getSectors(){
        return ['privado', 'publico']
    }

    getClient(){
        return DataService.getClientTypeByIds(new Arrar(this.clintType))
    }

}
