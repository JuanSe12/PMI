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
        let ids = new Array();
        ids.push(this.clientType)
        return DataService.getClientTypeByIds(ids)
    }

}
