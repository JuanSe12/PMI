import DataService from "../services/data_service.js";

export default class Client{
    constructor(id, name, nit, size, sector, clientType){
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.size = size;
        this.sector = sector;
        this.clientType = clientType;
    }

    static getSectors(){
        return ['privado', 'publico']
    }

    getClient(){
        return DataService.getClientTypeByIds(new Arrar(this.clientType))
    }

}
