import DataService from "../services/data_service.js";

export default class Project{
    constructor(id, name, description, state, client, dateInit, dateFinish,technologies, sofkianos){
        this.id = id;
        this.name = name;
        this.description = description;
        this.state = state;
        this.client = client;
        this.dateInit = dateInit;
        this.dateFinish = dateFinish;
        this.technologies = technologies;
        this.sofkianos = sofkianos;
    }


    getState(){
        let ids = new Array();
        ids.push(this.state)
        return DataService.getProjectStateByIds(ids);
    }


    getClient(){
        let ids = new Array();
        ids.push(this.client)
        return DataService.getClientByIds(ids);
    }


    getSofkianos(){
        return DataService.getSofkianoByIds(this.sofkianos);
    }


    getTechnologies(){
        return DataService.getTechnologiesByIds(this.technologies)
    }


    getDateInit(){
        return new Date(...this.dateInit)
    }


    getDateFinish(){
        return new Date(...this.dateFinish)
    }

}